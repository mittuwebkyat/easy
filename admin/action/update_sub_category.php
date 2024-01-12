<?php
require_once '../../_class/query.php';
$obj         = new Query();
$date        = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
$currentDate = $date->format('d-m-Y');
$currentTime = $date->format('h:i a');
$id          = $_POST['id'];

if (isset($_FILES['image']['name'])) {
    $file_name     = $_FILES['image']['name'];
    $path          = '../upload_image/cateogry/' . $file_name;
    $category_name = $_POST['name'];
    $category_id   = $_POST['category_id'];

    $info   = [
        'name'        => $category_name,
        'category_id' => $category_id,
        'file_name'   => $file_name,
    ];
    $update = $obj->updateData("tbl_sub_category", $info, "where id = $id");
    if ($update) {
        move_uploaded_file($_FILES['image']['tmp_name'], $path);
        echo 1;
    } else {
        echo 0;
    }
} else {
    $category_name = $_POST['name'];
    $category_id   = $_POST['category_id'];

    $info   = [
        'name'        => $category_name,
        'category_id' => $category_id,
    ];
    $update = $obj->updateData("tbl_sub_category", $info, "where id = $id");
    if ($update) {
        echo 1;
    } else {
        echo 0;
    }
}
