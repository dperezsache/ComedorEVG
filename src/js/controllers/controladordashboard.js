/**
 * Controlador principal del dashboard de padres
 */
class ControladorDashboard {
    constructor() {
        window.onload = this.iniciar.bind(this);
    }

    /**
     * Inicia la aplicación al cargar la página.
     */
    iniciar() {
        this.btnModificar = document.getElementsByTagName('button')[0];
        this.btnLogout = document.getElementsByTagName('button')[1];

        this.btnModificar.onclick = this.redireccionModificar.bind(this);
        this.btnLogout.onclick = this.redireccionLogout.bind(this);
    }

    /**
     * Lleva a la página de modificación de datos del padre en cuestión.
     */
    redireccionModificar() {
        window.location.href = 'modificarpadre.php';
    }

    /**
     * Lleva al cierre de sesión.
     */
    redireccionLogout() {
        window.location.href = 'logout.php';
    }
}

new ControladorDashboard();