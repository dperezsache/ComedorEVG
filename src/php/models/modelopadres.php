<?php
    require_once('modelodb.php');

    class ModeloPadres 
    {
        private $conexion;

        public function obtenerConexion() 
        {
            $objConectar = new ModeloDB();
            $this->conexion = $objConectar->conexion;
        }

        /**
         * Realiza la inserción de un padre en la BBDD.
         * @param mixed $array Array POST con los datos.
         * @return void
         */
        public function altaPadre($array) 
        {
            try 
            {
                $this->obtenerConexion();

                if ($this->conexion != null) 
                {
                    $nombre = $array['nombre'];
                    $apellidos = $array['apellidos'];
                    $correo = $array['correo'];
                    $contrasenia = $array['contrasenia'];
                    $telefono = $array['telefono'];
                    $dni = $array['dni'];
                    $iban = $array['iban'];
                    $titular = $array['titular'];
    
                    $sql = "INSERT INTO padres(nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    
                    $consulta = $this->conexion->prepare($sql);
                    $consulta->bind_param('ssssssss', $nombre, $apellidos, $correo, $contrasenia, $telefono, $dni, $iban, $titular);
                    $consulta->execute();
    
                    $afectadas = $consulta->affected_rows;
                    $consulta->close();
                    $this->conexion->close();
    
                    if ($afectadas > 0) 
                    {
                        return 1;
                    }
                    else 
                    {
                        return 0;
                    }
                }
                else
                {
                    return -1;
                }
            }
            catch (mysqli_sql_exception $e) 
            {
                return $e->getCode();
            }
        }
    }
?>