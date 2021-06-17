<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	if($_POST['questao'] === null)
		throw new Exception('É necessário uma questão');

	$questionId = (int) $_POST['questao'];

	$themes = listThemesInQuestion($questionId);

	$finalThemes = [];

	foreach($themes as $theme){
		$finalThemes[] = $theme[0];
	}

	$resp = $finalThemes;
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
