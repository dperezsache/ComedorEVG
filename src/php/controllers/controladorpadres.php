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
            if (count($array) < 1)
            {
                return 0;
            }
            else
            {
                if (isset($array['nombre']) && !empty($array['nombre']) &&
                isset($array['apellidos']) && !empty($array['apellidos']) &&
                isset($array['correo']) && !empty($array['correo']) &&
                isset($array['contrasenia']) && !empty($array['contrasenia']) &&
                isset($array['telefono']) && !empty($array['telefono']) &&
                isset($array['dni']) && !empty($array['dni']) &&
                isset($array['iban']) && !empty($array['iban']) &&
                isset($array['titular']) && !empty($array['titular'])) {
                    return $this->modelo->altaPadre($array);
                }
                else 
                {
                    return -2;
                }
            }
        }
    }
?>