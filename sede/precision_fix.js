const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Proyectos\\\\CompanyManagerPresentacion';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const oldKeyLogicStr = /document\.addEventListener\('keydown',\s*\(e\)\s*=>\s*\{\s*\/\/\s*Atajos\s*de\s*teclado\s*if\s*\(e\.altKey\)\s*\{\s*const\s*key\s*=\s*e\.key\.toLowerCase\(\);\s*if\s*\(\[\s*'p',\s*'i',\s*'c',\s*'f',\s*'t',\s*'d'\s*\]\.includes\(key\)\)\s*\{\s*e\.preventDefault\(\);\s*switch\(key\)\s*\{\s*case\s*'p':\s*window\.location\.href\s*=\s*'POS\.html';\s*break;\s*case\s*'i':\s*window\.location\.href\s*=\s*'Inventario\.html';\s*break;\s*case\s*'c':\s*window\.location\.href\s*=\s*'Catalogo\.html';\s*break;\s*case\s*'f':\s*window\.location\.href\s*=\s*'Facturacion\.html';\s*break;\s*case\s*'d':\s*window\.location\.href\s*=\s*'(BranchDashboard|BranchDashoard)\.html';\s*break;\s*case\s*'t':\s*window\.location\.href\s*=\s*'Tienda\.html';\s*break;\s*\}\s*return;\s*\}\s*\}\s*\/\/\s*Búsqueda\s*Global\s*\(F2\)\s*if\s*\((e\.key\s*===\s*'f2'|e\.key\s*===\s*'F2')\)\s*\{\s*e\.preventDefault\(\);\s*alert\("¡Comando F2 activado! \(En la app real, abriría la barra superior de búsqueda global\)"\);\s*return;\s*\}\s*\/\/\s*Navegación\s*con\s*Flechas\/Espacio\s*if\s*\(e\.key\s*===\s*'ArrowRight'\s*\|\|\s*e\.key\s*===\s*' '\)\s*\{\s*nextSlide\(\);\s*\}\s*else\s*if\s*\(e\.key\s*===\s*'ArrowLeft'\)\s*\{\s*prevSlide\(\);\s*\}\s*\}\);/s;

const newKeyLogicStr = `const pressedKeys = new Set();

        document.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;
            const isTyping = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            const key = e.key.toLowerCase();
            pressedKeys.add(key);

            if (key === 'f2') {
                e.preventDefault();
                alert("¡Comando F2 activado! (En la app real, abriría la barra superior de búsqueda global)");
                return;
            }

            if (pressedKeys.has('a') && !isTyping) {
                if (['p', 'i', 'h', 'v', 'c', 's'].includes(key)) {
                    e.preventDefault();
                    switch (key) {
                        case 'p': window.location.href = 'POS.html'; break;
                        case 'i': window.location.href = 'Inventario.html'; break;
                        case 'c': window.location.href = 'Catalogo.html'; break;
                        case 'h': window.location.href = 'BranchDashboard.html'; break;
                        case 'v': window.location.href = 'Caja.html'; break;
                        case 's': window.location.href = 'Tienda.html'; break;
                    }
                    return;
                }
            }

            if (!isTyping) {
                if (e.key === 'ArrowRight' || e.key === ' ') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            pressedKeys.delete(e.key.toLowerCase());
        });

        window.addEventListener('blur', () => {
            pressedKeys.clear();
        });`;

for (let file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Meticulous replacement of JUST the .quick-actions-grid and .qa-btn:
    // 1. the grid rule itself
    content = content.replace(/\.quick-actions-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(\d+,\s*1fr\);/g, '.quick-actions-grid { display: flex; flex-wrap: wrap; justify-content: center;');
    // 2. the button width
    content = content.replace(/\.qa-btn\s*\{\s*background:\s*var\(--bg-panel\);/g, '.qa-btn { width: 250px; background: var(--bg-panel);');
    // 3. mobile overrides
    content = content.replace(/\.quick-actions-grid\s*\{\s*\r?\n\s*grid-template-columns:\s*1fr\s*!important;/g, '.quick-actions-grid { flex-direction: column; align-items: center;');
    content = content.replace(/\.qa-btn\s*\{\s*\r?\n\s*flex-direction:\s*row;/g, '.qa-btn { width: 100% !important; flex-direction: row;');

    // Meticulous replacement of scroll resetting
    // Replace old window.scrollTo
    content = content.replace(/if\s*\(window\.innerWidth\s*<=\s*1024\)\s*\{\s*window\.scrollTo\(\{top:\s*0,\s*behavior:\s*'smooth'\}\);\s*\}/g, 'setTimeout(() => { window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }, 50);');
    // In case I was updating the 5 already-fixed files which have window.scrollTo(0, 0); without timeout:
    content = content.replace(/window\.scrollTo\(0,\s*0\);/g, 'setTimeout(() => { window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }, 50);');
    
    // Meticulous replacement of mobile body scroll unlocking
    content = content.replace(/html,\s*body\s*\{\s*overflow-y:\s*auto;\s*\}/g, 'html, body { height: auto; min-height: 100vh; overflow-y: auto; overflow-x: hidden; }');

    // Replace shortcuts (old ones)
    if(content.includes('e.altKey')) {
        content = content.replace(oldKeyLogicStr, newKeyLogicStr);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Precision surgery complete.');
