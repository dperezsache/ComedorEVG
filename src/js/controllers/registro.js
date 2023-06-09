import { Rest } from "../services/rest.js";

/**
 * Controlador del registro de padres.
 */
class Registro {
    constructor() {
        window.onload = this.iniciar.bind(this);
        window.onerror = (error) => console.error('Error capturado. ' + error);
    }

    /**
     * Inicia al cargar la página.
     */
    iniciar() {
        this.form = document.getElementsByTagName('form')[0];
        this.inputs = document.getElementsByTagName('input');
        this.divExito = document.getElementById('divExito');
        this.divError = document.getElementById('divError');
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
        
        this.inputs[4].setCustomValidity('');
        this.inputs[7].setCustomValidity('');
        this.form.classList.add('was-validated');

        if (cont == total) {
            // Check de contraseñas
            if (this.inputs[3].value === this.inputs[4].value) {
                // Check de IBAN
                if (this.inputs[7].value.match(/^ES\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|ES\d{22}$/)) {
                    this.divCargando.style.display = 'block';
                
                    if (this.divError.style.display == 'block')
                        this.divError.style.display = 'none';
    
                    this.btnRegistrar.disabled = true;
                    this.btnCancelar.disabled = true;
                    this.insertarPersona();
                }
                else {
                    this.inputs[7].setCustomValidity('El IBAN introducido no es válido.');
                    this.inputs[7].reportValidity();
                }
            }
            else {
                this.inputs[4].setCustomValidity('Las contraseñas no coindicen.');
                this.inputs[4].reportValidity();
            }
        }
    }

    /**
     * Llamada al servidor para añadir a persona a la BBDD.
     */
    insertarPersona() {
        const usuario = {
            nombre: this.inputs[0].value,
            apellidos: this.inputs[1].value,
            correo: this.inputs[2].value,
            clave: this.inputs[3].value,
            telefono: this.inputs[5].value,
            dni: this.inputs[6].value,
            iban: this.inputs[7].value,
            titular: this.inputs[8].value
        };

        Rest.post('persona', [], usuario, true)
         .then(id => {
             this.insertarPadre(id, usuario);
         })
         .catch(e => {
             this.divCargando.style.display = 'none';
             this.error(e);
         })
    }

    /**
     * Llamada al servidor para añadir padre a la BBDD.
     * @param {Number} id ID de la persona.
     * @param {Object} usuario Datos de la persona.
     */
    insertarPadre(id, usuario) {
        Rest.post('padres', [], id, false)
         .then(() => {
             this.divCargando.style.display = 'none';
             this.exito(usuario);
         })
         .catch(e => {
             this.divCargando.style.display = 'none';
             this.error(e);
         })
    }

    /**
     * Aviso de errores al usuario.
     * @param {Object} e Error.
     */
    error(e) {
        if (e != null) {
            if(e == 'Error: 500 - Internal Server Error 1') {
                this.divError.innerHTML = '<p>Ya existe una cuenta con esa dirección de correo.</p>';
            }
            else if (e == 'Error: 408 - Request Timeout') {
                this.divError.innerHTML = '<p>No hay conexión con la base de datos. Intente de nuevo más tarde.</p>';
            }
            else {
                this.divError.innerHTML = '<p>' + e + '</p>';
            }

            this.divError.style.display = 'block';
            this.form.classList.remove('was-validated');
            window.scrollTo(0, document.body.scrollHeight);
        }
        else {
            this.divError.style.display = 'none';
        }

        this.btnRegistrar.disabled = false;
        this.btnCancelar.disabled = false;
    }

    /**
     * Informar al usuario del alta exitosa, y redirigir a página de padres.
     * @param {Object} datos Datos del usuario.
     */
    exito(datos) {
        if (this.divError.style.display == 'block')
            this.divError.style.display = 'none';

        for (let input of this.inputs)
            input.disabled = true;

        this.btnRegistrar.disabled = true;
        this.btnCancelar.disabled = true;
        this.divExito.style.display = 'block';

        window.scrollTo(0, document.body.scrollHeight);
        this.iniciarSesion(datos);
    }

    /**
     * Vuelve a la página anterior.
     */
    volverAtras() {
        window.history.go(-1);
    }

    /**
     * Loguear usuario.
     * @param {Object} datos Datos del usuario.
     */
    iniciarSesion(datos) {
        const login = {
            usuario: datos.correo,
            clave: datos.clave
        };

        Rest.post('login', [], login, true)
         .then(usuario => {
             sessionStorage.setItem('usuario', JSON.stringify(usuario));
             window.location.href = 'index.html';
         })
         .catch(e => {
             this.error(e);
         })
    }

    /**
     * Asigna rol de padre y redirigir.
     */
    redireccionar() {
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));
        usuario.rol = 'P';  // Poner rol de usuario padre.
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        window.location.href = 'index.html';
    }
}

new Registro();