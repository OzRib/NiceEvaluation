<?php
require_once(__DIR__.'/item.php');

class Questao{
	private $idQuestao;
	private $corpo;
	private $resposta;
	private $objetiva;
	private $itens;
	private $temas;

	public function __construct(
			int $idQuestao, 
			string $corpo, 
			string $resposta, 
			bool $objetiva, 
			array $temas=[], 
			array|null $itens=null
	){
		foreach($itens as $value){
			if(!($value instanceof Item)){
				throw new Exception('Expected Item type in items for Questao');
			}
		}
		$this->idQuestao = $idQuestao;
		$this->corpo = $corpo;
		$this->resposta = $resposta;
		$this->objetiva = $objetiva;
		$this->temas = $temas;
	}

	public function objetiva():bool{
		return $this->objetiva;		
	}

	public function mostraCorpo():string{
		return $this->corpo;
	}

	public function mostraResposta():string{
		return $this->resposta;
	}

	public function mostraItem(string $item):Item{
		return $this->itens[$item];
	}

	public function mostraItens():array{
		return $this->itens;
	}

	public function mostraTemas():array{
		return $this->temas;
	}

	public function mostraId():int{
		return $this->id;
	}
}
?>
