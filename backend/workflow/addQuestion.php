<?php
declare(strict_types=1);
require_once(__DIR__.'/../classes/usuarios.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');

$resp = ['added'=>false];

try{
	session_start();
	if(empty($_SESSION['usuario']))
		throw new Exception('Usuário não logado');
	
	if(!($_SESSION['usuario'] instanceof Administrador))
		throw new Exception('Usuário não é administrador');
	
	if($_POST['materia'] === null)
		throw new Exception('É necessário uma matéria');

	$postRequires = ['corpo'=>'Corpo', 'resposta'=>'Resposta'];

	foreach($postRequires as $require=>$name){
		if(empty($_POST[$require]))
			throw new Exception('Campo '.$name.' vazio');
	}

	function jsonToArray(string $json):array{
		$object = json_decode($json);
		$array = (array) $object;

		return $array;
	}

	$items = !empty($_POST['itens']) ? jsonToArray($_POST['itens']): null;

	if(!($items===null))
		if(sizeof($items)<2)
			throw new Exception('Para questões com itens não são aceitos menos de 2 itens');
	
	$subjectId = (int) $_POST['materia'];

	$subjects = listSubjects();
	$subject = $subjects[$subjectId];
	$subjectName = $subject['nome'];

	$body = $_POST['corpo'];
	$response = $_POST['resposta'];

	$adm = $_SESSION['usuario'];
	$added = $adm->criarQuestao($subjectName, $body, $response, $items);

	if(!$added){
		throw new Exception('Não foi possível criar a questão');
	}

	$resp['added'] = true;
}catch(Exception $e){
	$resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>
