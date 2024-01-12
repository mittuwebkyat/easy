<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];

//! fetch all product
$fetch_all_product = $obj->selectData("*", "tbl_product", "where status != 0");
if (mysqli_num_rows($fetch_all_product) > 0) {
    $m = 0;
    while ($data_row = mysqli_fetch_array($fetch_all_product)) {
        $dataArray[$m]['id']          = $data_row['id'];
        $dataArray[$m]['name']        = $data_row['name'];
        $dataArray[$m]['price']       = $data_row['price'];
        $dataArray[$m]['discription'] = $data_row['discription'];
        $dataArray[$m]['date']        = $data_row['date'];
        $dataArray[$m]['time']        = $data_row['time'];
        $m++;
    }
}
echo json_encode($dataArray);
