import { Rest } from "../services/rest.js";

/**
 * Modelo de la aplicación.
 * Se responsabiliza del mantenimiento y gestión de los datos.
 * Utiliza el Servicio de Rest.
 */
export class Modelo {
    /**
     * Realiza el proceso de modificación de un padre.
     * @param {Object} datos Datos del padre.
     * @return {Promise} Devuelve la promesa asociada a la petición.
     */
    modificarPadre(datos) {
        return Rest.put('persona', [], datos, false);
    }

    /**
     * Realiza el proceso de dar de alta a un hijo.
     * @param {Object} datos Datos del hijo.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    altaHijo(datos) {
        let path = 'alta';
        return Rest.post('hijos', [path], datos, false);
    }

    /**
     * Realiza el proceso de obtener todas las filas de la tabla curso.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerCursos() {
        return Rest.get('cursos', [], []);
    }

    /**
     * Realiza el proceso de obtener filas de la tabla festivos.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerFestivos(inicioSemana) {
        let fechaFinal = new Date();
        fechaFinal.setDate(inicioSemana.getDate() + 4);

        const queryParams = new Map();
        queryParams.set('inicio', inicioSemana.getDate() + '-' + (inicioSemana.getMonth()+1) + '-' + inicioSemana.getFullYear());
        queryParams.set('final', fechaFinal.getDate() + '-' + (fechaFinal.getMonth()+1) + '-' + fechaFinal.getFullYear());

        return Rest.get('festivos', [], queryParams);
    }

    /**
     * Obtener hijos de un padre.
     * @param {Array} id ID del padre.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    dameHijos(id) {
        const queryParams = new Map();
        queryParams.set('id', id);
        return Rest.get('hijos', [], queryParams);
    }

    /**
     * Eliminar fila de las tablas: persona, hijo y padres_hijos.
     * @param {Array} id ID del hijo.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    eliminarHijo(id) {
        return Rest.delete('hijos', [id])
    }

    /**
     * Llamada para modificar fila de la tabla persona.
     * @param {Array} datos Datos a enviar.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    modificarHijo(datos) {
        return Rest.put('hijos', [], datos, false);
    }

    /**
     * Llamada para obtener filas de la tabla dias.
     * @param {Array} ids Array de IDs a enviar.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerDiasComedor(ids) {
        return Rest.get('dias', [], ids);
    }

    /**
     * Llamada para insertar fila a la tabla dias.
     * @param {Object} datos Datos a enviar.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    marcarDiaComedor(datos) {
        return Rest.post('dias', [], datos, false);
    }

    /**
     * Llamada para borrar fila de la tabla dias.
     * @param {Object} datos Datos a enviar.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    desmarcarDiaComedor(datos) {
        return Rest.delete('dias', [datos.dia, datos.idPersona, datos.idPadre]);
    }

    /**
     * Llamada para obtener usuarios apuntados al comedor en la fecha.
     * @param {String} fecha String de la fecha. 
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerUsuariosApuntados(fecha) {
        const queryParams = new Map();
        queryParams.set('proceso', 'usuarios');
        queryParams.set('fecha', fecha.getDate() + '-' + (fecha.getMonth()+1) + '-' + fecha.getFullYear());
        return Rest.get('secretaria', [], queryParams);
    }

    /**
     * Llamada para obtener las incidencias de los usuarios del comedor de una fecha.
     * @param {String} fecha String de la fecha. 
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerIncidencias(fecha) {
        const queryParams = new Map();
        queryParams.set('proceso', 'incidencias');
        queryParams.set('fecha', fecha.getDate() + '-' + (fecha.getMonth()+1) + '-' + fecha.getFullYear());
        return Rest.get('secretaria', [], queryParams);
    }

    /**
     * Llamada para obtener a los usuarios apuntados al comedor en un mes.
     * @param {Number} mes Nº del mes.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerUsuariosApuntadosMensual(mes) {
        const queryParams = new Map();
        queryParams.set('proceso', 'usuariosMes');
        queryParams.set('mes', mes);
        return Rest.get('secretaria', [], queryParams);
    }

    /**
     * Llamada para obtener las incidencias de los usuarios del comedor de un mes.
     * @param {Number} mes Nº del mes.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerIncidenciasMensual(mes) {
        const queryParams = new Map();
        queryParams.set('proceso', 'incidenciasMes');
        queryParams.set('mes', mes);
        return Rest.get('secretaria', [], queryParams);
    }

    /**
     * Llamada para insertar o modificar incidencia.
     * @param {String} fecha String de la fecha. 
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    insertarIncidencia(datos) {
        return Rest.put('secretaria', [], datos, false);
    }

    obtenerListadoPadres(busqueda){
        const queryParams = new Map();

        queryParams.set('proceso', 'padres');
        queryParams.set('busqueda', busqueda);

        return Rest.get('secretaria', [], queryParams);
    }

    modificarPadreSecretaria(datos) {
       
        return Rest.put('secretaria', ['modificarPadre'], datos);
    }

}