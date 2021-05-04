<?php
class Item{
	public $item;
	public $textoItem;

	public function __construct(Object $item){
		if(isset($item->item) && $item->textoItem){
			$this->item = $item->item;
			$this->textoItem = $item->textoItem;
		}else{
			throw new Exception('Item broked');
		}
	}
}
?>
