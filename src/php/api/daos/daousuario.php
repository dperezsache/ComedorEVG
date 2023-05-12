<?php
    require_once(dirname(__DIR__) . '/models/usuario.php');
    require_once(dirname(__DIR__) . '/models/recuperacion.php');

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
            $sql = 'SELECT id, nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular FROM persona';
            $sql .= ' WHERE correo = :usuario AND contrasenia = :clave';

            $params = array('usuario' => $login->usuario, 'clave' => $login->clave);
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
         * @return Usuario|boolean Devuelve los datos del usuario o false si no existe el usuario.
         */
        public static function autenticarEmail($email) {
            $sql = 'SELECT id, nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular FROM persona';
            $sql .= ' WHERE correo = :email';

            $params = array('email' => $email);
            $resultado = BD::seleccionar($sql, $params);

            return DAOUsuario::crearUsuario($resultado, true);
        }

        /**
         * Consulta la base de datos para ver si existe usuario con el correo electrónico pasado.
         * @param string $email Correo del usuario.
         * @return Usuario|boolean Devuelve los datos del usuario o false si no existe el usuario.
         */
        public static function existeCorreo($datos) {
            $sql = 'SELECT id, nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular FROM persona';
            $sql .= ' WHERE correo = :email';

            $params = array('email' => $datos->correo);
            $resultado = BD::seleccionar($sql, $params);

            return DAOUsuario::crearUsuario($resultado, true);
        }

        /**
         * Inserta fila en la tabla de recuperacionClave.
         * @param object $datos Datos del usuario.
         * @return string Devuelve código único de la solicitud.
         */
        public static function insertarRecuperacionClave($datos) {
            $sql = 'INSERT INTO recuperacionClaves(id, fechaLimite, codigo)';
            $sql .= ' VALUES(:id, :fechaLimite, :codigo)';

            $fecha = new DateTime('now');
            $fecha->modify('+1 day');

            $codigo = self::generarUID();

            $params = array(
                'id' => $datos->id,
                'fechaLimite' => $fecha->format('Y-m-d H:i:s'),
                'codigo' => $codigo
            );

            BD::insertar($sql, $params);
            return $codigo;
        }

        /**
         * Obtiene fila de la tabla recuparacionClaves.
         * @param string $codigo Código único.
         * @return Recuperacion Objeto con la información.
         */
        public static function obtenerRecuperacionPorCodigo($codigo) {
            $sql = 'SELECT id, fechaLimite, codigo FROM recuperacionClaves';
            $sql .= ' WHERE codigo=:codigo';

            $params = array('codigo' => $codigo);

            $resultado = BD::seleccionar($sql, $params);
            return DAOUsuario::crearRecuperacionClave($resultado);
        }

        
        /**
         * Obtiene fila de la tabla recuparacionClaves.
         * @param object $datos Datos de la persona.
         * @return object Objeto con la información.
         */
        public static function obtenerRecuperacionPorID($datos) {
            $sql = 'SELECT id, fechaLimite, codigo FROM recuperacionClaves';
            $sql .= ' WHERE id=:id';

            $params = array('id' => $datos->id);

            $resultado = BD::seleccionar($sql, $params);
            return DAOUsuario::crearRecuperacionClave($resultado);
        }

        /**
         * Borra fila de la tabla recuperacionClaves.
         * @param object $datos Datos de la fila.
         */
        public static function borrarRecuperacion($datos) {
            $sql = 'DELETE FROM recuperacionClaves';
            $sql .= ' WHERE id=:id';

            $params = array('id' => $datos->id);

            BD::borrar($sql, $params);
        }

        /**
         * Envía un correo con el enlace de recuperación de la contraseña.
         * @param object $datos Datos del usuario.
         * @param string $codigo Código único.
         * @return boolean True si el correo fue mandado, False si no.
         */
        public static function enviarEmailRecuperacion($datos, $codigo) {
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

        /**
         * Genera código único de 16 caracteres.
         * @return string Código.
         */
        public static function generarUID() {
            return strtoupper(bin2hex(openssl_random_pseudo_bytes(8)));
        }

        /**
         * Añade fila a tabla 'persona'
         * @param object $datos Datos de la persona.
         * @return int ID de la fila insertada.
         */
        public static function altaPersona($datos) {
            $sql = 'INSERT INTO persona(nombre, apellidos, correo, contrasenia, telefono, dni, iban, titular)';
            $sql .= ' VALUES(:nombre, :apellidos, :correo, :contrasenia, :telefono, :dni, :iban, :titular)';

            if ($datos->contrasenia != null) {
                $clave = password_hash($datos->contrasenia, PASSWORD_DEFAULT, ['cost' => 15]);
            }
            else {
                $clave = NULL;
            }

            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos,
                'correo' => $datos->correo,
                'contrasenia' => $clave,
                'telefono' => $datos->telefono,
                'dni' => $datos->dni,
                'iban' => $datos->iban,
                'titular' => $datos->titular
            );
            
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
         * Modifica fila de la tabla 'persona'.
         * @param object $datos Datos de la persona.
         * @return void
         */
        public static function modificarPersona($datos) {
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
         * Modifica campo contraseña de una fila de la tabla 'persona'.
         * @param object $datos Datos de la persona.
         * @return void
         */
        public static function modificarContrasenia($datos) {
            $sql = 'UPDATE persona';
            $sql .= ' SET contrasenia=:contrasenia WHERE id=:id';
            $params = array(
                'id' => $datos->id,
                'contrasenia' => password_hash($datos->contrasenia, PASSWORD_DEFAULT, ['cost' => 15])
            );

            BD::actualizar($sql, $params);
        }

        /**
         * Inserta fila en la tabla 'padre'.
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
         * Inserta fila en la tabla 'hijo'.
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
            $sql .= ' INNER JOIN Hijo_Padre';
            $sql .= ' ON persona.id = Hijo_Padre.idHijo';
            $sql .= ' WHERE Hijo_Padre.idPadre = :id';

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
         * Inserta fila en la tabla 'padresHijos'.
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
         * Inserta fila en la tabla 'usuario'.
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
         * @return Usuario|boolean Objeto creado o False si no se pudo crear.
         */
        public static function crearUsuario($resultSet, $valido) {
            $usuario = new Usuario();
           
            if (count($resultSet) == 1 and $valido == true) {
                $usuario->id = $resultSet[0]['id'];
                $usuario->correo = $resultSet[0]['correo'];
                $usuario->nombre = $resultSet[0]['nombre'];
                $usuario->apellidos = $resultSet[0]['apellidos'];
                $usuario->telefono = $resultSet[0]['telefono'];
                $usuario->dni = $resultSet[0]['dni'];
                $usuario->iban = $resultSet[0]['iban'];
                $usuario->titular = $resultSet[0]['titular'];
            }
            else {
                $usuario = false;
            }

            return $usuario;
        }

        /**
         * Genera un objeto de tipo recuperacion de claves.
         * @param array $resultSet Array de datos.
         * @return Recuperacion|boolean Objeto creado o False si no se pudo crear.
         */
        public static function crearRecuperacionClave($resultSet) {
            $recuperacion = new Recuperacion();

            if (count($resultSet) == 1) {
                $recuperacion->id = $resultSet[0]['id'];
                $recuperacion->fechaLimite = $resultSet[0]['fechaLimite'];
                $recuperacion->codigo = $resultSet[0]['codigo'];
            }
            else {
                $recuperacion = false;
            }

            return $recuperacion;
        }
    }
?>