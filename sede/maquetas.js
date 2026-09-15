(() => {
  for (const demo of document.querySelectorAll('[data-demo]')) {
    const filters = [...demo.querySelectorAll('[data-filter]')];
    function filter(key) {
      filters.forEach(button => { const selected = button.dataset.filter === key; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); });
      demo.querySelectorAll('[data-kind]').forEach(row => { row.hidden = key !== 'all' && row.dataset.kind !== key; });
    }
    filters.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter)));
    if (filters.length) filter(filters[0].dataset.filter);
    demo.querySelectorAll('[data-asset]').forEach(button => button.addEventListener('click', () => {
      demo.querySelectorAll('[data-asset]').forEach(other => { other.classList.toggle('selected', other === button); other.setAttribute('aria-pressed', String(other === button)); });
      demo.querySelector('[data-asset-name]').textContent = {unidad:'Unidad 2A',objeto:'Proyector HD',vehiculo:'Furgón'}[button.dataset.asset];
    }));
    const quantity = demo.querySelector('[data-quantity]');
    quantity?.addEventListener('input', () => {
      const units = Math.max(0, Math.min(100, Number(quantity.value) || 0));
      demo.querySelectorAll('[data-consumption]').forEach(cell => { cell.textContent = (units * Number(cell.dataset.consumption)).toLocaleString('es-AR'); });
    });
    demo.querySelector('[data-test-message]')?.addEventListener('click', () => {
      const message = demo.querySelector('[data-message]').value.trim().toLocaleLowerCase('es');
      const rules = [...demo.querySelectorAll('.demo-rule')];
      const matched = message && rules.find((rule,index) => { const key = rule.querySelector('input').value.trim().toLocaleLowerCase('es'); return key && (index === 0 ? message === key : message.includes(key)); });
      demo.querySelector('[data-response]').textContent = matched ? matched.querySelector('textarea').value : 'Ninguna regla coincide con este mensaje de ejemplo.';
    });
  }
})();