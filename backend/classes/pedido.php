<?php
declare(strict_types=1);
require_once(__DIR__.'/materia.php');

class Pedido{
	public $questoesGerais;
	public $temas;
	public $materia;

	public function __construct(array $pedido){
		$rules = [
			'materia'=>($pedido['materia'] instanceof Materia),
			'questoesGerais'=>(gettype($pedido['questoesGerais']) === 'integer'),
			'temas'=>(gettype($pedido['temas']) === 'array' && $this->checkArrayInteger($pedido['temas']))
		];

		$messageError = [
			'materia'=>'Matéria precisa ser um objeto Materia válido',
			'questoesGerais'=>'As questões gerais precisam ser inteiros',
			'temas'=>'Os temas precisam ser vetores e seus valores devem ser inteiros'
		];

		foreach($pedido as $key=>$value){
			if(!($rules[$key])){
				throw new Exception($messageError[$key]);
			}
			$this->$key = $value;
		}
	}

	private function checkArrayInteger(array $array):bool{
		foreach($array as $value){
			if(gettype($value) !== 'integer')
				return false;
		}

		return true;
	}
}
?>
