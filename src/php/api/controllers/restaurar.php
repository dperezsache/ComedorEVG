<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de restauración de contraseñas.
     */
    class Restaurar {
        /**
         * Verifica que la contraseña pueda ser modificada.
         * @param array $pathParams
         * @param array $queryParams
         */
        function get($pathParams, $queryParams) {
            if (count($pathParams) && count($queryParams)) {
                if ($pathParams[0] == 'codigo') {
                    $datos = DAOUsuario::obtenerRecuperacionPorCodigo($queryParams[0]);
                    sleep(1);

                    if (!$datos) {
                        header('HTTP/1.1 400 Bad Request 3');
                        die();
                    }

                    $fechaActual = new DateTime('now');
                    $fechaActual = $fechaActual->format('Y-m-d H:i:s');
                    if ($fechaActual > $datos->fechaLimite) {
                        header('HTTP/1.1 400 Bad Request 4');
                        die();
                    }

                    header('Content-type: application/json; charset=utf-8');
                    header('HTTP/1.1 200 OK');
                    echo(json_encode($datos->id));
                    die();
                }
                else {
                    header('HTTP/1.1 400 Bad Request 2');
                    die();
                }
            }
            else {
                header('HTTP/1.1 400 Bad Request 1');
                die();
            }
        }

        /**
         * Actualiza la contraseña y elimina el request asociado.
         * @param object $datos Objeto con ID y contraseña.
         */
        function put($pathParams, $queryParams, $datos) {
            DAOUsuario::modificarContrasenia($datos);
            sleep(1);

            DAOUsuario::borrarRecuperacion($datos);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>