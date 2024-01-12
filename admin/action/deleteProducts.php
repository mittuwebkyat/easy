<?php
require_once '../../_class/query.php';
header('Content-Type: application/json; charset=utf-8');
$obj  = new Query();
$data = json_decode(file_get_contents('php://input'), true);

/* -------------------------------product id ------------------------------ */
$id   = $data['id'];
$info = [
    'status' => 0,
];
/* ------------------- deleting products under subcategory ------------------ */
$delete_products = $obj->updateData("tbl_product", $info, "where id = $id");
/* ------------------- deleting all deleted product images ------------------ */
$delete_products_images = $obj->updateData("tbl_product_images", $info, "where product_id = $id");
/* ------------- deleting all deleted products from collections ------------- */
$delete_products_collection = $obj->updateData("collection_product", $info, "where product_id = $id");
echo 1;
