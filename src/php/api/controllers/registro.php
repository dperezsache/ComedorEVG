<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de registro de padres.
     */
    class Registro {
        /**
         * Inserta al padre con sus datos en la base datos.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function post($pathParams, $queryParams, $datos) {
            // Insertar en tabla de personas.
            $id = DAOUsuario::altaPersona($datos);
            sleep(1);

            if (!$id) {
                header('HTTP/1.1 400 Bad Request');
                die();
            }

            // Insertar en tabla de padres.
            DAOUsuario::altaPadre($id);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }

        /**
         * Actualiza los datos de un padre.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function put($pathParams, $queryParams, $datos) {
            DAOUsuario::modificarPersona($datos);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>