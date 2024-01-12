<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];
$id        = $_GET['id'];

//! fetch all category
$fetch_category = $obj->selectData("name", "tbl_category", "where id = $id and status != 0");
if (mysqli_num_rows($fetch_category) > 0) {
    $m = 0;
    while ($data_row = mysqli_fetch_array($fetch_category)) {
        $dataArray[$m]['name'] = $data_row['name'];
    }
}
echo json_encode($dataArray);
