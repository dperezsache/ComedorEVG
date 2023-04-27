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
                echo '<div class="p-2 container bg-danger text-light">Error: Contraseña incorrecta.</div>';
                break;

            case -2:
                echo '<div class="formItemLoginError">Error: Los datos introducidos son incorrectos, pruebe de nuevo.</div>';
                break;
            
            case -1:
                echo '<div class="formItemLoginError">Error: No hay conexión con la base de datos.</div>';
                break;
    
            case 0:
                break;

            case 1:
                header('Location: dashboard.php');
                break;
    
            default:
                echo '<div class="formItemLoginError">Se ha producido un error con código: <b>' . $resultado . '</b>.</div>';
                break;
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta author="Sergio Rivera Salgado"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        <link rel="stylesheet" href="../../../css/styles.css"/>
        <title>Comedor EVG</title>
    </head>
    <body>
        <form class="formLogin" action="" method="post">
			<div id="imgLogin">
				<img class="imgLogin" src="../../../img/foto.jpg"/>
			</div>
			<h3>Bienvenido/a</h3>
            <div class="formItemLogin">
                <label for="correo">
                    Dirección de email (*) <input type="email" class="form-control" name="correo" maxlength="90" required/>
                </label>
            </div>
            <div class="formItemLogin">
                <label for="contrasenia">
                    Contraseña (*) <input type="password" class="form-control" name="password" maxlength="90" required/>
                </label>
            </div>
            <div class="formItemLogin">
                <button type="submit" class="btn btn-info">Login</button>
            </div>
			<div class="formItemLogin">
                <p>¿No tienes cuenta? Registrate</p>
            </div>
            <div class="formItemLogin">
                <p>Si has olvidado la contraseña. Pulsa aquí</p>
            </div>
        </form>
    </body>
</html>