// Navegación entre diapositivas, compartida por las presentaciones de plugins.
// Recuerda la diapositiva de cada página; la última vuelve al mapa.
(() => {
    const slides = [...document.querySelectorAll('.slide')];
    const key = 'plugins_20261007_' + (location.pathname.split('/').pop() || 'index.html');
    const prev = document.getElementById('btnPrev');
    const next = document.getElementById('btnNext');
    const counter = document.getElementById('slideCounter');
    let index = 0;
    try { index = Math.max(0, Math.min(slides.length - 1, Number(localStorage.getItem(key)) || 0)); } catch {}

    function render() {
        slides.forEach((slide, i) => { slide.classList.toggle('active', i === index); slide.inert = i !== index; });
        prev.disabled = index === 0;
        next.setAttribute('aria-label', index === slides.length - 1 ? 'Volver al mapa' : 'Diapositiva siguiente');
        counter.textContent = `${index + 1} / ${slides.length}`;
        try { localStorage.setItem(key, String(index)); } catch {}
        window.scrollTo(0, 0);
    }
    function move(delta) {
        if (index + delta >= slides.length) {
            try { localStorage.removeItem(key); } catch {}
            location.href = 'index.html';
            return;
        }
        index = Math.max(0, index + delta);
        render();
    }

    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    document.addEventListener('keydown', event => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.target.closest('input,textarea,select,button,a,label,[contenteditable]')) return;
        if (['ArrowRight', ' '].includes(event.key)) { event.preventDefault(); move(1); }
        else if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    });
    render();
})();
