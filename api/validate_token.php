<?php

// Заголовки
header("Access-Control-Allow-Origin: http://KR/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// Требуется для декодирования JWT
require_once 'libs/vendor/autoload.php';
include_once "config/core.php";
include_once "libs/vendor/firebase/php-jwt/src/BeforeValidException.php";
include_once "libs/vendor/firebase/php-jwt/src/ExpiredException.php";
include_once "libs/vendor/firebase/php-jwt/src/SignatureInvalidException.php";
include_once "libs/vendor/firebase/php-jwt/src/JWT.php";
include_once "libs/vendor/firebase/php-jwt/src/Key.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key; 
 
// Получаем значение веб-токена JSON
$data = json_decode(file_get_contents("php://input"));

// Получаем JWT
$jwt = isset($data->jwt) ? $data->jwt : "";

// Если JWT не пуст
if ($jwt) {
 
    // Если декодирование выполнено успешно, показать данные пользователя
    try {

        // Декодирование jwt
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
 
        // Код ответа
        http_response_code(200);
 
        // Покажем детали
        echo json_encode(array(
            "message" => "Доступ разрешен",
            "data" => $decoded->data
        ));
    }
 
    // Если декодирование не удалось, это означает, что JWT является недействительным
    catch (Exception $e) {
    
        // Код ответа
        http_response_code(401);
    
        // Сообщим пользователю что ему отказано в доступе и покажем сообщение об ошибке
        echo json_encode(array(
            "message" => "Вам доступ закрыт",
            "error" => $e->getMessage()
        ));
    }
}
 
// Покажем сообщение об ошибке, если JWT пуст
else {
 
    // Код ответа
    http_response_code(401);
 
    // Сообщим пользователю что доступ запрещен
    echo json_encode(array("message" => "Доступ запрещён"));
}