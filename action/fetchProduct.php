<?php
include_once '../_class/query.php';
$obj = new Query();
$dataArray = [];
$categoryId = $_GET['cat'];
$price = $_GET['amount'];
$mainCategoryId = 0;
if (isset($_GET['category'])) {
    $mainCategoryId = $_GET['category'];
}
/* --------------------------------- filter --------------------------------- */
$where = "where ";
/* ------------------------------ price filter ----------------------------- */
if ($price != 0) {
    if ($price != 400) {
        $splitPrice = explode('-', $price);
        $startPrice = $splitPrice[0];
        $endPrice = $splitPrice[1];

        if ($where == "where ") {
            $where .= " price between " . $startPrice . " and " . $endPrice;
        } else {
            $where .= " and price between " . $startPrice . " and " . $endPrice;
        }
    } else {
        if ($where == "where ") {
            $where .= " price  >= " . $price;
        } else {
            $where .= " and price  >= " . $price;
        }
    }
}
/* ------------------ filter fetch products under category ------------------ */
if ($where == "where ") {
    if ($categoryId != 0) {
        $where .= " sub_cat_id = " . $categoryId;
    }
} else {
    if ($categoryId != 0) {
        $where .= " and sub_cat_id = " . $categoryId;
    }
}

if ($mainCategoryId != 0) {
    if ($where != "where ") {
        $where .= " and category_id = $mainCategoryId";
    } else {
        $where .= "category_id = $mainCategoryId";
    }
}

if ($where == "where ") {
    $where .= " status != 0";
} else {
    $where .= " and status != 0";
}

$fetchProducts = $obj->selectData("id,name,price,discount_price,discription", "tbl_product", $where);
if (mysqli_num_rows($fetchProducts) > 0) {
    $i = 0;
    /* ----------------------- fetching main category name ---------------------- */
    $fetchMainCategoryName = $obj->selectData("name", "tbl_category", "where id = $mainCategoryId");
    if (mysqli_num_rows($fetchMainCategoryName) > 0) {
        $mainCatNameRow = mysqli_fetch_array($fetchMainCategoryName);
        $dataArray[0]['categoryName'] = ucfirst($mainCatNameRow['name']);
    }
    while ($dataRow = mysqli_fetch_array($fetchProducts)) {
        $productId = $dataRow['id'];

        // fetch product image
        $fetchProductImage = $obj->selectData("file_name", "tbl_product_images", "where product_id = $productId and status != 0");
        if (mysqli_num_rows($fetchProductImage)) {
            $productImageRow = mysqli_fetch_array($fetchProductImage);

            $dataArray[$i]['id'] = $dataRow['id'];
            $dataArray[$i]['name'] = $dataRow['name'];
            $dataArray[$i]['price'] = $dataRow['price'];
            $dataArray[$i]['discount_price'] = $dataRow['discount_price'];
            $dataArray[$i]['discription'] = $dataRow['discription'];
            $dataArray[$i]['image'] = $productImageRow['file_name'];
            $i++;
        }
    }
}
echo json_encode($dataArray);
