<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');
    require_once(dirname(__DIR__) . '/models/usuario.php');

    class Curso {
        
        function get($pathParams, $queryParams){
            global $config;
        
            $cursos = DAOUsuario::dameCursos();
            
            $json = json_encode($cursos);
            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo $json;
            die();
        }
    }