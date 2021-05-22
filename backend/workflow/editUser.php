<?php
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../utilities/confirmations.php');

$resp = ['edited'=>false];

try{
	$requirements = [
		'nome'=>'"Nome completo"',
		'nomeUsuario'=>'"Nome de usuário"',
	       	'email'=>'"Email"'
	];

	foreach($requirements as $requirement=>$value){
		if(empty($_POST[$requirement]))
			throw new Exception('Campo '.$value.' vazio');
	}

	session_start();

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');
	if($_SESSION['admin'] != true)
		throw new Exception('Usuário não é administrador');

	$data = $_POST;
	$isEmailReference = isUser($data['email']);
	$update = ['nome'];

	$user = new Usuario($data['nome'], $data['nomeUsuario'], $data['email']);
	$adm = $_SESSION['usuario'];

	if($isEmailReference)
		$update[] = 'nomeUsuario';
	else
		$update[] = 'email';

	foreach($update as $value){
		$edited = $adm->editarUsuario($user, $value);
		if(!$edited)
			throw new Exception('Dados inválidos');
	}

	$resp['edited'] = true;
}catch(Exception $e){
	$resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>
