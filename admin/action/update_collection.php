<?php
require_once '../../_class/query.php';
$obj = new Query();
header('Content-Type: application/json; charset=utf-8');
$data = json_decode(file_get_contents('php://input'), true);

$collection_name = $data['collectionName'];
$productIds      = $data['productIdArray'];
$id = $data['id'];

$info = [
    'collection_name' => $collection_name,
];
$update_collection = $obj->updateData("collection", $info, "where collection_id = $id");
if ($update_collection) {
    // delete all old products
    $delete = ['status' => 0];
    $deleteProduct = $obj->updateData("collection_product", $delete, "where collection_id = $id");

    /* -------------------- insert products under collection -------------------- */
    for ($x = 0; $x < sizeof($productIds); $x++) {
        $product_id              = $productIds[$x];
        $info_product_id         = ['product_id' => $product_id, 'collection_id' => $id];
        $add_products_collection = $obj->insertData("collection_product", $info_product_id);
    }
    echo 1;
}
