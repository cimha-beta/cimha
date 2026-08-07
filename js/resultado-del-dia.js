// ============================================ //
// RESULTADO-DEL-DIA.JS - JAVASCRIPT            //
// ============================================ //

/**
 * CIMHA - Resultado del Día
 * Pantalla de resultados climáticos e hidrológicos
 */

// ============================================ //
// 1. ESPERAR A QUE EL DOM ESTÉ LISTO          //
// ============================================ //

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Resultado del Día - Pantalla cargada');
    
    // Aplicar transición de entrada
    aplicarTransicionEntrada();
    
    // Inicializar interacciones
    initInteracciones();

    // Cargar datos desde n8n
    cargarDatosClima();
});

// ============================================ //
// 2. TRANSICIÓN DE ENTRADA                     //
// ============================================ //

function aplicarTransicionEntrada() {
    const body = document.body;
    
    setTimeout(() => {
        body.classList.add('loaded');
    }, 50);
}

// ============================================ //
// 3. INTERACCIONES                             //
// ============================================ //

function initInteracciones() {
    // Toggle Río / Clima
    const btnRio = document.getElementById('btn-rio');
    const btnClima = document.getElementById('btn-clima');
    const botonesToggle = [btnRio, btnClima];

    function seleccionarCategoria(botonActivo) {
        botonesToggle.forEach(b => {
            if (!b) return;
            if (b === botonActivo) {
                b.classList.remove('toggle-btn-inactive');
                b.classList.add('toggle-btn-active');
            } else {
                b.classList.remove('toggle-btn-active');
                b.classList.add('toggle-btn-inactive');
            }
        });
    }

    if (btnRio) {
        btnRio.addEventListener('click', function() {
            console.log('🌊 Seleccionado: Río');
            seleccionarCategoria(btnRio);
        });
    }

    if (btnClima) {
        btnClima.addEventListener('click', function() {
            console.log('☀️ Seleccionado: Clima');
            seleccionarCategoria(btnClima);
        });
    }

    // Alert Banner - Click para ver detalles
    const alertBanner = document.getElementById('alert-banner');
    if (alertBanner) {
        alertBanner.addEventListener('click', function() {
            console.log('🔔 Alerta: Temperaturas Altas - Ver detalles');
            // Aquí puedes mostrar un modal o redirigir
            // navegarConTransicion('detalles-alerta.html');
        });
    }
}

// ============================================ //
// 4. FUNCIÓN DE REDIRECCIÓN CON TRANSICIÓN    //
// ============================================ //

function navegarConTransicion(destino) {
    const body = document.body;
    body.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = destino;
    }, 400);
}

// ============================================ //
// 5. CARGAR DATOS DESDE N8N                    //
// ============================================ //

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/consulta-coordenadas';

async function cargarDatosClima() {
    try {
        const response = await fetch(N8N_WEBHOOK_URL);
        if (!response.ok) throw new Error('Error en la respuesta del webhook');

        const data = await response.json();
        const resultado = data[0]; // el JSON viene como array

        // Fecha / Hora / Ubicación
        document.getElementById('fecha').textContent = resultado.fecha;
        document.getElementById('hora').textContent = resultado.hora;
        document.getElementById('ubicacion').textContent =
            `${resultado.ubicacion.municipio}, ${resultado.ubicacion.departamento}`;

        // Card azul
        document.getElementById('temp-actual').textContent = resultado.clima.temperatura_actual;
        document.getElementById('estado-cielo').textContent = resultado.clima.estado_cielo;
        document.getElementById('temp-max').textContent = `${resultado.clima.temperatura_maxima}°`;
        document.getElementById('temp-min').textContent = `${resultado.clima.temperatura_minima}°`;
        document.getElementById('sensacion-termica').textContent = `${resultado.clima.sensacion_termica}°`;

        // Sección detallada
        document.getElementById('prob-lluvia').textContent = `${resultado.clima.probabilidad_lluvia}%`;
        document.getElementById('velocidad-viento').textContent = `${resultado.clima.velocidad_viento} Km/h`;

        // Interpretación
        document.getElementById('interpretacion').textContent = resultado.clima.interpretacion;

        console.log('✅ Datos de n8n cargados correctamente');
    } catch (error) {
        console.error('❌ Error cargando datos del webhook:', error);
    }
}

console.log('✅ Resultado del Día - Script cargado correctamente');