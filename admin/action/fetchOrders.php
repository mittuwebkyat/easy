<?php
require_once '../../_class/query.php';
$obj       = new Query();
$dataArray = [];

$stmt = $obj->selectData("*", "tbl_query", "");
echo json_encode(($stmt->num_rows > 0) ? $stmt->fetch_all(MYSQLI_ASSOC) : []);

