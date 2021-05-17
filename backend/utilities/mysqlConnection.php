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

function insertUser(
		string $nome, 
		string $nomeUsuario, 
		string $email, 
		string $hashAndSalt,
		string $salt
	){
		$connection = mysqlConnection('localhost', 'root', 'senha');
		mysqlQuery($connection, 'INSERT Usuario(nome, nomeUsuario, email, hashAndSalt, salt)
			VALUES(
				"'.$nome.'",
				"'.$nomeUsuario.'",
					"'.$email.'",
				"'.$hashAndSalt.'",
				"'.$salt.'"
			);');
}

function insertUserAdmin(string $nomeUsuario, string $email){
	$connection = mysqlConnection('localhost', 'root', 'senha');
	mysqlQuery($connection, 'INSERT Administrador(Usuario_nomeUsuario, Usuario_email)
		VALUES("'.$nomeUsuario.'", "'.$email.'");');
}

function insertUserProfessor(string $nomeUsuario, string $email, string $adminNomeUsuario, string $adminEmail){
	$connection = mysqlConnection('localhost', 'root', 'senha');
	mysqlQuery($connection, 'INSERT Professor(
			Usuario_nomeUsuario,
			Usuario_email,
			Administrador_Usuario_nomeUsuario,
			Administrador_Usuario_email
		)VALUES(
			"'.$nomeUsuario.'",
			"'.$email.'",
			"'.$adminNomeUsuario.'",
			"'.$adminEmail.'"	
		);');
}

function deleteUser(string $email){
	$connection = mysqlConnection('localhost', 'root', 'senha');
	mysqlQuery($connection, 'DELETE FROM Usuario WHERE email="'.$email.'";');
	if($connection->affected_rows == 0)
		throw new Exception('User doesn'."'".'t exist');	
}
?>
