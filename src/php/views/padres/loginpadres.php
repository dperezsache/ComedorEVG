<?php
    require_once('../../controllers/controladorlogin.php');
    $controlador = new ControladorLogin();

    session_start();

    if (isset($_SESSION['idPadre']))
    {
        header('Location: ./dashboard.php');
    }
    else
    {
        $resultado = $controlador->iniciarSesion($_POST);

        switch($resultado)
        {
            case -3:
                echo '<div class="error">Error: Contraseña incorrecta.</div>';
                break;

            case -2:
                echo '<div class="error">Error: Los datos introducidos son incorrectos, pruebe de nuevo.</div>';
                break;
            
            case -1:
                echo '<div class="error">Error: No hay conexión con la base de datos.</div>';
                break;
    
            case 0:
                break;

            case 1:
                header('Location: dashboard.php');
                break;
    
            default:
                echo '<div class="error">Se ha producido un error con código: <b>' . $resultado . '</b>.</div>';
                break;
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta author="Sergio Rivera Salgado"/>
        <title>Login Padres</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
    </head>
    <body>
        <h1>Inicio de sesión</h1>
        <form action="" method="POST">
            <div >
                <label for="correo">Correo electrónico</label>
                <input type="text" name="correo" maxlength="100" required/>
            </div>
            <div>
                <label for="password">Contraseña</label>
                <input type="password" name="password" maxlength="255" required/>
            </div>
            <div>
                <button type="submit">Entrar</button>
            </div>
        </form>
    </body>
</html>