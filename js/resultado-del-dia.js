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

console.log('✅ Resultado del Día - Script cargado correctamente');