<?php
global $router;
$router->setBasePath($basePath);
$router->get("/", "UserController@index");
