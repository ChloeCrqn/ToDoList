<?php

require("../functions/functions.php");
if(isset($_GET['message'])){

$message = $_GET['message'];

insertion_bdd($message);

echo json_encode($message);

}
?>