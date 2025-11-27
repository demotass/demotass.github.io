/* 1. FUNCIÓN GLOBAL 
   Esta función debe estar FUERA del DOMContentLoaded para que 
   el HTML (oninput="...") pueda encontrarla.
*/
function updateSlider(input, layerId) {
    const layer = document.getElementById(layerId);
    // Verificamos que el elemento existe para evitar errores
    if (layer) {
        const percentage = input.value + "%";
        layer.style.width = percentage;
    }
}

/* 2. LÓGICA QUE ESPERA AL HTML
   Todo lo que busca elementos por ID al iniciar debe ir aquí dentro.
*/
document.addEventListener('DOMContentLoaded', () => {

    // --- SECCIÓN HERO: ANIMACIÓN DE CÓDIGO ---
    const codeBlock = document.getElementById('code-block');
    const heroTitle = document.getElementById('hero-title');

    // Solo ejecutamos si los elementos existen
    if (codeBlock && heroTitle) {
        // 1. Simular cursor
        setTimeout(() => {
            codeBlock.innerHTML += '<span class="cursor">|</span>';
        }, 500);

        // 2. Transición "Mágica"
        setTimeout(() => {
            codeBlock.style.opacity = '0';
            
            setTimeout(() => {
                codeBlock.style.display = 'none';
                heroTitle.classList.remove('hidden');
                heroTitle.classList.add('visible-hero');
            }, 500);
            
        }, 3500);
    }

    // --- SECCIÓN DEV MODE: TOGGLE ---
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