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

        // Comprobar rol de usuario padre
        if (this.#usuario.rol != 'P')
            window.location.href = 'login.html';

        Rest.setAutorizacion(this.#usuario.autorizacion);

        this.modelo = new Modelo();
        this.vistaMenu = new VistaMenuPadres(this, document.getElementById('menuPadres'));
        this.vistaInicio = new VistaInicioPadres(this, document.getElementById('inicioPadres'));
        this.vistaGestionHijos = new VistaGestionHijos(this, document.getElementById('gestionHijosPadres'));
        this.vistaModificacion = new VistaModificarPadres(this, document.getElementById('modificacionPadres'));
        
        this.vistaModificacion.actualizarCampos(this.#usuario);
        this.vistaGestionHijos.actualizar(this.#usuario);
        this.vistaInicio.obtenerPadre(this.#usuario);
        this.verVistaInicio();
    }

    /**
     * Devuelve array de días festivos a vista de gestión de hijos.
     */
    obtenerFestivos(inicioSemana) {
        this.modelo.obtenerFestivos(inicioSemana)
         .then(festivos => {
             this.vistaInicio.obtenerFestivos(festivos);
         })
         .catch(e => {
             console.error(e);
         })
    }

    /**
     * Devuelve array de cursos a vista de gestión de hijos.
     */
    obtenerCursos() {
        this.modelo.obtenerCursos()
         .then(cursos => {
             this.vistaGestionHijos.rellenarSelects(cursos);
         })
         .catch(e => {
             console.error(e);
         })
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
             this.vistaGestionHijos.btnCancelarAlta.disabled = false;
             this.vistaGestionHijos.btnRegistrar.disabled = false;
             this.vistaGestionHijos.exitoAlta(true);
             this.dameHijos(this.#usuario.id); // Actualizar listado hijos.
         })
         .catch(e => {
             this.vistaGestionHijos.btnCancelarAlta.disabled = false;
             this.vistaGestionHijos.btnRegistrar.disabled = false;
             console.error(e);
         })
    }

    /**
     * Modificar datos de un hijo.
     * @param {Object} datos 
     */
    modificarHijo(datos){
        this.modelo.modificarHijo(datos)
         .then(() => {
             this.vistaGestionHijos.btnActualizar.disabled = false;
             this.vistaGestionHijos.btnCancelarMod.disabled = false;
             this.vistaGestionHijos.exitoModificacion(true);
             this.dameHijos(this.#usuario.id); // Actualizar listado hijos.
         })
         .catch(e => {
             this.vistaGestionHijos.btnActualizar.disabled = false;
             this.vistaGestionHijos.btnCancelarMod.disabled = false;
             console.error(e);
         }) 
    }

    /**
     * Realiza la eliminacion del registro de un 
     * @param {int} id Identificador del hijo
     */
    eliminarHijo(id){
        this.modelo.eliminarHijo(id)
         .then(() => {
             this.dameHijos(this.#usuario.id); // Actualizar listado hijos.
         })
         .catch(e => {
             console.error(e);
         })
    }

    /**
     * Marca día del comedor.
     * @param {Object} datos Datos del día a marcar.
     */
    marcarDiaComedor(datos) {
        this.modelo.marcarDiaComedor(datos)
         .catch(e => {
             console.error(e)
         })
    }

    /**
     * Obtiene los días de comedor de los hijos.
     * @param {Array} idHijos Array con los IDs de los hijos.
     */
    obtenerDiasComedor(idHijos) {
        this.modelo.obtenerDiasComedor(idHijos)
         .then(dias => {
            this.vistaInicio.montarCalendario(dias);
         })
         .catch(e => {
             console.error(e);
         })
    }

    /**
     * Desmarcar día del comedor.
     * @param {Object} datos Datos del día.
     */
    desmarcarDiaComedor(datos) {
        this.modelo.desmarcarDiaComedor(datos)
         .catch(e => {
             console.error(e)
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

    /**
     * Devuelve los hijos de un padre a la vista de inicio.
     * @param {Number} id ID del padre. 
     */
    dameHijosCalendario(id) {
        this.modelo.dameHijos(id)
         .then(hijos => {
             this.vistaInicio.inicializar(hijos);
         })
         .catch(e => {
             console.error(e)
         })
    }

    /**
     * Devuelve los hijos de un padre a la vista de gestión de hijos.
     * @param {Number} id ID del padre. 
     */
    dameHijos(id) {
        this.modelo.dameHijos(id)
         .then(hijos => {
             this.vistaGestionHijos.cargarListado(hijos);
         })
         .catch(e => {
             console.error(e)
         })
    }
}

new ControladorPadres();