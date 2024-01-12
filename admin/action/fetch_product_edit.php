<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];
$id        = $_GET['id'];

//! fetch all product
$fetch_all_product = $obj->selectData("*", "tbl_product", "where status != 0 and id = $id");
if (mysqli_num_rows($fetch_all_product) > 0) {
    $m = 0;
    while ($data_row = mysqli_fetch_array($fetch_all_product)) {
        $product_id                      = $data_row['id'];
        $dataArray[$m]['id']             = $product_id;
        $dataArray[$m]['sub_cat_id']     = $data_row['sub_cat_id'];
        $dataArray[$m]['name']           = $data_row['name'];
        $dataArray[$m]['price']          = $data_row['price'];
        $dataArray[$m]['discount_price'] = $data_row['discount_price'];
        $dataArray[$m]['weight']         = $data_row['weight'];
        $dataArray[$m]['discription']    = $data_row['discription'];
        $dataArray[$m]['size']           = $data_row['size'];
        $fetch_product_images            = $obj->selectData("id,file_name", "tbl_product_images", "where product_id = $product_id and status != 0");
        if (mysqli_num_rows($fetch_product_images) > 0) {
            $n = 0;
            while ($image_row = mysqli_fetch_array($fetch_product_images)) {
                $dataArray[$m]['images'][$n]['name'] = $image_row['file_name'];
                $dataArray[$m]['images'][$n]['id']   = $image_row['id'];
                $n++;
            }
        }
        $m++;
    }
}
echo json_encode($dataArray);
