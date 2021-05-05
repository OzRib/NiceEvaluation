<?php
declare(strict_types=1);
require_once(__DIR__.'/pedido.php');
require_once(__DIR__.'/tema.php');

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
	public function criarUsuario(Usuario $dados, bool $adm):bool{
	
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
