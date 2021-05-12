<?php
require_once(__DIR__.'/../classes/usuarios.php');

$resp = ['logged'=>true];

try{
    session_start();
    if(empty($_SESSION['usuario']))
        throw new Exception('User not logged');

    $user = $_SESSION['usuario'];
    if(!($user instanceof Usuario))
        throw new Exception('User is'."'".'nt an Usuario');

    $user->logout();
    $resp['logged']  = false;
}catch(Exception $e){
    $resp['error'] = $e->getMessage();
}

echo(json_encode($resp));
?>