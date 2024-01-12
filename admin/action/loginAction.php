<?php
session_start();
require_once '../../_class/query.php';
$obj = new query();
header('Content-Type: application/json; charset=utf-8');
$data     = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = md5($data['password']);

//! check username and password is valid
$checkLoginData = $obj->selectData("login_id", "tbl_login", "where username = '$username' and password = '$password'");
if (mysqli_num_rows($checkLoginData) > 0) {
    $loginDataRow        = mysqli_fetch_array($checkLoginData);
    $_SESSION['loginId'] = $loginDataRow['login_id'];
    echo 1;
} else {
    echo 0;
}
