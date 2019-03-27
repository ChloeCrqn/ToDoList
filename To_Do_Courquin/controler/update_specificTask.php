<?php

require("../functions/functions.php");
if(isset($_GET['message'])){

$message = $_GET['message'];
$id = $_GET['id'];

maj_bdd($id,$message);

echo json_encode($message);

}
?>