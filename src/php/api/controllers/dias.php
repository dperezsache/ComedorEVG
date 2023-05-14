<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de hijos.
     */
    class Dias {
        /**
         * Obtener filas de la tabla dias.
         * @param $pathParams No utilizado.
         * @param $queryParams Array de IDs.
         * @param $datos Datos del usuario.
         */
        function get($pathParams, $queryParams) {
            if (count($queryParams)) {
                $resultado = DAOUsuario::obtenerDias($queryParams);

                header('Content-type: application/json; charset=utf-8');
                header('HTTP/1.1 200 OK');
                echo(json_encode($resultado));
                die();
            }
            else {
                header('HTTP/1.1 400 Bad Request');
                die();
            }
        }

        /**
         * Inserta fila a la tabla dias.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado.
         * @param $datos Datos del usuario.
         */
        function post($pathParams, $queryParams, $datos) {
            DAOUsuario::altaDia($datos);

            header('HTTP/1.1 200 OK');
            die();
        }

        /**
         * Borrar fila de la tabla dias
         * @param $pathParams Datos del día.
         * @param $queryParams No utilizado.
         */
        function delete($pathParams, $queryParams){
            if (count($pathParams)) {
                $fecha = new DateTime($pathParams[0]);
                $fecha = $fecha->format('Y/m/d');
                DAOUsuario::eliminarDia($fecha, $pathParams[1], $pathParams[2]);

                header('HTTP/1.1 200 OK');
                die();
            }
            else {
                header('HTTP/1.1 400 Bad Request');
                die();
            }
        }
    }
?>