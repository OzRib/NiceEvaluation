<?php
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');
require_once(__DIR__.'/../utilities/confirmations.php');;

$resp = ['access'=>'denied'];

try{
	if(empty($_POST['id']) || empty($_POST['senha']))
		throw new Exception('Um dos campos está vazio');
	session_start();
		
	$id = $_POST['id'];
	$senha = $_POST['senha'];

	if(empty($_COOKIE['logged']) || empty($_SESSION['usuario'])){
		Usuario::login($senha, $id);

		$userData = getUserData($id);

		$isUserAdmin = isUserAdmin($userData['email']);

		if($isUserAdmin)
			$user = new Administrador($userData['nome'], $userData['nomeUsuario'], $userData['email']);
		else
			$user = new Professor($userData['nome'], $userData['nomeUsuario'], $userData['email']);
	
		$_SESSION['usuario'] = $user;
		$_SESSION['admin'] = $isUserAdmin;

		setCookie('logged', true);
	}

	$resp['access'] = 'granted';
	$resp['admin'] = $_SESSION['admin'];
}catch(Exception $e){
	$resp['access'] = 'denied';
	$resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>
