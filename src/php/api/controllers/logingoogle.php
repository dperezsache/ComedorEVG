<?php
    require_once('vendor/autoload.php');
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * Controlador de autenticación.
     * Ref: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
     */
    class LoginGoogle {
        // Se configura por inyección de dependencias
        public static $clave = null;
        public static $algoritmo_encriptacion = null;
        public static $iv = 'Sd5LzPt2fxW+rQfF';

        //Id de cliente de Google.
        private static $ID_CLIENTE = '829640902680-48t2uq3us7qit3ehbusp2t6fldfeh6r6.apps.googleusercontent.com';

        /**
         * Autentifica al usuario con el email y la clave.
         * Devuelve por HTTP el objeto usuario en formato JSON.
         * @param string $pathParams No utilizado.
         * @param string $queryParams No utilizado.
         * @param string $token Token de login de Google.
         */
        function post($pathParams, $queryParams, $token){
            $client = new Google_Client(['client_id' => self::$ID_CLIENTE]);
            $payload = $client->verifyIdToken($token);

            if (!$payload) {
                // Invalid ID token
                header('HTTP/1.1 401 Unauthorized');
                die();
            }

            //El usuario ha sido identificado por Google
            $usuario = DAOUsuario::autenticarEmail($payload['email']);
            sleep(1);

            if (!$usuario) {
                $id = DAOUsuario::altaUsuarioGoogle($payload);
                sleep(1);

                if (!$id) {
                    header('HTTP/1.1 400 Bad Request');
                    die();
                }

                DAOUsuario::altaUsuario($id);
                sleep(1);

                $usuario = new Usuario();
            }

            //Completamos los datos del usuario
            $usuario->nombre = $payload['given_name'];
            $usuario->apellidos = $payload['family_name'];
            $usuario->correo = $payload['email'];
            $usuario->autorizacion = openssl_encrypt(json_encode($usuario), self::$algoritmo_encriptacion, self::$clave, 0, self::$iv);

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($usuario);
            die();
        }
    }
?>