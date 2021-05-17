<?php
declare(strict_types=1);

require_once(__DIR__.'/mysqlConnection.php');

function isUserAdmin(string $id):bool{
    $userData = getAdminData($id);
    $isAdmin = $userData ? true : false;
    return $isAdmin;
}

function isUser(string $id){
    $userData = getUserData($id);
    $isUser = $userData ? true : false;
    return $isUser;
}
?>