const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Proyectos\\\\CompanyManagerPresentacion';
const files = ['Agenda.html', 'Auditoria.html'];

const newKeyLogicStr = `const pressedKeys = new Set();\n\n        document.addEventListener('keydown', (e) => {\n            const activeElement = document.activeElement;\n            const isTyping = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');\n\n            const key = e.key.toLowerCase();\n            pressedKeys.add(key);\n\n            if (key === 'f2') {\n                e.preventDefault();\n                alert("¡Comando F2 activado! (En la app real, abriría la barra superior de búsqueda global)");\n                return;\n            }\n\n            if (pressedKeys.has('a') && !isTyping) {\n                if (['p', 'i', 'h', 'v', 'c', 's', 'f'].includes(key)) {\n                    e.preventDefault();\n                    switch (key) {\n                        case 'p': window.location.href = 'POS.html'; break;\n                        case 'i': window.location.href = 'Inventario.html'; break;\n                        case 'c': window.location.href = 'Catalogo.html'; break;\n                        case 'h': window.location.href = 'BranchDashboard.html'; break;\n                        case 'v': window.location.href = 'Caja.html'; break;\n                        case 's': window.location.href = 'Tienda.html'; break;\n                        case 'f': window.location.href = 'Facturacion.html'; break;\n                    }\n                    return;\n                }\n            }\n\n            if (!isTyping) {\n                if (e.key === 'ArrowRight' || e.key === ' ') {\n                    nextSlide();\n                } else if (e.key === 'ArrowLeft') {\n                    prevSlide();\n                }\n            }\n        });\n\n        document.addEventListener('keyup', (e) => {\n            pressedKeys.delete(e.key.toLowerCase());\n        });\n\n        window.addEventListener('blur', () => {\n            pressedKeys.clear();\n        });\n\n        `;

for (let file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let startIndex = content.indexOf("document.addEventListener('keydown'");
    if (startIndex !== -1) {
        // Find the last closing brace and paren before updateSlides()
        // Wait, Agenda has function switchAgenda(mode) after the event listener.
        // Let's just find the closing });
        let endIndex = content.indexOf("});", startIndex);
        if (endIndex !== -1) {
            content = content.substring(0, startIndex) + newKeyLogicStr + content.substring(endIndex + 3);
            
            // Wait, also check if memory is being reset to 0 in nextSlide in these files!
            content = content.replace(/case\s*'d':\s*window\.location\.href\s*=\s*'BranchDashoard\.html';\s*break;/, "");
            if(content.includes('localStorage.setItem(\'slide_\' + pageId, 0);') === false){
                content = content.replace(/window\.location\.href\s*=\s*'index\.html';/g, "localStorage.setItem('slide_' + pageId, 0);\n                window.location.href = 'index.html';");
            }
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed completely in', file);
        }
    }
}
