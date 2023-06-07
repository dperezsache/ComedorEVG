<?php
    require_once(dirname(__DIR__) . '/models/usuario.php');
    require_once(dirname(__DIR__) . '/models/recuperacion.php');
    require_once(dirname(__DIR__) . '/models/dia.php');

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
            $sql = 'SELECT id, nombre, apellidos, correo, clave, telefono, dni, iban, titular FROM Persona';
            $sql .= ' WHERE correo = :usuario AND clave = :clave';

            $params = array('usuario' => $login->usuario, 'clave' => $login->clave);
            $clave = $login->clave;
            $sql = 'SELECT * FROM Persona';
            $sql .= ' WHERE correo = :usuario';
            $params = array('usuario' => $login->usuario);
            $resultado = BD::seleccionar($sql, $params);

            if (password_verify($clave, $resultado[0]['clave'])){
                return DAOUsuario::crearUsuario($resultado);
            }
            else {
                return false;
            }
        }
        
        /**
         * Obtener las incidencias de una fecha.
         * @param DateTime $fecha Fecha.
         * @return array Devuelve las incidencias. 
         */
        public static function obtenerIncidenciasPorDia($fecha) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'SELECT idPersona, incidencia FROM Dias';
            $sql .= ' WHERE dia=:fecha';

            $params = array('fecha' => $fecha);
            $incidencias = BD::seleccionar($sql, $params);

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');

            return $incidencias;
        }

        /**
         * Obtener las incidencias de un mes.
         * @param integer $mes Mes.
         * @return array Devuelve las incidencias. 
         */
        public static function obtenerIncidenciasPorMes($mes) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');
            //SELECT idPersona, GROUP_CONCAT(incidencia SEPARATOR ', ') AS incidencias_mes FROM Dias WHERE MONTH(dia) = 6 GROUP BY idPersona; 
            $sql = 'SELECT idPersona, GROUP_CONCAT(incidencia SEPARATOR ", ") AS incidencias FROM Dias';
            $sql .= ' WHERE MONTH(dia)=:mes';
            $sql .= ' GROUP BY idPersona';
            
            $params = array('mes' => $mes);
            $incidencias = BD::seleccionar($sql, $params);

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');

            return $incidencias;
        }

        /**
         * Inserta/modifica incidencia de un día de un usuario en concreto.
         * @param object $datos Datos de la incidencia.
         */
        public static function insertarIncidencia($datos) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'UPDATE Dias SET incidencia=:incidencia';
            $sql .= ' WHERE dia=:dia AND idPersona=:idPersona';

            $fecha = new DateTime($datos->dia);
            $fecha = $fecha->format('Y-m-d');

            $params = array(
                'dia' => $fecha,
                'incidencia' => $datos->incidencia,
                'idPersona' => $datos->idPersona
            );

            BD::actualizar($sql, $params);

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');
        }

        /**
         * Obtener filas de la tabla días de las personas cuyos IDs estén en la lista.
         * @param array $idPersonas Lista con los IDs de las personas.
         * @return array Array con los días de todas las personas.
         */
        public static function obtenerDias($idPersonas) {
            $sql = 'SELECT dia, idPersona, idPadre FROM Dias';
            $sql .= ' WHERE idPersona IN (';

            foreach ($idPersonas as $id)
                $sql .= $id . ',';

            $sql = substr_replace($sql, ")", -1);
            $resultado = BD::seleccionar($sql, null);

            return DAOUsuario::crearDias($resultado);
        }

        /**
         * Obtener los datos de las personas que tienen 'x' día asignado.
         * @param DateTime $fecha Fecha.
         */
        public static function obtenerUsuariosPorDia($fecha) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'SELECT idPersona FROM Dias';
            $sql .= ' WHERE dia=:fecha';
            $params = array('fecha' => $fecha);

            $resultados = BD::seleccionar($sql, $params);

            if (!count($resultados)) {
                if (!BD::commit()) throw new Exception('No se pudo confirmar la transacción.');
                else return false;
            }

            $sql = 'SELECT id, nombre, apellidos, correo FROM Persona';
            $sql .= ' WHERE id IN (';

            foreach ($resultados as $resultado)
                $sql .= $resultado['idPersona'] . ',';
            
            $sql = substr_replace($sql, ")", -1);
            $usuarios = BD::seleccionar($sql, null);
            
            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');
                
            return $usuarios;
        }

        /**
         * Obtener los datos de las personas que van al comedor en 'x' mes.
         * @param Integer $mes Mes.
         */
        public static function obtenerUsuariosPorMes($mes) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'SELECT idPersona FROM Dias';
            $sql .= ' WHERE MONTH(dia)=:mes';
            $params = array('mes' => $mes);

            $resultados = BD::seleccionar($sql, $params);

            if (!count($resultados)) {
                if (!BD::commit()) throw new Exception('No se pudo confirmar la transacción.');
                else return false;
            }
            //SELECT Persona.id, Persona.nombre, Persona.apellidos, Persona.correo, COUNT(Dias.idPersona) AS 'NumeroDias' FROM persona
            //LEFT JOIN Dias ON Persona.id = Dias.idPersona WHERE Persona.id IN (2) AND MONTH(Dias.dia) = 6 GROUP BY Persona.id; 
            $sql = 'SELECT Persona.id, Persona.nombre, Persona.apellidos, Persona.correo, COUNT(Dias.idPersona) AS "numeroMenus" FROM Persona';
            $sql .= ' LEFT JOIN Dias ON Persona.id = Dias.idPersona';
            $sql .= ' WHERE Persona.id IN (';

            foreach ($resultados as $resultado)
                $sql .= $resultado['idPersona'] . ',';
            
            $sql = substr_replace($sql, ")", -1);
            $sql .= ' AND MONTH(Dias.dia) = :mes';
            $sql .= ' GROUP BY Persona.id';
            $usuarios = BD::seleccionar($sql, $params);
            
            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');
                
            return $usuarios;
        }

        /**
         * Añadir fila a la tabla días
         * @param object $datos Datos del día.
         */
        public static function altaDia($datos) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'INSERT INTO Dias(dia, idPersona, idPadre)';
            $sql .= ' VALUES(:dia, :idPersona, :idPadre)';

            $params = array(
                'dia' => $datos->dia,
                'idPersona' => $datos->idPersona,
                'idPadre' => $datos->idPadre
            );

            BD::insertar($sql, $params);

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');
        }

        /**
         * Eliminar fila tabla días.
         * @param object $dia Fecha del día.
         * @param int $idPersona ID de la persona.
         * @param int $idPadre ID del padre.
         */
        public static function eliminarDia($dia, $idPersona, $idPadre) {
            $sql = 'DELETE FROM Dias';
            $sql .= ' WHERE dia=:dia AND idPersona=:idPersona AND idPadre=:idPadre';

            $params = array(
                'dia' => $dia,
                'idPersona' => $idPersona,
                'idPadre' => $idPadre
            );

            BD::borrar($sql, $params);
        } 

        /**
         * Consulta la base de datos para autenticar al usuario y devolver sus datos.
         * El email ha sido autenticado por Google.
         * @param string $email Correo del usuario.
         * @return Usuario|boolean Devuelve los datos del usuario o false si no existe el usuario.
         */
        public static function autenticarEmail($email) {
            $sql = 'SELECT id, nombre, apellidos, correo, clave, telefono, dni, iban, titular FROM Persona';
            $sql .= ' WHERE correo = :email';

            $params = array('email' => $email);
            $resultado = BD::seleccionar($sql, $params);

            return DAOUsuario::crearUsuario($resultado);
        }

        /**
         * Consulta la base de datos para ver si existe usuario con el correo electrónico pasado.
         * @param string $email Correo del usuario.
         * @return Usuario|boolean Devuelve los datos del usuario o false si no existe el usuario.
         */
        public static function existeCorreo($datos) {
            $sql = 'SELECT id, nombre, apellidos, correo, clave, telefono, dni, iban, titular FROM Persona';
            $sql .= ' WHERE correo = :email';

            $params = array('email' => $datos->correo);
            $resultado = BD::seleccionar($sql, $params);

            return DAOUsuario::crearUsuario($resultado);
        }

        /**
         * Inserta fila en la tabla de recuperacionClave.
         * @param object $datos Datos del usuario.
         * @return string Devuelve código único de la solicitud.
         */
        public static function insertarRecuperacionClave($datos) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'INSERT INTO RecuperacionClaves(id, fechaLimite, codigo)';
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

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');

            return $codigo;
        }

        /**
         * Obtiene fila de la tabla recuparacionClaves.
         * @param string $codigo Código único.
         * @return Recuperacion Objeto con la información.
         */
        public static function obtenerRecuperacionPorCodigo($codigo) {
            $sql = 'SELECT id, fechaLimite, codigo FROM RecuperacionClaves';
            $sql .= ' WHERE codigo=:codigo';

            $params = array('codigo' => $codigo);

            $resultado = BD::seleccionar($sql, $params);
            return DAOUsuario::crearRecuperacionClave($resultado);
        }

        
        /**
         * Obtiene fila de la tabla recuparacionClaves.
         * @param object $datos Datos de la Persona.
         * @return object Objeto con la información.
         */
        public static function obtenerRecuperacionPorID($datos) {
            $sql = 'SELECT id, fechaLimite, codigo FROM RecuperacionClaves';
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
            $sql = 'DELETE FROM RecuperacionClaves';
            $sql .= ' WHERE id=:id';

            $params = array('id' => $datos->id);

            BD::borrar($sql, $params);
        }

        /**
         * Genera código único de 16 caracteres.
         * @return string Código.
         */
        public static function generarUID() {
            return strtoupper(bin2hex(openssl_random_pseudo_bytes(8)));
        }

        /**
         * Añade fila a tabla 'Persona'
         * @param object $datos Datos de la Persona.
         * @return int ID de la fila insertada.
         */
        public static function altaPersona($datos) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'INSERT INTO Persona(nombre, apellidos, correo, clave, telefono, dni, iban, titular)';
            $sql .= ' VALUES(:nombre, :apellidos, :correo, :clave, :telefono, :dni, :iban, :titular)';

            if ($datos->clave != null) {
                $clave = password_hash($datos->clave, PASSWORD_DEFAULT, ['cost' => 15]);
            }
            else {
                $clave = NULL;
            }

            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos,
                'correo' => $datos->correo,
                'clave' => $clave,
                'telefono' => $datos->telefono,
                'dni' => $datos->dni,
                'iban' => $datos->iban,
                'titular' => $datos->titular
            );
            $id = BD::insertar($sql, $params);
           
            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');

            return $id;
        }

        /**
         * Inserta fila en la tabla 'Persona' solo de varios campos.
         * @param object $datos Datos del usuario.
         * @return void
         */
        public static function altaUsuarioGoogle($datos) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'INSERT INTO Persona(nombre, apellidos, correo)';
            $sql .= ' VALUES(:nombre, :apellidos, :correo)';
            $params = array(
                'nombre' => $datos['given_name'],
                'apellidos' => $datos['family_name'],
                'correo' => $datos['email']
            );

            $id = BD::insertar($sql, $params);  

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');

            return $id;
        }

        /**
         * Modifica fila de la tabla 'Persona'.
         * @param object $datos Datos de la Persona.
         * @return void
         */
        public static function modificarPersona($datos) {
            $sql = 'UPDATE Persona';
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
         * Modifica campo contraseña de una fila de la tabla 'Persona'.
         * @param object $datos Datos de la Persona.
         * @return void
         */
        public static function modificarContrasenia($datos) {
            $sql = 'UPDATE Persona';
            $sql .= ' SET clave=:clave WHERE id=:id';
            $params = array(
                'id' => $datos->id,
                'clave' => password_hash($datos->clave, PASSWORD_DEFAULT, ['cost' => 15])
            );

            BD::actualizar($sql, $params);
        }

        /**
         * Inserta fila en la tabla 'padre'.
         * @param int $id ID de la Persona.
         * @return int ID de la inserción.
         */
        public static function altaPadre($id) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');
                
            $sql = 'INSERT INTO Padre(id)';
            $sql .= ' VALUES(:id)';
            $params = array('id' => $id);

            BD::insertar($sql, $params); 
            
            if (!BD::commit())
			    throw new Exception('No se pudo confirmar la transacción.');
           
            return null;
           
        }
    
        public static function insertarHijo($datos) {

            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            // Insertar en Persona
            $sql = 'INSERT INTO Persona(nombre, apellidos)';
            $sql .= ' VALUES(:nombre, :apellidos)';

            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos
            );

            $id = BD::insertar($sql, $params);  

            // Insertar en Hijo
            $sql = 'INSERT INTO Hijo(id, idCurso)';
            $sql .= ' VALUES(:id, :idCurso)';
            $params = array(
                'id' => $id,
                'idCurso' => $datos->idCurso
            );

            BD::insertar($sql, $params); 

            // Insertar en Hijo_Padre
            $sql = 'INSERT INTO Hijo_Padre(idPadre, idHijo)';
            $sql .= ' VALUES(:idPadre, :idHijo)';
            $params = array(
                'idPadre' => $datos->id,
                'idHijo' => $id
            );

            BD::insertar($sql, $params); 

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');
        }

        /**
         * Muestra todos los hijos asociados a un padre.
         * @param int $id ID de la Persona.
         * @return object|boolean Devuelve los datos de los hijos asociados al usuario o false si no existe el usuario.
         */

        public static function dameHijos($id) {
            $sql = 'SELECT Persona.id, nombre, apellidos, idCurso FROM Persona';
            $sql .= ' INNER JOIN Hijo_Padre ON Persona.id = Hijo_Padre.idHijo';
            $sql .= ' INNER JOIN Hijo on Persona.id = Hijo.id';
            $sql .= ' WHERE Hijo_Padre.idPadre = :id';

            $params = array('id' => $id);
            $hijos = BD::seleccionar($sql, $params);

            return $hijos;
        }

        /**
         * Elimina fila de la tabla 'hijos'
         * @param int $id ID de la fila a eliminar.
         */
        public static function eliminaHijo($id){
            $sql = 'DELETE FROM Persona';
            $sql .= ' WHERE id = :id';

            $params = array('id' => $id);
            return BD::borrar($sql, $params);
        }

        /**
         * Modifica fila de la tabla 'Persona'
         * @param object $datos Datos de la Persona.
         * @return void
         */
        public static function modificarHijo($datos){
            //UPDATE Persona inner join hijo on Persona.id = Hijo.id set nombre = 'Prueba', apellidos = 'Prueba2', idCurso = 4;
            $sql = 'UPDATE Persona INNER JOIN Hijo on Persona.id = Hijo.id';
            $sql .= ' SET nombre=:nombre, apellidos=:apellidos, idCurso=:idCurso WHERE Persona.id=:id';
            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos,
                'id' => $datos->id,
                'idCurso' => $datos->idCurso
            );

            BD::actualizar($sql, $params);
        }

        /**
         * Inserta fila en la tabla 'usuario'.
         * @param int $id ID de la Persona.
         * @return int ID de la inserción.
         */
        public static function altaUsuario($id) {
            if (!BD::iniciarTransaccion())
                throw new Exception('No es posible iniciar la transacción.');

            $sql = 'INSERT INTO Usuario(id)';
            $sql .= ' VALUES(:id)';
            $params = array('id' => $id);
            $lastInsertID =  BD::insertar($sql, $params);

            if (!BD::commit())
                throw new Exception('No se pudo confirmar la transacción.');
            
            return $lastInsertID;
        }

        /**
         * Genera un listado de los días que tiene de comedor un usuario.
         * @param array $listaDias Array de datos.
         * @return array|boolean Array de dias, o False si no se pudo generar el listado.
         */
        public static function crearDias($listaDias) {
            $dias = array();

            if (count($listaDias) > 0) {
                for ($i=0; $i<count($listaDias); $i++) {
                    $dia = new Dia();
                    $dia->dia = $listaDias[$i]['dia'];
                    $dia->idPersona = $listaDias[$i]['idPersona'];
                    $dia->idPadre = $listaDias[$i]['idPadre'];
                    $dias[] = $dia;
                }
                return $dias;
            }
            else {
                return false;
            }
        }

        /**
         * Genera un objeto de tipo usuario.
         * @param array $resultSet Array de datos.
         * @return Usuario|boolean Objeto creado o False si no se pudo crear.
         */
        public static function crearUsuario($resultSet) {
            $usuario = new Usuario();
           
            if (count($resultSet) == 1) {
                $usuario->id = $resultSet[0]['id'];
                $usuario->correo = $resultSet[0]['correo'];
                $usuario->nombre = $resultSet[0]['nombre'];
                $usuario->apellidos = $resultSet[0]['apellidos'];
                $usuario->telefono = $resultSet[0]['telefono'];
                $usuario->dni = $resultSet[0]['dni'];
                $usuario->iban = $resultSet[0]['iban'];
                $usuario->titular = $resultSet[0]['titular'];
                $usuario->rol = null;
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
        /**
         * Obtener las incidencias de una fecha.
         * @param String $busqueda busqueda.
         * @return array Devuelve las incidencias. 
         */
        public static function obtenerListadoPadres($busqueda) {
            
            if ($busqueda == "null"){

                $sql = 'SELECT Persona.id, nombre, apellidos, correo, telefono, dni, iban, titular, fechaFirmaMandato, referenciaUnicaMandato FROM Persona';
                $sql .= ' INNER JOIN Padre ON Persona.id = Padre.id';
                $padres = BD::seleccionar($sql, null);

            }
            else{
                $sql = 'SELECT Persona.id, nombre, apellidos, correo, telefono, dni, iban, titular, fechaFirmaMandato, referenciaUnicaMandato FROM Persona';
                $sql .= ' INNER JOIN Padre ON Persona.id = Padre.id';
                $sql .= ' WHERE nombre LIKE :busqueda';
                $sql .= ' OR apellidos LIKE :busqueda';
                $sql .= ' OR correo LIKE :busqueda';
               
                $params = array('busqueda' => '%'.$busqueda);
                $padres = BD::seleccionar($sql, $params);
            }
           
   
            return $padres;
        }

        public static function modificarPadreSecretaria($datos) {
            
            $sql = 'UPDATE Persona';
            $sql .= ' SET nombre=:nombre, apellidos=:apellidos, correo=:correo, telefono=:telefono, dni=:dni, iban=:iban, titular=:titular';
            $sql .= ' , fechaFirmaMandato=:fechaMandato, referenciaUnicaMandato=:mandatoUnico WHERE id=:id';
          
            $params = array(
                'nombre' => $datos->nombre,
                'apellidos' => $datos->apellidos,
                'correo' => $datos->correo,
                'telefono' => $datos->telefono,
                'id' => $datos->id,
                'dni' => $datos->dni,
                'iban' => $datos->iban,
                'titular' => $datos->titular,
                'fechaMandato' => $datos->fechaMandato,
                'mandatoUnico' => $datos->mandatoUnico
            );

            BD::actualizar($sql, $params);

        }

    }
     
?>