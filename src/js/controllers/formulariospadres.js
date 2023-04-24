/**
 * Controlador de formularios de alta/modificación de padres.
 */
class ControladorFormularios {
    constructor() {
        window.onload = this.iniciar.bind(this);
    }

    /**
     * Inicia el controlador al cargar la página.
     */
    iniciar() {
        this.form = document.getElementsByTagName('form')[0];
        this.inputs = document.getElementsByTagName('input');
        this.btnCancelar = document.getElementsByTagName('button')[0];

        this.form.addEventListener('submit', this.validarFormulario.bind(this));
        this.btnCancelar.addEventListener('click', this.volverAtras.bind(this));
    }

    /**
     * Valida los campos del formulario. Los que no sean válidos tendrán un aviso.
     * @param {Event} event Evento de submit del formulario.
     */
    validarFormulario(event) {
        let i;
        let total = this.inputs.length;

        for (i=0; i<total; i++) {
            if (!this.inputs[i].checkValidity()) break;
        }

        // Si no todos los campos son válidos, parar el submit.
        if (i != total) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        this.form.classList.add('was-validated');
    }

    /**
     * Vuelve a la página anterior.
     */
    volverAtras() {
        window.history.go(-1);
    }
}

new ControladorFormularios();