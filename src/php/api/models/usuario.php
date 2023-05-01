<?php
    /**
     * Modelo de Usuario.
     */
    class Usuario {
        public $id = null;
        public $nombre = null;
        public $apellidos = null;
        public $correo = null;
        public $contrasenia = null;
        public $telefono = null;
        public $dni = null;
        public $iban = null;
        public $titular = null;

        public $tsConexion = null; // Timestamp de conexión
        public $autorizacion = null;
    }
?>