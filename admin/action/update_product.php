<?php
require_once '../../_class/query.php';
$obj         = new Query();
$date        = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
$currentDate = $date->format('d-m-Y');
$currentTime = $date->format('h:i a');
$path        = '../upload_image/products/';
$id          = $_POST['id'];

//! update product data
$info_product = [
    'sub_cat_id'     => filter_input(INPUT_POST, 'sub_category_id', FILTER_SANITIZE_NUMBER_INT),
    'name'           => filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS),
    'price'          => filter_input(INPUT_POST, 'price', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION),
    'discount_price' => filter_input(INPUT_POST, 'discount_price', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION),
    'weight'         => filter_input(INPUT_POST, 'weight', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION),
    'discription'    => filter_input(INPUT_POST, 'discription', FILTER_SANITIZE_SPECIAL_CHARS),
    'size'           => filter_input(INPUT_POST, 'size', FILTER_SANITIZE_SPECIAL_CHARS),
];

$update = $obj->updateData("tbl_product", $info_product, "where id = $id");
if ($update) {
    $count = 0;
    if (isset($_FILES['image']['name'])) {
        for ($x = 0; $x < sizeof($_FILES['image']['name']); $x++) {
            $file_name          = $_FILES['image']['name'][$x];
            $extension          = pathinfo($file_name, PATHINFO_EXTENSION);
            $randomFileName     = uniqid('file_') . '.' . $extension;
            $info_product_image = [
                'product_id' => $id,
                'file_name'  => $randomFileName,
                'status'     => 1,
            ];
            $insert_image       = $obj->insertData("tbl_product_images", $info_product_image);
            if ($insert_image) {
                $count++;
                move_uploaded_file($_FILES['image']['tmp_name'][$x], $path . $randomFileName);
            }
        }
        if (sizeof($_FILES['image']['name']) == $count) {
            echo 1;
        } else {
            echo 0;
        }
    } else {
        echo 1;
    }
}
