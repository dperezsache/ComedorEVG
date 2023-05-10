<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de hijos.
     */
    class Hijos {
        /**
         * Inserta al hijo con sus datos en la base datos.
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

            // Insertar en tabla de hijos.
            DAOUsuario::altaHijo($id);
            sleep(1);
            
            //Insertar en tabla de padreshijo
            DAOUsuario::altaPadreHijo($datos, $id);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }
        
        function get($pathParams, $queryParams){
            global $config;
        
            $hijos = DAOUsuario::dameHijos($queryParams['id']);
            
            $json = json_encode($hijos);
            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo $json;
            die();
        }

        function delete($pathParams, $queryParams){
            global $config;
            var_dump($pathParams);
            $id = DAOUsuario::eliminaHijo($pathParams[0]);

            //Respuesta a un DELETE
            header('HTTP/1.1 200 Ok');
            die();
        }
        
        function put($pathParams, $queryParams, $datos){
            global $config;
            var_dump($datos);
            DAOUsuario::modificarHijo($datos);
            sleep(1);

            header('HTTP/1.1 200 OK');
            die();
        }
    }
?>