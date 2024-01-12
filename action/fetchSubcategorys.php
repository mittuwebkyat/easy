<?php
include_once '../_class/query.php';
$obj       = new Query();
$dataArray = [];
$id        = $_GET['id'];

if ($id != 0) {
    // fetch all subcategorys
    $fetchAllSubcategorys = $obj->selectData("id,name,file_name", "tbl_sub_category", "where category_id = $id and status != 0");
} else {
    // fetch all subcategorys
    $fetchAllSubcategorys = $obj->selectData("id,name,file_name", "tbl_sub_category", "where status != 0");
}
if (mysqli_num_rows($fetchAllSubcategorys) > 0) {
    $i = 0;
    while ($data = mysqli_fetch_array($fetchAllSubcategorys)) {
        $dataArray[$i]['id']        = $data['id'];
        $dataArray[$i]['name']      = $data['name'];
        $dataArray[$i]['imageName'] = $data['file_name'];
        $i++;
    }
}
echo json_encode($dataArray);
