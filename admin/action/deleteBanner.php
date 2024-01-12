<?php
require_once '../../_class/query.php';
header('Content-Type: application/json; charset=utf-8');
$obj  = new Query();
$data = json_decode(file_get_contents('php://input'), true);

/* ------------------------------- category id ------------------------------ */
$id   = $data['id'];
$info = [
    'status' => 0,
];
/* ---------------------------- deleting category --------------------------- */
$delete_category = $obj->updateData("banner", $info, "where id = $id");
echo 1;
