<?php
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');
require_once(__DIR__.'/../utilities/confirmations.php');;

$resp = ['access'=>'denied'];

try{
	if(empty($_POST['id']) || empty($_POST['senha']))
		throw new Exception('bad request');
	session_start();
		
	$id = $_POST['id'];
	$senha = $_POST['senha'];

	if(empty($_COOKIE['logged']) || empty($_SESSION['usuario'])){
		Usuario::login($senha, $id);

		$userData = getUserData($id);

		$isUserAdmin = isUserAdmin($userData);

		if($isUserAdmin)
			$user = new Administrador($userData['nome'], $userData['nomeUsuario'], $userData['email']);
		else
			$user = new Professor($userData['nome'], $userData['nomeUsuario'], $userData['email']);
	
		$_SESSION['usuario'] = $user;

		$_SESSION['admin'] = $isUserAdmin;
		$resp['admin'] = $isUserAdmin;

		//The cookie expires in 1.5 hour
		setCookie('logged', true, time()+5400);
	}

	$resp['access'] = 'granted';
}catch(Exception $e){
	$resp['access'] = 'denied';
	$resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>
