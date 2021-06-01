<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	if($_POST['questoes'] === null)
		throw new Exception('É necessãrio um vetor de questões');
	$deleteQuestionsIds = json_decode($_POST['questoes']);

	if(sizeof($deleteQuestionsIds)<1)
		throw new Exception('Selecione pelo menos uma questão');

	$subjectId = (int) $_POST['materia'];
	$subjects = listSubjects();
	$subject = $subjects[$subjectId];
	$subjectName = $subject['nome'];

	foreach($deleteQuestionsIds as $id){
		rmQuestion((int) $id);
	}

	$resp = ['deleted'=>true];
}catch(Exception $e){
	$resp = [
		'deleted'=>false,
		'error'=>$e->getMessage()
	];
}

echo(json_encode($resp));
?>
