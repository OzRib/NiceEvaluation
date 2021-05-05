<?php
declare(strict_types=1);
class Usuario{
	protected $nome;
	protected $nomeUsuario;
	protected $email;
	protected $senha;
	private $pedido;
	private $codigoRedefinicao;

	public function __construct(string $nome, string $nomeUsuario, string $email, string $senha){
		$this->nome = $nome;
		$this->nomeUsuario = $nomeUsuario;
		$this->email = $email;
		$this->senha = $senha;
	}

	public static function login(string $senha, string $id){
	
	}

	public function logout(){
	
	}

	public function autoEditar(string $dado){
		
	}
	
	public function redefinirSenha(string $email){
	
	}
}

class Professor extends Usuario{}

class Administrador extends Usuario{
	public function criarUsuario(Usuario $dados, bool $adm){
	
	}

	public function editarUsuario(Usuario $usuario, string $dado){
	
	}

	public function removerUsuario(string $email){
	
	}

	public function listarUsuarios(){
	
	}

	public function excluirQuestoes(array $ids){
		
	}
}
?>
