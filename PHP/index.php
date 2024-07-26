<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "./vendor/autoload.php";
require "./helpers.php";

use Framework\Router;
use Framework\Session;

Session::start();

//Instantiate router
$router = new Router();

// Get routes
useRoutes("tablesRoutes", "/api/tables");
useRoutes("usersRoutes", "/api/auth");
useRoutes("reservationsRoutes", "/api/reservations");

//Get current uri and http method
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); //exclude the parameters in the uri. Get only the url part.


$router->route($uri);
