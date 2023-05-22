<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');

    /**
     * Controlador de recuperación de contraseñas.
     */
    class Recuperar {
        /**
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $correo Objecto que contiene el correo del usuario.
         * @param object $user Usuario que realiza el proceso.
         */
        function post($pathParams, $queryParams, $correo) {
            $usuario = DAOUsuario::existeCorreo($correo);
            sleep(1);

            if (!$usuario) {
                header('HTTP/1.1 404 Not Found');
                die();
            }

            $recuperacion = DAOUsuario::obtenerRecuperacionPorID($usuario);

            // Borrar solicitud anterior si existe.
            if ($recuperacion) {
                DAOUsuario::borrarRecuperacion($recuperacion);  
            }

            // Insertar fila en tabla RecuperacionClave
            $codigo = DAOUsuario::insertarRecuperacionClave($usuario);
            sleep(1);

            if (!$codigo) {
                header('HTTP/1.1 403 Forbidden');
                die();
            }

            // Enviar correo electrónico al usuario.
            $resultado = $this->enviarEmailRecuperacion($usuario, $codigo);
            sleep(1);

            if (!$resultado) {
                header('HTTP/1.1 403 Forbidden');
                die();
            }

            header('HTTP/1.1 200 OK');
            die();
        }

        /**
         * Envía un correo con el enlace de recuperación de la contraseña.
         * @param object $datos Datos del usuario.
         * @param string $codigo Código único.
         * @return boolean True si el correo fue mandado, False si no.
         */
        private function enviarEmailRecuperacion($datos, $codigo) {
            $para = $datos->correo;
            $titulo = 'Crear nueva contraseña Comedor EVG';

            $enlaceRestauracion = 'localhost/ComedorEVG/src/restaurar.html?codigo=' . $codigo;

            $mensaje = $datos->nombre . ', pulse en el siguiente enlace para crear una ';
            $mensaje .= ' <a href="' . $enlaceRestauracion . '">contraseña nueva</a>.';
            $mensaje .= '<br/>Este enlace solo le permitirá cambiar la contraseña hasta en un máximo de 24 horas contando desde el momento de la solicitud. ';
            $mensaje .= 'Si supera ese plazo deberá generar una nueva solicitud de cambio de contraseña.';

            $headers = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            $headers .= 'From: Comedor Escuela Virgen de Guadalupe <noreply@comedorevg.es>' . "\r\n";

            return mail($para, $titulo, $mensaje, $headers);
        }
    }
?>