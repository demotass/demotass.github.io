// 1. FUNCIÓN GLOBAL (Para que funcione el Slider desde HTML)
function updateSlider(input, layerId) {
    const layer = document.getElementById(layerId);
    if (layer) {
        const percentage = input.value + "%";
        layer.style.width = percentage;
    }
}

// 2. LÓGICA DE INICIO
document.addEventListener('DOMContentLoaded', () => {

    // --- SECCIÓN HERO: ANIMACIÓN DE CÓDIGO ---
    const codeBlock = document.getElementById('code-block');
    const heroTitle = document.getElementById('hero-title');

    if (codeBlock && heroTitle) {
        // Simular escritura y compilación
        setTimeout(() => {
            codeBlock.innerHTML += '<span class="cursor">|</span>'; // Cursor parpadeante
        }, 500);

        setTimeout(() => {
            codeBlock.style.opacity = '0'; // Desvanecer código
            
            setTimeout(() => {
                codeBlock.style.display = 'none';
                heroTitle.classList.remove('hidden');
                heroTitle.classList.add('visible-hero'); // Mostrar título
            }, 500);
            
        }, 3000); // 3 segundos de "escritura"
    }

    // --- MODO DEV: TOGGLE ---
    const devToggle = document.getElementById('devModeToggle');
    const body = document.body;

    if (devToggle) {
        devToggle.addEventListener('change', () => {
            if (devToggle.checked) {
                body.classList.add('dev-mode');
            } else {
                body.classList.remove('dev-mode');
            }
        });
    }
});