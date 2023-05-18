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

        // Listado
        this.tbody = this.div.getElementsByTagName('tbody')[0];

        // Alta
        this.formAlta = this.div.querySelector('#formAltaHijos');
        this.inputsAlta = this.formAlta.getElementsByTagName('input');
        this.btnCancelarAlta = this.div.getElementsByTagName('button')[0];
        this.btnRegistrar = this.div.getElementsByTagName('button')[1];
        this.divExitoAlta = this.div.querySelector('#divExitoAlta');
        this.divCargandoAlta = this.div.querySelector('#loadingImgAlta');
        this.btnRegistrar.addEventListener('click', this.validarFormularioAlta.bind(this));
        this.btnCancelarAlta.addEventListener('click', this.cancelarAlta.bind(this));

        // Modificar
        this.formModificar = this.div.querySelector('#formModificacionHijos');
        this.inputsModificar = this.formModificar.getElementsByTagName('input');
        this.btnCancelarMod = this.div.getElementsByTagName('button')[2];
        this.btnActualizar = this.div.getElementsByTagName('button')[3];
        this.divExitoModificar = this.div.querySelector('#divExitoModificacion');
        this.divCargandoModificar = this.div.querySelector('#loadingImgModificacion');
        this.btnActualizar.addEventListener('click', this.validarFormularioModificacion.bind(this));
        this.btnCancelarMod.addEventListener('click', this.cancelarModificacion.bind(this));

        this.selectAlta = this.div.getElementsByTagName('select')[0];
        this.selectModificacion = this.div.getElementsByTagName('select')[1];

        this.controlador.obtenerCursos();
        this.mostrarOcultarCrud(true, false, false);    // Iniciar mostrando el listado de hijos.
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
   
    /**
     * Actualiza el listado.
     * @param {Object} datos Datos del padre.
     */
    actualizar(datos) {
        this.idUsuario = datos.id;
        this.controlador.dameHijos(this.idUsuario);
    }

    /**
     * Carga tabla con los hijos.
     * @param {Array} hijos Listado de hijos.
     */
    cargarListado(hijos) {
        this.tbody.innerHTML = '';  // Limpiar tabla para sustituirla con nuevos datos.

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

    /**
     * Rellena los select con la lista de cursos recibida.
     * @param {Array} cursos Array de cursos.
     */
    rellenarSelects(cursos) {
        for (const curso of cursos) {
            let optionAlta = document.createElement('option');
            optionAlta.textContent = curso.nombre;
            optionAlta.value = curso.id;

            // Crear otro option igual para el select de modificar, porque no se puede usar el mismo para ambos :/
            let optionMod = document.createElement('option');   
            optionMod.textContent = curso.nombre;
            optionMod.value = curso.id;
            
            this.selectAlta.appendChild(optionAlta);
            this.selectModificacion.appendChild(optionMod);
        }
        
    }

    /**
     * Valida formulario y realiza proceso en caso de que las validaciones se cumplan.
     */
    validarFormularioAlta() {
        this.formAlta.classList.add('was-validated');
        this.selectAlta.setCustomValidity('');

        if (this.selectAlta.value != -1) {
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
        else {
            this.selectAlta.setCustomValidity('Selecciona un curso.');
            this.selectAlta.reportValidity();
        }
    }

    /**
     * Valida formulario y realiza proceso en caso de que las validaciones se cumplan.
     */
    validarFormularioModificacion() {
        this.formModificar.classList.add('was-validated');
        this.selectModificacion.setCustomValidity('');

        if (this.selectModificacion.value != -1) {
            if (this.inputsModificar[0].checkValidity() && this.inputsModificar[1].checkValidity()) {
                const datos = {
                    'id': this.idUsuario,
                    'nombre': this.inputsModificar[0].value,
                    'apellidos': this.inputsModificar[1].value,
                    'idCurso': parseInt(this.selectModificacion.value)
                };
    
                this.divCargandoModificar.style.display = 'block';
                this.controlador.modificarHijo(datos);
            }
        }
        else {
            this.selectModificacion.setCustomValidity('Selecciona un curso.');
            this.selectModificacion.reportValidity();
        }
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
     * Mostrar formulario de edición de hijos.
     * @param {Object} hijo Datos hijo.
     */
    editar(hijo) {
        this.mostrarOcultarCrud(false, false, true);

        this.idUsuario = hijo.id;
        this.inputsModificar[0].value = hijo.nombre;
        this.inputsModificar[1].value = hijo.apellidos;
        this.selectModificacion.value = hijo.idCurso;
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
     * @param {Boolean} activar Activa o no mensaje éxito.
     */
    exitoAlta(activar) {
        this.formAlta.classList.remove('was-validated');
        this.formAlta.reset();
        this.divCargandoAlta.style.display = 'none';
        this.divExitoAlta.style.display = activar ? 'block' : 'none';
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