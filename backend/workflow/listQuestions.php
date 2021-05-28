<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não esta logado');

	if(empty($_POST['materia']))
		throw new Exception('É necessário uma matéria');

	$subjectId = (int) $_POST['materia'];
	$subjects = listSubjects();
	$subject = $subjects[$subject];
	$subjectName = $subject['nome'];

	$questions = listQuestions($subjectName);

	$resp = $questions;
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
