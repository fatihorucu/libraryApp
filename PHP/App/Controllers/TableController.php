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

    public function index()
    {
        $tables = $this->db->query("SELECT * FROM tables ORDER BY category DESC")->fetchAll();
        returnJsonHttpResponse(200, $tables);
    }
}
