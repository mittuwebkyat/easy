<?php
require_once '../../_class/query.php';
header('Content-Type: application/json; charset=utf-8');
$obj  = new Query();
$data = json_decode(file_get_contents('php://input'), true);

$sub_gallery_id = $data['id'];
$info           = [
    'status' => 0,
];
$delete         = $obj->updateData("tbl_sub_gallery", $info, "where sub_gallery_id = $sub_gallery_id");
echo 1;
