import {Vista} from '../vista.js';

/**
 * Contiene la vista del inicio de sesión de Google
 */
export class VistaLoginGoogle extends Vista {

    /**
	 *	Constructor de la clase.
	 *	@param {Controlador} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);
        this.habilitarLogin();
    }

    /**
     * Activa el login de Google.
     */
    habilitarLogin() {
		google.accounts.id.initialize({
            client_id: "829640902680-48t2uq3us7qit3ehbusp2t6fldfeh6r6.apps.googleusercontent.com",
            callback: this.controlador.loginGoogle.bind(this.controlador)
        });

        google.accounts.id.renderButton(
            document.getElementById('divGoogleLogin'),
            { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
        );
	}
}