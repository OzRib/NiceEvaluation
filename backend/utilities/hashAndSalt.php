<?php
declare(strict_types=1);

function genHash(string $hash):string{
	return hash('sha256', $hash);
}

function genSalt():string{
	$random = rand(0, 0xFFFFFFFF);
	$hexRandom = dechex($random);
	$paddingToLength8 = str_pad($hexRandom, 8, '0', STR_PAD_LEFT);
	return $paddingToLength8;
}
?>
