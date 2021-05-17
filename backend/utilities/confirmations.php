<?php
declare(strict_types=1);

require_once(__DIR__.'/mysqlConnection.php');

function isUserAdmin(array $userData):bool{
    $userData = getAdminData($userData['nomeUsuario']);
    $isAdmin = $userData ? true : false;
    return $isAdmin;
}
?>