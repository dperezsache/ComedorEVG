import { Rest } from "../services/rest.js";

/**
 * Modelo de la aplicación.
 * Se responsabiliza del mantenimiento y gestión de los datos.
 * Utiliza el Servicio de Rest.
 */
export class Modelo {
    /**
     * Realiza el proceso de modificación de un padre.
     * @param {Object} Datos Datos del padre.
     * @return {Promise} Devuelve la promesa asociada a la petición.
     */
    modificarPadre(datos) {
        return Rest.put('padres', [], datos, false);
    }

    altaHijo(datos) {
        Rest.post('hijos', [], datos, true)
        .then(id => {
            console.log("Introducido con exito")
        })
        .catch(e => {
            
            console.error(e);
        })
    }
}