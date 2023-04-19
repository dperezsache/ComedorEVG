<?php
    require_once('../../controllers/controladorpadres.php');
    $controlador = new ControladorPadres();

    $resultado = $controlador->altaPadre($_POST);

    switch($resultado)
    {
        case -1:
            echo '<div class="p-2 container bg-danger text-light">No se puede conectar. Revise su conexión e intente de nuevo.</div>';
            break;

        case 0:
            break;

        case 1:
            echo '<div class="p-2 container bg-success text-light">Te has registrado exitosamente. Redirigiendo.</div>';
            header("Refresh: 3; url=../../../index.html");
            break;

        case 1062:
            echo '<div class="p-2 container bg-danger text-light">Usuario con los mismos datos ya existe en la aplicación.</div>';
            break;

        default:
            echo '<div class="p-2 container bg-danger text-light">Error con código ' . $resultado . '</div>';
            break;
    }
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
                    Nombre (*) <input type="text" class="form-control" name="nombre" maxlength="30" required/>
                    <div class="invalid-feedback">Por favor, introduzca su nombre.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="apellidos">
                    Apellidos (*) <input type="text" class="form-control" name="apellidos" maxlength="90" required/>
                    <div class="invalid-feedback">Por favor, introduzca sus apellidos.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="correo">
                    Dirección de email (*) <input type="email" class="form-control" name="correo" maxlength="90" required/>
                    <div class="invalid-feedback">Por favor, introduzca su email.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="contrasenia">
                    Contraseña (*) <input type="password" class="form-control" name="contrasenia" maxlength="90" required/>
                    <div class="invalid-feedback">Por favor, introduzca una contraseña.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="telefono">
                    Nº de teléfono (*) <input type="text" class="form-control" name="telefono" maxlength="9" pattern="^[0-9]{9}$" required/>
                    <div class="invalid-feedback">Por favor, introduzca su nº de teléfono.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="dni">
                    DNI (*) <input type="text" class="form-control" name="dni" maxlength="9" pattern="(\d{8})([A-Z])$" required/>
                    <div class="invalid-feedback">Por favor, introduzca un DNI válido.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="iban">
                    IBAN (*) <input type="text" class="form-control" name="iban" maxlength="24" required/>
                    <div class="invalid-feedback">Por favor, indique su IBAN.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="titular">
                    Titular de la cuenta (*) <input type="text" class="form-control" name="titular" maxlength="120" required/>
                    <div class="invalid-feedback">Por favor, indique el titular de la cuenta.</div>
                </label>
            </div>
            <div class="formItem">
                <label for="politicaPrivacidad" class="form-check-label">
                    <input type="checkbox" class="form-check-input" name="politicaPrivacidad" required/> Acepto sin reservas la <a href="https://fundacionloyola.com/vguadalupe/politica-de-privacidad/" target="_blank">Política de Privacidad</a>
                    <div class="invalid-feedback">Acepte la política de privacidad para continuar.</div>
                 </label>
            </div>
            <div class="formItem">
                <p>Tras realizar el registro podrá dar de alta a sus hijos/as en la aplicación.</p>
            </div>
            <div class="formItem">
				<button type="reset" class="btn btn-danger">Cancelar</button>
                <button type="submit" class="btn btn-success">Registrarse</button>
            </div>
        </form>
    </body>
    <script src="../../../js/controllers/controladorformularios.js"></script>
</html>