<?php
session_start();
$responseArray = [];
if (isset($_SESSION['loginId'])) {
    $responseArray[0]['info'] = 'true';
} else {
    $responseArray[0]['info'] = 'false';
}
echo json_encode($responseArray);
