<?php

namespace App\Controllers;

use Error;
use Framework\Database;
use Framework\Validation;
use Throwable;
use Framework\Session;

class UserController
{
    protected $db;
    public function __construct()
    {
        $config = require __DIR__ . "/../../config/db.php";
        $this->db = new Database($config);
    }


    /**
     * Get all users
     */
    public function index()
    {
        try {
            $foundUsers = $this->db->query("SELECT * FROM users ORDER BY created_at")->fetchAll();
            returnJsonHttpResponse(200, $foundUsers);
        } catch (Throwable $error) {
            returnJsonHttpResponse();
        }
    }

    /**
     * Store the user in the database
     */
    public function store()
    {
        $name = $_POST["name"];
        $surname = $_POST["surname"];
        $studentNum = $_POST["studentNum"];
        $birthday = $_POST["birthday"];
        $phoneNumber = $_POST["phoneNumber"];
        $passwordRow = $_POST["password"];

        $errors = [];

        //Validate user input

        if (!Validation::isStringValid($name, 2, 50)) {
            $errors['name'] = 'Name must be between 2 and 50 characters';
        }
        if (!Validation::isStringValid($surname, 2, 50)) {
            $errors['surname'] = 'Surname must be between 2 and 50 characters';
        }
        if (!Validation::isStringValid($studentNum, 10, 10)) {
            $errors['studentNum'] = 'Student number must be 10 digits';
        }
        if (!Validation::isStringValid($birthday, 1)) {
            $errors['birthday'] = "Birthday field can't be empty";
        }
        if (!Validation::isStringValid($phoneNumber, 10, 10)) {
            $errors['phoneNumber'] = 'You should enter a 10 digit phone number';
        }
        if (!Validation::isStringValid($passwordRow, 6, 50)) {
            $errors['password'] = 'Password must be 6 character long.';
        }

        if (!empty($errors)) {
            returnJsonHttpResponse(400, $errors);
            exit;
        }

        //Check if student number exists

        $params = [
            'studentNum' => $studentNum
        ];

        $user = $this->db->query('SELECT * FROM users WHERE studentNum = :studentNum', $params)->fetch();

        if ($user) {
            $errors['studentNum'] = 'This student number is in use';
            returnJsonHttpResponse(409, $errors);
            exit;
        }

        //Check if phone number exists

        $params = [
            'phoneNumber' => $phoneNumber
        ];

        $user = $this->db->query('SELECT * FROM users WHERE phoneNumber = :phoneNumber', $params)->fetch();

        if ($user) {
            $errors['studentNum'] = 'Phone number is already in use';
            returnJsonHttpResponse(409, $errors);
            exit;
        }

        // Create user account
        $params = [
            'name' => $name,
            'surname' => $surname,
            'studentNum' => $studentNum,
            'birthday' => $birthday,
            'phoneNumber' => $phoneNumber,
            'password' => password_hash($passwordRow, PASSWORD_DEFAULT)
        ];

        $this->db->query('INSERT INTO users (name, surname, studentNum, birthday, password, phoneNumber) VALUES (:name, :surname, :studentNum, :birthday, :password, :phoneNumber)', $params);

        // Get new user ID
        $userId = $this->db->conn->lastInsertId();

        // Set user session
        Session::set('user', [
            'id' => $userId,
            'name' => $name,
            'surname' => $surname,
            'studentNum' => $studentNum,
            'birthday' => $birthday
        ]);
    }
}
