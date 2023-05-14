import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaInicioPadres extends Vista {
    /**
	 *	Constructor de la clase.
	 *	@param {ControladorPadres} controlador Controlador de la vista.
	 *	@param {HTMLDivElement} div Div de HTML en el que se desplegará la vista.
	 */
    constructor(controlador, div) {
        super(controlador, div);

        this.hijos = null;
        this.dias = null;

        this.listaMeses = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre",
            "Octubre", "Noviembre", "Diciembre"
        ];

        this.listaDias = ["L", "M", "X", "J", "V"];

        this.idPadre = 0;

        this.inicioSemana = this.obtenerSemanaActual();
        this.dia = this.inicioSemana.getDate();
        this.mes = this.inicioSemana.getMonth();
        this.anio = this.inicioSemana.getFullYear();
        
        this.tabla = this.div.querySelector('#menuHijos');
        this.thead = this.div.getElementsByTagName('thead')[0];
        this.tbody = this.div.getElementsByTagName('tbody')[0];
    }

    /**
     * Hacer set del ID del padre, y pedir los hijos del padre al controlador.
     * @param {Object} datos Datos del padre.
     */
    obtenerPadre(datos) {
        this.idPadre = datos.id;
        this.controlador.dameHijosCalendario(this.idPadre);
    }

    /**
     * Recibir los hijos, y hacer llamada para obtener todos los días de comedor de los hijos.
     * @param {Array} hijos Array de los hijos.
     */
    inicializar(hijos) {
        this.hijos = hijos;
        let idHijos = [];

        if (this.hijos.length > 0) {
            for (let hijo of this.hijos)  
                idHijos.push(hijo.id);

            this.controlador.obtenerDiasComedor(idHijos);
        }
        else {
            this.iniciarCalendario();   // Iniciar calendario en blanco (no se mostrará).
        }
    }

    /**
     * Recibe los días que acuden al comedor los hijos de un padre, y monta el calendario.
     * @param {Array} dias Array de objetos, con información de los días del comedor.
     */
    montarCalendario(dias) {
        this.diasComedor = dias;
        this.iniciarCalendario();
    }

    /**
     * Montar el calendario de la semana indicada por partes.
     */
    iniciarCalendario() {
        if (this.hijos != null && this.hijos.length > 0) {
            this.tabla.style.display = 'table';
            this.crearEncabezado(); // thead
            this.crearCuerpo();     // tbody
            this.crearBotones();    // Botones cambio de semana
        }
        else {
            this.tabla.style.display = 'none';
        }
    }

    /**
     * Generar parte de abajo del calendario dónde van los botones de cambio de semana.
     */
    crearBotones() {
        let trBotones = document.createElement('tr');

        let tdBotones = document.createElement('td');
        tdBotones.classList.add('tdBotones');
        tdBotones.colSpan = 8;

        // Semana anterior
        let botonSemanaAnterior = document.createElement('button');
        botonSemanaAnterior.id = 'semanaAnterior';
        botonSemanaAnterior.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        botonSemanaAnterior.addEventListener('click', this.semanaAnterior.bind(this));
        tdBotones.appendChild(botonSemanaAnterior);
    
        // Semana siguiente
        let botonSemanaSiguiente = document.createElement('button');
        botonSemanaSiguiente.id = 'semanaSiguiente';
        botonSemanaSiguiente.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
        botonSemanaSiguiente.addEventListener('click', this.semanaSiguiente.bind(this));
        tdBotones.appendChild(botonSemanaSiguiente);
        trBotones.appendChild(tdBotones);

        // Añadir al cuerpo de la tabla
        this.tbody.appendChild(trBotones);
    }

    /**
     * Generar el cuerpo del calendario (contenido tbody).
     */
    crearCuerpo() {
        this.tbody.innerHTML = '';  // Limpiar contenido calendario previo.
        for (const hijo of this.hijos) {
            let trBody = document.createElement('tr');

            let tdHijo = document.createElement('td');
            tdHijo.classList.add('tdHijos');
            tdHijo.textContent = hijo.nombre;
            trBody.appendChild(tdHijo);

            let cont = 0;
            let deshabilitar = false;

            for (let i=0; i<5; i++) {
                let td = document.createElement('td');
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                let fechaDia = new Date(this.inicioSemana);
                fechaDia.setDate(fechaDia.getDate() + i);
                fechaDia.setUTCHours(0, 0, 0, 0); // Limpiar el time de la fecha, para que no arruine comprobación posterior.

                let idString = 'fecha-' + hijo.id + '-';
                idString += fechaDia.getFullYear() + '-' + (fechaDia.getMonth()+1) + '-' + fechaDia.getDate();

                checkbox.id = idString;
                checkbox.addEventListener('click', () => this.marcarDesmarcarDia(checkbox.checked, hijo.id, this.idPadre, checkbox.id));

                if (this.diasComedor.length > 0) {
                    for (const diaComedor of this.diasComedor) {
                        let fecha = new Date(diaComedor.dia);

                        if (fecha.valueOf() === fechaDia.valueOf() && diaComedor.idUsuario == hijo.id) {
                            checkbox.checked = true;
                            cont++;

                            // Si ese día no ha sido asignado por el padre actual, desactivar checkbox
                            if (diaComedor.idPadre != this.idPadre) {
                                if (!deshabilitar) deshabilitar = true;
                                checkbox.disabled = true;
                            }
                        }
                    }
                }

                td.appendChild(checkbox);
                trBody.appendChild(td);
            }

            let tdSemanaEntera = document.createElement('td');
            tdSemanaEntera.classList.add('tdSemanaEntera');

            let checkboxSemanaEntera = document.createElement('input');
            checkboxSemanaEntera.type = 'checkbox';
            checkboxSemanaEntera.disabled = deshabilitar;
            checkboxSemanaEntera.addEventListener('click', () => this.marcarDesmarcarSemana(checkboxSemanaEntera.checked, this.inicioSemana, hijo.id));
            tdSemanaEntera.appendChild(checkboxSemanaEntera);
            trBody.appendChild(tdSemanaEntera);

            // Si toda la semana está marcada por el padre actual, marcar checkbox de semana entera.
            if (cont==5 && !deshabilitar) 
                checkboxSemanaEntera.checked = true;

            let tdMesEntero = document.createElement('td');
            let checkboxMesEntero = document.createElement('input');
            checkboxMesEntero.type = 'checkbox';
            checkboxMesEntero.disabled = deshabilitar;
            tdMesEntero.appendChild(checkboxMesEntero);
            trBody.appendChild(tdMesEntero);
            
            this.tbody.appendChild(trBody);
        }  
    }

    /**
     * Marca o desmarcar los días de la semana actual entera.
     * @param {Boolean} marcado Marcar o desmarcar días.
     * @param {Date} fecha Fecha de inicio de la semana.
     * @param {Number} idHijo ID del hijo al que marcar o desmarcar los días.
     */
    marcarDesmarcarSemana(marcado, fecha, idHijo) {
        for (let i=0; i<5; i++) {
            let fechaDia = new Date(fecha);
            fechaDia.setDate(fechaDia.getDate() + i);

            let stringID = '#fecha-' + idHijo + '-';
            stringID += fechaDia.getFullYear() + '-' + (fechaDia.getMonth()+1) + '-' + fechaDia.getDate();

            let checkbox = this.tbody.querySelector(stringID);

            // Marcar solo los que no estén deshabilitados, ni marcados.
            if (checkbox && !checkbox.disabled && checkbox.checked!=marcado) {
                let clickEvento = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': false
                });

                checkbox.dispatchEvent(clickEvento);    // Clicar checkbox programáticamente.
            }
        }
    }

    /**
     * Generar el encabezado del calendario (contenido thead).
     */
    crearEncabezado() {   
        this.thead.innerHTML = '';
        let trHead = document.createElement('tr');
        let thNombreMes = document.createElement('th');
        thNombreMes.id = 'thMes';
        thNombreMes.innerHTML = this.listaMeses[this.mes];
        thNombreMes.appendChild(document.createElement('br'));
        thNombreMes.innerHTML += this.inicioSemana.getFullYear();
        trHead.appendChild(thNombreMes);

        for (let i=0; i<5; i++) {
            let th = document.createElement('th');
            th.classList.add('diaSemena');
            th.appendChild(document.createElement("br"));

            let fecha = new Date(this.inicioSemana);
            fecha.setDate(fecha.getDate() + i);

            th.innerHTML = this.listaDias[i];
            th.appendChild(document.createElement('br'));
            th.innerHTML += (fecha.getDate());

            trHead.appendChild(th);
        }

        let thSemana = document.createElement('th');
        thSemana.id = 'semanaEntera';
        thSemana.innerHTML = '<i class="fa-sharp fa-solid fa-calendar-week" title="Marcar semana entera"></i>';
        trHead.appendChild(thSemana);

        let thMes = document.createElement('th');
        thMes.id = 'mesEntero';
        thMes.innerHTML = '<i class="fa-sharp fa-solid fa-calendar-days" title="Marcar mes entero"></i>';
        trHead.appendChild(thMes);

        this.thead.appendChild(trHead);
    }

    /**
     * Pide al controlador realizar el proceso de marcar o desmarcar el día del comedor.
     * @param {Boolean} marcado Marcar día o desmarcar día del comedor.
     * @param {Number} idHijo ID del hijo (usuario).
     * @param {Number} idPadre ID del padre.
     * @param {Date} fecha Fecha del día a insertar.
     */
    marcarDesmarcarDia(marcado, idHijo, idPadre, fecha) {
        let fechaValida = fecha.toString();
        fechaValida = fechaValida.replace('fecha-' + idHijo + '-', '');  // Quitar 'fecha-id-' del string.
        
        const datos = {
            'dia': fechaValida,
            'idUsuario': idHijo,
            'idPadre': idPadre
        };

        if (marcado) {
            this.controlador.marcarDiaComedor(datos);
        }
        else {
            this.controlador.desmarcarDiaComedor(datos);
        }
    }

    /**
     * Obtener la fecha que corresponde al lunes de esta semana.
     * @return {Date} La fecha que corresponde al lunes de esta semana.
     */
    obtenerSemanaActual() {
        let fecha = new Date();
        let dia = fecha.getDay();
        let diff = fecha.getDate() - dia + (dia == 0 ? -6:1); // Ajustar si el día es domingo.
        return new Date(fecha.setDate(diff));
    }

    /**
     * Hacer que la fecha sea la que corresponde al lunes de la semana pasada a la actual.
     */
    semanaAnterior() {
        let fecha = this.inicioSemana;
        fecha.setDate(fecha.getDate() - 7);

        this.inicioSemana = fecha;
        this.anio = this.inicioSemana.getFullYear();
        this.mes = this.inicioSemana.getMonth();
        this.dia = this.inicioSemana.getDate();

        this.refrescarCalendario();
    }

    /**
     * Hacer que la fecha sea la que corresponde al lunes de la semana siguiente a la actual.
     */
    semanaSiguiente() {
        let fecha = this.inicioSemana;
        fecha.setDate(fecha.getDate() + 7);

        this.inicioSemana = fecha;
        this.anio = this.inicioSemana.getFullYear();
        this.mes = this.inicioSemana.getMonth();
        this.dia = this.inicioSemana.getDate();
        
        this.refrescarCalendario();
    }

    /**
     * Refrescar calendario.
     */
    refrescarCalendario() {
        this.controlador.dameHijosCalendario(this.idPadre); // Pedir al controlador que actualice el calendario.
    }

    mostrar(ver) {
        super.mostrar(ver);
        if (ver) this.refrescarCalendario();    // Al volver a mostrar la vista, refrescar calendario.
    }
}