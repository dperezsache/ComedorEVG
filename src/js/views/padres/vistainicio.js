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
        this.diasComedor = null;
        this.festivos = null;

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
    }

    /**
     * Obtener los días festivos que haya en el mes actual.
     * @param {Array} festivos 
     */
    obtenerFestivos(festivos) {
        this.festivos = festivos;
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

        let iconoSemanaAnterior = document.createElement('img');
        iconoSemanaAnterior.src = './img/icons/arrow_back.svg';
        iconoSemanaAnterior.alt = 'Semana anterior';

        botonSemanaAnterior.appendChild(iconoSemanaAnterior);
        botonSemanaAnterior.addEventListener('click', this.semanaAnterior.bind(this));
        tdBotones.appendChild(botonSemanaAnterior);
    
        // Semana siguiente
        let botonSemanaSiguiente = document.createElement('button');
        botonSemanaSiguiente.id = 'semanaSiguiente';

        let iconoSemanaSiguiente = document.createElement('img');
        iconoSemanaSiguiente.src = './img/icons/arrow_forward.svg';
        iconoSemanaSiguiente.alt = 'Semana siguiente';

        botonSemanaSiguiente.appendChild(iconoSemanaSiguiente);
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

            for (let i=0; i<5; i++) {
                let td = document.createElement('td');
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                let fechaDia = new Date(this.inicioSemana);
                fechaDia.setDate(fechaDia.getDate() + i);
                fechaDia.setUTCHours(0, 0, 0, 0); // Limpiar el time de la fecha, para que no arruine comprobación posterior.

                let fechaString = this.formatearStringFecha(fechaDia);
                let idString = 'fecha-' + hijo.id + '-' + fechaString;

                checkbox.id = idString;
                checkbox.addEventListener('click', () => this.marcarDesmarcarDia(checkbox.checked, hijo.id, this.idPadre, true, checkbox.id));

                // Comprobaciones fecha:
                const fechaActual = new Date();

                // 1- Días festivos.
                if (this.festivos && this.festivos.includes(fechaString)) {
                    checkbox.disabled = true;
                }

                // 2- No poder interactuar con el día de mañana si hoy son las 14 o más.
                if (!checkbox.disabled && this.bloquearDiaTomorrow(fechaActual, fechaDia)) {
                    checkbox.disabled = true;
                }

                // 3- Desactivar el poder interactuar con días ya pasados.
                if (!checkbox.disabled && Date.parse(fechaActual) > Date.parse(fechaDia)) {
                    checkbox.disabled = true;
                }

                // Marcar los días que se hayan seleccionado previamente.
                if (this.diasComedor.length > 0) {
                    for (const diaComedor of this.diasComedor) {
                        let fecha = new Date(diaComedor.dia);

                        if (fecha.valueOf() === fechaDia.valueOf() && diaComedor.idPersona == hijo.id) {
                            checkbox.checked = true;
                            cont++;

                            // Si ese día no ha sido asignado por el padre actual, desactivar checkbox
                            if (!checkbox.disabled && diaComedor.idPadre != this.idPadre) {
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
            checkboxSemanaEntera.addEventListener('click', () => this.marcarDesmarcarSemana(checkboxSemanaEntera.checked, this.inicioSemana, hijo.id));
            tdSemanaEntera.appendChild(checkboxSemanaEntera);
            trBody.appendChild(tdSemanaEntera);

            // Si toda la semana está marcada por el padre actual, marcar checkbox de semana entera.
            if (cont==5) 
                checkboxSemanaEntera.checked = true;

            let tdMesEntero = document.createElement('td');
            let checkboxMesEntero = document.createElement('input');
            checkboxMesEntero.type = 'checkbox';
            checkboxMesEntero.id = 'mes-' + this.inicioSemana.getMonth();
            checkboxMesEntero.addEventListener('click', () => this.marcarDesmarcarMes(checkboxMesEntero.checked, checkboxMesEntero.id, hijo.id));
            tdMesEntero.appendChild(checkboxMesEntero);
            trBody.appendChild(tdMesEntero);
            
            this.tbody.appendChild(trBody);
        }  
    }

    /**
     * Formatea una fecha con un formato específico.
     * @param {Date} fecha Fecha a formatear.
     * @returns {String} Fecha formateada (ejemplo: 2023-05-20).
     */
    formatearStringFecha(fecha) {
        return fecha.getFullYear() + '-' + 
                ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' +
                ("0" + fecha.getDate()).slice(-2);
    }

    /**
     * Marcar o desmarcar un mes entero de comedor.
     * @param {Boolean} marcado True para marcar, false para desmarcar.
     * @param {String} mes Texto con el mes.
     * @param {Number} idHijo ID del hijo.
     */
    marcarDesmarcarMes(marcado, mes, idHijo) {
        let numMes = mes.replace('mes-', '');
        let temp = new Date();
        temp.setMonth(parseInt(numMes));
        temp.setDate(1);
        
        let diasMes = new Date(parseInt(temp.getFullYear()), parseInt(temp.getMonth()) + 1, 0).getDate();

        for (let i=0; i<diasMes; i++) {
            const actual = new Date();
            let stringFecha = this.formatearStringFecha(temp);
            let diaYaMarcado = false;

            // Comprobar que el hijo no tenga el día actual ya marcado de antes.
            if (marcado && this.diasComedor && this.diasComedor.length > 0) {
                for (const diaComedor of this.diasComedor) {
                    if (diaComedor.idPersona == idHijo && diaComedor.dia == stringFecha) {
                        diaYaMarcado = true;
                        break;
                    }
                }
            }

            // 1º Día no está ya previamente marcado.
            // 2º Comprobar que no sean días ya pasados.
            // 3º Comprobar si el próximo día a hoy es mañana y hoy son las 14 o más.
            // 4º Comprobar, que no es un festivo.
            if (!diaYaMarcado && Date.parse(actual) < Date.parse(temp) && !this.bloquearDiaTomorrow(actual, temp) && (this.festivos && !this.festivos.includes(stringFecha))) {
                // Comprobar que el día no sea fin de semana.
                if (temp.getDay() != 6 && temp.getDay() != 0) {
                    let fechaFormateada = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
                    this.marcarDesmarcarDia(marcado, idHijo, this.idPadre, false, fechaFormateada);
                }
            }
            temp.setDate(temp.getDate() + 1);
        }

        this.refrescarCalendario();
    }

    /**
     * Comprobar si puede o no interactuar con el día de mañana si hoy son las 14 o más.
     * @param {Date} fechaHoy Fecha actual.
     * @param {Date} fechaDia Fecha mañana.
     * @returns {Boolean} True si mañana debería ser bloqueado, false si no.
     */
    bloquearDiaTomorrow(fechaHoy, fechaDia) {
        return fechaDia.getFullYear() === fechaHoy.getFullYear() &&
                fechaDia.getMonth() === fechaHoy.getMonth() &&
                fechaDia.getDate() === fechaHoy.getDate() + 1 &&
                fechaHoy.getHours() >= 14;
    }

    /**
     * Marca o desmarcar los días de la semana actual entera.
     * @param {Boolean} marcado Marcar o desmarcar días.
     * @param {Date} fecha Fecha de inicio de la semana.
     * @param {Number} idHijo ID del hijo al que marcar o desmarcar los días.
     * @return {Number} Total de días de la semana marcados/desmarcados.
     */
    marcarDesmarcarSemana(marcado, fecha, idHijo) {
        for (let i=0; i<5; i++) {
            let fechaDia = new Date(fecha);
            fechaDia.setDate(fechaDia.getDate() + i);

            let fechaString = this.formatearStringFecha(fechaDia);
            let idString = '#fecha-' + idHijo + '-' + fechaString;

            let checkbox = this.tbody.querySelector(idString);

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

        let semanaIcono = document.createElement('img');
        semanaIcono.src = './img/icons/date_range.svg';
        semanaIcono.alt = 'Marcar semana entera';
        semanaIcono.title = 'Marcar semana entera';

        thSemana.appendChild(semanaIcono);
        trHead.appendChild(thSemana);

        let thMes = document.createElement('th');
        thMes.id = 'mesEntero';

        let mesIcono = document.createElement('img');
        mesIcono.src = './img/icons/calendar_month.svg';
        mesIcono.alt = 'Marcar mes entero';
        mesIcono.title = 'Marcar mes entero';

        thMes.appendChild(mesIcono);
        trHead.appendChild(thMes);
        
        this.thead.appendChild(trHead);
    }

    /**
     * Pide al controlador realizar el proceso de marcar o desmarcar el día del comedor.
     * @param {Boolean} marcado Marcar día o desmarcar día del comedor.
     * @param {Number} idHijo ID del hijo (usuario).
     * @param {Number} idPadre ID del padre.
     * @param {Boolean} validarFecha Formatear la fecha para que sea válida (solo debe ser true si se llama desde los eventListener de checkboxes).
     * @param {Date} fecha Fecha del día a insertar.
     */
    marcarDesmarcarDia(marcado, idHijo, idPadre, validarFecha, fecha) {
        let fechaValida = null;

        if (validarFecha) {
            fechaValida = fecha.toString();
            fechaValida = fechaValida.replace('fecha-' + idHijo + '-', '');  // Quitar 'fecha-id-' del string.
        }
        else {
            fechaValida = fecha;
        }
        
        const datos = {
            'dia': fechaValida,
            'idPersona': idHijo,
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
        let inicioMes = new Date(this.inicioSemana.getFullYear(), this.inicioSemana.getMonth(), 1);
        let finMes = new Date(this.inicioSemana.getFullYear(), this.inicioSemana.getMonth() + 1, 0);
        this.controlador.obtenerFestivos(inicioMes, finMes);
    }

    mostrar(ver) {
        super.mostrar(ver);
        if (ver) this.refrescarCalendario();    // Al volver a mostrar la vista, refrescar calendario.
    }
}