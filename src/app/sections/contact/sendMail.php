<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: text/plain; charset=utf-8");

        $json   = file_get_contents('php://input');
        $params = json_decode($json);

        $email   = $params->email ?? '';
        $name    = $params->name ?? '';
        $message = $params->message ?? '';

        $recipient = 'rapp.dominik@hotmail.com';
        $subject   = "Contact From <{$email}>";

        $mailBody  = "From: " . htmlspecialchars($name) . " ({$email})<br><br>";
        $mailBody .= nl2br(htmlspecialchars($message));

        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: Portfolio Kontakt <noreply@dominik-rapp.at>';
        $headers[] = "Reply-To: {$email}";

        $success = mail($recipient, $subject, $mailBody, implode("\r\n", $headers));

        echo $success ? 'OK' : 'ERROR';
        break;

    default:
        header("Allow: POST, OPTIONS", true, 405);
        exit;
}
