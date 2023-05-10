<?php
    require_once(dirname(__DIR__) . '/models/usuario.php');

    /**
     * DAO de Usuario.
     * Objeto para el acceso a los datos relacionados con usuarios.
     */
    class DAOUsuario {
        /**
         * Consulta la base de datos para autenticar al usuario y devolver sus datos.
         * @param object $login Login Modelo de login.
         * @return object|boolean Devuelve los datos del usuario o false si no existe el usuario. 
         */
        public static function autenticarLogin($login) {
            $clave = $login->clave;
            $sql = 'SELECT * FROM persona';
            $sql .= ' WHERE correo = :usuario';
            $params = array('usuario' => $login->usuario);
            $resultado = BD::seleccionar($sql, $params);

            if (password_verify($clave, $resultado[0]['contrasenia'])){
            
                return DAOUsuario::crearUsuario($resultado, true);
            }
            
            return DAOUsuario::crearUsuario($resultado, false);
        }
        
        /**
         * Consulta la base de datos para autenticar al usuario y devolver sus datos.
         * El email ha sido autenticado por Google.
         * @param string $email Correo del usuario.
         * @return object|boolean Devuelve los datos del usuario o false si no existe el usuario.
         */
        public static function autenticarEmail($email) {
            $sql = 'SELECT * FROM persona';
            $sql .= ' WHERE correo = :email';

            $params = array('email' => $email);
            $resultado = BD::seleccionar($sql, $params);

            return DAOUsuario::crearUsuario($resultado);
        }

        public static function altaPersona($datos) {
            $sql = 'INSERT INTO persona(nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular)';
            $sql .= ' VALUES(:nombre, :apellidos, :correo, :contrasenia, :telefono, :dni, :iban, :titular)';
            if ($datos->contrasenia == null){
                $params = array(
                    'nombre' => $datos->nombre,
                    'apellidos' => $datos->apellidos,
                    'correo' => $datos->correo,
                    'contrasenia' => $datos->contrasenia,
                    'telefono' => $datos->telefono,
                    'dni' => $datos->dni,
                    'iban' => $datos->iban,
                    'titular' => $datos->titular
                );  
            }
            else{
                $params = array(
                    'nombre' => $datos->nombre,
                    'apellidos' => $datos->apellidos,
                    'correo' => $datos->correo,
                    'contrasenia' => password_hash( $datos->contrasenia, PASSWORD_DEFAULT),
                    'telefono' => $datos->telefono,
                    'dni' => $datos->dni,
                    'iban' => $datos->iban,
                    'titular' => $datos->titular
                );
            }
            
            return BD::insertar($sql, $params);  
        }

        public static function altaUsuarioGoogle($datos) {
            $sql = 'INSERT INTO persona(nombre, apellidos, correo)';
            $sql .= ' VALUES(:nombre, :apellidos, :correo)';
            $params = array(
                'nombre' => $datos['given_name'],
                'apellidos' => $datos['family_name'],
                'correo' => $datos['email']
            );

            return BD::insertar($sql, $params);  
        }

        /**
         * Modifica los datos de una persona.
         * @param object $datos Datos de la persona.
         * @return void
         */
        public static function modificarUsuarioPadre($datos) {
            $sql = 'UPDATE persona';
            $sql .= ' SET nombre=:nombre, apellidos=:apellidos, correo=:correo, telefono=:telefono WHERE id=:id';
            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos,
                'correo' => $datos->correo,
                'telefono' => $datos->telefono,
                'id' => $datos->id
            );

            BD::actualizar($sql, $params);
        }

        /**
         * Inserta una fila en la tabla padre.
         * @param int $id ID de la persona.
         * @return int ID de la inserción.
         */
        public static function altaPadre($id) {
            $sql = 'INSERT INTO padre(id)';
            $sql .= ' VALUES(:id)';
            $params = array('id' => $id);

            return BD::insertar($sql, $params); 
        }
        
        /**
         * Inserta una fila en la tabla hijo.
         * @param int $id ID de la persona.
         * @return int ID de la inserción.
         */
        public static function altaHijo($id) {
            $sql = 'INSERT INTO hijo(id)';
            $sql .= ' VALUES(:id)';
            $params = array('id' => $id);

            return BD::insertar($sql, $params); 
        }

         /**
         * Muestra todos los hijos asociados a un padre.
         * @param int $id ID de la persona.
         * @return  object|boolean Devuelve los datos de los hijos asociados al usuario o false si no existe el usuario.
         */

        public static function dameHijos($id){
           
            $sql = 'SELECT id, nombre, apellidos FROM persona';
            $sql .= ' INNER JOIN padresHijos';
            $sql .= ' ON persona.id = padresHijos.idHijo';
            $sql .= ' WHERE padresHijos.idPadre = :id';

            $params = array('id' => $id);

            $hijos = BD::seleccionar($sql, $params);
          
            return $hijos;
        }

        public static function eliminaHijo($id){
            $sql = 'DELETE FROM persona';
            $sql .= ' WHERE id = :id';

            $params = array('id' => $id);

            return BD::borrar($sql, $params);
        }

        public static function modificarHijo($datos){
            $sql = 'UPDATE persona';
            $sql .= ' SET nombre=:nombre, apellidos=:apellidos WHERE id=:id';
            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos,
                'id' => $datos->id
            );

            BD::actualizar($sql, $params);
        }
        /**
         * Inserta una fila en la tabla padresHijos.
         * @param object $datos Datos de la persona.
         * @param int $id ID de la persona.
         * @return int ID de la inserción.
         */
        public static function altaPadreHijo($datos, $id) {
            $sql = 'INSERT INTO padresHijos(idPadre, idHijo)';
            $sql .= ' VALUES(:idPadre, :idHijo)';
            $params = array(
                'idPadre' => $datos->id,
                'idHijo' => $id
            );

            return BD::insertar($sql, $params); 
        }

        /**
         * Inserta una fila en la tabla usuario.
         * @param int $id ID de la persona.
         * @return int ID de la inserción.
         */
        public static function altaUsuario($id) {
            $sql = 'INSERT INTO usuario(id)';
            $sql .= ' VALUES(:id)';
            $params = array('id' => $id);

            return BD::insertar($sql, $params); 
        }

        /**
         * Genera un objeto de tipo usuario.
         * @param array $resultSet Array de datos.
         * @return object Objeto usuario.
         */
        public static function crearUsuario($resultSet, $valido) {
            $usuario = new Usuario();
           
            if (count($resultSet) == 1 and $valido == true) {
                $usuario->id = $resultSet[0]['id'];
                $usuario->correo = $resultSet[0]['correo'];
                $usuario->nombre = $resultSet[0]['nombre'];
                $usuario->apellidos = $resultSet[0]['apellidos'];
                $usuario->telefono = $resultSet[0]['telefono'];
            }
            else {
                $usuario = false;
            }

            return $usuario;
        }
    }
?>