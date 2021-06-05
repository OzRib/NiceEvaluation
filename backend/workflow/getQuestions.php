<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');
require_once(__DIR__.'/../classes/materia.php');

try{
	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');
	
	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	if($_POST['tema'] === null)
		throw new Exception('É necessário um tema');

	$subjectId = (int) $_POST['materia'];
	$subjects = listSubjects();
	$subjectData = $subjects[$subjectId];
	$subjectName = $subjectData['nome'];

	$themeId = (int) $_POST['tema'];
	$themes = listThemesInSubject($subjectName);
	$themeData = $themes[$themeId];
	$themeName = $themeData[0];

	$subject = new Materia($subjectName);
	$subject->carregaQuestoes('comTema', $themeName);
	$questions = $subject->mostraQuestoes();

	$resp = $questions;	
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
