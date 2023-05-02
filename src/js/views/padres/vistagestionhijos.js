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

        this.form = document.getElementsByTagName('form')[0];
        
        this.inputs = document.getElementsByTagName('input');

        this.select = document.getElementsByTagName('select')[0];
        
        this.btnCancelar = document.getElementsByTagName('button')[0];
        
        this.btnRegistrar = document.getElementsByTagName('button')[1];
        
        this.idUsuario = 0 ;

        this.btnRegistrar.addEventListener('click', this.validarFormulario.bind(this));
        //this.btnCancelar.addEventListener('click', this.volverAtras.bind(this));

        this.rellenarSelectCurso()
    }
   
    actualizarCampos(datos) {
        this.idUsuario = datos.id;
    }

    rellenarSelectCurso(){

        const opciones =
        ['1º Infantil', '2º Infantil', '1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria',
        '1 ESO', '2 ESO', '3 ESO', '4 ESO'];

        for (let i = 0; i < opciones.length; i++) { 
           
            let opc = opciones[i]; 
            let opt = document.createElement("option");
            opt.textContent = opc;
            opt.value = opc;
            this.select.appendChild(opt); }
    }

    validarFormulario() {
    
        console.log("estoy clicando en la vista")
    
        const datos = {
            'id': this.idUsuario,
            'nombre': this.inputs[0].value,
            'apellidos': this.inputs[1].value
           // 'curso': this.inputs[2].value
        };

        this.controlador.altaHijo(datos)

     
       
    }
    
}