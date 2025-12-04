// --- LANGUAGE REDIRECTION ---
(function() {
    const userLang = navigator.language || navigator.userLanguage;
    const isSpanish = userLang.toLowerCase().startsWith('es');
    const isAlreadyOnEnglishPage = window.location.pathname.endsWith('index_en.html');
    const path = window.location.pathname.toLowerCase();
    const isPolicyPage = path.includes('privacidad') || path.includes('privacy');

    // If browser is not Spanish and we are not already on the English page or legal pages, redirect.
    if (!isSpanish && !isAlreadyOnEnglishPage && !isPolicyPage) {
        window.location.href = 'index_en.html';
    }
})();

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

    // === NUEVA LÓGICA: EFECTO MATRIX (MEJORADA) ===
    const devToggle = document.getElementById('devModeToggle');
    const body = document.body;
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas && devToggle) { // Verificación de seguridad
        const ctx = canvas.getContext('2d');

        // Configuración del Canvas
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let matrixInterval;

        // --- GUIÑOS Y CULTURA DEV ---
        // Mezcla de binario, hex, comandos, errores y leyendas
        const matrixWords = [
            "0", "1", "0xDEAD", "404", "NULL", "undefined",
            "sudo", "rm -rf", "git_push", "SegFault",
            "StackOver", "Hello_World", "It_Works!",
            "GOTO_10", "DB_DROP", "chmod_777",
            "Turing", "Hopper", "Lovelace",
            "Python", "Flutter", "Dart", "Docker",
            "TODO", "FIXME", ":wq", "npm_i", "pip_i"
        ];

        const fontSize = 14; 
        
        const columnWidth = 10;
        let columns = Math.ceil(width / columnWidth);
        let drops = [];

        // Función de dibujo (El bucle de Matrix)
        function drawMatrix() {
            // AJUSTE CLAVE 2: Limpieza más agresiva (0.25 en vez de 0.05)
            // Esto hace que el texto anterior se borre más rápido y sea más legible
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#3ddc84'; // Verde Matrix
            // Usamos una fuente monoespaciada pero negrita para que destaque
            ctx.font = 'bold ' + (fontSize - 2) + 'px "Fira Code", monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrixWords[Math.floor(Math.random() * matrixWords.length)];
                
                // Calculamos la posición X usando el ancho de columna amplio
                // Añadimos un pequeño factor random (Math.random() * 20) para que no se vea como una rejilla perfecta
                const x = i * columnWidth + (Math.random() * 5);
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reiniciar la gota al llegar abajo
                if (y > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }

                // Mover gota
                drops[i]++;
            }
        }

        // 2. FUNCIÓN RUIDO VERDE (Green Static)
        function drawGreenStatic() {
            const w = canvas.width;
            const h = canvas.height;
            
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                // Probabilidad de pixel negro
                if (Math.random() < 0.4) {
                    buffer32[i] = 0xff000000; // Negro
                } else {
                    // Verde aleatorio
                    const green = Math.floor(Math.random() * 255);
                    // Alpha | Blue | Green | Red
                    buffer32[i] = (100 << 24) | (0 << 16) | (green << 8) | 0;
                }
            }

            ctx.putImageData(idata, 0, 0);

            // Scanlines
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            for (let y = 0; y < h; y += 3) {
                ctx.fillRect(0, y, w, 1);
            }
        }

        // Manejador del resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.ceil(width / columnWidth);
        });

        // --- LÓGICA DEL INTERRUPTOR ---
        devToggle.addEventListener('change', () => {
            if (devToggle.checked) {
                // === ACTIVAR: MATRIX RAIN ===
                
                // Reset de columnas y gotas (empezando arriba)
                columns = Math.ceil(width / columnWidth);
                drops = [];
                for (let x = 0; x < columns; x++) {
                    drops[x] = Math.floor(Math.random() * -50); 
                }

                canvas.classList.add('active'); 
                canvas.style.opacity = '1'; 
                
                clearInterval(matrixInterval);
                matrixInterval = setInterval(drawMatrix, 60);

                // Transición al modo Dev
                setTimeout(() => {
                    body.classList.add('dev-mode');
                    // Ocultar lluvia suavemente
                    setTimeout(() => {
                        canvas.style.opacity = '0'; 
                        setTimeout(() => {
                            canvas.classList.remove('active');
                            clearInterval(matrixInterval);
                            ctx.clearRect(0, 0, width, height);
                        }, 1000); 
                    }, 1000); // 
                }, 2500); // Duración de la lluvia inicial

            } else {
                // === DESACTIVAR: RUIDO VERDE + FUNDIDO ÚNICO ===
                
                // A) Mostrar de golpe (sin transición previa)
                canvas.style.transition = 'none'; 
                canvas.style.opacity = '1';      
                canvas.classList.add('active');  
                
                // B) Ruido verde
                clearInterval(matrixInterval);
                matrixInterval = setInterval(drawGreenStatic, 30); 

                // C) Quitar modo Dev "detrás" del ruido
                setTimeout(() => {
                    body.classList.remove('dev-mode');
                }, 100);

                // D) Fundido de salida (Fade Out)
                setTimeout(() => {
                    // Activar transición CSS manualmente
                    canvas.style.transition = "opacity 0.8s ease-out"; 
                    canvas.style.opacity = '0'; 

                    // E) Limpieza final
                    setTimeout(() => {
                        clearInterval(matrixInterval);      
                        canvas.classList.remove('active');  
                        ctx.clearRect(0, 0, width, height); 
                        canvas.style.transition = "";       
                    }, 500); 
                }, 250); // Tiempo de ruido antes de desvanecer
            }
        });
    }

    // --- VISIBILIDAD MENÚ ---
    const heroSection = document.querySelector('.hero-section');
    const nav = document.querySelector('.floating-nav');

    if (heroSection && nav) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    nav.classList.add('visible');
                } else {
                    nav.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroSection);
    }

    // --- COOKIES ---
    const consentKey = 'demotass_cookie_consent';
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    function hideBanner() { if (banner) banner.classList.add('hidden'); }
    function showBanner() { if (banner) banner.classList.remove('hidden'); }

    function persistConsent(value) {
        try { localStorage.setItem(consentKey, value); } catch (e) {}
    }

    function applyConsent(value) {
        if (value === 'accepted') { loadAnalytics(); }
        hideBanner();
    }

    const storedConsent = (() => {
        try { return localStorage.getItem(consentKey); } catch (e) { return null; }
    })();

    if (!storedConsent) showBanner();
    else applyConsent(storedConsent);

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            persistConsent('accepted');
            applyConsent('accepted');
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            persistConsent('rejected');
            applyConsent('rejected');
        });
    }
});