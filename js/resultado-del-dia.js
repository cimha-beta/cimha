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

    // ========================================== //
    // NUEVO: Inicializar interacciones de estaciones
    // ========================================== //
    initEstacionesInteracciones();
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
// 3. INTERACCIONES PRINCIPALES                 //
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

// ============================================ //
// ====== 6. NUEVO: INTERACCIONES DE ESTACIONES DEL RÍO ====== //
// ============================================ //

/**
 * Inicializa las interacciones para las tarjetas de estaciones
 * del río Sinú que se agregaron debajo.
 */
function initEstacionesInteracciones() {
    // Seleccionar todas las tarjetas de estaciones
    const estaciones = document.querySelectorAll('.estacion-card');
    
    estaciones.forEach((estacion, index) => {
        estacion.addEventListener('click', function() {
            const nombre = this.querySelector('h3')?.textContent || 'Estación';
            const nivel = this.querySelector('.text-2xl')?.textContent || 'N/A';
            console.log(`📍 Estación seleccionada: ${nombre} - Nivel: ${nivel}m`);
            
            // Aquí puedes agregar acciones al hacer clic en una estación
            // Ej: mostrar detalles en un modal, redirigir, etc.
            
            // Efecto visual: resaltar temporalmente
            this.style.transition = 'all 0.2s ease';
            this.style.boxShadow = '0 0 0 3px #2563EB, 0 4px 12px rgba(37, 99, 235, 0.3)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 800);
        });
        
        // Efecto hover para mejor UX
        estacion.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        estacion.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log(`✅ ${estaciones.length} estaciones del río inicializadas`);
}

// ============================================ //
// 7. FUNCIÓN PARA ACTUALIZAR DATOS DE ESTACIONES (OPCIONAL) //
// ============================================ //

/**
 * Función de ejemplo para actualizar los datos de las estaciones
 * desde una API. Puedes expandirla según necesites.
 */
async function actualizarDatosEstaciones() {
    try {
        // Ejemplo de URL - reemplazar con tu endpoint real
        // const response = await fetch('https://tu-api.com/estaciones');
        // const data = await response.json();
        
        // Actualizar cada estación con datos reales
        // ...
        
        console.log('🔄 Datos de estaciones actualizados');
    } catch (error) {
        console.error('❌ Error actualizando estaciones:', error);
    }
}

console.log('✅ Resultado del Día - Script cargado correctamente');

// ============================================ //
// ====== 7. INTERACCIONES PARA EMBALSE URRÁ I ====== //
// ============================================ //

/**
 * Inicializa las interacciones para el embalse Urrá I
 */
function initEmbalseInteracciones() {
    // Botones de los cards de estadísticas (Entrante, Turbinas, Rebosadero)
    const botonesDetalle = document.querySelectorAll('.embalse-detalle-btn');
    
    botonesDetalle.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const parentCard = this.closest('.flex.items-center.justify-between');
            const titulo = parentCard?.querySelector('h4')?.textContent || 'Estadística';
            const valor = parentCard?.querySelector('.text-xl')?.textContent || 'N/A';
            
            console.log(`📊 ${titulo}: ${valor} - Ver detalle`);
            
            // Aquí puedes agregar acción: abrir modal, redirigir, etc.
        });
    });
    
    // Botón de gráfico en la tarjeta principal
    const btnGrafico = document.querySelector('.embalse-grafico-btn');
    if (btnGrafico) {
        btnGrafico.addEventListener('click', function() {
            console.log('📈 Abrir gráfico del embalse');
            // Aquí puedes abrir un gráfico o modal
        });
    }
    
    // Click en la tarjeta principal
    const mainCard = document.querySelector('.embalse-main-card');
    if (mainCard) {
        mainCard.addEventListener('click', function() {
            console.log('💧 Nivel del embalse: 121.99 msnm');
            // Aquí puedes mostrar más detalles
        });
    }
    
    console.log('✅ Embalse Urrá I inicializado');
}

// Llamar a la función después de que cargue el DOM
// (agregar dentro del DOMContentLoaded)