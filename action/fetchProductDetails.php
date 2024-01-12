<?php
include_once '../_class/query.php';
$obj       = new Query();
$dataArray = [];
$productId = $_GET['id'];
$m         = 0;

// fetching all product details
$fetchProductDetails = $obj->selectData("*", "tbl_product", "where id = $productId");
if (mysqli_num_rows($fetchProductDetails) > 0) {
    $dataRow                         = mysqli_fetch_array($fetchProductDetails);
    $dataArray[$m]['name']           = $dataRow['name'];
    $dataArray[$m]['id']             = $dataRow['id'];
    $dataArray[$m]['price']          = $dataRow['price'];
    $dataArray[$m]['discount_price'] = $dataRow['discount_price'];
    $dataArray[$m]['discription']    = $dataRow['discription'];
    $dataArray[$m]['size']           = $dataRow['size'];

    // fetch product images
    $fetchProductImages = $obj->selectData("file_name", "tbl_product_images", "where product_id = $productId and status != 0");
    if (mysqli_num_rows($fetchProductImages) > 0) {
        $i = 0;
        while ($imageRow = mysqli_fetch_array($fetchProductImages)) {
            $dataArray[$m]['images'][$i] = $imageRow['file_name'];
            $i++;
        }
    }
}
echo json_encode($dataArray);
