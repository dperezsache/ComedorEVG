<?php
    require_once('../../controllers/controladorpadres.php');
    $controlador = new ControladorPadres();

    // Comprobar que haya sesión
    session_start();
    if (!isset($_SESSION['idPadre']))
        header('Location: ../../../logout.html');

    $datos = $controlador->obtenerDatos();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>        
        <link rel="stylesheet" href="../../../css/styles.css"/>
        <title>Comedor EVG</title>
    </head>
    <body>
        <form action="" method="post" class="needs-validation" novalidate>
            <div class="formItem">
                <label for="nombre">
                    Nuevo nombre (*) <input type="text" class="form-control" name="nombre" maxlength="30" value="<?php echo $datos['nombre'] ?>" required/>
                    <div class="invalid-feedback">Por favor, introduzca su nombre.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="apellidos">
                    Nuevos apellidos (*) <input type="text" class="form-control" name="apellidos" maxlength="90" value="<?php echo $datos['apellidos'] ?>" required/>
                    <div class="invalid-feedback">Por favor, introduzca sus apellidos.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="telefono">
                    Nuevo teléfono (*) <input type="text" class="form-control" name="telefono" maxlength="9" pattern="^[0-9]{9}$" value="<?php echo $datos['telefono'] ?>" required/>
                    <div class="invalid-feedback">Por favor, introduzca su nº de teléfono.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="correo">
                    Nuevo email (*) <input type="email" class="form-control" name="correo" maxlength="90" value="<?php echo $datos['correo'] ?>" required/>
                </label>
            </div>
            <div class="formItem">
                <label for="politicaPrivacidad" class="form-check-label">
                    <input type="checkbox" class="form-check-input" name="politicaPrivacidad" required/> Acepto sin reservas la <a href="https://fundacionloyola.com/vguadalupe/politica-de-privacidad/" target="_blank">Política de Privacidad</a>
                    <div class="invalid-feedback">Acepte la política de privacidad para continuar.</div>
                 </label>
            </div>
            <div class="formItem">
				<button type="reset" class="btn btn-danger">Cancelar</button>
                <button type="submit" class="btn btn-success">Actualizar datos</button>
            </div>
        </form>
        <?php
            $resultado = $controlador->modificarPadre($_POST);
            switch($resultado)
            {
                case -1:
                    echo '<div class="p-2 container bg-danger text-light">No se puede conectar. Revise su conexión e intente de nuevo.</div>';
                    break;
        
                case 0:
                    break;
        
                case 1:
                    echo '<div class="p-2 container bg-success text-light">Datos actualizados exitosamente.</div>';
                    break;
        
                default:
                    echo '<div class="p-2 container bg-danger text-light">Error con código ' . $resultado . '</div>';
                    break;
            }
        ?>
    </body>
    <script src="../../../js/controllers/formulariospadres.js"></script>
</html>