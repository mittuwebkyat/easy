<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];

/* ------------ fetching all collection data in collection table ------------ */
$fetch_collection = $obj->selectData("collection_id,collection_name,date", "collection", "where status != 0");
if (mysqli_num_rows($fetch_collection) > 0) {
    $m = 0;
    while ($dataRow = mysqli_fetch_array($fetch_collection)) {
        $collection_id = $dataRow['collection_id'];
        /* --------------- fetch products count under this collection --------------- */
        $fetch_product_count              = $obj->selectData("count(collection_product_id) as product_count", "collection_product", "where collection_id = $collection_id and status != 0");
        $count_row                        = mysqli_fetch_array($fetch_product_count);
        $dataArray[$m]['collection_id']   = $collection_id;
        $dataArray[$m]['collection_name'] = $dataRow['collection_name'];
        $dataArray[$m]['date']            = $dataRow['date'];
        $dataArray[$m]['product_count']   = $count_row['product_count'];
        $m++;
    }
}
echo json_encode($dataArray);
