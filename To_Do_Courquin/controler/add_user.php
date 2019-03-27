<?php

require("../functions/functions.php");
if(isset($_GET['user'])){

$message = $_GET['user'];
$id = $_GET['id'];
maj_user_bdd($id, $message);

echo json_encode("succes");

}
?>