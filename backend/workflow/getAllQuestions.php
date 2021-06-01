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
	
	$questions = listQuestions($subjectName);

	$questionSkeleton = [
		0=>'id',
		1=>'itens',
		2=>'corpo',
		3=>'resposta'
	];
	$finalQuestions = [];
	$tempQuestion = [];

	foreach($questions as $number=>$question){
		foreach($question as $key=>$value){
			$tempQuestion[$questionSkeleton[$key]] = $value;
		}
		if(!($tempQuestion['itens'] === null))
			$tempQuestion['itens'] = json_decode($tempQuestion['itens']);
		$finalQuestions[] = $tempQuestion;
	}

	$resp = $finalQuestions;
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
