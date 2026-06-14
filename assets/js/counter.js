/* ============================================================
   ELYKIA — counter.js : Animation des compteurs de stats
   ============================================================ */

(function () {
  'use strict';

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const prefix   = el.getAttribute('data-prefix') || '';
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start    = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current  = Math.round(easeOutCubic(progress) * target);

      el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString('fr-FR') + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', initCounters);

})();
