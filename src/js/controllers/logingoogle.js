import { Rest } from "../services/rest.js";

/**
 * Controlador del login de google.
 */
class LoginGoogle {
    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.log('Error capturado. ' + error);
    }

    /**
     * Inicia el login al cargar la página.
     */
    iniciar() {
        google.accounts.id.initialize({
            client_id: '829640902680-48t2uq3us7qit3ehbusp2t6fldfeh6r6.apps.googleusercontent.com',
            callback: this.login.bind(this)
        });
        
        google.accounts.id.renderButton(
            document.getElementById('divGoogleLogin'),
            { theme: 'outline', size: 'large', text: "signin_with", shape: 'rectangular' }
        );
    }

    /**
     * Recoge los datos y los envía al servidor para identificar al usuario.
     * Recibe el token del login con Google y lo envía al servidor para identificar al usuario.
     * @param {token} Object Token de identificación de usuario de Google.
     */
    login(token) {
        Rest.post('login_google', [], token.credential, true)
         .then(usuario => {
             alert(usuario);
             sessionStorage.setItem('usuario', JSON.stringify(usuario));
             window.location.href = 'index_evg.html';
         })
         .catch(e => {
             console.error(e);
         })
    }
}

new LoginGoogle();