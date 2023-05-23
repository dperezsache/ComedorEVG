import {Vista} from '../vista.js';

/**
 * Contiene la vista de modificación de datos de padres
 */
export class VistaModificarPadres extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {Controlador} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.form = this.div.getElementsByTagName('form')[0];
        this.inputs = this.div.getElementsByTagName('input');
        this.btnActualizar = this.div.getElementsByTagName('button')[0];
        this.divExito = this.div.querySelector('#divExito');
        this.idUsuario = 0;
        this.divCargando = this.div.querySelector('#loadingImg');
        this.btnActualizar.addEventListener('click', this.validarFormulario.bind(this));
    }

    /**
     * Actualiza los campos con los datos del usuario actual.
     * @param {Object} datos Datos del usuario.
     */
    actualizarCampos(datos) {
        this.inputs[0].value = datos.nombre;
        this.inputs[1].value = datos.apellidos;
        this.inputs[2].value = datos.telefono;
        this.inputs[3].value = datos.correo;
        this.idUsuario = datos.id;
    }

    /**
     * Valida los campos del formulario y realiza el proceso de modificar.
     */
    validarFormulario() {
        let cont;
        let total = this.inputs.length;

        for (cont=0; cont<total; cont++) {
            if (!this.inputs[cont].checkValidity()) break;
        }

        this.form.classList.add('was-validated');

        if (cont == total) {
            const datos = {
                'id': this.idUsuario,
                'nombre': this.inputs[0].value,
                'apellidos': this.inputs[1].value,
                'telefono': this.inputs[2].value,
                'correo': this.inputs[3].value
            };

            this.btnActualizar.disabled = true;
            this.divCargando.style.display = 'block';
            this.controlador.modificarPadre(datos);
        }
    }

    /**
     * Informar al usuario de la modificación exitosa.
     * @param {Boolean} activar Activar o no mensaje de éxito.
     */
    exito(activar) {
        this.form.classList.remove('was-validated');
        this.divCargando.style.display = 'none';
        this.btnActualizar.disabled = false;
        this.divExito.style.display = activar ? 'block' : 'none';
    }

	mostrar(ver) {
		super.mostrar(ver);
		
        if (this.divExito.style.display == 'block')
            this.exito(false);
	}
}