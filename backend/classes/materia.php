<?php
declare(strict_types=1);
require_once(__DIR__.'/questao.php');
require_once(__DIR__.'/tema.php');
require_once(__DIR__.'/../utilities/mysqlConnection.php');

class Materia{
	public $nome;
	public $descricao;
	public $questoes;
	public $temas;

	public function __construct(
		string $nome, 
		string $descricao, 
		array $questoes=[], 
		array $temas=[]
	){
		foreach($questoes as $value){
			if(!($value instanceof Questao)){
				throw new Exception('Expected Questao type in questoes for Materia');
			}
		}
		foreach($temas as $value){
			if(!($value instanceof Tema)){
				throw new Exception('Expceted Tema type in temas for Materia');
			}
		}
		$this->nome = $nome;
		$this->descricao = $descricao;
		$this->questoes = $questoes;
		$this->temas = $temas;
	}

	public function mostraDescricao():bool{
		return $this->descricao;	
	}

	public function mostraNome():string{
		return $this->nome;
	}

	public function mostraQuestoes():array{
		return $this->questoes;
	}

	public function carregaQuestoes(
		string $opcao, 
		string|null $tema=null
	):void{
		$questions = [];

		$options = [
			'comTema'=> function (&$questions, $tema){
				$questions = listQuestionsInTheme($this->nome, $tema);
			},
			'semTema'=> function (&$questions){
				$questions = listQuestionsWithoutTheme($this->nome);
			},
			'todas'=> function (&$questions){
				$questions = listQuestions($this->nome);	
			}
		];

		if($options[$opcao] === null)
			throw new Exception('Funcionalidade não existe');

		$options[$opcao]($questions, $tema);

		$tempQuestion = [];
		$finalQuestions = [];
		$questionSkeleton = [
			0=>'id',
			1=>'itens',
			2=>'corpo',
			3=>'resposta'
		];

		foreach($questions as $number=>$question){
			foreach($question as $key=>$value){
				$tempQuestion[$questionSkeleton[$key]] = $value;
			}
			$tempQuestion['temas'] = listThemesInQuestion((int) $tempQuestion['id']);
			$finalQuestions[] = $tempQuestion;
		}

		$this->questoes = $finalQuestions;
	}

	public function mostraQuestao(int $idQuestao):Questao{
			
	}

	public function mostraTemas():array{
		return $this->temas;
	}

	public function selecionaTemas(array $temas):array{
		
	}
}
?>
