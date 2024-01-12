<?php
require_once '../../_class/query.php';
$obj         = new Query();
$date        = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
$currentDate = $date->format('d-m-Y');
$currentTime = $date->format('h:i a');

if (isset($_FILES['image']['name'])) {

    $file_name     = $_FILES['image']['name'];
    $path          = '../upload_image/cateogry/' . $file_name;
    $category_name = $_POST['name'];
    $category_id   = $_POST['category_id'];

    $info        = [
        'name'        => $category_name,
        'category_id' => $category_id,
        'file_name'   => $file_name,
        'date'        => $currentDate,
        'time'        => $currentTime,
        'status'      => 1,
    ];
    $insert_data = $obj->insertData("tbl_sub_category", $info);
    if ($insert_data) {
        move_uploaded_file($_FILES['image']['tmp_name'], $path);
        echo 1;
    } else {
        echo 0;
    }
}
