import {Vista} from '../vista.js';

/**
 * Contiene la vista de gestión diaria de secretaría.
 */
export class VistaGestionDiaria extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorSecretaria} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.usuarios = null;
        this.incidencias = null;

        this.btnDiaAnterior = this.div.getElementsByClassName('btn-prev')[0];
        this.btnDiaSiguiente = this.div.getElementsByClassName('btn-next')[0];
        this.tabla = this.div.querySelector('#tablaGestionDiaria');
        this.thead = this.div.getElementsByTagName('thead')[0];
        this.tbody = this.div.getElementsByTagName('tbody')[0];

        this.fechaActual = this.obtenerFecha();

        this.btnDiaAnterior.addEventListener('click', this.diaAnterior.bind(this));
        this.btnDiaSiguiente.addEventListener('click', this.diaSiguiente.bind(this));
    }

    /**
     * Refrescar/iniciar listado.
     */
    inicializar() {
        this.controlador.obtenerUsuarios(this.fechaActual);
    }

    /**
     * Obtener listado de usuarios que van al comedor, y cargar incidencias.
     * @param {Array} usuarios Array con los apuntados del día actual.
     */
    cargarIncidencias(usuarios) {
        this.usuarios = usuarios;
        if (this.usuarios) this.controlador.obtenerIncidencias(this.fechaActual);
        else this.iniciarTabla();
    }

    /**
     * Obtener incidencias y empezar a generar la tabla.
     * @param {Array} incidencias Incidencias de los usuarios del día de hoy.
     */
    cargarListado(incidencias) {
        this.incidencias = incidencias;
        this.iniciarTabla();
    }

    /**
     * Generar tabla por partes.
     */
    iniciarTabla() {
        this.crearEncabezado();
        this.crearCuerpo();
    }

    /**
     * Generar cabecera de la tabla.
     */
    crearEncabezado() {
        this.thead.innerHTML = '';

        // Primer tr
        let trDatos = document.createElement('tr');
        trDatos.classList.add('datos');

        let thTotales = document.createElement('th');
        thTotales.id = 'pedidosTotales';
        thTotales.textContent = this.usuarios 
            ? 'Pedidos totales: ' + this.usuarios.length 
            : 'Sin pedidos';

        let thFechaActual = document.createElement('th');
        thFechaActual.id = 'fechaDia';
        thFechaActual.textContent = this.fechaActual.getDate() + '/' + (this.fechaActual.getMonth()+1) + '/' + this.fechaActual.getFullYear();

        trDatos.appendChild(thTotales);
        trDatos.appendChild(document.createElement('th'));
        trDatos.appendChild(thFechaActual);

        this.thead.appendChild(trDatos);

        if (this.usuarios) {
            // Segundo tr
            let trInfo = document.createElement('tr');
            let thUsuarios = document.createElement('th');
            thUsuarios.textContent = 'Usuarios';

            let thTipo = document.createElement('th');
            thTipo.textContent = 'Tipo de usuario';

            let thIncidencias = document.createElement('th');
            thIncidencias.textContent = 'Incidencias';

            trInfo.appendChild(thUsuarios);
            trInfo.appendChild(thTipo);
            trInfo.appendChild(thIncidencias);

            this.thead.appendChild(trInfo);
        }
    }

    /**
     * Generar cuerpo de la tabla.
     */
    crearCuerpo() {
        this.tbody.innerHTML = '';

        if (!this.usuarios) return;

        const fechaHoy = new Date();
        fechaHoy.setUTCHours(0, 0, 0, 0);

        for (const usuario of this.usuarios) {
            let tr = document.createElement('tr');

            let tdNombre = document.createElement('td');
            tdNombre.textContent = usuario.nombre;

            let tdCurso = document.createElement('td');
            tdCurso.textContent = this.obtenerTipo(usuario.correo);

            let tdIncidencia = document.createElement('td');
            tdIncidencia.classList.add('small-cell');

            let textarea = document.createElement('textarea');
            textarea.maxLength = 500;
          
            if (this.incidencias) {
                for (const incidencia of this.incidencias) {
                    if (incidencia.idPersona == usuario.id && incidencia.incidencia)
                        textarea.value = incidencia.incidencia;
                }
            }

            // Bloquear edición si la fecha de hoy es superior.
            if (fechaHoy.valueOf() > this.fechaActual.valueOf()) {
                textarea.disabled = true;
            } 
            else {
                textarea.addEventListener('change', () => this.insertarIncidencia(usuario.id, textarea));
            }
                
            tdIncidencia.appendChild(textarea);

            tr.appendChild(tdNombre);
            tr.appendChild(tdCurso);
            tr.appendChild(tdIncidencia);

            this.tbody.appendChild(tr);
        }
    }

    /**
     * Devuelve el tipo de cuenta que tiene el usuario.
     * @param {String} correo Correo del usuario.
     * @returns {String} Tipo de cuenta.
     */
    obtenerTipo(correo) {
        if (!correo) {
            return 'Hijo';
        }

        if (correo.includes('@alumnado.fundacionloyola.net')) {
            return 'Alumnado';
        }

        if (correo.includes('@fundacionloyola.es')) {
            return 'Personal';
        }
    }

    /**
     * Informar al usuario de inserción de incidencia correcta.
     * @param {HTMLTextAreaElement} textarea Elemento textarea.
     */
    insercionExito(textarea) {
        textarea.style.backgroundColor = '#c7ffd6';

        setTimeout(() => {
            textarea.style.backgroundColor = 'white';
        }, 3000);
    }

    /**
     * Informar al usuario de inserción de incidencia incorrecta.
     * @param {HTMLTextAreaElement} textarea Elemento textarea.
     */
    insercionError(textarea) {
        textarea.style.backgroundColor = '#ffc7c7';

        setTimeout(() => {
            textarea.style.backgroundColor = 'white';
        }, 3000);
    }

    /**
     * Insertar incidencia al usuario en el día actual.
     * @param {Number} id ID del usuario.
     * @param {HTMLTextAreaElement} textarea Textarea de la incidencia.
     */
    insertarIncidencia(id, textarea) {
        let valor = textarea.value;
        if (valor == '') valor = null;

        const datos = {
            'dia': this.fechaActual.getDate() + '-' + (this.fechaActual.getMonth()+1) + '-' + this.fechaActual.getFullYear(),
            'idPersona': id,
            'incidencia': valor
        };

        this.controlador.insertarIncidencia(datos, valor ? textarea : null);
    }

    /**
     * Devolver el próximo lunes si es fin de semana, devolviendo la fecha actual si no lo es.
     * @returns {Date} Fecha.
     */
    obtenerFecha() {
        let fecha = new Date();

        if (fecha.getDay() == 0) fecha.setDate(fecha.getDate() + 1);
        else if (fecha.getDay() == 6) fecha.setDate(fecha.getDate() + 2);

        fecha.setUTCHours(0, 0, 0, 0);
        return fecha;
    }

    /**
     * Retroceder un día.
     */
    diaAnterior() {
        if (this.fechaActual.getDay() < 2) {
            this.semanaAnterior();
        }
        else {
            this.fechaActual.setDate(this.fechaActual.getDate() - 1);
        }

        this.inicializar();
    }

    /**
     * Avanzar un día.
     */
    diaSiguiente() {
        if (this.fechaActual.getDay() > 4) {
            this.semanaSiguiente();
        }
        else {
            this.fechaActual.setDate(this.fechaActual.getDate() + 1);
        }

        this.inicializar();
    }

    /**
     * Hacer que la fecha sea la que corresponde al lunes de la semana pasada a la actual.
     */
    semanaAnterior() {
        let fecha = this.fechaActual;
        fecha.setDate(fecha.getDate() - 3);
        this.fechaActual = fecha;
    }

    /**
     * Hacer que la fecha sea la que corresponde al lunes de la semana siguiente a la actual.
     */
    semanaSiguiente() {
        let fecha = this.fechaActual;
        fecha.setDate(fecha.getDate() + 3);
        this.fechaActual = fecha;
    }

    mostrar(ver) {
        super.mostrar(ver);
        if (ver) this.inicializar();    // Al volver a mostrar la vista, refrescar listado.
    }
}