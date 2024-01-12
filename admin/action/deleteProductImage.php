<?php
require_once '../../_class/query.php';
$obj    = new query();
$id     = $_GET['id'];
$info   = ['status' => 0,];
$delete = $obj->updateData("tbl_product_images", $info, "where id = $id");
if ($delete) {
    echo 1;
}
