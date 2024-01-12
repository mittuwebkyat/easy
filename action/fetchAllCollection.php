<?php
include_once '../_class/query.php';
$obj = new Query();
$dataArray = [];
$i = 0;

// fetching all collections
$fetchCollections = $obj->selectData("collection_id,collection_name,date", "collection", "where status != 0");
if (mysqli_num_rows($fetchCollections) > 0) {
    while ($collectionDataRow = mysqli_fetch_array($fetchCollections)) {
        $collectionId = $collectionDataRow['collection_id'];

        $dataArray[$i]['collection_id'] = $collectionDataRow['collection_id'];
        $dataArray[$i]['collection_name'] = $collectionDataRow['collection_name'];
        $dataArray[$i]['addedDate'] = $collectionDataRow['date'];

        // $dataArray[] = [
        //     'collection_id' => $collectionDataRow['collection_id'],
        //     'collection_name' => $collectionDataRow['collection_name'],
        //     'addedDate' => $collectionDataRow['date'],
        // ];

        // fetch all collection products
        $fetchCollectionProducts = $obj->selectData("collection_product_id,product_id", "collection_product", "where collection_id = $collectionId and status != 0");
        if (mysqli_num_rows($fetchCollectionProducts) > 0) {
            $n = 0;
            while ($collectionProductRow = mysqli_fetch_array($fetchCollectionProducts)) {
                $productId = $collectionProductRow['product_id'];

                // fetch product details
                $fetchProductData = $obj->selectData("name,price,discount_price,discription", "tbl_product", "where id = $productId and status != 0");
                if (mysqli_num_rows($fetchProductData) > 0) {
                    $productDataRow = mysqli_fetch_array($fetchProductData);

                    // fetch product image for collection slider
                    $fetchProductImage = $obj->selectData("file_name", "tbl_product_images", "where product_id = $productId and status != 0 limit 1");
                    if (mysqli_num_rows($fetchProductImage) > 0) {
                        $productImageRow = mysqli_fetch_array($fetchProductImage);

                        $dataArray[$i]['products'][$n]['productId'] = $productId;
                        $dataArray[$i]['products'][$n]['productName'] = $productDataRow['name'];
                        $dataArray[$i]['products'][$n]['productPrice'] = $productDataRow['price'];
                        $dataArray[$i]['products'][$n]['discountPrice'] = $productDataRow['discount_price'];
                        $dataArray[$i]['products'][$n]['discription'] = $productDataRow['discription'];
                        $dataArray[$i]['products'][$n]['productImage'] = $productImageRow['file_name'];

                        // $dataArray[]['products'][] = [
                        //     'productId' => $productId,
                        //     'productName' => $productDataRow['name'],
                        //     'productPrice' => $productDataRow['price'],
                        //     'discountPrice' => $productDataRow['discount_price'],
                        //     'discription' => $productDataRow['discription'],
                        //     'productImage' => $productImageRow['file_name'],
                        // ];
                    }
                }
                $n++;
            }
        }
        $i++;
    }
}

echo json_encode($dataArray);
