// ============================================ //
// CARGA-PRONOSTICO.JS - JAVASCRIPT         //
// ============================================ //

/**
 * CIMHA - Generando Pronóstico
 * Pantalla de carga con barra de progreso
 */

// ============================================ //
// 1. DATOS DE ESTADOS                         //
// ============================================ //

const statusSteps = [
    "Localizando Ubicación",
    "Consultando Clima",
    "Buscando Estaciones",
    "Estaciones Encontradas",
    "Obteniendo Información",
    "Triangulando Información",
    "Integrando IA",
    "Preparando Formato",
    "¡Listo!"
];

// ============================================ //
// 2. VARIABLES DE ESTADO                       //
// ============================================ //

let currentStep = 0;
let isCancelled = false;
let timeoutId = null;
const timePerPhase = 1500; // 1.5 segundos por fase

// ============================================ //
// 3. REFERENCIAS A ELEMENTOS DOM              //
// ============================================ //

const statusTextElement = document.getElementById('status-text');
const container = document.getElementById('loading-container');
const segments = container ? container.querySelectorAll('div') : [];
const cancelButton = document.getElementById('cancel-button');

// ============================================ //
// 4. ESPERAR A QUE EL DOM ESTÉ LISTO          //
// ============================================ //

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Generando Pronóstico - Pantalla cargada');
    
    // Aplicar transición de entrada
    aplicarTransicionEntrada();
    
    // Iniciar el proceso de carga
    setTimeout(() => {
        iniciarCarga();
    }, 500);
    
    // Inicializar interacciones
    initInteracciones();
});

// ============================================ //
// 5. TRANSICIÓN DE ENTRADA                     //
// ============================================ //

function aplicarTransicionEntrada() {
    const body = document.body;
    
    setTimeout(() => {
        body.classList.add('loaded');
    }, 50);
}

// ============================================ //
// 6. FUNCIÓN DE CARGA (PROGRESO)              //
// ============================================ //

function iniciarCarga() {
    if (isCancelled) return;
    
    if (currentStep < statusSteps.length) {
        // Actualizar texto con animación
        statusTextElement.style.opacity = '0';
        setTimeout(() => {
            statusTextElement.textContent = statusSteps[currentStep];
            statusTextElement.style.opacity = '1';
        }, 300);
        
        // Llenar segmento
        if (currentStep < segments.length) {
            segments[currentStep].classList.remove('bg-transparent');
            segments[currentStep].classList.add('bg-secondary');
            
            // Si es el último segmento, cambiar color a verde (éxito)
            if (currentStep === segments.length - 1) {
                segments[currentStep].classList.remove('bg-secondary');
                segments[currentStep].classList.add('bg-green-500');
            }
        }
        
        currentStep++;
        
        // Programar siguiente paso
        if (currentStep < statusSteps.length) {
            timeoutId = setTimeout(iniciarCarga, timePerPhase);
        } else {
            // Proceso completado
            console.log('✅ Pronóstico generado exitosamente');
            // Aquí puedes redirigir automáticamente después de completar
            // setTimeout(() => {
            //     navegarConTransicion('resultado-pronostico.html');
            // }, 1000);
        }
    }
}

// ============================================ //
// 7. CANCELAR PROCESO                          //
// ============================================ //

function cancelarProceso() {
    isCancelled = true;
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    
    statusTextElement.textContent = 'Proceso cancelado';
    statusTextElement.style.color = '#ba1a1a';
    
    // Efecto de salida
    setTimeout(() => {
        navegarConTransicion('principal.html');
    }, 500);
}

// ============================================ //
// 8. INTERACCIONES                             //
// ============================================ //

function initInteracciones() {
    // Botón Cancelar
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            cancelarProceso();
        });
    }
    
    // Tecla ESC para cancelar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cancelarProceso();
        }
    });
}

// ============================================ //
// 9. FUNCIÓN DE REDIRECCIÓN CON TRANSICIÓN    //
// ============================================ //

function navegarConTransicion(destino) {
    const body = document.body;
    body.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = destino;
    }, 400);
}

console.log('✅ Generando Pronóstico - Script cargado correctamente');
