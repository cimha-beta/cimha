// ============================================ //
// ACERCA-DE-NOSOTROS.JS - JAVASCRIPT           //
// ============================================ //

/**
 * CIMHA - Acerca de nosotros
 * Información de la organización y equipo
 */

// ============================================ //
// 1. ESPERAR A QUE EL DOM ESTÉ LISTO          //
// ============================================ //

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Acerca de nosotros - Pantalla cargada');
    
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
    const backButton = document.getElementById('back-button');
    
    // Botón volver con transición
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const body = document.body;
            body.classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = 'principal.html';
            }, 400);
        });
    }
    
    // Efecto hover en tarjetas de valores (también manejado por CSS)
    // Esta es una mejora adicional con JavaScript
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // CSS ya maneja el hover, pero podemos agregar efectos adicionales
        });
    });
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

console.log('✅ Acerca de nosotros - Script cargado correctamente');
