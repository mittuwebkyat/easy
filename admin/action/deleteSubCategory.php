<?php
require_once '../../_class/query.php';
header('Content-Type: application/json; charset=utf-8');
$obj  = new Query();
$data = json_decode(file_get_contents('php://input'), true);

/* -------------------------------sub category id ------------------------------ */
$id   = $data['id'];
$info = [
    'status' => 0,
];
/* ---------------- deleting sub category --------------- */
$delete_sub_category = $obj->updateData("tbl_sub_category", $info, "where id = $id");
/* ------------------- deleting products under subcategory ------------------ */
$delete_products = $obj->updateData("tbl_product", $info, "where sub_cat_id = $id");
/* -------------------- fetching all deleted products id -------------------- */
$fetch_all_deleted_product_id = $obj->selectData("id", "tbl_product", "where status =0");
if (mysqli_num_rows($fetch_all_deleted_product_id) > 0) {
    while ($dataIdRow = mysqli_fetch_array($fetch_all_deleted_product_id)) {
        $pro_id = $dataIdRow['id'];
        /* ------------------- deleting all deleted product images ------------------ */
        $delete_products_images = $obj->updateData("tbl_product_images", $info, "where product_id = $pro_id");
        /* ------------- deleting all deleted products from collections ------------- */
        $delete_products_collection = $obj->updateData("collection_product", $info, "where product_id = $pro_id");
    }
}
echo 1;
