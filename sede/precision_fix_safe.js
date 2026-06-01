const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Proyectos\\\\CompanyManagerPresentacion';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const oldKeyLogicStr = /document\.addEventListener\('keydown',\s*\(e\)\s*=>\s*\{\s*\/\/\s*Atajos\s*de\s*teclado\s*if\s*\(e\.altKey\)\s*\{\s*const\s*key\s*=\s*e\.key\.toLowerCase\(\);\s*if\s*\(\[\s*'p',\s*'i',\s*'c',\s*'f',\s*'t',\s*'d'\s*\]\.includes\(key\)\)\s*\{\s*e\.preventDefault\(\);\s*switch\s*\(key\)\s*\{\s*case\s*'p':\s*window\.location\.href\s*=\s*'POS\.html';\s*break;\s*case\s*'i':\s*window\.location\.href\s*=\s*'Inventario\.html';\s*break;\s*case\s*'c':\s*window\.location\.href\s*=\s*'Catalogo\.html';\s*break;\s*case\s*'f':\s*window\.location\.href\s*=\s*'Facturacion\.html';\s*break;\s*case\s*'d':\s*window\.location\.href\s*=\s*'(BranchDashboard|BranchDashoard)\.html';\s*break;\s*case\s*'t':\s*window\.location\.href\s*=\s*'Tienda\.html';\s*break;\s*\}\s*return;\s*\}\s*\}\s*\/\/\s*Búsqueda\s*Global\s*\(F2\)\s*if\s*\((e\.key\s*===\s*'f2'|e\.key\s*===\s*'F2')\)\s*\{\s*e\.preventDefault\(\);\s*alert\("¡Comando F2 activado! \(En la app real, abriría la barra superior de búsqueda global\)"\);\s*return;\s*\}\s*\/\/\s*Navegación\s*con\s*Flechas\/Espacio\s*if\s*\(e\.key\s*===\s*'ArrowRight'\s*\|\|\s*e\.key\s*===\s*' '\)\s*\{\s*nextSlide\(\);\s*\}\s*else\s*if\s*\(e\.key\s*===\s*'ArrowLeft'\)\s*\{\s*prevSlide\(\);\s*\}\s*\}\);/s;

const newKeyLogicStr = `const pressedKeys = new Set();\n\n        document.addEventListener('keydown', (e) => {\n            const activeElement = document.activeElement;\n            const isTyping = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');\n\n            const key = e.key.toLowerCase();\n            pressedKeys.add(key);\n\n            if (key === 'f2') {\n                e.preventDefault();\n                alert("¡Comando F2 activado! (En la app real, abriría la barra superior de búsqueda global)");\n                return;\n            }\n\n            if (pressedKeys.has('a') && !isTyping) {\n                if (['p', 'i', 'h', 'v', 'c', 's'].includes(key)) {\n                    e.preventDefault();\n                    switch (key) {\n                        case 'p': window.location.href = 'POS.html'; break;\n                        case 'i': window.location.href = 'Inventario.html'; break;\n                        case 'c': window.location.href = 'Catalogo.html'; break;\n                        case 'h': window.location.href = 'BranchDashboard.html'; break;\n                        case 'v': window.location.href = 'Caja.html'; break;\n                        case 's': window.location.href = 'Tienda.html'; break;\n                    }\n                    return;\n                }\n            }\n\n            if (!isTyping) {\n                if (e.key === 'ArrowRight' || e.key === ' ') {\n                    nextSlide();\n                } else if (e.key === 'ArrowLeft') {\n                    prevSlide();\n                }\n            }\n        });\n\n        document.addEventListener('keyup', (e) => {\n            pressedKeys.delete(e.key.toLowerCase());\n        });\n\n        window.addEventListener('blur', () => {\n            pressedKeys.clear();\n        });`;

for (let file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. the grid rule itself - precision target
    content = content.replace(/\.quick-actions-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(\d+,\s*1fr\);/g, '.quick-actions-grid { display: flex; flex-wrap: wrap; justify-content: center;');
    
    // 2. the button width - precision target
    content = content.replace(/\.qa-btn\s*\{\s*background:\s*var\(--bg-panel\);/g, '.qa-btn { width: 250px; background: var(--bg-panel);');
    // some might have newline inside
    content = content.replace(/\.qa-btn\s*\{\s*\n\s*background:\s*var\(--bg-panel\);/g, '.qa-btn { width: 250px;\n        background: var(--bg-panel);');
    
    // 3. mobile overrides
    content = content.replace(/\.quick-actions-grid\s*\{\s*\r?\n\s*grid-template-columns:\s*1fr\s*!important;/g, '.quick-actions-grid {\n                flex-direction: column !important; align-items: center; width: 100%;');
    content = content.replace(/\.qa-btn\s*\{\s*\r?\n\s*flex-direction:\s*row;/g, '.qa-btn {\n                width: 100% !important; flex-direction: row;');
    content = content.replace(/\.qa-btn\s*\{\s*flex-direction:\s*row;/g, '.qa-btn { width: 100% !important; flex-direction: row;');

    // 4. Meticulous replacement of scroll resetting
    // ONLY replace the inner body of the setItem or inner block without looping
    content = content.replace(/if\s*\(window\.innerWidth\s*<=\s*1024\)\s*\{\s*window\.scrollTo\(\{top:\s*0,\s*behavior:\s*'smooth'\}\);\s*\}/g, 'setTimeout(() => { window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }, 50);');
    content = content.replace(/window\.scrollTo\(0,\s*0\);/g, 'setTimeout(() => { window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }, 50);');
    
    // Cleanup double timeouts if any exist from bad scripts
    content = content.replace(/setTimeout\(\(\)\s*=>\s*\{\s*setTimeout\(\(\)\s*=>\s*\{\s*window\.scrollTo/g, 'setTimeout(() => { window.scrollTo');
    content = content.replace(/\},\s*50\);\s*document\.body\.scrollTop = 0;\s*document\.documentElement\.scrollTop = 0;\s*\},\s*50\);/g, '}, 50);');
    
    // 5. Meticulous replacement of mobile body scroll unlocking
    content = content.replace(/html,\s*body\s*\{\s*overflow-y:\s*auto;\s*\}/g, 'html, body { height: auto; min-height: 100vh; overflow-y: auto; overflow-x: hidden; }');

    // 6. Replace shortcuts ONLY if the generic old one is present
    if(content.includes('e.altKey')) {
        content = content.replace(oldKeyLogicStr, newKeyLogicStr);
        // Another possible format
        const fallbackRegex = /document\.addEventListener\('keydown',\s*\(e\)\s*=>\s*\{\s*if\s*\(e\.altKey\)\s*\{\s*const\s*key\s*=\s*e\.key\.toLowerCase\(\);/s;
        if(fallbackRegex.test(content) && content.includes('e.altKey')) {
             // Let's use a smarter substring replace
             const startIndex = content.indexOf(`        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                const key = e.key.toLowerCase();`);
             if (startIndex !== -1) {
                 const endIndex = content.indexOf(`});`, startIndex);
                 if (endIndex !== -1) {
                     content = content.substring(0, startIndex) + newKeyLogicStr + content.substring(endIndex + 3);
                 }
             }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Precision surgery complete.');
