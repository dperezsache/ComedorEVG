import {VistaLoginGoogle} from '../views/secretaria/vistalogingoogle.js';

/**
 * Controlador principal de secretaría
 */
class LoginGoogle {
    constructor() {
        window.onload = this.iniciar.bind(this);
    }

    /**
     * Inicia la aplicación al cargar la página.
     */
    iniciar() {
        this.vistaLoginGoogle = new VistaLoginGoogle(this, document.getElementById('divLoginGoogle'));
        this.vistaLoginGoogle.mostrar(true);
    }

    /**
     * Obtiene los datos del usuario que inicia sesión.
     * @param {Object} respuesta Token del inicio de sesión.
     */
    loginGoogle(respuesta) {
        const respuestaPayload = this.decodificarRespuestaJwt(respuesta.credential);

        // Generar cookie con el objeto de datos de sesión
        let fecha = new Date();
		fecha.setTime(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
		const caducidad = 'expires=' + fecha.toUTCString();

		document.cookie = 'datos' + '=' + JSON.stringify(respuestaPayload) + ';' + caducidad + '; path=/' + ';' + 'SameSite=None;' +  'Secure'; 
        window.location.href = './php/views/secretaria/index.php';

        /*
                    Info que devuelve:
        console.log("ID: " + respuestaPayload.sub);
        console.log("Nombre y apellidos: " + respuestaPayload.name);
        console.log("Nombre: " + respuestaPayload.given_name);
        console.log("Nombre de familia: " + respuestaPayload.family_name);
        console.log("Imagen URL: " + respuestaPayload.picture);
        console.log("Email: " + respuestaPayload.email);
        */
    }

    /**
     * Decodifica el token en Base64 y lo parsea de vuelta a un objeto de tipo JSON.
     * @param {Object} token 
     */
    decodificarRespuestaJwt(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
    }
}

new LoginGoogle();