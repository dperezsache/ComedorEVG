<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de registro de personas.
     */
    class Persona {
        /**
         * Inserta fila a la tabla persona.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function post($pathParams, $queryParams, $datos) {
            // Insertar en tabla de personas.
            $id = DAOUsuario::altaPersona($datos);
            sleep(1);

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($id);
            die();
        }

        /**
         * Actualiza fila tabla persona.
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