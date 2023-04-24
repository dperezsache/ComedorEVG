<?php
    require_once('../../controllers/controladorlogin.php');
    $controlador = new ControladorLogin();

    session_start();
    if(isset($_SESSION['idPadre']))
    {
        $controlador->cerrarSesion();
        header('Location: ../../../login.html');
    }
    else
    {
        header('Location: ./dashboard.php');
    }
?>