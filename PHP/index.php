<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "./vendor/autoload.php";
require "./helpers.php";

use Framework\Router;


//Instantiate router
$router = new Router();

// Get routes
$routes = require "./routes.php";

//Get current uri and http method
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); //exclude the parameters in the uri. Get only the url part.


$router->route($uri);
