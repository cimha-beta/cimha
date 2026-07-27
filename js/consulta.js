// ============================================ //
// IR-A-CONSULTA.JS - JAVASCRIPT                //
// ============================================ //

/**
 * CIMHA - Ir a Consulta
 * Selección de tipo de pronóstico
 */

// ============================================ //
// 1. ESPERAR A QUE EL DOM ESTÉ LISTO          //
// ============================================ //

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ir a Consulta - Iniciado correctamente');
    initButtonInteractions();
    initEntranceTransition();
    initBackButton();
});

// ============================================ //
// 2. INTERACCIONES DE BOTONES                  //
// ============================================ //

function initButtonInteractions() {
    // Seleccionar todos los botones
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Efecto táctil para móviles
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.7';
            button.style.transition = 'opacity 0.15s ease';
        });
        
        button.addEventListener('touchend', () => {
            button.style.opacity = '1';
        });
        
        button.addEventListener('touchcancel', () => {
            button.style.opacity = '1';
        });
        
        // Efecto hover para desktop
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transform = 'scale(1.02)';
                button.style.transition = 'transform 0.2s ease';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

// ============================================ //
// 3. TRANSICIÓN DE ENTRADA                     //
// ============================================ //

function initEntranceTransition() {
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
}

// ============================================ //
// 4. FUNCIONES DE REDIRECCIÓN                  //
// ============================================ //

/**
 * Redirige a la pantalla de consulta
 */
function irAConsulta() {
    window.location.href = 'carga-pronostico.html';
}

/**
 * Redirige a la pantalla anterior
 */
function volver() {
    window.location.href = 'principal.html';
}

// ============================================ //
// 5. FUNCIONES DE UTILIDAD                     //
// ============================================ //

/**
 * Función para registrar clicks en tarjetas
 */
function registrarClick(tarjeta) {
    console.log('📱 Tarjeta seleccionada:', tarjeta);
}

console.log('✅ Ir a Consulta - Script cargado correctamente');

// ============================================ //
// 6. BOTÓN DE RETROCESO - Con animación de salida //
// ============================================ //

function initBackButton() {
    const backButton = document.getElementById('back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.remove('loaded');
            document.body.classList.add('fade-out-back');
            
            setTimeout(() => {
                window.location.href = 'principal.html';
            }, 400);
        });
    }
}
