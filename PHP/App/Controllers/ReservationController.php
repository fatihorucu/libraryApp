<?php

namespace App\Controllers;

use Framework\Database;
use Framework\Validation;


class ReservationController
{
    protected $db;
    public function __construct()
    {
        $config = require __DIR__ . "/../../config/db.php";
        $this->db = new Database($config);
    }
    /**
     * Get all reservations
     */
    public function index()
    {
        $reservations = $this->db->query("SELECT * FROM reservations ORDER BY id DESC")->fetchAll();
        returnJsonHttpResponse(200, $reservations);
    }

    /**
     * Get current reservations
     */
    public function getCurrentReservations()
    {
        $reservations = $this->db->query("SELECT * FROM reservations WHERE dateEnd > NOW()")->fetchAll();
        returnJsonHttpResponse(200, $reservations);
    }
    /**
     * Create a new reservation
     */
    public function store()
    {
        $request = file_get_contents('php://input');
        $reservationData = json_decode($request, true);

        $userId = $reservationData["userId"] ?? "";
        $tableId = $reservationData["tableId"] ?? "";
        $chairNumber = $reservationData["chairNumber"] ?? "";
        $dateStart = $reservationData["dateStart"] ?? "";
        $dateEnd = $reservationData["dateEnd"] ?? "";

        $errors = [];

        //Input Validation
        if (!$userId) {
            $errors["userId"] = "userId can't be empty";
        }

        if (!$tableId) {
            $errors["tableId"] = "tableId can't be empty";
        }

        if (!$chairNumber) {
            $errors["chairNumber"] = "chairNumber can't be empty";
        }

        if (!$dateStart) {
            $errors["dateStart"] = "dateStart can't be empty";
        }
        if ($dateStart && Validation::isDateSmaller($dateStart, "now")) {
            $errors["dateStart"] = "dateStart can't be smaller than current time";
        }
        if ($dateStart && Validation::checkDateDiffInHours("now", $dateStart) > 24) {
            $errors["dateStart"] = "Reservations can only be made up to 24 hours in advance.";
        }
        if ($dateStart && Validation::isDateSmaller($dateEnd, $dateStart)) {
            $errors["dateEnd"] = "dateEnd can't be smaller than dateStart";
        }
        if (!$dateEnd) {
            $errors["dateEnd"] = "dateEnd can't be empty";
        }
        if ($dateEnd && Validation::checkDateDiffInHours($dateStart, $dateEnd) > 3) {
            $errors["dateEnd"] = "The difference between start and end date can't be more than 3 hours.";
        }

        if (!empty($errors)) {
            returnJsonHttpResponse(400, $errors);
        }

        // Check if the table is already reserved during the requested time slot
        $params = [
            "tableId" => $tableId,
            "chairNumber" => $chairNumber,
            "dateStart" => $dateStart,
            "dateEnd" => $dateEnd
        ];

        $conflictingReservation = $this->db->query(
            "SELECT * FROM reservations 
             WHERE tableId = :tableId 
             AND chairNumber = :chairNumber
             AND (
                 (dateStart <= :dateStart AND dateEnd > :dateStart) OR
                 (dateStart < :dateEnd AND dateEnd >= :dateEnd) OR
                 (:dateStart <= dateStart AND :dateEnd > dateStart)
             );",
            $params
        )->fetch();

        if ($conflictingReservation) {
            returnJsonHttpResponse(409, ["reservationError" => "This chair is already reserved during the requested time slot."]);
            return;
        }

        // Check if user has more than one future reservation
        $userFutureReservations = $this->db->query(
            "SELECT * FROM reservations WHERE userId = :userId AND dateStart > NOW();",
            ["userId" => $userId]
        )->fetchAll();

        if (count($userFutureReservations) > 0) {
            returnJsonHttpResponse(409, ["reservationError" => "User can only have one future reservation."]);
            return;
        }

        //Check if the table is empty
        $params = [
            "tableId" => $tableId,
            "chairNumber" => $chairNumber,
        ];
        // Check if user has current reservation = type A user
        $userReservations = $this->db->query(
            "SELECT * FROM reservations WHERE userId = :userId AND TIMESTAMPDIFF(MINUTE, NOW(), dateEnd) > 0;",
            ["userId" => $userId]
        )->fetchAll();

        // Type A users can make a new reservation only if their reservation time is less than 1 hour.
        $isTypeA = false;
        foreach ($userReservations as $reservation) {
            if (Validation::checkDateDiffInHours($reservation["dateEnd"], "now") <= 1) {
                $isTypeA = true;
                break;
            }
        }

        // Check if the table is empty for a new user = Type B User
        $chair = $this->db->query(
            "SELECT * FROM reservations 
             WHERE tableId = :tableId 
             AND chairNumber = :chairNumber 
             AND dateStart <= NOW() 
             AND dateEnd > NOW();",
            ["tableId" => $tableId, "chairNumber" => $chairNumber]
        )->fetch();

        if ($isTypeA) {
            // Type A user restrictions
            if (count($userReservations) > 1) {
                returnJsonHttpResponse(409, ["reservationError" => "You already have an ongoing and future reservation."]);
                return;
            }
            if (Validation::checkDateDiffInHours($dateStart, $dateEnd) > 2) {
                returnJsonHttpResponse(409, ["reservationError" => "You can't create reservations more than 2 hours."]);
                return;
            }
        } else {
            // Type B user restrictions
            if ($chair) {
                $remainingTime = Validation::checkDateDiffInHours("now", $chair["dateEnd"]);
                if ($remainingTime > 0.5) {
                    returnJsonHttpResponse(409, ["reservationError" => "This chair is already reserved."]);
                    return;
                }
            }
        }


        //Create reservation
        $params = [
            "userId" => $userId,
            "tableId" => $tableId,
            "chairNumber" => $chairNumber,
            "dateStart" => $dateStart,
            "dateEnd" => $dateEnd
        ];

        $response = $this->db->query("INSERT INTO reservations (userId, tableId, chairNumber, dateStart, dateEnd) VALUES (:userId, :tableId, :chairNumber, :dateStart, :dateEnd)", $params);

        if (!$response) {
            returnJsonHttpResponse();
        }
    }
    /**
     * Update a current reservation
     */
    public function update($params)
    {
        $request = file_get_contents('php://input');
        $reservationData = json_decode($request, true);

        $newEndDate = $reservationData["dateEnd"] ?? "";
        $reservationId = $params["reservationId"];

        $errors = [];

        // Input Validation
        if (!$newEndDate) {
            $errors["dateEnd"] = "dateEnd can't be empty";
        }

        if ($newEndDate && Validation::isDateSmaller($newEndDate, "now")) {
            $errors["dateEnd"] = "dateEnd can't be smaller than current time";
        }

        if (!empty($errors)) {
            returnJsonHttpResponse(400, $errors);
            return;
        }

        // Fetch the current reservation
        $reservation = $this->db->query(
            "SELECT * FROM reservations WHERE id = :reservationId",
            ["reservationId" => $reservationId]
        )->fetch();

        $userId = $reservation["userId"];

        if (!$reservation) {
            returnJsonHttpResponse(404, ["reservationError" => "Reservation not found"]);
            return;
        }
        // Thanks to functionality in store function there might be 2 seperate reservation records -one is current, one is future- belonging to the same user.
        // That is why we need to
        // Check if user has any future reservations
        $userFutureReservations = $this->db->query(
            "SELECT * FROM reservations WHERE userId = :userId AND dateStart > NOW();",
            ["userId" => $userId]
        )->fetchAll();

        if (count($userFutureReservations) > 0) {
            returnJsonHttpResponse(409, ["reservationError" => "You can't extend your current reservation if you have a future reservation"]);
            return;
        }

        $currentEndDate = $reservation["dateEnd"];

        // Check if the current reservation end time is within the next 1 hour
        if (Validation::checkDateDiffInHours("now", $currentEndDate) > 1) {
            returnJsonHttpResponse(409, ["reservationError" => "You can only extend the reservation within 1 hour of its end time"]);
            return;
        }

        // Check if the new end date is more than 2 hours from current end date
        if (Validation::checkDateDiffInHours($currentEndDate, $newEndDate) > 2) {
            returnJsonHttpResponse(409, ["reservationError" => "You can't extend the reservation for more than 2 hours"]);
            return;
        }

        // Check for conflicting reservations
        $params = [
            "tableId" => $reservation["tableId"],
            "chairNumber" => $reservation["chairNumber"],
            "dateStart" => $currentEndDate,
            "dateEnd" => $newEndDate,
            "reservationId" => $reservationId
        ];

        $conflictingReservation = $this->db->query(
            "SELECT * FROM reservations 
         WHERE tableId = :tableId 
         AND chairNumber = :chairNumber 
         AND id != :reservationId
         AND (
             (dateStart < :dateEnd AND dateEnd > :dateStart)
         );",
            $params
        )->fetch();

        if ($conflictingReservation) {
            returnJsonHttpResponse(409, ["reservationError" => "This chair is already reserved during the requested extended time slot"]);
            return;
        }

        // Update the reservation end date
        $params = [
            "id" => $reservationId,
            "dateEnd" => $newEndDate
        ];

        $response = $this->db->query(
            "UPDATE reservations SET dateEnd = :dateEnd WHERE id = :id",
            $params
        );

        if (!$response) {
            returnJsonHttpResponse();
        }
    }
}
