<?php
require_once '../../_class/query.php';
$obj = new Query();
header('Content-Type: application/json; charset=utf-8');
$data = json_decode(file_get_contents('php://input'), true);

$collection_name = $data['collectionName'];
$productIds      = $data['productIdArray'];

$info           = [
    'collection_name' => $collection_name,
];
$add_collection = $obj->insertData("collection", $info);
if ($add_collection) {
    /* -------------------- fetch last inserted collection id ------------------- */
    $fetch_last_collection_id = $obj->selectData("collection_id", "collection", "where status != 0 order by collection_id desc limit 1");
    if (mysqli_num_rows($fetch_last_collection_id) > 0) {
        $collection_id_row = mysqli_fetch_array($fetch_last_collection_id);
        $collection_id     = $collection_id_row['collection_id'];
        /* -------------------- insert products under collection -------------------- */
        for ($x = 0; $x < sizeof($productIds); $x++) {
            $product_id              = $productIds[$x];
            $info_product_id         = ['product_id' => $product_id, 'collection_id' => $collection_id];
            $add_products_collection = $obj->insertData("collection_product", $info_product_id);
        }
    }
    echo 1;
}
