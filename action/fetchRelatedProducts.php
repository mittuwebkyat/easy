<?php
include_once '../_class/query.php';
$obj = new Query();
$dataArray = [];
$productId = $_GET['id'];

$fetchproductSubcatId = $obj->selectData("sub_cat_id", "tbl_product", "where id = $productId");
if (mysqli_num_rows($fetchproductSubcatId)>0) {
    $subIdRow = mysqli_fetch_array($fetchproductSubcatId);
    $subId = $subIdRow['sub_cat_id'];
    $fetchRelatedProducts = $obj->selectData("id,name,price,discount_price", "tbl_product", "where sub_cat_id = $subId and id != $productId and status != 0");
    if (mysqli_num_rows($fetchRelatedProducts)>0) {
        $i = 0;
        while ($dataRow = mysqli_fetch_array($fetchRelatedProducts)) {
            $relatedProductId = $dataRow['id'];

            $dataArray[$i]['name'] = $dataRow['name'];
            $dataArray[$i]['price'] = $dataRow['price'];
            $dataArray[$i]['id'] = $dataRow['id'];
            $dataArray[$i]['discount_price'] = $dataRow['discount_price'];
            // fetch related product image
            $fetchRelatedProductImages = $obj->selectData("file_name", "tbl_product_images", "where product_id= $relatedProductId and status != 0 limit 1");
            if (mysqli_num_rows($fetchRelatedProductImages)>0) {
                $m = 0;
                while ($imageRow = mysqli_fetch_array($fetchRelatedProductImages)) {
                    $dataArray[$i]['image'] = $imageRow['file_name'];
                    $m++;
                }
            }
            $i++;
        }
    }
}
echo json_encode($dataArray);
