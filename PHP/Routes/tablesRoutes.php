<?php
global $router;
$router->setBasePath($basePath);

$router->get("/", "TableController@index");
