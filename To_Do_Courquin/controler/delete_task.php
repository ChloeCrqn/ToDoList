<?php

require("../functions/functions.php");

if(isset($_GET['id'])){

$id = $_GET['id']; 
supprimer_bdd($id);

echo json_encode("Tache supprimée");

}else{

 echo json_encode("Erreur");
}





?>








