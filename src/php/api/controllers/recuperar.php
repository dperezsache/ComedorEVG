<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de recuperación de contraseñas.
     */
    class Recuperar {
        /**
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param object $correo Objecto que contiene el correo del usuario.
         */
        function post($pathParams, $queryParams, $correo) {
            $usuario = DAOUsuario::existeCorreo($correo);
            sleep(1);

            if (!$usuario) {
                header('HTTP/1.1 404 Not Found');
                die();
            }

            $recuperacion = DAOUsuario::obtenerRecuperacionPorID($usuario);

            // Borrar solicitud anterior si existe.
            if ($recuperacion) {
                DAOUsuario::borrarRecuperacion($recuperacion);  
            }

            $codigo = DAOUsuario::insertarRecuperacionClave($usuario);
            sleep(1);

            if (!$codigo) {
                header('HTTP/1.1 403 Forbidden');
                die();
            }

            $resultado = DAOUsuario::enviarEmailRecuperacion($usuario, $codigo);
            sleep(1);

            if (!$resultado) {
                header('HTTP/1.1 403 Forbidden');
                die();
            }

            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>