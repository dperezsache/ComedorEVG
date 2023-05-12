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
        return Rest.post('hijos', [], datos, false);
    }

    dameHijos(id){
        const queryParams = new Map()
        queryParams.set('id', id)
        return Rest.get('hijos', [], queryParams)
    }

    eliminarHijo(id){
        console.log(id)
        return Rest.delete('hijos', [id] )
    }

    modificarHijo(datos){
        return Rest.put('hijos', [], datos, false);
    }

    dameCursos(){
        console.log("modelo cursos")
     
        return Rest.get('curso', [], false)
    }
}