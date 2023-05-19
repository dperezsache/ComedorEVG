<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de hijos.
     */
    class Dias {
        /**
         * Obtener filas de la tabla dias.
         * @param array $pathParams No utilizado.
         * @param array $queryParams Array de IDs.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function get($pathParams, $queryParams, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

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
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $datos Datos del usuario.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function post($pathParams, $queryParams, $datos, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

            DAOUsuario::altaDia($datos);
            header('HTTP/1.1 200 OK');
            die();
        }

        /**
         * Borrar fila de la tabla dias
         * @param array $pathParams Datos del día.
         * @param array $queryParams No utilizado.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function delete($pathParams, $queryParams, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

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