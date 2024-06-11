<?php

namespace Framework;

use PDO;
use PDOException;
use Exception;

class Database
{

    public $conn;

    /**
     * Constructer for Database class
     * 
     * @param array $config
     * 
     */
    public function __construct($config)
    {
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']}";

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Makes pdo throws errors if anything happens
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC //Returns the array as an associative array.
        ];

        try {
            $this->conn = new PDO($dsn, $config["username"], $config["password"], $options);
        } catch (PDOException $error) {
            throw new Exception("Database connection failed: {$error->getMessage()}");
        }
    }

    /**
     * Execute a query
     * 
     * @param string $query
     * 
     * @return PDOStatement
     * 
     * @throws PDOException
     */
    public function query($query, $params = [])
    {
        try {
            $sth = $this->conn->prepare($query);

            foreach ($params as $param => $value) {
                $sth->bindValue(":" . $param, $value);
            }
            $sth->execute();
            return $sth;
        } catch (PDOException $error) {
            throw new Exception("Failed to run query {$error->getMessage()}");
        }
    }
}
