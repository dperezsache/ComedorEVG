<?php
    // Comprobar que haya sesión
    session_start();
    if (!isset($_SESSION['idPadre']))
        header('Location: ../../../index.html');

    require_once('../../controllers/controladorpadres.php');
    $controlador = new ControladorPadres();
    $datos = $controlador->obtenerDatos();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>        <link rel="stylesheet" href="../../css/styles.css"/>
        <title>Comedor EVG</title>
    </head>
    <body>
        <div id="divInicio" class="container mx-auto my-2 bg-dark text-light p-2 rounded w-50">
            <h3 class="text-center">Bienvenid@ <?php echo $datos['nombre'] ?></h3>
            <div class="mx-auto text-center">
                <button type="button" class="btn btn-primary">Modificar datos</button>
                <button type="button" class="btn btn-secondary">Cerrar sesión</button>
            </div>
        </div>
    </body>
    <script type="module" src="../../../js/controllers/controladordashboard.js"></script>
</html>