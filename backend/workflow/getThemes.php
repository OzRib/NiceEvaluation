<?php
require_once(__DIR__.'/../utilities/mysqlConnection.php');

$resp = [];

try{
	session_start();

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não está logado');

	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	$subjectId = $_POST['materia'];
	$subjects = listSubjects();
	$subject = $subjects[$subjectId];
	$subjectName = $subject['nome'];

	$themes = listThemesInsubject($subjectName);
	$finalThemes = [];
	$tempTheme = [];
	$themeSkeleton = [
		0=>'nome'
	];

	foreach($themes as $number=>$theme){
		foreach($theme as $key=>$value)
			$tempTheme[$themeSkeleton[$key]] = $value;
		$tempTheme['id'] = $number;
		$tempTheme['questoes'] = countQuestionsInTheme($tempTheme['nome']);

		$finalThemes[] = $tempTheme;
	}

	$resp = $finalThemes;
	
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
