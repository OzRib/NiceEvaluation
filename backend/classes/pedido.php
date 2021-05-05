<?php
declare(strict_types=1);
require_once(__DIR__.'/materia.php');

class Pedido{
	public $numeroQuestoes;
	public $questoesObjetivas;
	public $temas;
	public $questoesTemas;
	public $materia;

	public function __construct(Object $pedido){
		function checkArrayInteger(array $array){
			foreach($array as $value){
				if(!($value instanceof int)){
					return false;
				}
			}
			return true;
		}
		$regras = [
			'numeroQuestoes'=>($pedido->numeroQuestoes instanceof int),
			'questoesObjetivas'=>($pedido->questoesObjetivas instanceof int),
			'temas'=>(checkArrayInteger($pedido->temas)),
			'questoesTemas'=>(chechArrayInteger($pedido->questoesTemas)),
			'materia'=>($pedido->materia instanceof Materia)
		];
		foreach($pedido as $key=>$value){
			if(!($regras[$key])){
				throw new Exception('Error with type of '.$key.' in Pedido');
			}
			$this->$key = $value;
		}
	}
}
?>
