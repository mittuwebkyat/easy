<?php
require_once '../../_class/query.php';
$obj = new Query();

$status = $_POST['status'];
$id     = $_POST['id'];

$stmt = $obj->updateData("tbl_query", "status = $status", "where id = $id");
echo ($stmt) ? 1 : 0;