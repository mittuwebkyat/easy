<?php
require_once '../../_class/query.php';
$obj = new Query();

$status = $_POST['status'];
$id     = $_POST['id'];

$info = [
    'status' => $status
];

$stmt = $obj->updateData("tbl_query", $info, "where id = $id");
echo ($stmt) ? 1 : 0;