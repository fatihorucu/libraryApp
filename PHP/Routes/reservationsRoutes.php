<?php
global $router;
$router->setBasePath($basePath);

$router->get("/", "ReservationController@index");
$router->get("/currents", "ReservationController@getCurrentReservations");

$router->post("/", "ReservationController@store");
$router->patch("/{reservationId}", "ReservationController@update");
