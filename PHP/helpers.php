<?php

/**
 * Inspect any value
 * 
 * @param mixed $value
 * @return void
 */
function inspect($value)
{
    echo "<pre>";
    var_dump($value);
    echo "</pre>";
}


/**
 * Inspect any value and die
 * 
 * @param mixed $value
 * @return void
 */
function inspectAndDie($value)
{
    echo "<pre>";
    var_dump($value);
    echo "</pre>";
    die();
}

/**
 * Redirect to given url
 * 
 * @param string $url
 * 
 * @return void
 */
function redirect($url)
{
    header("Location: {$url}");
    exit;
};

function useRoutes($fileName, $basePath = "")
{
    $filePath = __DIR__ . "/Routes/" . $fileName . ".php";
    if (file_exists($filePath)) {
        extract(["basePath" => $basePath]);
        require $filePath;
    } else {
        echo "File named " . $fileName . "doesn't exists.";
    }
}



/*
 * Return Json with http response code, Returns internal server error in no parameters provided.
 * 
 * @param $success: Boolean
 * @param $data: Object or Array
 */
function returnJsonHttpResponse($httpCode = 500, $data = "An unkown error occured")
{
    // remove any string that could create an invalid JSON 
    // such as PHP Notice, Warning, logs...
    ob_start();
    ob_clean();

    // this will clean up any previously added headers, to start clean
    header_remove();

    // Set the content type to JSON and charset 
    // (charset can be set to something else)
    // add any other header you may need, gzip, auth...
    header("Content-type: application/json");

    // Set your HTTP response code, refer to HTTP documentation
    http_response_code($httpCode);


    // encode your PHP Object or Array into a JSON string.
    // stdClass or array

    if (($httpCode >= 200 && $httpCode <= 299)) {
        echo json_encode($data);
    } else {
        echo json_encode(["error" => $data]);
    }


    // making sure nothing is added
    exit;
}
