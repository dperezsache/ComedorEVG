import { Rest } from "../services/rest.js";

/**
 * Controlador del login de google.
 */
class LoginGoogle {
    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.error('Error capturado. ' + error);
    }

    /**
     * Inicia el login al cargar la página.
     */
    iniciar() {
        this.divCargando = document.getElementById('loadingImg');
        this.divError = document.getElementById('divError');

        google.accounts.id.initialize({
            client_id: '829640902680-48t2uq3us7qit3ehbusp2t6fldfeh6r6.apps.googleusercontent.com',
            callback: this.login.bind(this)
        });
        
        google.accounts.id.renderButton(
            document.getElementById('divGoogleLogin'),
            { theme: 'outline', size: 'medium', text: "signin_with", shape: 'rectangular' }
        );
    }

    /**
     * Recoge los datos y los envía al servidor para identificar al usuario.
     * Recibe el token del login con Google y lo envía al servidor para identificar al usuario.
     * @param {token} Object Token de identificación de usuario de Google.
     */
    login(token) {
        this.divCargando.style.display = 'block';
        this.divError.style.display = 'none';

        Rest.post('login_google', [], token.credential, true)
         .then(usuario => {
             sessionStorage.setItem('usuario', JSON.stringify(usuario));
             this.divCargando.style.display = 'none';
             this.redireccionar();
         })
         .catch(e => {
             this.divCargando.style.display = 'none';
             this.error(e);
         })
    }

    /**
     * Redirecciona dependiendo del tipo de usuario que sea.
     */
    redireccionar() {
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));

        // Secretaría
        if (usuario.rol == 'S') {
            window.location.href = 'index_evg.html';        
        }
        // PAS o profesores
        else if (usuario.rol == 'G') {
            window.location.href = 'index_personal.html';   
        }
    }

    /**
     * Informa al usuario del error que ha ocurrido.
     * @param {Object} e Error.
     */
    error(e) {
        this.divCargando.style.display = 'none';

        if (e != null) {
            if (e == 'Error: 408 - Request Timeout') {
                this.divError.innerHTML = '<p>No hay conexión con la base de datos. Intente de nuevo más tarde.</p>';
            }
            else {
                this.divError.innerHTML = '<p>' + e + '</p>';
            }

            this.divError.style.display = 'block';
            window.scrollTo(0, document.body.scrollHeight);
        }
        else {
            this.divError.style.display = 'none';
        }
    }
}

new LoginGoogle();