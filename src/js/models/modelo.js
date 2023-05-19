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
        return Rest.post('cursos', [], null, true);
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
        return Rest.delete('dias', [datos.dia, datos.idUsuario, datos.idPadre]);
    }
}