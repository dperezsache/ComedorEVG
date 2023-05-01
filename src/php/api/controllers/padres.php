<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de autenticación.
     */
    class Padres {
        /**
         * Inserta al padre con sus datos en la base datos.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function post($pathParams, $queryParams, $datos) {
            global $config;

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

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($id);
            die();
        }

        /**
         * Actualiza los datos de un padre.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function put($pathParams, $queryParams, $datos) {
            global $config;

            DAOUsuario::modificarUsuarioPadre($datos);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>