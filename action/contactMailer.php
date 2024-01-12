<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
require '../smtp/PHPMailerAutoload.php';


$from = 'test@webkyat.com';
$fromName = $_POST['name'];
$to = 'mittu@webkyat.com.com';
$reply = $_POST['email'];



$subject = 'New Enquiry From Website';
// Construct the email body
$body = '<html><body>';
$body .= '<h2>Contact Information</h2>';
$body .= '<table>';
$body .= '<tr><td><strong>Name:</strong></td><td>' . $_POST['name']. '</td></tr>';
$body .= '<tr><td><strong>Phone Number:</strong></td><td>' . $_POST['phone'] . '</td></tr>';
$body .= '<tr><td><strong>Email:</strong></td><td>' . $_POST['email'] . '</td></tr>';
$body .= '<tr><td><strong>Address:</strong></td><td>' . $_POST['address'] . '</td></tr>';
$body .= '<tr><td><strong>Message:</strong></td><td>' . $_POST['message'] . '</td></tr>';
$body .= '</table>';
$body .= '</body></html>';




$mail = new PHPMailer(true);
try {
//    $mail->SMTPDebug = 3;
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->Username = 'test@webkyat.com';
    $mail->Password = 'Test@5656';
    $mail->Port = 465;

    //Recipients
    $mail->setFrom($from, $fromName);
    $mail->addAddress($to);
    $mail->addReplyTo($reply);

    //Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;
    if(!$mail->send()){
        throw new Exception('failed to send');
    }
    echo 'success';
} catch (Exception $e) {
    echo $e->getMessage();
}

