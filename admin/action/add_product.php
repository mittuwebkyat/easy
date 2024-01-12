<?php
require_once '../../_class/query.php';
$obj         = new Query();
$date        = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
$currentDate = $date->format('d-m-Y');
$currentTime = $date->format('h:i a');
$path        = '../upload_image/products/';

// fetch main category
$fetchMainCategory = $obj->selectData("category_id", "tbl_sub_category", "where id =" . $_POST['sub_category_id']);
if (mysqli_num_rows($fetchMainCategory)) {
    $mainCategoryIdRow = mysqli_fetch_array($fetchMainCategory);
    $maincatId         = $mainCategoryIdRow['category_id'];

    //! insert product data
    $info_product = [
        'category_id'    => $maincatId,
        'sub_cat_id'     => $_POST['sub_category_id'],
        'name'           => $_POST['name'],
        'price'          => $_POST['price'],
        'discount_price' => $_POST['discount_price'],
        'weight'         => $_POST['product_weight'],
        'size'           => $_POST['size'],
        'discription'    => $_POST['discription'],
        'date'           => $currentDate,
        'time'           => $currentTime,
        'status'         => 1
    ];
    $insert       = $obj->insertData("tbl_product", $info_product);

    if ($insert) {
        $count = 0;

        $fetch_product_id = $obj->selectData("id", "tbl_product", "where status != 0 order by id desc limit 1");
        if (mysqli_num_rows($fetch_product_id) > 0) {
            $product_id_row = mysqli_fetch_array($fetch_product_id);
            $product_id     = $product_id_row['id'];

            if (isset($_FILES['image']['name'])) {
                for ($x = 0; $x < sizeof($_FILES['image']['name']); $x++) {
                    $file_name          = $_FILES['image']['name'][$x];
                    $info_product_image = [
                        'product_id' => $product_id,
                        'file_name'  => $file_name,
                        'status'     => 1,
                    ];
                    $insert_image       = $obj->insertData("tbl_product_images", $info_product_image);
                    if ($insert_image) {
                        $count++;
                        move_uploaded_file($_FILES['image']['tmp_name'][$x], $path . $file_name);
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
    }
}
