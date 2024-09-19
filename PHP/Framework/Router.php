<?php

namespace Framework;


class Router
{
    protected $routes = [];
    protected $basePath;

    public function setBasePath($basePath)
    {
        $this->basePath = $basePath;
    }

    public function getBasePath()
    {
        return $this->basePath;
    }
    /**
     * Append a route with its method
     * 
     * @param string $method
     * @param string $uri
     * @param string $action
     * @param mixed $middleware
     * 
     * @return void
     */
    private function registerRoute($method, $uri, $action, $middleware)
    {
        list($controller, $controllerMethod) = explode("@", $action); // explode () seperates the action, which is a string, into a list.. And list() function destructures the array into variables.

        $this->routes[] = [
            "method" => $method,
            "uri" => ($this->basePath ? $this->basePath : "") . $uri,
            "controller" => $controller,
            "controllerMethod" => $controllerMethod,
            "middleware" => $middleware,
        ];
    }



    /**
     * Add a GET route
     * 
     * @param string $uri
     * @param string $controller
     */
    public function get($uri, $controller, $middleware = [])
    {
        $this->registerRoute("GET", $uri, $controller, $middleware);
    }

    /**
     * Add a POST Route
     * 
     * @param string $uri
     * @param string $controller
     */
    public function post($uri, $controller, $middleware = [])
    {
        $this->registerRoute("POST", $uri, $controller, $middleware);
    }

    /**
     * Add a PUT route
     * 
     * @param string $uri
     * @param string $controller
     */
    public function put($uri, $controller, $middleware = [])
    {
        $this->registerRoute("PUT", $uri, $controller, $middleware);
    }

    /**
     * Add a PATCH route
     * 
     * @param string $uri
     * @param string $controller
     */
    public function patch($uri, $controller, $middleware = [])
    {
        $this->registerRoute("PATCH", $uri, $controller, $middleware);
    }
    /**
     * Add a DELETE route
     * 
     * @param string $uri
     * @param string $controller
     */
    public function delete($uri, $controller, $middleware = [])
    {
        $this->registerRoute("DELETE", $uri, $controller, $middleware);
    }
    /**
     * Route the request
     * 
     * @param string $uri
     * 
     * @return void
     */
    public function route($uri)
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        /* if ($requestMethod === 'POST' && isset($_POST['_method'])) {
            // Override the request method with the value of _method
            $requestMethod = strtoupper($_POST['_method']);
        } */
        foreach ($this->routes as $route) {

            //Split the current URI into segments

            $uriSegments = explode("/", trim($uri, "/"));
            $routeSegments = explode("/", trim($route["uri"], "/"));

            $match = true;

            //Check if the number of segments and method matches
            if (count($uriSegments) === count($routeSegments) && strtoupper($route["method"]) === $requestMethod) {
                $params = []; // We are going to put the segments that is given as parameter.
                $match = true;
                for ($i = 0; $i < count($uriSegments); $i++) {
                    //Check if the segments doesn't match and has no brackets in
                    if ($routeSegments[$i] !== $uriSegments[$i] && !preg_match('/\{(.+?)\}/', $routeSegments[$i])) {
                        $match = false;
                        break;
                    }

                    //Check if there is brackets, if true take the string inside as a key and assign corresponding value in uri as a value to $params array.
                    if (preg_match('/\{(.+?)\}/', $routeSegments[$i], $matches)) {
                        $params[$matches[1]] = $uriSegments[$i];
                    }
                }
                if ($match) {
                    /* foreach ($route['middleware'] as $role) {
                        (new Authorize())->handle($role);
                    } */


                    //Extract controller and controller method.
                    $controller = "App\\Controllers\\" . $route["controller"];
                    $controllerMethod = $route["controllerMethod"];
                    /* inspect($controller);
                inspectAndDie($controllerMethod); */

                    // Instantiate the controller and call the method.

                    $controllerInstance = new $controller();
                    $controllerInstance->$controllerMethod($params);
                    return;
                }
            }
        }
        returnJsonHttpResponse(404, ["error" => "Resource not found."]);
    } // We can handle this routing function in seperate functions that we have created, which is get, post, put, delete
}
