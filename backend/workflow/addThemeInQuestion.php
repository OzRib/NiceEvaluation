<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	if($_POST['questao'] === null)
		throw new Exception('É necessário uma questão');

	if($_POST['tema'] === null)
		throw new Exception('É necessário um tema');

	$subjectId = (int) $_POST['materia'];
	$subjects = listSubjects();
	$subject = $subjects[$subjectId];
	$subjectName = $subject['nome'];

	$questionId = $_POST['questao'];
	$themeName = $_POST['tema'];

	$haveTheme = isTheme($themeName, $subjectName)

}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
