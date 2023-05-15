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

        this.idUsuario = 0;

        // Secciones de la vista
        this.divListadoHijos = this.div.querySelector('#divListadoHijos');
        this.divAltaHijos = this.div.querySelector('#divAltaHijos');
        this.divModificacionHijos = this.div.querySelector('#divModificacionHijos');

        // Alta
        this.formAlta = this.div.querySelector('#formAltaHijos');
        this.inputsAlta = this.formAlta.getElementsByTagName('input');
        this.selectAlta = this.div.getElementsByTagName('select')[0];
        this.btnCancelarAlta = this.div.getElementsByTagName('button')[0];
        this.btnRegistrar = this.div.getElementsByTagName('button')[1];
        this.divExitoAlta = this.div.querySelector('#divExitoAlta');
        this.divCargandoAlta = this.div.querySelector('#loadingImgAlta');
        this.btnRegistrar.addEventListener('click', this.validarFormulario.bind(this));
        this.btnCancelarAlta.addEventListener('click', this.cancelarAlta.bind(this));

        // Modificar
        this.formModificar = this.div.querySelector('#formModificacionHijos');
        this.inputsModificar = this.formModificar.getElementsByTagName('input');
        this.selectModificacion = this.div.getElementsByTagName('select')[1];
        this.btnCancelarMod = this.div.getElementsByTagName('button')[2];
        this.btnActualizar = this.div.getElementsByTagName('button')[3];
        this.divExitoModificar = this.div.querySelector('#divExitoModificacion');
        this.divCargandoModificar = this.div.querySelector('#loadingImgModificacion');
        this.btnActualizar.addEventListener('click', this.enviarModificar.bind(this));
        this.btnCancelarMod.addEventListener('click', this.cancelarModificacion.bind(this));

        // Listado
        this.tbody = this.div.getElementsByTagName('tbody')[0];

        this.mostrarOcultarCrud(true, false, false);
    }

    /**
     * Mostrar/Ocultar crud hijos.
     * @param {Boolean} listado Mostrar o no listado de hijos.
     * @param {Boolean} alta Mostrar o no alta de hijos.
     * @param {Boolean} modificacion Mostrar o no modificación de hijos.
     */
    mostrarOcultarCrud(listado, alta, modificacion) {
        this.divAltaHijos.style.display = alta ? 'block' : 'none';
        this.divListadoHijos.style.display = listado ? 'block' : 'none';
        this.divModificacionHijos.style.display = modificacion ? 'block' : 'none';
    }
   
    actualizarCampos(datos) {
        this.idUsuario = datos.id;
        this.controlador.dameHijos(this.idUsuario)
        this.controlador.dameCursos()
    }
    
    cargarHijos(hijos) {
        this.pintar(hijos);
    }

    pintar(hijos) {
        if (hijos != null) {
            for (let hijo of hijos) {
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
               i2.onclick = this.editar.bind(this, hijo);
   
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
           this.tbody.appendChild(trAnadir);

           let tdAnadir = document.createElement('td');
           tdAnadir.setAttribute('id', 'añadir');
           tdAnadir.setAttribute('colspan', '3');
           trAnadir.appendChild(tdAnadir);

           let iAnadir = document.createElement('i');
           iAnadir.setAttribute('id', 'btnAnadir');
           iAnadir.setAttribute('title', 'Añadir');
           iAnadir.setAttribute('class', 'fa-solid fa-circle-plus fa-2xl');
           iAnadir.setAttribute('style', 'color: #2ae52d;');
            
           iAnadir.onclick = this.anadir.bind(this);
           tdAnadir.appendChild(iAnadir);
        }
    }

    /** Rellena el select de cursos de hijos */
    rellenarSelectCurso(opciones) {

        for (let opc of opciones){

            let opt = document.createElement("option");
            opt.textContent = opc.nombre;
            opt.value= opc.id;
            
            this.selectAlta.appendChild(opt);
        }

    }

    /**
     * Valida formulario y realiza proceso en caso de que los campos sean válidos.
     */
    validarFormulario() {
        this.formAlta.classList.add('was-validated');
        
        if (this.inputsAlta[0].checkValidity() && this.inputsAlta[1].checkValidity()) {
            const datos = {
                'id': this.idUsuario,
                'nombre': this.inputsAlta[0].value,
                'apellidos': this.inputsAlta[1].value,
                'idCurso': parseInt(this.selectAlta.value)
            };

            this.divCargandoAlta.style.display = 'block';
            this.controlador.altaHijo(datos);
        }
    }

    //Provisional hasta que se meta en validarFormulario :))) 
    enviarModificar() {
        const datos = {
            'id': this.idUsuario,
            'nombre': this.inputsModificar[0].value,
            'apellidos': this.inputsModificar[1].value
        }

        this.divCargandoModificar.style.display = 'block';
        this.controlador.modificarHijo(datos);
    }

    /**
     * Limpia los campos del formulario alta.
     */
    cancelarAlta() {
        for (let input of this.inputsAlta)
            input.value = '';

        this.mostrarOcultarCrud(true, false, false);
    }

    /**
     * Limpia los campos del formulario modificación.
     */
    cancelarModificacion() {
        for (let input of this.inputsModificar)
            input.value = '';

        this.mostrarOcultarCrud(true, false, false);
    }

    /**
     * Muestra el formulario de alta
     */
    anadir() {
        this.mostrarOcultarCrud(false, true, false);
    }

    editar(hijo) {
        this.mostrarOcultarCrud(false, false, true);

        this.idUsuario = hijo.id;
        this.inputsModificar[0].value = hijo.nombre;
        this.inputsModificar[1].value = hijo.apellidos;
    }

    /**
     * Elimina un hijo de la lista.
     */
    eliminar(id) {
        if (confirm("¿Estas seguro de que deseas eliminar a tu hijo/a?")) {
            this.controlador.eliminarHijo(id);
        }
    }

    /**
     * Limpia los campos del formulario modificación.
     */
    cancelarModificacion() {
        for (let input of this.inputsModificar)
            input.value = '';

        this.mostrarOcultarCrud(true, false, false);
    }

    /**
     * Muestra el formulario de alta
     */
    anadir() {
        this.mostrarOcultarCrud(false, true, false);
    }

    /**
     * Elimina un hijo de la lista.
     */
    eliminar(id) {
        if (confirm("¿Estas seguro de que deseas eliminar a tu hijo/a?")) {
            this.controlador.eliminarHijo(id);
        }
    }

    /**
     * Informar al usuario del alta exitosa.
     * @param {Boolean} activar Activa o no los inputs y botones.
     */
    exitoAlta(activar) {
        this.formAlta.classList.remove('was-validated');
        this.divCargandoAlta.style.display = 'none';
        
        if (activar) {
            for (let input of this.inputsAlta)
                input.disabled = true;

            this.btnRegistrar.disabled = true;
            this.selectAlta.disabled = true;
            this.divExitoAlta.style.display = 'block';
        }
        else {
            for (let input of this.inputsAlta)
                input.disabled = false;

            this.btnRegistrar.disabled = false;
            this.selectAlta.disabled = false;
            this.divExitoAlta.style.display = 'none';
        }
    }

    /**
     * Informar al usuario de la modificación exitosa.
     * @param {Boolean} activar Activa o no los inputs y botones.
     */
    exitoModificacion(activar) {
        this.formModificar.classList.remove('was-validated');
        this.divCargandoModificar.style.display = 'none';
        
        if (activar) {
            for (let input of this.inputsModificar)
                input.disabled = true;

            this.btnActualizar.disabled = true;
            this.selectModificacion.disabled = true;
            this.divExitoModificar.style.display = 'block';
        }
        else {
            for (let input of this.inputsModificar)
                input.disabled = false;

            this.btnActualizar.disabled = false;
            this.selectModificacion.disabled = false;
            this.divExitoModificar.style.display = 'none';
        }
    }
    
    mostrar(ver) {
        super.mostrar(ver);
        
        if (ver) this.mostrarOcultarCrud(true, false, false);

        if (this.divExitoAlta.style.display == 'block')
            this.exitoAlta(false);

        if (this.divExitoModificar.style.display == 'block')
            this.exitoModificacion(false);
    }
}