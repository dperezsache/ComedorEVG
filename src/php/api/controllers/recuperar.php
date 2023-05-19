<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de recuperación de contraseñas.
     */
    class Recuperar {
        /**
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $correo Objecto que contiene el correo del usuario.
         * @param object $user Usuario que realiza el proceso.
         */
        function post($pathParams, $queryParams, $correo, $user) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$user) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

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