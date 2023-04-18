/**
 * Controlador principal de modificación de datos de padres.
 */
class ControladorModificacionPadres {
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
        this.btnCancelar.addEventListener('click', () => window.history.go(-1));
    }

    /**
     * Valida los campos del formulario.
     * @param {Event} event Evento de submit.
     */
    validarFormulario(event) {
        let i;

        for (i=0; i<this.inputs.length; i++) {
            if (!this.inputs[i].checkValidity()) break;
        }

        if (i != this.inputs.length) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.form.classList.add('was-validated');
    }
}

new ControladorModificacionPadres();