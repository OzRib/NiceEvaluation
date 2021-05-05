<?php
declare(strict_types=1);
require_once(__DIR__.'/questao.php');

class Tema{
	private $nome;
	private $questoes;

	public function __construct(string $nome, array $questoes){
		foreach($questoes as $value){
			if(!($value instanceof Questao)){
				throw new Exception('Expected Questao type in questoes for Tema');
			}
		}
		$this->nome = $nome;
		$this->questoes = $questoes;
	}
	
	public function mostraNome():string{
		return $this->nome;
	}

	public function mostraQuestoes():array{
		return $this->questoes;
	}

	public function adicionaQuestao(Questao $questao):bool{
		
	}

	public function removeQuestao(Questao $questao):bool{
	
	}

	public function autoExclui():bool{
		
	}
}
?>
