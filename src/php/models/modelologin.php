<?php
    require_once('modelodb.php');

    /**
     * Clase ModeloLogin.
     * Clase que ejecuta los procesos requeridos para hacer el inicio de sesión.
     */
    class ModeloLogin
    {
        private $conexion;

        /** 
         * Obtiene la conexión a la BBDD.
         */
        public function obtenerConexion()
        {
            $objConectar = new ModeloDB();
            $this->conexion = $objConectar->conexion;
        }

        /**
         * Iniciar sesión.
         * @param String $correo Correo del usuario.
         * @param String $password Contraseña.
         */
        public function inicioSesion($correo, $password)
        {
            try
            {
                $this->obtenerConexion();

                if ($this->conexion != null)
                {
                    $sql = "SELECT * FROM Padres WHERE correo=?";
                    
                    $consulta = $this->conexion->prepare($sql);
                    $consulta->bind_param('s', $correo);
                    $consulta->execute();

                    $resultado = $consulta->get_result();

                    $this->conexion->close();
                    $consulta->close();

                    if ($resultado->num_rows > 0)
                    {
                        $fila = $resultado->fetch_array(MYSQLI_ASSOC);
   
						if ($fila['contrasenia'] = $password)
                        {
                            $this->generarSesion($fila['id']);
                            return 1;   // Validacion OK.
                        }
                        else
                        {
                            return -3;  // Validacion contraseña incorrecta.
                        }
                    }
                    else
                    {
                        return -2;  // Validacion incorrecta.
                    }
                }
                else
                {
                    return -1;  // No conexión.
                }
            }
            catch(mysqli_sql_exception $e)
            {
                return $e->getCode();   // Devolver código de error.
            }
        }

        /**
         * Genera la sesión del usuario.
         * @param Number $id ID del padre.
         */
        public function generarSesion($id)
        {
            ini_set('session.use_strict_mode', true);   // Activar modo estricto.
            ini_set('session.use_only_cookies', 1);     // Forzar las sesiones a usar solo cookies. 
            session_set_cookie_params(0);               // La sesión del cliente caducará cúando se cierre el navegador.
            session_start();                            // Iniciar la sesión.

            $_SESSION['idPadre'] = $id;
        }

        /**
         * Realizar el cierre de sesión del usuario actual.
         */
        public function cerrarSesion()
        {
            session_start();   
            session_destroy();  // Destruye los datos de sesión almacenados (ID de sesión).
        }
	}
?>