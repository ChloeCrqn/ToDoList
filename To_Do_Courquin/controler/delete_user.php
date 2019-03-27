<?php

require("../functions/functions.php");

$id = $_GET['id']; 
supprimer_user_bdd($id);

echo json_encode("Utilisateur supprimé");

?>








