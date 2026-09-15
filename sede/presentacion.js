(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const key = 'slide_20260907_' + location.pathname.split('/').pop();
  let index = 0;
  try { index = Math.max(0, Math.min(slides.length - 1, Number(localStorage.getItem(key)) || 0)); } catch {}
  const prev = document.getElementById('btnPrev');
  const next = document.getElementById('btnNext');
  function render() {
    slides.forEach((slide, i) => { slide.classList.toggle('active', i === index); slide.inert = i !== index; });
    prev.disabled = index === 0;
    next.textContent = index === slides.length - 1 ? '⌂' : '→';
    next.setAttribute('aria-label', index === slides.length - 1 ? 'Volver al mapa' : 'Diapositiva siguiente');
    document.getElementById('slideCounter').textContent = `${index + 1} / ${slides.length}`;
    try { localStorage.setItem(key, String(index)); } catch {}
  }
  function move(delta) {
    if (index + delta >= slides.length) { try { localStorage.removeItem(key); } catch {} location.href = 'index.html'; return; }
    index = Math.max(0, index + delta); render(); slides[index].scrollTop = 0;
  }
  prev.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,select,button,a,[contenteditable]')) return;
    if (['ArrowRight', ' ', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
  }); render();
})();