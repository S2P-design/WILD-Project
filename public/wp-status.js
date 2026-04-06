/* ════════════════════════════════════════════════
   Wild Project — Global Save Status
   States: idle · saving · saved · error
   API:
     WPstatus.saving()        → mark as in-progress
     WPstatus.saved()         → mark as just-saved (toast + badge)
     WPstatus.error(msg?)     → mark as error
     WPstatus.idle()          → mark as idle (no recent change)
     WPstatus.mount(parentEl) → inject badge into a header
     WPstatus.dirty()         → tell system there are unsaved edits in pipeline
   Auto: warns on beforeunload if dirty.
   Cmd/Ctrl+S triggers wp:force-save event for tools to flush.
   ════════════════════════════════════════════════ */
(function(w) {
  'use strict';

  var state = 'idle';        // idle · saving · saved · error
  var dirty = false;         // anything in pipeline?
  var lastSavedAt = null;
  var savedTimer = null;
  var badgeEl = null;
  var toastEl = null;

  function t(key, fb) {
    return (w.WPi18n && w.WPi18n.t(key)) || fb;
  }

  function ensureToast() {
    if (toastEl) return toastEl;
    toastEl = document.createElement('div');
    toastEl.className = 'wp-toast';
    toastEl.innerHTML = '<span class="wp-toast-icon">✓</span><span class="wp-toast-text">Saved</span>';
    document.body.appendChild(toastEl);
    return toastEl;
  }

  function showToast(text, kind) {
    var el = ensureToast();
    el.querySelector('.wp-toast-text').textContent = text;
    el.className = 'wp-toast show ' + (kind || 'ok');
    clearTimeout(el._hideT);
    el._hideT = setTimeout(function() {
      el.className = 'wp-toast ' + (kind || 'ok');
    }, 2200);
  }

  function timeStr(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    return d.toLocaleTimeString(
      (w.WPi18n && w.WPi18n.current() === 'de') ? 'de-DE' : 'en-US',
      { hour: '2-digit', minute: '2-digit' }
    );
  }

  function render() {
    if (!badgeEl) return;
    badgeEl.classList.remove('saving','saved','error','idle');
    badgeEl.classList.add(state);
    var dot = badgeEl.querySelector('.wp-st-dot');
    var lbl = badgeEl.querySelector('.wp-st-label');
    if (state === 'saving') {
      lbl.textContent = t('status.saving','Saving…');
    } else if (state === 'saved') {
      lbl.textContent = t('status.saved','Saved') + (lastSavedAt ? ' · ' + timeStr(lastSavedAt) : '');
    } else if (state === 'error') {
      lbl.textContent = t('status.error','Save error');
    } else {
      lbl.textContent = lastSavedAt
        ? t('status.allSaved','All changes saved')
        : t('status.idle','Idle');
    }
  }

  var api = {
    saving: function() {
      state = 'saving';
      dirty = true;
      render();
    },
    saved: function() {
      state = 'saved';
      dirty = false;
      lastSavedAt = Date.now();
      render();
      showToast('✓ ' + t('status.saved','Saved'), 'ok');
      clearTimeout(savedTimer);
      savedTimer = setTimeout(function() {
        if (state === 'saved') { state = 'idle'; render(); }
      }, 4000);
    },
    error: function(msg) {
      state = 'error';
      render();
      showToast('⚠ ' + (msg || t('status.error','Save error')), 'err');
    },
    idle: function() {
      state = 'idle';
      dirty = false;
      render();
    },
    dirty: function() { dirty = true; },
    isDirty: function() { return dirty; },

    mount: function(parentEl) {
      if (!parentEl) return;
      if (badgeEl && badgeEl.parentNode) badgeEl.parentNode.removeChild(badgeEl);
      badgeEl = document.createElement('div');
      badgeEl.className = 'wp-status idle';
      badgeEl.innerHTML = '<span class="wp-st-dot"></span><span class="wp-st-label">' + t('status.idle','Idle') + '</span>';
      parentEl.appendChild(badgeEl);
      render();
    }
  };

  // Beforeunload safety net
  window.addEventListener('beforeunload', function(e) {
    if (dirty) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  });

  // Cmd/Ctrl+S → broadcast force-save
  window.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('wp:force-save'));
      api.saved();
    }
  });

  // Re-render on lang change
  window.addEventListener('wp:lang-changed', render);

  w.WPstatus = api;
})(window);
