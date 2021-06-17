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

	$subjects = listSubjects();
	$subjectId = (int) $_POST['materia'];
	$subjectData = $subjects[$subjectId];
	$subjectName = $subjectData['nome'];

	$questionId = (int) $_POST['questao'];

	$themeName = $_POST['tema'];

	rmThemeOfQuestion($themeName, $questionId);

	$questionsInTheme = countQuestionsInTheme($themeName, $subjectName);
	
	if($questionsInTheme <= 0)
		rmTheme($subjectName, $themeName);

}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
