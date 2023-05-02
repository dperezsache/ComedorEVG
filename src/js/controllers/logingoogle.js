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
        this.divCargando = document.getElementById('loadingImg');

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
        this.divCargando.style.display = 'block';

        Rest.post('login_google', [], token.credential, true)
         .then(usuario => {
             sessionStorage.setItem('usuario', JSON.stringify(usuario));
             this.divCargando.style.display = 'none';
             this.redireccionar(usuario.correo);
         })
         .catch(e => {
             this.divCargando.style.display = 'none';
             console.error(e);
         })
    }

    /**
     * Redirecciona dependiendo del tipo de usuario que sea.
     * @param {String} correo Email del usuario.
     */
    redireccionar(correo) {
        if (correo.includes('@alumnado.fundacionloyola.net')) {
            window.location.href = 'index_alumnos.html';    // Alumno
        }
        else if (correo.includes('@fundacionloyola.es')) {
            window.location.href = 'index_evg.html';        // Secretaría
        }
        else {
            window.location.href = 'index_personal.html';   // PAS o trabajadores
        }
    }
}

new LoginGoogle();