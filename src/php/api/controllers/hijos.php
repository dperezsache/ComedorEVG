<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');

    /**
     * Controlador de hijos.
     */
    class Hijos {
        /**
         * Inserta al hijo con sus datos en la base datos.
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

            DAOUSuario::insertarHijo($datos);
            sleep(1);
            header('HTTP/1.1 200 OK');
            die();
        }
        
        /**
         * Devuelve los hijos de un padre.
         * @param array $pathParams No utilizado.
         * @param array $queryParams Aquí viaja el ID del padre.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function get($pathParams, $queryParams, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

            $hijos = DAOUsuario::dameHijos($queryParams['id']);
            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($hijos);
            die();
        }

        /**
         * Borra un hijo.
         * @param array $pathParams Aquí viaja el ID del hijo a borrar.
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
                DAOUsuario::eliminaPersona($pathParams[0]);
                header('HTTP/1.1 200 OK');
                die();
            }

            header('HTTP/1.1 404 Not Found');
            die();
        }
        
        /**
         * Modifica un hijo.
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $datos Datos del hijo.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function put($pathParams, $queryParams, $datos, $usuario) {
            // Si no existe $usuario, es porque la autorización ha fallado.
            if (!$usuario) {
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

            DAOUsuario::modificarHijo($datos);
            sleep(1);
            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>