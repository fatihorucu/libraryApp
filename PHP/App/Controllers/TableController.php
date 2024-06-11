<?php

namespace App\Controllers;

use Framework\Database;


class TableController
{
    protected $db;
    public function __construct()
    {
        $config = require __DIR__ . "/../../config/db.php";
        $this->db = new Database($config);
    }

    public function getTables()
    {
        inspectAndDie("Get Tables");
    }
}
