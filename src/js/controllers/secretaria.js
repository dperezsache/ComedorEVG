import { Modelo } from "../models/modelo.js";
import { VistaMenuSecretaria } from "../views/secretaria/vistamenusecretaria.js";
import { VistaGestionDiaria } from "../views/secretaria/vistagestiondiaria.js";
import { VistaGestionMensual } from "../views/secretaria/vistagestionmensual.js";
import { VistaGestionPadres } from "../views/secretaria/vistagestionpadres.js";
import { Rest } from "../services/rest.js";

/**
 * Controlador del panel de secretaría.
 */
class ControladorSecretaria {
    #usuario = null; // Usuario logueado.

    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.error('Error capturado. ' + error);
    }

    /**
     * Inicia la aplicación.
     */
    iniciar() {
        this.#usuario = JSON.parse(sessionStorage.getItem('usuario'));
        
        // Comprobar login
        if (!this.#usuario)
            window.location.href = 'login_google.html';

        // Comprobar rol de usuario secretaría
        if (this.#usuario.rol != 'S')
            window.location.href = 'login_google.html';

        Rest.setAutorizacion(this.#usuario.autorizacion);

        this.modelo = new Modelo();
        this.vistaMenu = new VistaMenuSecretaria(this, document.getElementById('menuSecretaria'));
        this.vistaGestionDiaria = new VistaGestionDiaria(this, document.getElementById('gestionDiaria'));
        this.vistaGestionMensual = new VistaGestionMensual(this, document.getElementById('gestionMensual'));
        this.vistaGestionPadres = new VistaGestionPadres(this, document.getElementById('gestionPadres'));
   
        this.verVistaGestionDiaria();
    }

    /**
     * Realizar proceso de modificación de padre desde secretaría.
     * @param {Object} padre Datos del padre.
     */
    modificarPadre(padre) {
        this.modelo.modificarPadreSecretaria(padre)
         .then(() => {
             this.vistaGestionPadres.exitoModificacion(); 
         })
         .catch(e => {
             this.vistaGestionPadres.errorModificacion(e);
             console.error(e);
         }) 
    }

    /**
     * Obtiene las incidencias de una fecha.
     * @param {String} fecha String de la fecha.
     */
    obtenerIncidencias(fecha) {
        this.modelo.obtenerIncidencias(fecha)
         .then(incidencias => {
             this.vistaGestionDiaria.cargarListado(incidencias);
         })
         .catch(e => {
             console.error(e);
         })
    }
    
    /**
     * Obtiene las incidencias de un mes.
     * @param {Number} mes Mes.
     */
    obtenerIncidenciasMensual(mes) {
        this.modelo.obtenerIncidenciasMensual(mes)
         .then(incidencias => {
             this.vistaGestionMensual.cargarListado(incidencias);
         })
         .catch(e => {
             console.error(e);
         })
    }

    /**
     * Insertar incidencia del usuario indicado en el día indicado.
     * @param {Object} datos Datos de la incidencia.
     * @param {HTMLTextAreaElement} textarea Elemento dónde se introdujo la incidencia.
     */
    insertarIncidencia(datos, textarea) {
        this.modelo.insertarIncidencia(datos)
         .then(() => {
             if (textarea) this.vistaGestionDiaria.insercionExito(textarea);
         })
         .catch(e => {
             console.error(e);
             if (textarea) this.vistaGestionDiaria.insercionError(textarea);
         })
    }

    /**
     * Obtiene los usuarios que van al comedor de una fecha.
     * @param {String} fecha String de la fecha.
     */
    obtenerUsuarios(fecha) {
        this.modelo.obtenerUsuariosApuntados(fecha)
         .then(usuarios => {
             this.vistaGestionDiaria.cargarIncidencias(usuarios);
         })
         .catch(e => {
             console.error(e);
         })
    }

    /**
     * Obtener usuarios de comedor de un mes.
     * @param {Number} mes Mes.
     */
    obtenerUsuariosMensual(mes) {
        this.modelo.obtenerUsuariosApuntadosMensual(mes)
        .then(usuarios => {
            this.vistaGestionMensual.cargarIncidencias(usuarios);
        })
        .catch(e => {
            console.error(e);
        })
    }

    /**
     * Muestra la vista de gestión diaria.
     */
    verVistaGestionDiaria() {
        this.vistaGestionDiaria.mostrar(true);
        this.vistaGestionMensual.mostrar(false);
        this.vistaGestionPadres.mostrar(false);
    }

    /**
     * Muestra la vista de gestión mensual.
     */
    verVistaGestionMensual() {
        this.vistaGestionDiaria.mostrar(false);
        this.vistaGestionMensual.mostrar(true);
        this.vistaGestionPadres.mostrar(false);
    }

    /**
     * Muestra la vista de gestión mensual.
     */
    verVistaGestionPadres() {
        this.vistaGestionDiaria.mostrar(false);
        this.vistaGestionMensual.mostrar(false);
        this.vistaGestionPadres.mostrar(true);
    }

    /**
     * Cierra la sesión del usuario.
     */
    cerrarSesion() {
        this.#usuario = null;
        sessionStorage.removeItem('usuario');
        Rest.setAutorizacion(null);
        window.location.href = 'login_google.html';
    }

    /**
     * Buscar padres.
     * @param {String} busqueda String búsqueda.
     */
    obtenerListadoPadres(busqueda){
        this.modelo.obtenerListadoPadres(busqueda)
         .then(padres => {
             this.vistaGestionPadres.iniciarTabla(padres);
         })
         .catch(e => {
             console.error(e);
         })
    }
}

new ControladorSecretaria();