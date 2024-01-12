<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];

//! fetch all category
$fetch_category = $obj->selectData("*", "tbl_category", "where status != 0");
if (mysqli_num_rows($fetch_category) > 0) {
    $m = 0;
    while ($data_row = mysqli_fetch_array($fetch_category)) {
        $dataArray[$m]['id']   = $data_row['id'];
        $dataArray[$m]['name'] = $data_row['name'];
        $dataArray[$m]['date'] = $data_row['date'];
        $dataArray[$m]['time'] = $data_row['time'];
        $m++;
    }
}
echo json_encode($dataArray);
