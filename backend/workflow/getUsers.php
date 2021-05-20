<?php
require_once(__DIR__.'/../classes/usuarios.php');

try{
    session_start();
    if(empty($_SESSION['usuario']))
        throw new Exception('Usuário não está logado');
    if($_SESSION['admin'] != true)
        throw new Exception('Usuário não é administrador');

    $adm = $_SESSION['usuario'];
    $resp = $adm->listarUsuarios();    
}catch(Exception $e){
    $resp = ['error'=>$e->getMessage()];
}

echo(json_encode($resp));
?>