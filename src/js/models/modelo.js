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
        return Rest.put('padres', [], datos, false);
    }

    /**
     * Realiza el proceso de dar de alta a un hijo.
     * @param {Object} datos Datos del hijo.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    altaHijo(datos) {
        return Rest.post('hijos', ['alta'], datos, false);
    }

    dameHijos(id){

        const idPadre = {
            "id":id
        }
        return Rest.post('hijos', ['lista'], idPadre, false)
    }
}