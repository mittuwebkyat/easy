<?php
include_once '../_class/query.php';
$obj = new Query();
$dataArray = [];

$fetchAllcategorys = $obj->selectData("id,name", "tbl_category", "where status != 0");
if (mysqli_num_rows($fetchAllcategorys)>0) {
    $i = 0;
    while ($data = mysqli_fetch_array($fetchAllcategorys)) {
        $dataArray[$i]['id'] = $data['id'];
        $dataArray[$i]['name'] = $data['name'];
        $i++;
    }
}
echo json_encode($dataArray);
