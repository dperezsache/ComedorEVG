<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de padres.
     */
    class Padres {
        /**
         * Inserta fila a la tabla padres.
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $id ID del padre.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function post($pathParams, $queryParams, $id, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }
            
            // Insertar en tabla de padres.
            DAOUsuario::altaPadre($id);
            sleep(1);
            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>