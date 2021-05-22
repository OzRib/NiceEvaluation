<?php
require_once(__DIR__.'/../classes/usuarios.php');

$resp = ['deleted'=>false];

try{
	session_start();

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');
	if($_SESSION['admin'] != true)
		throw new Exception('Usuário não é administrador');

	if(empty($_POST['email']))
		throw new Exception('Email vazio');
	
	$email = $_POST['email'];

	$adm = $_SESSION['usuario'];
	
	if($adm->mostraDados()['email']==$email)
		throw new Exception('Você não pode se excluir');

	$removed = $adm->removerUsuario($email);

	if(!$removed)
		throw new Exception('Usuário não foi removido');

	$resp['deleted'] = true;
}catch(Exception $e){
	$resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>
