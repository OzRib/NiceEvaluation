<?php
declare(strict_types=1);

require_once(__DIR__.'/pedido.php');
require_once(__DIR__.'/tema.php');
require_once(__DIR__.'/../utilities/hashAndSalt.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');
require_once(__DIR__.'/../utilities/confirmations.php');

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
			insertUser(
				$dados->nome, 
				$dados->nomeUsuario, 
				$dados->email,
				$hashAndSalt,
				$salt
			);
		}catch(Exception $e){
			return false;
		}

		try{
			if($adm){
				insertUserAdmin($dados->nomeUsuario, $dados->email);
			}else{
				insertUserProfessor($dados->nomeUsuario,$dados->email, $this->nomeUsuario, $this->email);
			}
		}catch(Exception $e){
			deleteUser($dados->email);
			return false;
		}
		return true;
	}

	public function editarUsuario(Usuario $usuario, string $dado):bool{
		$isReferenceEmail = isUser($usuario->email); 
		$isUser = $isReferenceEmail || isUser($usuario->nomeUsuario);

		if(!$isUser)
			throw new Exception('Variable usuario is'."'".'nt listed in database');
		if(!isset($usuario->$dado) || $dado === 'senha')
			throw new Exception('Invalid data to edit');
		try{
			$id = $isReferenceEmail ? $usuario->email : $usuario->nomeUsuario;
			editUserData($id, $dado, $usuario->$dado);
			return true;
		}catch(Exception $e){
			return false;
		}
	}

	public function removerUsuario(string $email):bool{
		try{
			deleteUser($email);
			return true;
		}catch(Exception $e){
			return false;
		}
	}

	public function listarUsuarios():array{
		
	}

	public function criarQuestao(string $corpo, string $resposta, bool $objetiva, array|null $itens=null):bool{
		
	}

	public function excluirQuestoes(array $ids):bool{
		
	}
}
?>
