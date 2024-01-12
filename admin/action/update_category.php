<?php
require_once '../../_class/query.php';
$obj = new Query();
header('Content-Type: application/json; charset=utf-8');
$data          = json_decode(file_get_contents('php://input'), true);
$category_name = $data['name'];
$id            = $data['id'];

$info = [
    'name'   => $category_name,
    'status' => 1,
];
$update = $obj->updateData("tbl_category", $info, "where id = $id");
if ($update) {
    echo 1;
} else {
    echo 0;
}
