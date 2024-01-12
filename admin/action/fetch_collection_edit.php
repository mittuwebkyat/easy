<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];
$id        = $_GET['id'];

$collectionData = $obj->selectData("collection_name", "collection", "where collection_id = $id");
if (mysqli_num_rows($collectionData)>0) {
    $dataRow = mysqli_fetch_array($collectionData);
    $dataArray[0]['name'] = $dataRow['collection_name'];
    // fetch collection product
    $collectionProducts = $obj->selectData("product_id", "collection_product", "where collection_id = $id and status != 0");
    if (mysqli_num_rows($collectionProducts)>0) {
        $i = 0;
        while ($dataCollectionRow = mysqli_fetch_array($collectionProducts)) {
            $dataArray[0]['products'][$i]['product_id'] = $dataCollectionRow['product_id'];
            $i++;
        }
    }
}
echo json_encode($dataArray);
