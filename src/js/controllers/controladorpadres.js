import { Modelo } from "../models/modelo.js";
import { VistaInicioPadres } from "../views/padres/vistainicio.js";
import { VistaMenuPadres } from "../views/padres/vistamenu.js";
import { VistaGestionHijos } from "../views/padres/vistagestionhijos.js";
import { VistaModificarPadres } from "../views/padres/vistamodificar.js";
import { Rest } from "../services/rest.js";

/**
 * Controlador del panel de padres.
 */
class ControladorPadres {
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
            window.location.href = 'login.html';

        this.modelo = new Modelo();
        this.vistaMenu = new VistaMenuPadres(this, document.getElementById('menuPadres'));
        this.vistaInicio = new VistaInicioPadres(this, document.getElementById('inicioPadres'));
        this.vistaGestionHijos = new VistaGestionHijos(this, document.getElementById('gestionHijosPadres'));
        this.vistaModificacion = new VistaModificarPadres(this, document.getElementById('modificacionPadres'));
        
        this.vistaModificacion.actualizarCampos(this.#usuario);
        this.vistaGestionHijos.actualizarCampos(this.#usuario);
        this.verVistaInicio();
    }

    /**
     * Cambia a la vista de inicio.
     */
    verVistaInicio() {
        this.vistaInicio.mostrar(true);
        this.vistaGestionHijos.mostrar(false);
        this.vistaModificacion.mostrar(false);
    }

    /**
     * Cambia a la vista de gestión de hijos.
     */
    verVistaGestionHijos() {
        this.vistaInicio.mostrar(false);
        this.vistaGestionHijos.mostrar(true);
        this.vistaModificacion.mostrar(false);
    }

    /**
     * Cambia a la vista de modificación de datos personales.
     */
    verVistaModificacion() {
        this.vistaInicio.mostrar(false);
        this.vistaGestionHijos.mostrar(false);
        this.vistaModificacion.mostrar(true);
    }

    /**
     * Realiza el proceso de dar de alta a un hijo.
     * @param {Object} datos Datos del hijo.
     */
    altaHijo(datos) {
        this.modelo.altaHijo(datos)
         .then(() => {
            this.vistaGestionHijos.exito(true);
         })
         .catch(e => {
             console.error(e);
         })
    }

    /**
     * Cierra la sesión del usuario.
     */
    cerrarSesion() {
        this.#usuario = null;
        Rest.setAutorizacion(null);
        window.location.href = 'login.html';
    }

    /**
     * Realiza la modificación de los datos del padre.
     * @param {Object} datos Nuevos datos del padre.
     */
    modificarPadre(datos) {
        this.modelo.modificarPadre(datos)
         .then(() => {
             this.vistaModificacion.exito(true);
             sessionStorage.setItem('usuario', JSON.stringify(datos));
         })
         .catch(e => {
             console.error(e);
         }) 
    }
    dameHijos(id){
        console.log(id)
    const hola=this.modelo.dameHijos(id)
        .then(() => {
            return hola
        })
       .catch(e => {
           console.error(e)
       })
    }
}

new ControladorPadres();