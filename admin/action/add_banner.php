<?php
require_once '../../_class/query.php';
$obj = new Query();

if (isset($_FILES['banner']['name'])) {
    $bannerImageName = $_FILES['banner']['name'];
    $extension       = pathinfo($bannerImageName, PATHINFO_EXTENSION);
    $randomName      = time() . "_" . '.' . $extension;
    $path            = "../upload_image/banner/" . $randomName;
    $info            = ['image' => $randomName, 'url' => $_POST['url']];
    $insert          = $obj->insertData("banner", $info);
    if ($insert) {
        move_uploaded_file($_FILES['banner']['tmp_name'], $path);
        echo 1;
    }
} else {
    echo "image not selected";
}
