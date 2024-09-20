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
        $request = file_get_contents('php://input');
        $userData = json_decode($request, true);

        $name = $userData["name"] ?? "";
        $surname = $userData["surname"] ?? "";
        $studentNum = $userData["studentNum"] ?? "";
        $birthday = $userData["birthday"] ?? "";
        $phoneNumber = $userData["phoneNum"] ?? "";
        $passwordRow = $userData["password"] ?? "";

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
        if (!Validation::isStringValid($passwordRow, 8, 50)) {
            $errors['password'] = 'Password must be 8 character long.';
        }

        if (!empty($errors)) {
            returnJsonHttpResponse(400, $errors);
        }

        //Check if student number exists

        $params = [
            'studentNum' => $studentNum
        ];

        $user = $this->db->query('SELECT * FROM users WHERE studentNum = :studentNum', $params)->fetch();

        if ($user) {
            $errors['studentNum'] = 'This student number is in use';
            returnJsonHttpResponse(409, $errors);
        }

        //Check if phone number exists

        $params = [
            'phoneNumber' => $phoneNumber
        ];

        $user = $this->db->query('SELECT * FROM users WHERE phoneNum = :phoneNumber', $params)->fetch();

        if ($user) {
            $errors['phoneNum'] = 'Phone number is already in use';
            returnJsonHttpResponse(409, $errors);
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

        $this->db->query('INSERT INTO users (name, surname, studentNum, birthday, password, phoneNum) VALUES (:name, :surname, :studentNum, :birthday, :password, :phoneNumber)', $params);

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
    /**
     * Logout a user and kill session
     * 
     * @return void
     */
    public function logout()
    {
        Session::clearAll();
        $params = session_get_cookie_params();
        setcookie('PHPSESSID', '', time() - 86400, $params['path'], $params['domain']);
        Session::start();
    }

    /**
     * Authenticate a user with email and password
     * 
     * @return void
     */
    public function authenticate()
    {
        $request = file_get_contents('php://input');
        $userData = json_decode($request, true);
        $studentNum = $userData['studentNum'] ?? "";
        $password = $userData['password'] ?? "";

        $errors = [];

        // Validation
        if (!$studentNum || !$password) {
            returnJsonHttpResponse(400, ["loginErr" => "Parameters missing"]);
        }

        // Check for email
        $params = [
            'studentNum' => $studentNum
        ];

        $user = $this->db->query('SELECT * FROM users WHERE studentNum = :studentNum', $params)->fetch();

        if (!$user) {
            returnJsonHttpResponse(401, ["loginErr" => "Incorrect credentials"]);
        }

        // Check if password is correct
        if (!password_verify($password, $user["password"])) {
            returnJsonHttpResponse(401, ["loginErr" => "Incorrect credentials"]);
        }

        // Set user session
        Session::set('user', [
            'id' => $user["id"],
            'name' => $user["name"],
            'surname' => $user["surname"],
            'studentNum' => $user["studentNum"],
            'birthday' => $user["birthday"],
        ]);

        returnJsonHttpResponse(201, $user);
    }

    public function getAuthenticatedUser()
    {
        if (Session::has("user")) {
            $user = Session::get("user");
            returnJsonHttpResponse(201, $user);
        }
        returnJsonHttpResponse(401, "User not authenticated");
    }
}
