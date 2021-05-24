<?php
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../classes/materia.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	$resp = listSubjects();
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
