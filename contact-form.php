<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail'])&& isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) ||empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->IsSMTP();                           // telling the class to use SMTP
    $mail->SMTPAuth   = true;  
    $mailer->Port = 587; //Indica a porta de conexão para a saída de e-mails
    $mailer->Host = 'mail.gabrielvalle.com.br';//Endereço do Host do SMTP Locaweb
    $mailer->SMTPAuth = true; //define se haverá ou não autenticação no SMTP
    $mail->Username = 'contato@gabrielvalle.com.br';
    $mail->Password = 'biL20206510rc';
    $mail->From = 'contato@gabrielvalle.com.br';
    $mail->FromName = $_POST['inputName'];
    $mail->AddAddress('contato@gabrielvalle.com.br'); //recipient 
    $mail->Subject = 'Mensagem do site';
    $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nEmail: " . $_POST['inputEmail'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}