<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

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
	$subject = $subjects[$subjectId];
	$subjectName = $subject['nome'];

	$themeId = (int) $_POST['tema'];
	$themes = listThemesInSubject($subjectName);
	$theme = $themes[$themeId];
	$themeName = $theme[0];

	$questions = listQuestionsInTheme($subjectName, $themeName);

	$tempQuestion = [];
	$finalQuestions = [];
	$questionSkeleton = [
		0=>'id',
		1=>'itens',
		2=>'corpo',
		3=>'resposta'
	];

	foreach($questions as $number=>$question){
		foreach($question as $key=>$value){
			$tempQuestion[$questionSkeleton[$key]] = $value;
		}
		$finalQuestions[] = $tempQuestion;
	}

	$resp = $finalQuestions;
	
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
