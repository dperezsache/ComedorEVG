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
        this.table = this.div.getElementsByTagName('table')[0];
        this.tbody = this.div.getElementsByTagName('tbody')[0];
        this.inputs = this.div.getElementsByTagName('input');
        this.select = this.div.getElementsByTagName('select')[0];
        this.divExito = this.div.querySelector('#divExito');
      //  this.btnAnadir = this.div.querySelector('#btnAnadir');
        this.divCargando = this.div.querySelector('#loadingImg');
        this.btnCancelar = this.div.getElementsByTagName('button')[0];
        this.btnRegistrar = this.div.getElementsByTagName('button')[1];
        this.idUsuario = 0;

       // this.btnAnadir.addEventListener('click', this.anadir.bind(this));
        
        this.btnRegistrar.addEventListener('click', this.validarFormulario.bind(this));
        this.btnCancelar.addEventListener('click', this.cancelar.bind(this));

        this.ocultarCrud();
        this.table.style.display = '';
       
        this.rellenarSelectCurso();
    }

    ocultarCrud(){
        this.form.style.display = 'none';
        this.table.style.display = 'none';
    }
   
    actualizarCampos(datos) {
        this.idUsuario = datos.id;
        this.controlador.dameHijos(this.idUsuario)
    }
    
    cargarHijos(hijos) {
      
        console.log(hijos)
        this.pintar(hijos);
    }

    pintar(hijos){
           
        if(hijos != null){
               console.log(hijos)
            for (let hijo of hijos){
   
               let tr = document.createElement('tr');
               this.tbody.appendChild(tr);
               
               let td1 = document.createElement('td');
               tr.appendChild(td1);
               td1.textContent = hijo.nombre
   
               let td2 = document.createElement('td');
               tr.appendChild(td2);
               
               let i2 = document.createElement('i');
               td2.appendChild(i2);
               i2.setAttribute('title', 'Modificar');
               i2.setAttribute('class', 'fa-solid fa-pen-to-square fa-xl');
               i2.setAttribute('style', 'color: #014179;')
   
               let td3 = document.createElement('td');
               tr.appendChild(td3);
               
               let i3 = document.createElement('i');
               td3.appendChild(i3);
               i3.setAttribute('title', 'Eliminar');
               i3.setAttribute('class', 'fa-solid fa-user-xmark fa-xl');
               i3.setAttribute('style', 'color: #014179;');
               i3.onclick = this.eliminar.bind(this, hijo.id);
               console.log(hijo.id)
   
               //luego ponerle los eventos a cada boton
               console.log(hijo)
           }
           
           let trAnadir = document.createElement('tr');
           trAnadir.setAttribute('id', 'añadir');
           trAnadir.setAttribute('colspan', '3');
           this.tbody.appendChild(trAnadir);

        

           let iAnadir = document.createElement('i');
           
           iAnadir.setAttribute('id', 'btnAnadir');
           iAnadir.setAttribute('title', 'Añadir');
           iAnadir.setAttribute('class', 'fa-solid fa-circle-plus fa-2xl');
           iAnadir.setAttribute('style', 'color: #2ae52d;');
            
           iAnadir.onclick = this.anadir.bind(this);
           trAnadir.appendChild(iAnadir);

          }
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
        this.ocultarCrud();
        this.table.style.display = "";
        for (let input of this.inputs)
            input.value = '';
    }

    /**Muestra el formulario */
    anadir() {
        this.ocultarCrud();
        this.form.style.display = 'block';
    }

    /*Elimina un hijo de la lista*/
    eliminar(id){

        let confirmacion = confirm("Estas seguro de eliminar a tu hijo?");
   
        if (confirmacion) {
            this.controlador.eliminarHijo(id)
        }
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