/* =========================================================
   FELLIPE PICETSKEI — PORTFOLIO
   Comportamentos de interface
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // marca que o JS carregou, para o CSS só animar quando for seguro
  document.documentElement.classList.add('js');

  /* ---- Menu mobile ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // fecha o menu ao clicar em um link (útil no mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Marquee: repete o conteúdo o quanto for preciso para nunca
     deixar espaço vazio na tela, e duplica para o loop ficar contínuo ---- */
  const marqueeEl = document.querySelector('.marquee');
  const track = document.getElementById('marqueeTrack');

  function buildMarquee() {
    if (!marqueeEl || !track) return;

    const unitHTML = track.querySelector('.marquee-unit')?.outerHTML;
    if (!unitHTML) return;

    // mede a largura de UMA cópia do texto
    const probe = document.createElement('span');
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.style.whiteSpace = 'nowrap';
    probe.innerHTML = unitHTML;
    document.body.appendChild(probe);
    const unitWidth = probe.offsetWidth || 1;
    document.body.removeChild(probe);

    // quantas cópias cabem 2x na largura da tela (garante que nunca falte conteúdo)
    const containerWidth = marqueeEl.offsetWidth;
    const repeats = Math.max(2, Math.ceil((containerWidth * 2) / unitWidth));

    track.innerHTML = unitHTML.repeat(repeats * 2);
  }

  buildMarquee();
  window.addEventListener('resize', buildMarquee);

  /* ---- Ano dinâmico no rodapé ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Leve fade-in ao rolar (não esconde conteúdo se o JS falhar) ---- */
  const revealTargets = document.querySelectorAll('.project-card, .contact-panel');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    revealTargets.forEach(el => observer.observe(el));

    // salvaguarda: garante que nada fique invisível para sempre
    setTimeout(() => {
      revealTargets.forEach(el => el.classList.add('is-visible'));
    }, 2500);
  }

  /* ---- Aviso amigável ao clicar nos cards de projeto vazios ---- */
  document.querySelectorAll('.project-card--empty').forEach(card => {
    card.addEventListener('click', () => {
      card.style.borderColor = 'var(--orange)';
      setTimeout(() => { card.style.borderColor = ''; }, 600);
    });
  });

});
