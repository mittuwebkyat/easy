<?php
require_once '../_class/query.php';
$obj = new Query();


$fileName = '';
if (isset($_FILES['file'])) {
    $fileName  = $_FILES['file']['name'];
    $extension = pathinfo($fileName, PATHINFO_EXTENSION);
    $fileName  = time() . "_" . '.' . $extension;
    $path      = "../admin/upload_image/query/" . $fileName;
    move_uploaded_file($_FILES['file']['tmp_name'], $path);
}

$info = [
    'size'            => $_POST['size'],
    'color'           => $_POST['color'],
    'price'           => $_POST['price'],
    'qty'             => $_POST['qty'],
    'product_name'    => $_POST['productName'],
    'name'            => $_POST['name'],
    'building_office' => $_POST['building_office'],
    'street_locality' => $_POST['street_locality'],
    'district'        => $_POST['district'],
    'state'           => $_POST['state'],
    'pincode'         => $_POST['pincode'],
    'contact_name'    => $_POST['contactName'],
    'whatsapp_number' => $_POST['WhatsAppNumber'],
    'line_1'          => $_POST['line1'],
    'line_2'          => $_POST['line2'],
    'line_3'          => $_POST['line3'],
    'file_name'       => $fileName
];

$stmt = $obj->insertData("tbl_query", $info);
echo ($stmt) ? 1 : 0;