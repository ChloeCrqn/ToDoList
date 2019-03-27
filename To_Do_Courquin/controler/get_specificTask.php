<?php
 $id = $_GET['id'];
 require("../functions/functions.php");



$message = affichage_specifique($id);



echo json_encode($message);

?>



