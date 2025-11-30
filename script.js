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

    // --- SECCIÓN HERO: ANIMACIÓN DE CÓDIGO & RANDOM ---
    const codeBlock = document.getElementById('code-block');
    const heroTitle = document.getElementById('hero-title');
    
    // Lista de Snippets Aleatorios (Incluye guiños graciosos)
    // Usamos \n para saltos de línea en el código que se va a escribir.
    const snippets = [
        // Opción 1: La clásica (Flutter + Python)
        "<span class='keyword'>import</span> <span class='string'>'package:flutter/material.dart'</span>;\n<span class='keyword'>import</span> <span class='string'>'backend/python_api.dart'</span>;\n\n<span class='def'>void</span> <span class='function'>main</span>() {\n  runApp(<span class='function'>DemotassApp</span>());\n}\n<span class='comment'>// Building logic...</span>",
        
        // Opción 2: El guiño a la cultura Dev (Coffee)
        "<span class='class-def'>class</span> Developer(Human):\n    <span class='def'>def</span> <span class='function'>__init__</span>(self):\n        self.fuel = <span class='string'>'Coffee'</span>\n\n    <span class='def'>def</span> <span class='function'>code</span>(self):\n        while self.is_alive():\n            self.create_awesome_apps()",
        
        // Opción 3: El guiño a la librería 'antigravity' de Python
        "<span class='keyword'>import</span> antigravity\n<span class='keyword'>import</span> solutions\n\n<span class='def'>def</span> <span class='function'>fix_legacy_code</span>():\n    <span class='keyword'>try</span>:\n        magic()\n    <span class='keyword'>except</span> Exception as e:\n        print(<span class='string'>\"Error. Blaming DNS.\"</span>)",
        
        // Opción 4: Eficiencia pura (Estilo Terminal)
        "<span class='prompt'>&gt; Initiating connection...</span>\n<span class='prompt'>&gt; Loading Python Kernel...</span>\n<span class='prompt'>&gt; Syncing Flutter UI...</span>\n<span class='prompt'>&gt; Success.</span>\n<span class='prompt'>&gt; Welcome to Demotass v1.0</span>"
    ];

    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    let i = 0;
    const speed = 25; // Velocidad de escritura (ms)

    function typeWriter() {
        if (i < randomSnippet.length) {
            
            // Simulación avanzada de la escritura (maneja etiquetas HTML para el color)
            let char = randomSnippet.charAt(i);
            
            // Si el siguiente carácter es el inicio de una etiqueta (<), avanzamos hasta el cierre (>)
            // para no teclear el HTML del syntax highlighting.
            if (char === '<') {
                let tagEndIndex = randomSnippet.indexOf('>', i);
                if (tagEndIndex !== -1) {
                    // Coger toda la etiqueta (ej: <span class='keyword'>)
                    codeBlock.innerHTML += randomSnippet.substring(i, tagEndIndex + 1);
                    i = tagEndIndex; // Mover el índice al final de la etiqueta
                }
            } else if (char === '\n') {
                codeBlock.innerHTML += '<br>';
            } else {
                // Borrar cursor anterior y añadir el carácter tecleado
                codeBlock.innerHTML = codeBlock.innerHTML.replace('<span class="cursor">|</span>', '');
                codeBlock.innerHTML += char + '<span class="cursor">|</span>';
            }
            
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // CUANDO TERMINA DE ESCRIBIR:
            // Quitar el cursor final
            codeBlock.innerHTML = codeBlock.innerHTML.replace('<span class="cursor">|</span>', '');
            
            setTimeout(() => {
                // Desvanecer código
                codeBlock.style.opacity = '0';
                
                // Transición al título
                setTimeout(() => {
                    codeBlock.style.display = 'none';
                    heroTitle.classList.remove('hidden');
                    heroTitle.classList.add('visible-hero');
                }, 500);
            }, 1500); // Espera 1.5s antes de borrarlo
        }
    }

    if (codeBlock && heroTitle) {
        typeWriter();
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
    
    // --- CONTROL VISIBILIDAD DEL MENÚ (INTERSECTION OBSERVER) ---
    const heroSection = document.querySelector('.hero-section');
    const nav = document.querySelector('.floating-nav');

    if (heroSection && nav) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Si el Hero YA NO se ve, mostramos el menú
                    nav.classList.add('visible');
                } else {
                    // Si el Hero SE VE, ocultamos el menú
                    nav.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1 // Se activa cuando queda un 10% del hero visible o menos
        });

        observer.observe(heroSection);
    }
});