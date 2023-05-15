<?php
    require_once(dirname(__DIR__) . '/daos/daocursos.php');

    /**
     * Controlador de cursos.
     */
    class Cursos {
        /**
         * Sacar los cursos.
         * @param $pathParams No utilizado.
         * @param $queryParams No utilizado..
         */
        function post($pathParams, $queryParams) {
            $cursos = DAOCurso::obtenerCursos();
            sleep(1);

            if (!$cursos) {
                header('HTTP/1.1 404 Not Found');
                die();
            }

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($cursos);
            die();
        }
    }
?>