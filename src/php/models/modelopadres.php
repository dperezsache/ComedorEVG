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
         * @return int Nº de resultado del proceso.
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

                    //Contraseña haseada

                    $hash = password_hash($contrasenia, PASSWORD_DEFAULT);

                    $sql = "INSERT INTO persona(nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    
                    $consulta = $this->conexion->prepare($sql);
                    $consulta->bind_param('ssssssss', $nombre, $apellidos, $correo, $hash, $telefono, $dni, $iban, $titular);
                    $consulta->execute();
    
                    $id = $consulta->insert_id; 

                    $sql = "INSERT INTO padre(id) VALUES(?)";
                    $consulta = $this->conexion->prepare($sql);
                    $consulta->bind_param('i', $id);
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

        /**
         * Llama al proceso de modificación de padres.
         * @param int $id ID del padre.
         * @param mixed $array Array de datos.
         */
        public function modificarPadre($id, $array)
        {
            try
            {
                $this->obtenerConexion();

                if ($this->conexion != null)
                {
                    $nombre = $array['nombre'];
                    $apellidos = $array['apellidos'];
                    $correo = $array['correo'];
                    $telefono = $array['telefono'];

                    $sql = "UPDATE persona SET nombre=?, apellidos=?, correo=?, telefono=? WHERE id=?";
                    $consulta = $this->conexion->prepare($sql);
                    $consulta->bind_param('ssssi', $nombre, $apellidos, $correo, $telefono, $id);
                    $consulta->execute();

                    $this->conexion->close();

                    if ($consulta->affected_rows > 0)
                    {
                        $consulta->close();
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
            catch(mysqli_sql_exception $e)
            {
                return $e->getCode();
            }
        }

        /**
         * Devuelve los datos del padre.
         * @param int $id ID del padre.
         * @return mixed
         */
        public function obtenerDatosPadre($id)
        {
            try
            {
                $this->obtenerConexion();

                if ($this->conexion != null)
                {
                    $sql = "SELECT * FROM persona WHERE id=?";

                    $consulta = $this->conexion->prepare($sql);
                    $consulta->bind_param('i', $id);
                    $consulta->execute();
                    $resultado = $consulta->get_result();

                    $consulta->close();

                    if ($resultado->num_rows > 0)
                    {
                        $fila = $resultado->fetch_assoc();
                        return $fila;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            catch(mysqli_sql_exception $e)
            {
                return null;
            }
        }
    }
?>