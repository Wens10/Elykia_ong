/* ============================================================
   ELYKIA — form.js : Validation formulaires bénévolat/contact
   ============================================================ */

(function () {
  'use strict';

  /* ---- UTILITAIRES ---- */

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidPhone(phone) {
    return /^[\d\s\+\-\(\)]{6,20}$/.test(phone.trim());
  }

  function showError(field, errorEl, msg) {
    field.classList.add('error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
  }

  function clearError(field, errorEl) {
    field.classList.remove('error');
    if (errorEl) errorEl.classList.remove('visible');
  }

  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    const value   = field.value.trim();
    const type    = field.dataset.validate;

    if (field.required && !value) {
      showError(field, errorEl, 'Ce champ est obligatoire.');
      return false;
    }

    if (type === 'email' && value && !isValidEmail(value)) {
      showError(field, errorEl, 'Veuillez entrer une adresse email valide.');
      return false;
    }

    if (type === 'phone' && value && !isValidPhone(value)) {
      showError(field, errorEl, 'Numéro de téléphone invalide.');
      return false;
    }

    if (field.minLength > 0 && value.length < field.minLength) {
      showError(field, errorEl, `Minimum ${field.minLength} caractères requis.`);
      return false;
    }

    clearError(field, errorEl);
    return true;
  }

  /* ---- INITIALISATION FORMULAIRE ---- */

  function initForm(formEl) {
    const fields      = formEl.querySelectorAll('.form-control[required], .form-control[data-validate]');
    const successZone = formEl.querySelector('.form-success');
    const submitBtn   = formEl.querySelector('[type="submit"]');

    // Validation en temps réel (blur)
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    formEl.addEventListener('submit', e => {
      e.preventDefault();

      let isValid = true;
      fields.forEach(field => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        const firstError = formEl.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      // Désactiver le bouton pendant l'envoi
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }

      // Construction du mailto (fallback statique)
      const data = {};
      fields.forEach(f => { data[f.name || f.id] = f.value.trim(); });

      const subject  = encodeURIComponent('Nouveau message — Site Elykia');
      const bodyParts = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      const body = encodeURIComponent(bodyParts);

      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:contact@elykia.org?subject=${subject}&body=${body}`;

      // Montrer le succès
      setTimeout(() => {
        formEl.style.display = 'none';
        if (successZone) {
          successZone.classList.add('visible');
          successZone.focus();
        }

        // Ouvrir le client mail de l'utilisateur
        mailtoLink.click();
      }, 300);
    });
  }

  /* ---- INIT ---- */

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-elykia-form]').forEach(initForm);
  });

})();
