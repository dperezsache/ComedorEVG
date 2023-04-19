import {Vista} from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaInicio extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {Controlador} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.botonLogin = this.div.getElementsByTagName('button')[0];
        this.botonAlta = this.div.getElementsByTagName('button')[1];

        this.botonLogin.addEventListener('click', this.loginUsuario.bind(this));
        this.botonAlta.addEventListener('click', this.altaUsuario.bind(this));
    }

    /**
     * Atención a la pulsación del botón de login.
     */
    loginUsuario() {
        this.controlador.redireccionLogin();
    }

    /**
     * Atención a la pulsación del botón de alta.
     */
    altaUsuario() {
        this.controlador.redireccionAlta();
    }
}