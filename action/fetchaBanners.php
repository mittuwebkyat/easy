<?php
require_once '../_class/query.php';
$obj       = new Query();
$dataArray = [];

/* ---------------------------- fetch all banners --------------------------- */
$fetchBanner = $obj->selectData("id,image,url", "banner", "where status = 1");
if (mysqli_num_rows($fetchBanner) > 0) {
    $i = 0;
    while ($data = mysqli_fetch_array($fetchBanner)) {
        $dataArray[$i]['id']    = $data['id'];
        $dataArray[$i]['image'] = $data['image'];
        $dataArray[$i]['url']   = $data['url'];
        $i++;
    }
}
echo json_encode($dataArray);
