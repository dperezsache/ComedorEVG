import {Vista} from '../vista.js';

/**
 * Contiene la vista de gestión de hijos.
 */
export class VistaGestionHijos extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {Controlador} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);
        this.form = this.div.getElementsByTagName('form')[0];
        this.inputs = this.div.getElementsByTagName('input');
        this.select = this.div.getElementsByTagName('select')[0];
        this.divExito = this.div.querySelector('#divExito');
        this.divCargando = this.div.querySelector('#loadingImg');
        this.btnCancelar = this.div.getElementsByTagName('button')[0];
        this.btnRegistrar = this.div.getElementsByTagName('button')[1];
        this.idUsuario = 0;

        this.btnRegistrar.addEventListener('click', this.validarFormulario.bind(this));
        this.btnCancelar.addEventListener('click', this.cancelar.bind(this));

        this.rellenarSelectCurso();
    }
   
    actualizarCampos(datos) {
        this.idUsuario = datos.id;
    }

    rellenarSelectCurso() {
        const opciones =
        ['1º Infantil', '2º Infantil', '1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria',
        '1 ESO', '2 ESO', '3 ESO', '4 ESO'];

        for (let i=0; i<opciones.length; i++) { 
            let opc = opciones[i]; 
            let opt = document.createElement("option");
            opt.textContent = opc;
            opt.value = opc;
            this.select.appendChild(opt); 
        }
    }

    /**
     * Valida formulario y realiza proceso en caso de que los campos sean válidos.
     */
    validarFormulario() {
        this.form.classList.add('was-validated');

        if (this.inputs[0].checkValidity() && this.inputs[1].checkValidity()) {
            const datos = {
                'id': this.idUsuario,
                'nombre': this.inputs[0].value,
                'apellidos': this.inputs[1].value
               // 'curso': this.inputs[2].value
            };
    
            this.divCargando.style.display = 'block';
            this.controlador.altaHijo(datos);
        }
    }

    /**
     * Limpia los campos del formulario.
     */
    cancelar() {
        for (let input of this.inputs)
            input.value = '';
    }

    /**
     * Informar al usuario del alta exitosa.
     */
    exito(activar) {
        this.form.classList.remove('was-validated');
        this.divCargando.style.display = 'none';
        
        if (activar) {
            for (let input of this.inputs)
                input.disabled = true;

            this.btnRegistrar.disabled = true;
            this.btnCancelar.disabled = true;
            this.select.disabled = true;
            this.divExito.style.display = 'block';
        }
        else {
            for (let input of this.inputs)
                input.disabled = false;

            this.btnRegistrar.disabled = false;
            this.btnCancelar.disabled = false;
            this.select.disabled = false;
            this.divExito.style.display = 'none';
        }
    }

    mostrar(ver) {
        super.mostrar(ver);
        
        if (this.divExito.style.display == 'block')
            this.exito(false);
    }
}