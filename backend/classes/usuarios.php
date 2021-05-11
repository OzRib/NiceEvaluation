<?php
declare(strict_types=1);
require_once(__DIR__.'/pedido.php');
require_once(__DIR__.'/tema.php');
require_once(__DIR__.'/../utilities/hashAndSalt.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');

class Usuario{
	protected $nome;
	protected $nomeUsuario;
	protected $email;
	protected $senha;
	private $pedido;
	private $codigoRedefinicao;

	public function __construct(string $nome, string $nomeUsuario, string $email, string $senha=''){
		$this->nome = $nome;
		$this->nomeUsuario = $nomeUsuario;
		$this->email = $email;
		$this->senha = $senha;
	}

	public static function login(string $senha, string $id){
		$id = filter_var($id, FILTER_SANITIZE_EMAIL);
		if($id == false)
			throw new Exception('Identificação inválida');

		$typeData = filter_var($id, FILTER_VALIDATE_EMAIL) ? 'email' : 'nomeUsuario';

		$connection = mysqlConnection('localhost', 'root', 'senha');
		$result = mysqlQuery($connection, 'SELECT hashAndSalt, salt FROM Usuario WHERE '.$typeData.'="'.$id.'";');

		$data = $result->fetch_assoc();
		if($data == null)
			throw new Exception('User doesn'."'".'t exist');
		$passwdAndSalt = $senha.$data['salt'];
		$hashAndSalt = genHash($passwdAndSalt);

		if($hashAndSalt != $data['hashAndSalt'])
			throw new Exception('Wrong password');
	}

	public function logout(){
		setCookie('logged');
		unset($_SESSION['usuario']);
	}

	public function autoEditar(string $dado):bool{
		
	}

	public function gerarProva(Pedido $pedido){
		
	}
	
	public function redefinirSenha(string $email){
	
	}

	public function criarTema(string $nome, int $idQuestao):bool{
		
	}

	public function removerTema(Tema $tema):bool{
	
	}

	private function verificaEmail(string $dado):bool{
		
	}

	private function fazPedido(){
		
	}

	private function confirmaCodigo(string $codigo):bool{
	
	}
}

class Professor extends Usuario{}

class Administrador extends Usuario{
	public function criarUsuario(Usuario $dados, bool $adm=false):bool{
		$salt = genSalt();
		$passwdAndSalt = $dados->senha.$salt;
		$hashAndSalt = genHash($passwdAndSalt);

		try{
			$connection = mysqlConnection('localhost', 'root', 'senha');
			mysqlQuery($connection, 'INSERT Usuario(nome, nomeUsuario, email, hashAndSalt, salt)
				VALUES(
				"'.$dados->nome.'",
				"'.$dados->nomeUsuario.'",
				"'.$dados->email.'",
				"'.$hashAndSalt.'",
				"'.$salt.'");');
		}catch(Exception $e){
			return false;
		}

		try{
			if($adm){
				mysqlQuery($connection, 'INSERT Administrador(Usuario_nomeUsuario, Usuario_email)
					VALUES("'.$dados->nomeUsuario.'", "'.$dados->email.'");');
			}else{
				mysqlQuery($connection, 'INSERT Professor(
					Usuario_nomeUsuario,
					Usuario_email
					Administrador_Usuario_nomeUsuario,
					Administrador_Usuario_email)
					VALUES(
					"'.$dados->nomeUsuario.'",
					"'.$dados->email.'",
					"'.$this->nomeUsuario.'",
					"'.$this->email.'");');
			}
		}catch(Exception $e){
			mysqlQuery($connection, 'DELETE FROM Usuario WHERE email="'.$dados->email.'";');
			return false;
		}
		return true;
	}

	public function editarUsuario(Usuario $usuario, string $dado):bool{

	}

	public function removerUsuario(string $email):bool{
		
	}

	public function listarUsuarios():array{
	
	}

	public function criarQuestao(string $corpo, string $resposta, bool $objetiva, array|null $itens=null):bool{
		
	}

	public function excluirQuestoes(array $ids):bool{
		
	}
}
?>
