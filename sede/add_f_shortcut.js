const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Proyectos\\\\CompanyManagerPresentacion';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const oldLogic = `            if (pressedKeys.has('a') && !isTyping) {
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
            }`;

const newLogic = `            if (pressedKeys.has('a') && !isTyping) {
                if (['p', 'i', 'h', 'v', 'c', 's', 'f'].includes(key)) {
                    e.preventDefault();
                    switch (key) {
                        case 'p': window.location.href = 'POS.html'; break;
                        case 'i': window.location.href = 'Inventario.html'; break;
                        case 'c': window.location.href = 'Catalogo.html'; break;
                        case 'h': window.location.href = 'BranchDashboard.html'; break;
                        case 'v': window.location.href = 'Caja.html'; break;
                        case 's': window.location.href = 'Tienda.html'; break;
                        case 'f': window.location.href = 'Facturacion.html'; break;
                    }
                    return;
                }
            }`;

for (let file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if(content.includes("['p', 'i', 'h', 'v', 'c', 's'].includes(key)")) {
        content = content.replace(oldLogic, newLogic);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added F key to', file);
    }
}
