<?php
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../classes/materia.php');
require_once(__DIR__.'/../classes/pedido.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');

try{
	session_start();

	$postRequirements = [
		'materia'=>'É necessário uma matéria',
		'temas'=>'Informe a quantidade de questões por tema',
		'geral'=>'Informe a quantidade de questões gerais'
	];

	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');

	foreach($postRequirements as $requirement=>$message){
		if($_POST[$requirement] === null)
			throw new Exception($message);
	}

	$subjectId = (int) $_POST['materia'];
	$subjects = listSubjects();
	$subjectData = $subjects[$subjectId];
	$subjectName = $subjectData['nome'];

	$themes = json_decode($_POST['temas']);

	if(gettype($themes) === 'object'){
		$themes = (array) $themes;
		foreach($themes as $key=>$value){
			$themes[$key] = (int) $value;
		}
	}else{
		$themes = null;	
	}
	$generalQuestions = (int) $_POST['geral'];

	$subject = new Materia($subjectName);

	$pedido = [
		'materia'=>$subject,
		'questoesGerais'=>$generalQuestions,
		'temas'=>$themes? $themes : []
	];

	$user = $_SESSION['usuario'];
	$resp = $user->gerarProva($pedido);
}catch(Exception $e){
	$resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>
