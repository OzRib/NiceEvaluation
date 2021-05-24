<?php
declare(strict_types=1);
require_once(__DIR__.'/questao.php');
require_once(__DIR__.'/tema.php');

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

	public function mostraQuestao(int $idQuestao):Questao{
			
	}

	public function mostraTemas():array{
		return $this->temas;
	}

	public function selecionaTemas(array $temas):array{
		
	}
}
?>
