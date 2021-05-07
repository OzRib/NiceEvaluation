<?php
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');

session_start();
$resp = [];

try{
	if(empty($_POST['id']) || empty($_POST['senha']))
		throw new Exception('bad request');
	
	$id = $_POST['id'];
	$senha = $_POST['senha'];

	if(empty($_COOKIE['logged']) || empty($_SESSION['usuario'])){
		Usuario::login($senha, $id);

		$connection = mysqlConnection('localhost', 'root', 'senha');
		$typeData = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'nomeUsuario';
		$request = mysqlQuery($connection, 'SELECT nome, nomeUsuario, email FROM Usuario where '.$typeData.'="'.$id.'";');

		$userData = $request->fetch_assoc();
		$user = new Usuario($userData['nome'], $userData['nomeUsuario'], $userData['email']);
	
		$_SESSION['usuario'] = $user;

		//The cookie expires in 1.5 hour
		setCookie('logged', true, time()+5400);
	}

	$resp['access'] = 'granted';
}catch(Exception $e){
	$resp['error'] = $e->getMessage();
	$resp['access'] = 'denied';
}

echo(json_encode($resp));
?>
