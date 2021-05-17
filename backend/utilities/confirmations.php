<?php
declare(strict_types=1);

require_once(__DIR__.'/mysqlConnection.php');

function isUserAdmin(string $id):bool{
    $userData = getAdminData($id);
    $isAdmin = $userData ? true : false;
    return $isAdmin;
}
?>