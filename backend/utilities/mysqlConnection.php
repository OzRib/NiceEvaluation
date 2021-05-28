<?php
declare(strict_types=1);

require_once(__DIR__.'/../vendor/autoload.php');

use \Env\Load\env;

Env::load(__DIR__.'/..');
$env = getenv();

function mysqlConnection():mysqli{
	GLOBAL $env;

	$connection = new mysqli($env['DB_HOST'], $env['DB_USER'], $env['DB_PASSWD'], $env['DB_NAME']);
	if($connection->connect_error)
		throw new Exception('Conexão recusada');
	return $connection;
}

function mysqlQuery(string $query, mysqli|null $conn=null){
	$connection = $conn === null ? mysqlConnection() : $conn;

	$request = $connection->query($query);
	if($request==false)
		throw new Exception('Erro de comunicação');
	return $request;
}

function getUserData($id): array|null{
	$typeData = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'nomeUsuario';

	$request = mysqlQuery('SELECT nome, nomeUsuario, email FROM Usuario WHERE '.$typeData.'="'.$id.'";');

	$userData = $request->fetch_assoc();

	return $userData;
}

function getAdminData($id): array|null{
	$typeData = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'Usuario_email' : 'Usuario_nomeUsuario';

	$request = mysqlQuery( 
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
		throw new Exception('Esperado nome ou nomeUsuario ou email ao editar um usuário');

	$reference = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'nomeUsuario';

	mysqlQuery('UPDATE Usuario SET '.$dataType.'="'.$data.'" WHERE '.$reference.'="'.$id.'";');
}

function insertUser(
		string $nome, 
		string $nomeUsuario, 
		string $email, 
		string $hashAndSalt,
		string $salt
	):void{
		mysqlQuery('INSERT Usuario(nome, nomeUsuario, email, hashAndSalt, salt)
			VALUES(
				"'.$nome.'",
				"'.$nomeUsuario.'",
				"'.$email.'",
				"'.$hashAndSalt.'",
				"'.$salt.'"
			);');
}

function insertUserAdmin(string $nomeUsuario, string $email):void{
	mysqlQuery('INSERT Administrador(Usuario_nomeUsuario, Usuario_email)
		VALUES("'.$nomeUsuario.'", "'.$email.'");');
}

function insertUserProfessor(string $nomeUsuario, string $email, string $adminNomeUsuario, string $adminEmail):void{
	mysqlQuery('INSERT Professor(
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

function deleteUser(string $email):void{
	$connection = mysqlConnection();
	mysqlQuery('DELETE FROM Usuario WHERE email="'.$email.'";', $connection);
	if($connection->affected_rows == 0)
		throw new Exception('Usuário não existe');	
}

function listUsers():array{
	$req = mysqlQuery('SELECT 
		nome, 
		nomeUsuario, 
		email, 
		IF(Usuario.nomeUsuario=Administrador.Usuario_nomeUsuario, "Administrador", "Professor") AS tipoUsuario
		FROM Usuario LEFT JOIN Administrador ON nomeUsuario=Usuario_nomeUsuario;');
	$result = $req->fetch_all();
	
	return $result;
}

function listSubjects():array{
	$req = mysqlQuery('SELECT  
		nome, 
		descricao, 
		COUNT(Materia_nome) AS questoes 
	FROM Materia LEFT JOIN Questao ON Materia_nome=nome 
	GROUP BY nome;');
	$result = $req->fetch_all();

	$subjectSkeleton = [
		0=>'nome',
		1=>'descricao',
		2=>'questoes'
	];

	$subjects = [];

	foreach($result as $id=>$subject){
		$tempSubject = [];

		foreach($subject as $key=>$value){
		       $tempSubject[$subjectSkeleton[$key]] = $value;
		}

		$tempSubject['questoes'] = (int) $tempSubject['questoes'];
		$tempSubject['id'] = $id;

		$subjects[] = $tempSubject;
	}

	return $subjects;
}

function listQuestions(string|null $subject=null):array|null{
	$complement = $subject ? 'WHERE Materia_nome="'.$subject.'";':
';';
	$req = mysqlQuery('SELECT * FROM Questao '.$complement);
	$result = $req->fetch_all();

	return $result;
}

function addQuestion(string $materia, string $corpo, string $resposta, array $adm, array|null $itens=null):void{
	$admRequires = ['nomeUsuario' =>'nome de usuário', 'email'=>'email'];

	foreach($admRequires as $key=>$value){
		if(empty($adm[$key]))
			throw new Exception('Usuário sem '.$value);
	}

	$search = ['\\', '"'];
	$replace = ['\\\\', '\"'];

	$jsonItems = json_encode($itens);

	$filteredJsonItems = $itens===null? 'NULL':'"'.str_replace($search, $replace, $jsonItems).'"';	

	$filteredBody = str_replace($search, $replace, $corpo);
	$filteredResponse = str_replace($search, $replace, $resposta);

	mysqlQuery('INSERT Questao(
		itens, 
		corpo, 
		resposta, 
		Materia_nome, 
		Administrador_Usuario_nomeUsuario,
		Administrador_Usuario_email 
	)
	VALUES(
		'.$filteredJsonItems.',
		"'.$filteredBody.'",
		"'.$filteredResponse.'",
		"'.$materia.'",
		"'.$adm['nomeUsuario'].'",
		"'.$adm['email'].'");');
}

function rmQuestion(int $id){
	GLOBAL $env;

	$connection = mysqlConnection($env['DB_HOST'], $env['DB_USER'], $env['DB_PASSWD']);

	mysqlQuery($connection, 'DELETE FROM Questao WHERE idQuestao='.$id.';');
}
?>
