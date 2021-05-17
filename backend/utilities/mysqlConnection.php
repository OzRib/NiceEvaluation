<?php
declare(strict_types=1);

function mysqlConnection(string $database, string $user, string $passwd):mysqli{
	$connection = new mysqli($database, $user, $passwd, 'NiceEvaluation');
	if($connection->connect_error)
		throw new Exception('Conexão recusada');
	return $connection;
}

function mysqlQuery(mysqli $connection, string $query){
	$request = $connection->query($query);
	if($request==false)
		throw new Exception('Erro de comunicação');
	return $request;
}

function getUserData($id): array|null{
	$connection = mysqlConnection('localhost', 'root', 'senha');
	$typeData = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'nomeUsuario';
	$request = mysqlQuery(
		$connection, 
		'SELECT nome, nomeUsuario, email FROM Usuario WHERE '.$typeData.'="'.$id.'";'
	);

	$userData = $request->fetch_assoc();

	return $userData;
}

function getAdminData($id): array|null{
	$connection = mysqlConnection('localhost', 'root', 'senha');
	$typeData = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'Usuario_email' : 'Usuario_nomeUsuario';
	$request = mysqlQuery(
		$connection, 
		'SELECT Usuario_nomeUsuario, Usuario_email FROM Administrador WHERE '.$typeData.'="'.$id.'";'
	);
	
	$adminData = $request->fetch_assoc();

	return $adminData;
}

function editUserData(string $id, string $dataType, string $data):void{
	$validValues = ['nome', 'nomeUsuario', 'email'];
	$validValue = false;
	foreach($validValues as $value){
		if($dataType === $value)
			$validValue = true;
	}
	if(!$validValue)
		throw new Exception('Expected nome or nomeUsuario or email in editUserData');

	$reference = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'nomeUsuario';

	$connection = mysqlConnection('localhost', 'root', 'senha');
	mysqlQuery($connection, 'UPDATE Usuario 
		SET '.$dataType.'="'.$data.'"
		WHERE '.$reference.'="'.$id.'";');
}
?>
