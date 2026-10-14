/* ============================================================
   ELYKIA — form.js : Validation + envoi des formulaires

   Les formulaires sont envoyés à Formspree (attribut `action` du
   <form>, voir contact.html). L'envoi se fait en arrière-plan :
   le visiteur reste sur la page et voit le message de confirmation.
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

  /* ---- MESSAGE D'ERREUR GLOBAL ---- */

  function getAlertZone(formEl) {
    let zone = formEl.querySelector('.form-alert');
    if (!zone) {
      zone = document.createElement('div');
      zone.className = 'form-alert';
      zone.setAttribute('role', 'alert');
      const submitBtn = formEl.querySelector('[type="submit"]');
      formEl.insertBefore(zone, submitBtn || null);
    }
    return zone;
  }

  function showAlert(formEl, message) {
    const zone = getAlertZone(formEl);
    zone.innerHTML = message;
    zone.classList.add('visible');
  }

  function hideAlert(formEl) {
    const zone = formEl.querySelector('.form-alert');
    if (zone) zone.classList.remove('visible');
  }

  /* ---- INITIALISATION FORMULAIRE ---- */

  function initForm(formEl) {
    const fields      = formEl.querySelectorAll('.form-control[required], .form-control[data-validate]');
    const successZone = formEl.querySelector('.form-success');
    const submitBtn   = formEl.querySelector('[type="submit"]');
    const submitHTML  = submitBtn ? submitBtn.innerHTML : '';

    // Validation en temps réel (blur)
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.innerHTML = loading ? 'Envoi en cours…' : submitHTML;
      if (!loading && window.lucide) lucide.createIcons();
    }

    function showSuccess() {
      formEl.style.display = 'none';
      if (successZone) {
        successZone.classList.add('visible');
        successZone.focus();
      }
    }

    formEl.addEventListener('submit', async e => {
      e.preventDefault();
      hideAlert(formEl);

      let isValid = true;
      fields.forEach(field => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        const firstError = formEl.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      const endpoint = formEl.getAttribute('action');

      // Sans endpoint configuré, on bascule sur le client mail du visiteur.
      if (!endpoint) {
        const data = {};
        fields.forEach(f => { data[f.name || f.id] = f.value.trim(); });
        const body = encodeURIComponent(Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'));
        window.location.href = `mailto:wenceslasbouity92@gmail.com?subject=${encodeURIComponent('Nouveau message — Site Elykia')}&body=${body}`;
        showSuccess();
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(endpoint, {
          method:  'POST',
          body:    new FormData(formEl),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          showSuccess();
          return;
        }

        const payload = await response.json().catch(() => null);
        const detail  = payload && Array.isArray(payload.errors)
          ? payload.errors.map(err => err.message).join(' ')
          : '';

        showAlert(formEl,
          `L'envoi a échoué${detail ? ' : ' + detail : ''}. Écrivez-nous directement à ` +
          '<a href="mailto:wenceslasbouity92@gmail.com">wenceslasbouity92@gmail.com</a> ' +
          'ou sur <a href="https://wa.me/242068293933">WhatsApp</a>.');
      } catch (error) {
        showAlert(formEl,
          'Connexion impossible. Vérifiez votre réseau, ou écrivez-nous à ' +
          '<a href="mailto:wenceslasbouity92@gmail.com">wenceslasbouity92@gmail.com</a> ' +
          'ou sur <a href="https://wa.me/242068293933">WhatsApp</a>.');
      } finally {
        setLoading(false);
      }
    });
  }

  /* ---- INIT ---- */

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-elykia-form]').forEach(initForm);
  });

})();
