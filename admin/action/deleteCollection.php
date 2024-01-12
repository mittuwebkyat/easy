<?php
require_once '../../_class/query.php';
header('Content-Type: application/json; charset=utf-8');
$obj  = new Query();
$data = json_decode(file_get_contents('php://input'), true);

/* -------------------------------collection id ------------------------------ */
$id                = $data['id'];
$info              = [
    'status' => 0,
];
$delete_collection = $obj->updateData("collection", $info, "where collection_id = $id");
/* ------------- deleting all collections products------------- */
$delete_products_collection = $obj->updateData("collection_product", $info, "where collection_id = $id");
echo 1;
