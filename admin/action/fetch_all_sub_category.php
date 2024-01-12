<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];

//! fetch all sub category
$fetch_sub_category = $obj->selectData("*", "tbl_sub_category", "where status != 0");
if (mysqli_num_rows($fetch_sub_category) > 0) {
    $m = 0;
    while ($data_row = mysqli_fetch_array($fetch_sub_category)) {
        $dataArray[$m]['id']        = $data_row['id'];
        $dataArray[$m]['name']      = $data_row['name'];
        $dataArray[$m]['file_name'] = $data_row['file_name'];
        $dataArray[$m]['date']      = $data_row['date'];
        $dataArray[$m]['time']      = $data_row['time'];
        $m++;
    }
}
echo json_encode($dataArray);
