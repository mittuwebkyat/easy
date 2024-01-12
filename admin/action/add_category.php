<?php
require_once '../../_class/query.php';
$obj = new Query();
header('Content-Type: application/json; charset=utf-8');
$data        = json_decode(file_get_contents('php://input'), true);
$date        = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
$currentDate = $date->format('d-m-Y');
$currentTime = $date->format('h:i a');

$category_name = $data['name'];

$info        = [
    'name'   => $category_name,
    'date'   => $currentDate,
    'time'   => $currentTime,
    'status' => 1,
];
$insert_data = $obj->insertData("tbl_category", $info);
if ($insert_data) {
    echo 1;
} else {
    echo 0;
}
