/* ============================================================
   ELYKIA — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- HEADER SCROLL ---- */

  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  }

  /* ---- BURGER ---- */

  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('.site-nav');

  function closeNav() {
    if (!burger || !nav) return;
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    if (!burger || !nav) return;
    const isOpen = burger.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  /* ---- ACTIVE LINK ---- */

  function setActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href]').forEach(link => {
      const href = link.getAttribute('href').split('/').pop().split('#')[0];
      link.classList.toggle('active', href === current);
    });
  }

  /* ---- SCROLL REVEAL ---- */

  function initReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!targets.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* ---- SMOOTH SCROLL ---- */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeNav();
        const offset = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68);
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }

  /* ---- COMPTE À REBOURS ---- */

  function initCountdown() {
    const containers = document.querySelectorAll('.countdown');
    if (!containers.length) return;

    const target = new Date('2026-09-06T00:00:00').getTime();

    function update() {
      const diff = target - Date.now();

      if (diff <= 0) {
        containers.forEach(c => {
          c.innerHTML = '<p style="color:var(--color-gold);font-family:var(--font-heading);font-weight:700;">Événement passé</p>';
        });
        return;
      }

      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      const html = [
        { n: days,    l: 'Jours' },
        { n: hours,   l: 'Heures' },
        { n: minutes, l: 'Min' },
        { n: seconds, l: 'Sec' },
      ].map(u => `
        <div class="countdown-unit">
          <span class="countdown-number">${String(u.n).padStart(2, '0')}</span>
          <span class="countdown-label">${u.l}</span>
        </div>
      `).join('');

      containers.forEach(c => { c.innerHTML = html; });
    }

    update();
    setInterval(update, 1000);
  }

  /* ---- LUCIDE ICONS ---- */

  function initIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* ---- INIT ---- */

  document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    updateHeader();
    setActiveLink();
    initReveal();
    initSmoothScroll();
    initCountdown();

    if (burger) {
      burger.addEventListener('click', toggleNav);
    }

    document.addEventListener('click', e => {
      if (nav && nav.classList.contains('open') &&
          !nav.contains(e.target) && burger && !burger.contains(e.target)) {
        closeNav();
      }
    });

    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  });

  window.addEventListener('scroll', updateHeader, { passive: true });

})();
