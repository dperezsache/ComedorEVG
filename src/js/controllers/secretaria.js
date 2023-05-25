import { Modelo } from "../models/modelo.js";
import { VistaMenuSecretaria } from "../views/secretaria/vistamenusecretaria.js";
import { VistaGestionDiaria } from "../views/secretaria/vistagestiondiaria.js";
import { VistaGestionMensual } from "../views/secretaria/vistagestionmensual.js";
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

        Rest.setAutorizacion(this.#usuario.autorizacion);

        this.modelo = new Modelo();
        this.vistaMenu = new VistaMenuSecretaria(this, document.getElementById('menuSecretaria'));
        this.vistaGestionDiaria = new VistaGestionDiaria(this, document.getElementById('gestionDiaria'));
        this.vistaGestionMensual = new VistaGestionMensual(this, document.getElementById('gestionMensual'));
   
        this.verVistaGestionDiaria();
    }

    /**
     * Muestra la vista de gestión diaria.
     */
    verVistaGestionDiaria() {
        this.vistaGestionDiaria.mostrar(true);
        this.vistaGestionMensual.mostrar(false);
    }

    /**
     * Muestra la vista de gestión mensual.
     */
    verVistaGestionMensual() {
        this.vistaGestionDiaria.mostrar(false);
        this.vistaGestionMensual.mostrar(true);
    }

    /**
     * Cierra la sesión del usuario.
     */
    cerrarSesion() {
        this.#usuario = null;
        Rest.setAutorizacion(null);
        window.location.href = 'login_google.html';
    }
}

new ControladorSecretaria();