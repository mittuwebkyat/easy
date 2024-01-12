<?php
include_once '../_class/query.php';
$obj = new Query();
$dataArray = [];
$i =0;

// fetching last inserted 6 products
$fetchNewProducts = $obj->selectData("id,name,price,discount_price,discription", "tbl_product", "where status != 0 limit 6");
if (mysqli_num_rows($fetchNewProducts)>0) {
    while ($dataRow = mysqli_fetch_array($fetchNewProducts)) {
        $productId = $dataRow['id'];

        // fetch product image
        $fetchProductImage = $obj->selectData("file_name", "tbl_product_images", "where product_id = $productId");
        if (mysqli_num_rows($fetchProductImage)) {
            $productImageRow = mysqli_fetch_array($fetchProductImage);

            $dataArray[$i]['productId'] = $productId;
            $dataArray[$i]['name'] = $dataRow['name'];
            $dataArray[$i]['price'] = $dataRow['price'];
            $dataArray[$i]['discount_price'] = $dataRow['discount_price'];
            $dataArray[$i]['discription'] = $dataRow['discription'];
            $dataArray[$i]['image'] = $productImageRow['file_name'];
        }
        $i++;
    }
}
echo json_encode($dataArray);
