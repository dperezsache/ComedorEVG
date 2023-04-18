<?php
    require_once(dirname(__DIR__) . '/models/modelopadres.php');

    /**
     * Controlador de los procesos de los padres.
     */
    class ControladorPadres 
    {
        private $modelo;

        /**
         * Constructor de la clase. Inicializa el modelo.
         */
        public function __construct() 
        {
            $this->modelo = new ModeloPadres();
        }

        /**
         * Comprueba que se pueda realizar el proceso de alta.
         * @param mixed $array Array de datos.
         * @return int Nº del resultado del proceso.
         */
        public function altaPadre($array) 
        {
            if (count($array) < 1)  // Array vacío
            {
                return 0;
            }
            else
            {
                return $this->modelo->altaPadre($array);
            }
        }

        public function modificarPadre($array)
        {
            if (isset($_SESSION['idPadre']) && isset($array['nombre']) && isset($array['apellidos']) && isset($array['correo']) && isset($array['telefono']))
            {
                if (!empty(isset($array['nombre']) && !empty($array['apellidos']) && !empty($array['correo']) && !empty($array['telefono'])))
                {
                    return $this->modelo->modificarPadre($_SESSION['idPadre'], $array);
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }
        
        /**
         * Devuelve los datos del usuario actual.
         * @return Mixed
         */
        public function obtenerDatos() 
        {
            if (isset($_SESSION['idPadre']))
            {
                return $this->modelo->obtenerDatosPadre($_SESSION['idPadre']);
            }
            else
            {
                return null;
            }
        }
    }
?>