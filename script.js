
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  /* ---- Cursor Customizado ---- */
  const cursor = document.getElementById('cursor');
  const hoverElements = document.querySelectorAll('a, button, .skewed-card, .action-btn');

  document.addEventListener('mousemove', (e) => {
    // Atualiza a posição do cursor customizado
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Aumenta o cursor ao passar por cima de elementos clicáveis
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  /* ---- Efeito de Paralaxe nos Adesivos (Collage) ---- */
  const stickers = document.querySelectorAll('.sticker');
  const hero = document.querySelector('.hero-section');

  if (hero && stickers.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 90;
      const y = (window.innerHeight - e.pageY * 2) / 90;

      stickers.forEach(sticker => {
        const speed = sticker.getAttribute('data-speed') || 1;
        const xPos = x * speed;
        const yPos = y * speed;
        
        // Mantém a rotação original que está no CSS via regex ou variavel (simplificado usando translate no topo)
        sticker.style.transform = `translateX(${xPos}px) translateY(${yPos}px) ${sticker.style.transform.replace(/translate.*?\)/g, '')}`;
      });
    });
  }

  /* ---- Ano dinâmico no rodapé ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Texto Aleatório (Glitch Effect no Subtítulo) ---- */
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    setInterval(() => {
      // Simula uma pequena falha no sistema a cada 5 segundos
      const originalText = 'olha o que eu aprendi // <span class="blink">_____</span>';
      subtitle.innerHTML = '0lhA 0 Qu3 3u 4pr3nD1 // <span class="blink">_!_!_</span>';
      setTimeout(() => {
        subtitle.innerHTML = originalText;
      }, 50);
    }, 2000);
  }
});