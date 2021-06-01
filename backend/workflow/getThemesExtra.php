<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	$subjectId = (int) $_POST['materia'];
	$subjects = listSubjects();
	$subject = $subjects[$subjectId];
	$subjectName = $subject['nome'];

	$all = countAllQuestionsInSubject($subjectName);
	$withoutTheme = countQuestionsInSubjectWithoutTheme($subjectName);

	$resp = [
		'semTema'=>$withoutTheme,
		'todas'=>$all
	];
}catch(Exception $e){
	$resp = ['error'=>$e-getMessage()];	
}

echo(json_encode($resp));
?>
