<?php
declare(strict_types=1);
namespace Env\Load;

class Env{
	public static function load(string $dir):void{
		if(!file_exists($dir.'/.env'))
			throw new Exception($dir.'/.env doesn'."'".'t exist');
		$file = file($dir.'/.env');
		foreach($file as $line){
			putenv(trim($line));
		}
	}
}

?>
