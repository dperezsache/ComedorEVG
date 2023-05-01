/**
 * Contiene la vista del menú de padres.
 */
export class VistaMenuPadres {
    constructor(controlador, nav) {
        this.controlador = controlador;
        this.nav = nav;

        this.linkInicio = this.nav.getElementsByTagName('li')[0];
        this.linkGestionHijos = this.nav.getElementsByTagName('li')[1];
        this.linkModificacion = this.nav.getElementsByTagName('li')[2];
        this.linkCerrarSesion = this.nav.getElementsByTagName('li')[3];
        
        this.linkInicio.onclick = this.inicio.bind(this);
        this.linkGestionHijos.onclick = this.gestionHijos.bind(this);
        this.linkModificacion.onclick = this.modificacion.bind(this);
        this.linkCerrarSesion.onclick = this.cerrarSesion.bind(this);
    }

    /**
     * Atención al evento de mostrar vista inicio.
     */
    inicio() {
        this.controlador.verVistaInicio();

        this.linkInicio.classList.add('active');
        this.linkGestionHijos.classList.remove('active');
        this.linkModificacion.classList.remove('active');
    }

    /**
     * Atención al evento de mostrar vista gestión de hijos.
     */
    gestionHijos() {
        this.controlador.verVistaGestionHijos();

        this.linkInicio.classList.remove('active');
        this.linkGestionHijos.classList.add('active');
        this.linkModificacion.classList.remove('active');
    }

    /**
     * Atención al evento de mostrar vista modificación de datos.
     */
    modificacion() {
        this.controlador.verVistaModificacion();

        this.linkInicio.classList.remove('active');
        this.linkGestionHijos.classList.remove('active');
        this.linkModificacion.classList.add('active');
    }

    /**
     * Atención al evento de cerrar sesión.
     */
    cerrarSesion() {
        this.controlador.cerrarSesion();
    }
}