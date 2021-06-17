<?php
declare(strict_types=1);
require_once(__DIR__.'/../utilities/mysqlConnection.php');

class Materia{
	public $nome;
	public $descricao;
	public $questoes;
	public $temas;

	public function __construct(
		string $nome, 
		string $descricao='', 
		array $questoes=[], 
		array $temas=[]
	){
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
			$tempQuestion['itens'] = $tempQuestion['itens'] !== null ? json_decode($tempQuestion['itens']) : NULL;
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

	public function sorteiaQuestoes(int $totalQuestoes):array{
		$sort = function(){
			$sort = (bool) rand(0,1);
			$toUp = $sort? -1: 1;
			return $toUp;
		};

		$questions = $this->questoes;
		usort($questions, $sort);

		$sortedQuestions = array_slice($questions, 0, $totalQuestoes);

		return $sortedQuestions;
	}
}
?>
