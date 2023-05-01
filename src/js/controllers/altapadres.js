import { Rest } from "../services/rest.js";

/**
 * Controlador del registro de padres.
 */
class AltaPadres {
    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.log('Error capturado. ' + error);
    }

    /**
     * Inicia al cargar la página.
     */
    iniciar() {
        this.form = document.getElementsByTagName('form')[0];
        this.inputs = document.getElementsByTagName('input');
        this.divExito = document.getElementById('divExito');
        this.divCargando = document.getElementById('loadingImg');
        this.btnCancelar = document.getElementsByTagName('button')[0];
        this.btnRegistrar = document.getElementsByTagName('button')[1];
        
        this.btnRegistrar.addEventListener('click', this.validarFormulario.bind(this));
        this.btnCancelar.addEventListener('click', this.volverAtras.bind(this));
    }

    /**
     * Valida que los campos sean válidos y realiza el proceso si es así.
     */
    validarFormulario() {
        let cont;
        let total = this.inputs.length;

        for (cont=0; cont<total; cont++) {
            if (!this.inputs[cont].checkValidity()) break;
        }
        
        this.form.classList.add('was-validated');

        if (cont == total) {
            if (this.inputs[3].value === this.inputs[4].value) {
                this.divCargando.style.display = 'block';

                const usuario = {
                    nombre: this.inputs[0].value,
                    apellidos: this.inputs[1].value,
                    correo: this.inputs[2].value,
                    contrasenia: this.inputs[3].value,
                    telefono: this.inputs[5].value,
                    dni: this.inputs[6].value,
                    iban: this.inputs[7].value,
                    titular: this.inputs[8].value
                };
    
                Rest.post('padres', [], usuario, true)
                .then(id => {
                    this.divCargando.style.display = 'none';
                    if (id) this.exito();
                })
                .catch(e => {
                    this.divCargando.style.display = 'none';
                    console.error(e);
                })
            }
        }
    }

    /**
     * Informar al usuario del alta exitosa, y redirigir a página de login.
     */
    exito() {
        for (let input of this.inputs)
            input.disabled = true;

        this.btnRegistrar.disabled = true;
        this.btnCancelar.disabled = true;
        this.divExito.style.display = 'block';

        setTimeout(this.redireccion.bind(this), 3000);
    }

    /**
     * Vuelve a la página anterior.
     */
    volverAtras() {
        window.history.go(-1);
    }

    /**
     * Redirección a página de login de padres.
     */
    redireccion() {
        window.location.href = 'login.html';
    }
}

new AltaPadres();