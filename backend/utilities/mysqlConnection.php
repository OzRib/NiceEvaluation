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
?>
