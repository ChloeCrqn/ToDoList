<?php 

function insertion_bdd($message) {
require("../database/init.php");

$req = $bdd->prepare('INSERT INTO activities(name) VALUES(:name)');

$req->execute(array(
	'name' => $message


	));

}

function affichage_bdd(){
require("../database/init.php");
$req = $bdd->prepare('SELECT * from activities');

$req->execute();

$req = $req->fetchAll();

return $req;

}

function supprimer_bdd($id){
	require("../database/init.php");
	$req = $bdd->prepare('DELETE  FROM activities WHERE id=:id');

	$req->execute(array(
		'id' => $id
	));
}

function affichage_specifique($id){
	require("../database/init.php");

	$req = $bdd->prepare('SELECT id,name FROM activities WHERE id=:id');

	$req->execute(array(
		'id' => $id
	));

	$req = $req->fetchAll();

	return $req;

}

function maj_bdd($id,$message){
	require("../database/init.php");

	$req = $bdd->prepare('UPDATE activities SET name =:name WHERE id =:id');

	$req->execute(array(
		'id' => $id,
		'name' => $message
	));
}

function affichage_user(){
	require("../database/init.php");

	$req = $bdd->prepare('SELECT * FROM utilisateurs');

	$req->execute();

	$return = $req->fetchAll();

	return $return;
}

function insertion_user_bdd($id,$user){
	require("../database/init.php");

	$req = $bdd->prepare('UPDATE activities SET user =:user WHERE id =:id');

	$req->execute(array(
		'id' => $id,
		'user' => $user
	));
}

function supprimer_user_bdd($id){
	require("../database/init.php");
	$req = $bdd->prepare('DELETE  FROM utilisateurs WHERE id=:id');

	$req->execute(array(
		'id' => $id
	));
}

function affichage_user_specifique($id){
	require("../database/init.php");

	$req = $bdd->prepare('SELECT id,nom FROM utilisateurs WHERE id=:id');

	$req->execute(array(
		'id' => $id
	));

	$req = $req->fetchAll();

	return $req;

}
function maj_user_bdd($id,$user){
	require("../database/init.php");

	$req = $bdd->prepare('UPDATE utilisateurs SET nom =:name WHERE id =:id');

	$req->execute(array(
		'id' => $id,
		'name' => $user
	));
}
