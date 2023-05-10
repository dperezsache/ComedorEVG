<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de padres.
     */
    class Padres {
        /**
         * Inserta fila a la tabla padres.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function post($pathParams, $queryParams, $id) {
            // Insertar en tabla de padres.
            DAOUsuario::altaPadre($id);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>