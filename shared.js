/* ── THE GALLERY — shared.js ── */
(function () {
  'use strict';

  /* ── CURSOR ── */
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (dot && ring) {
    let rx = -100, ry = -100, mx = -100, my = -100;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  /* ── PAGE TRANSITION ── */
  const veil = document.getElementById('page-veil');
  function transitionTo(href) {
    if (!veil) { window.location.href = href; return; }
    veil.classList.add('out');
    setTimeout(() => window.location.href = href, 480);
  }
  function transitionIn() {
    if (!veil) return;
    veil.style.opacity = '1';
    veil.style.transition = 'none';
    veil.classList.remove('out');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        veil.style.transition = '';
        veil.style.opacity = '0';
      });
    });
  }
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (a.dataset.noTransition !== undefined) return;
    a.addEventListener('click', e => { e.preventDefault(); transitionTo(href); });
  });
  window.addEventListener('DOMContentLoaded', transitionIn);

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('seen'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── MAGNETIC ── */
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.22;
      const y = (e.clientY - r.top  - r.height / 2) * 0.22;
      el.style.transition = 'transform 0.1s';
      el.style.transform  = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.25,0,0,1)';
      el.style.transform  = 'translate(0,0)';
    });
  });

})();
