<?php
global $router;
$router->setBasePath($basePath);

$router->get("/", "UserController@index");
$router->get("/getAuthenticatedUser", "UserController@getAuthenticatedUser");

// $router->get("/auth/login", "UserController@login", ["guest"]);
// $router->get("/auth/register", "UserController@create", ["guest"]);

$router->post("/register", "UserController@store");
$router->post("/logout", "UserController@logout"/* , ["auth"] */);
$router->post("/login", "UserController@authenticate");



$router->put("/put", "UserController@put");

$router->delete("/delete", "UserController@delete");
