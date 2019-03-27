<?php

require("../functions/functions.php");

$user = affichage_user();

echo json_encode($user);

?>