<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	$subject = $_POST['materia'];

	$all = countAllQuestionsInSubject($subject);
	$withoutTheme = countQuestionsInSubjectWithoutTheme($subject);

	$resp = [
		'semTema'=>$withoutTheme,
		'todas'=>$all
	];
}catch(Exception $e){
	$resp = ['error'=>$e-getMessage()];	
}

echo(json_encode($resp));
?>
