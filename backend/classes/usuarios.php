<?php
declare(strict_types=1);

require_once(__DIR__.'/../vendor/autoload.php');
require_once(__DIR__.'/pedido.php');
require_once(__DIR__.'/tema.php');
require_once(__DIR__.'/../utilities/hashAndSalt.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');
require_once(__DIR__.'/../utilities/confirmations.php');

use Dompdf\Dompdf;

class Usuario{
	protected $nome;
	protected $nomeUsuario;
	protected $email;
	protected $senha;
	private $pedido;
	private $codigoRedefinicao;

	public function __construct(string $nome, string $nomeUsuario, string $email, string|null $senha=null){
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

		$result = mysqlQuery('SELECT hashAndSalt, salt FROM Usuario WHERE '.$typeData.'="'.$id.'";');

		$data = $result->fetch_assoc();
		if($data == null)
			throw new Exception('Usuário não existe');
		$passwdAndSalt = $senha.$data['salt'];
		$hashAndSalt = genHash($passwdAndSalt);

		if($hashAndSalt != $data['hashAndSalt'])
			throw new Exception('Senha incorreta');
	}

	public function logout(){
		setCookie('logged');
		unset($_SESSION['usuario']);
	}

	public function autoEditar(string $tipoDado, string $dado):bool{
		try{
			editUserData($this->email, $tipoDado, $dado);
			return true;
		}catch(Exception $e){
			return false;
		}
	}

	public function gerarProva(array $pedido){
		$this->pedido = new Pedido($pedido);
		$pedido = $this->fazPedido();

		$result = ['prova'=>base64_encode($pedido)];

		return $result;
	}
	
	public function redefinirSenha(string $email){
	
	}

	public function criarTema(string $nome, int $idQuestao):bool{
		
	}

	public function removerTema(Tema $tema):bool{
	
	}

	public function mostraDados():array{
		return [
			'nome'=>$this->nome,
			'nomeUsuario'=>$this->nomeUsuario,
			'email'=>$this->email
		];
	}

	private function verificaEmail(string $dado):bool{
		
	}

	private function fazPedido(){
		$pedido =  $this->pedido;
		$qtdQuestoes = (int) $pedido->questoesGerais;
		$materia = $pedido->materia;

		$materia->carregaQuestoes('todas');

		$search = ['"'];
		$replace = ['\"'];
		$questions = $materia->sorteiaQuestoes($qtdQuestoes);
		$questionsJson = json_encode($questions);
		$filteredQuestionsJson = str_replace($search, $replace, $questionsJson);

		$rubyApp = __DIR__.'/../templates/main.rb';
		$rubyArgs = '-t default -q "'.$filteredQuestionsJson.'"';

		$html = shell_exec('ruby "'.$rubyApp.'" '.$rubyArgs);

		$dompdf = new Dompdf();
		$dompdf->loadHtml($html);
		$dompdf->setPaper('A4', 'portrait');
		$dompdf->render();
		$result = $dompdf->output();

		return $result;
	}

	private function confirmaCodigo(string $codigo):bool{
	
	}
}

class Professor extends Usuario{}

class Administrador extends Usuario{
	public function criarUsuario(Usuario $dados, bool $adm=false):bool{
		try{
			if($dados->senha === null)
				throw new Exception('Usuário sem senha');
			$salt = genSalt();
			$passwdAndSalt = $dados->senha.$salt;
			$hashAndSalt = genHash($passwdAndSalt);
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
			throw new Exception('Usuário não está listado no Banco de Dados');
		if(!isset($usuario->$dado) || $dado === 'senha')
			throw new Exception('Dado inválido para a edição');
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
		try{
			$configs = [
				0=>'nome',
				1=>'nomeUsuario',
				2=>'email',
				3=>'tipoUsuario'
			];
			
			$users = listUsers();

			foreach($users as $position=>$user){
				foreach($user as $key=>$attr){
					$tempUser[$configs[$key]] = $attr;
				}
				$finalUsers[$position] = $tempUser;
			}

			return $finalUsers;
		}catch(Exception $e){
			throw new Exception('Erro ao listar usuários');
		}

	}

	public function criarQuestao(string $materia, string $corpo, string $resposta, array|null $itens=null):bool{
		try{
			$admData = $this->mostraDados();
			addQuestion($materia, $corpo, $resposta, $admData, $itens);
			return true;
		}catch(Exception $e){
			return false;
		}
	}

	public function excluirQuestoes(array $ids):bool{
		try{
			foreach($ids as $value){
				if(!($value instanceof int))
					throw new Exception('Esperado que todos os elementos do array sejam inteiros');
				rmQuestion($value);
			}

			return true;
		}catch(Exception $e){
			return false;
		}

	}
}
?>
