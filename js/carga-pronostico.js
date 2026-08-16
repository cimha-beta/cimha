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

let currentStep = 0;
let isCancelled = false;
let timeoutId = null;
const timePerPhase = 1500;

const statusTextElement = document.getElementById('status-text');
const loadingBar = document.getElementById('loading-bar');
const cancelButton = document.getElementById('cancel-button');
const cancelModal = document.getElementById('cancel-modal');
const modalOkBtn = document.getElementById('modal-ok-btn');
const cancelVideo = document.getElementById('cancel-video');

// Al terminar el video, detenerlo para que se quede congelado en el último frame
if (cancelVideo) {
    cancelVideo.addEventListener('ended', () => {
        cancelVideo.pause();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    aplicarTransicionEntrada();
    
    setTimeout(() => {
        iniciarCarga();
    }, 500);
    
    initInteracciones();
});

function aplicarTransicionEntrada() {
    const main = document.querySelector('main');
    
    requestAnimationFrame(() => {
        main.classList.add('loaded');
    });
}

function iniciarCarga() {
    if (isCancelled) return;
    
    if (currentStep < statusSteps.length) {
        statusTextElement.style.opacity = '0';
        setTimeout(() => {
            statusTextElement.textContent = statusSteps[currentStep];
            statusTextElement.style.opacity = '1';
        }, 300);
        
        const progress = ((currentStep + 1) / statusSteps.length) * 100;
        loadingBar.style.width = progress + '%';
        
        currentStep++;
        
        if (currentStep < statusSteps.length) {
            timeoutId = setTimeout(iniciarCarga, timePerPhase);
        }
    }
}

function cancelarProceso() {
    isCancelled = true;
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    // Quitar hidden y aplicar animación de entrada con doble requestAnimationFrame
    cancelModal.classList.remove('hidden');
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cancelModal.classList.add('modal-active');
        });
    });
}

function ocultarModalCancelacion() {
    cancelModal.classList.remove('modal-active');
    cancelModal.classList.add('modal-exit');
    
    setTimeout(() => {
        cancelModal.classList.add('hidden');
        cancelModal.classList.remove('modal-exit');
    }, 250);
}

function initInteracciones() {
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            cancelarProceso();
        });
    }

    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', function() {
            navegarConTransicion('principal.html');
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!cancelModal.classList.contains('hidden')) {
                navegarConTransicion('principal.html');
            } else {
                cancelarProceso();
            }
        }
    });
}

function navegarConTransicion(destino) {
    const main = document.querySelector('main');
    main.classList.remove('loaded');
    main.classList.add('fade-out-back');
    
    // Desvanecer el modal junto con la pantalla si está visible
    if (!cancelModal.classList.contains('hidden')) {
        cancelModal.classList.remove('modal-active');
        cancelModal.classList.add('modal-exit');
    }
    
    setTimeout(() => {
        window.location.href = destino;
    }, 400);
}
