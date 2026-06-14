/* ============================================================
   ELYKIA — gallery.js : Grille + Lightbox
   ============================================================ */

(function () {
  'use strict';

  /* ---- PHOTOS — AJOUTER ICI ---- */
  const photos = [
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13.jpeg",             caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.10.28.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.10.30.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.10.31.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.10.32.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.10.54.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.13.00.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.13.04.jpeg", caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.31.jpeg",    caption: "Là où l'espoir prend vie" },
    { src: "assets/images/gallery/WhatsApp Image 2026-06-13 at 12.4.jpeg",     caption: "Là où l'espoir prend vie" },
  ];

  let currentIndex = 0;

  /* ---- GRILLE ---- */

  function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    if (!photos.length) {
      grid.innerHTML = `
        <div style="
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 2rem;
          color: var(--color-text-muted);
        ">
          <div style="
            width:72px;height:72px;
            border-radius:50%;
            background:rgba(74,124,99,0.08);
            display:flex;align-items:center;justify-content:center;
            margin:0 auto 1.25rem;
            color:var(--color-primary-light);
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          </div>
          <h3 style="font-family:var(--font-heading);font-size:1.1rem;color:var(--color-primary-dark);margin-bottom:0.5rem;">Galerie en construction</h3>
          <p style="font-size:0.875rem;line-height:1.7;">
            Déposez vos photos dans <code style="background:rgba(74,124,99,0.08);padding:0.1rem 0.4rem;border-radius:4px;">assets/images/gallery/</code><br>
            puis complétez le tableau dans <code style="background:rgba(74,124,99,0.08);padding:0.1rem 0.4rem;border-radius:4px;">assets/js/gallery.js</code>
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = photos.map((photo, i) => `
      <div class="gallery-item"
           data-index="${i}"
           role="button"
           tabindex="0"
           aria-label="${photo.caption || 'Photo ' + (i + 1)}"
           style="animation:fadeIn 0.4s ease ${(i % 4) * 0.08}s both;">
        <img src="${encodeURI(photo.src)}"
             alt="${photo.caption || 'Photo Elykia ' + (i + 1)}">
        ${photo.caption ? `
        <div class="gallery-overlay">
          <span class="gallery-caption">${photo.caption}</span>
        </div>` : ''}
      </div>
    `).join('');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(parseInt(item.dataset.index));
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  /* ---- LIGHTBOX ---- */

  function buildLightbox() {
    if (document.getElementById('lightbox')) return;

    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');

    const chevronLeft  = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
    const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
    const closeIcon    = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

    lb.innerHTML = `
      <button class="lightbox-btn lightbox-close" aria-label="Fermer">${closeIcon}</button>
      <button class="lightbox-btn lightbox-prev"  aria-label="Photo précédente">${chevronLeft}</button>
      <button class="lightbox-btn lightbox-next"  aria-label="Photo suivante">${chevronRight}</button>
      <div class="lightbox-content">
        <img id="lightboxImg" src="" alt="">
        <p id="lightboxCaption" class="lightbox-caption"></p>
      </div>
    `;

    document.body.appendChild(lb);

    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', prevPhoto);
    lb.querySelector('.lightbox-next').addEventListener('click', nextPhoto);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  }

  function openLightbox(index) {
    if (!photos.length) return;
    currentIndex = index;
    const lb    = document.getElementById('lightbox');
    const img   = document.getElementById('lightboxImg');
    const cap   = document.getElementById('lightboxCaption');
    const photo = photos[currentIndex];

    img.src = encodeURI(photo.src);
    img.alt = photo.caption || '';
    cap.textContent = photo.caption || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; }
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    openLightbox(currentIndex);
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    openLightbox(currentIndex);
  }

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  });

  document.addEventListener('DOMContentLoaded', () => {
    buildLightbox();
    renderGallery();
  });

})();
