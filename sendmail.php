<?php

$post = $_POST;

$to = "text@gmail.com,";


$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";

if ($post) {
    $subject = 'Отправляем сообщение';
    $message = "Телефон: ".$post['phone']."<br>".
                "Имя: ".$post['name']."<br>".
                "E-mail: ".$post['email'];
    mail($to, $subject, $message, $headers);
}

