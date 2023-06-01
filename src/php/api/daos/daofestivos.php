<?php
    /**
     * DAO de Festivos.
     * Objeto para el acceso a los datos relacionados con días festivos.
     */
    class DAOFestivos {
        /**
         * Consulta para obtener filas de la tabla 'festivo'.
         * @return array|boolean Array de los festivos, o false si no existen.
         */
        public static function obtenerFestivos($fechaInicio, $fechaFinal) {
            $sql = 'SELECT diaFestivo FROM Festivo';
            $sql .= ' WHERE diaFestivo BETWEEN :inicio AND :final';
            $params = array(
                'inicio' => $fechaInicio,
                'final' => $fechaFinal
            );
            
            $resultado = BD::seleccionar($sql, $params);
            //return $resultado;
            return self::procesarFestivos($resultado);
        }

        /**
         * Procesa los elementos del listado para convertirlos a un formato adecuado (de objeto a string).
         * @param array $listaFestivos Listado de días festivos.
         * @return array|boolean Array de festivos o False si no se pudo crear.
         */
        public static function procesarFestivos($listaFestivos) {
            $festivos = array();
            
            if (count($listaFestivos) > 0) {
                for ($i=0; $i<count($listaFestivos); $i++) {
                    $festivos[] = $listaFestivos[$i]['diaFestivo'];
                }

                return $festivos;
            }
            else {
                return false;
            }
        }
    }
?> 