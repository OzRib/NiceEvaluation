<?php
require_once(__DIR__.'/../classes/usuarios.php');

$resp = ['created'=>false];

try{
	$requirements = [
		'nome'=>'"Nome Completo"',
		'nomeUsuario'=>'"Nome de Usuário"', 
		'email'=>'"Email"', 
		'senha'=>'"Senha"'
	];
	foreach($requirements as $requirement=>$value){
		if(empty($_POST[$requirement]))
			throw new Exception('Campo '.$value.' vazio');
	}

	if($_POST['admin'] === null)
		throw new Exception('Escolha entre Administrador e Professor');

	$dados = $_POST;

	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não está logado');
	if($_SESSION['admin'] != true)
		throw new Exception('Usuário não é administrador');

	$adm = $_SESSION['usuario'];
	$user = new Usuario($dados['nome'], $dados['nomeUsuario'], $dados['email'], $dados['senha']);
	$adm->criarUsuario($user, $dados['admin']);

	$resp['created'] = true;

}catch(Exception $e){
	$resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>
