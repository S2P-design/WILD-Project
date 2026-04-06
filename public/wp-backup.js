/* ════════════════════════════════════════════════
   Wild Project — Backup / Restore (all wp_* keys)
   Local-first, single JSON file. iCloud-Drive friendly.
   ════════════════════════════════════════════════ */
(function(w) {
  'use strict';

  var LAST_KEY = 'wp_last_backup';
  var REMINDER_DAYS = 7;

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' +
           String(d.getMonth()+1).padStart(2,'0') + '-' +
           String(d.getDate()).padStart(2,'0');
  }

  function collectAll() {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('wp_') === 0 && k !== LAST_KEY) {
        data[k] = localStorage.getItem(k);
      }
    }
    return data;
  }

  function exportAll() {
    var payload = {
      app: 'wildproject-workspace',
      version: 1,
      exported: new Date().toISOString(),
      device: navigator.userAgent || 'unknown',
      data: collectAll()
    };
    var json = JSON.stringify(payload, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'wildproject-backup-' + todayStr() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    localStorage.setItem(LAST_KEY, String(Date.now()));
    window.dispatchEvent(new CustomEvent('wp:backup-created'));
    return payload;
  }

  function importFromFile(file) {
    return new Promise(function(resolve, reject) {
      var r = new FileReader();
      r.onload = function(e) {
        try {
          var parsed = JSON.parse(e.target.result);
          if (!parsed || !parsed.data) throw new Error('invalid');
          var msg = (w.WPi18n && w.WPi18n.t('backup.warning')) ||
                    'Restore will OVERWRITE all current data. Continue?';
          if (!confirm(msg)) return resolve(false);
          // Clear existing wp_* keys (except theme + lang for ux continuity)
          var keep = ['wp_workspace_theme', 'wp_lang', LAST_KEY];
          var toRemove = [];
          for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i);
            if (k && k.indexOf('wp_') === 0 && keep.indexOf(k) === -1) toRemove.push(k);
          }
          toRemove.forEach(function(k) { localStorage.removeItem(k); });
          Object.keys(parsed.data).forEach(function(k) {
            localStorage.setItem(k, parsed.data[k]);
          });
          resolve(true);
        } catch (err) {
          reject(err);
        }
      };
      r.onerror = function() { reject(new Error('read failed')); };
      r.readAsText(file);
    });
  }

  function importViaPicker() {
    return new Promise(function(resolve, reject) {
      var inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'application/json,.json';
      inp.style.display = 'none';
      inp.addEventListener('change', function() {
        if (!inp.files || inp.files.length === 0) return resolve(false);
        importFromFile(inp.files[0]).then(resolve, reject);
      });
      document.body.appendChild(inp);
      inp.click();
      setTimeout(function() { document.body.removeChild(inp); }, 1000);
    });
  }

  function lastBackup() {
    var v = parseInt(localStorage.getItem(LAST_KEY) || '0', 10);
    return v || null;
  }

  function daysSinceBackup() {
    var last = lastBackup();
    if (!last) return Infinity;
    return Math.floor((Date.now() - last) / 86400000);
  }

  function isStale() { return daysSinceBackup() >= REMINDER_DAYS; }

  // ── UI helper: attach a button to trigger export + (optional) menu ──
  function attachButton(btnEl) {
    if (!btnEl) return;
    function refresh() {
      var d = daysSinceBackup();
      btnEl.classList.toggle('stale', d >= REMINDER_DAYS);
      if (d === Infinity) {
        btnEl.title = (w.WPi18n && w.WPi18n.t('backup.never')) || 'no backup yet';
      } else {
        var label = (w.WPi18n && w.WPi18n.t('backup.days')) || 'days since backup';
        btnEl.title = d + ' ' + label;
      }
    }
    btnEl.addEventListener('click', function(e) {
      e.preventDefault();
      // Shift-click = import; normal click = export
      if (e.shiftKey) {
        importViaPicker().then(function(ok) {
          if (ok) {
            alert((w.WPi18n && w.WPi18n.t('backup.importSuccess')) ||
                  'Backup restored — page will reload');
            location.reload();
          }
        }).catch(function() {
          alert((w.WPi18n && w.WPi18n.t('backup.importFail')) ||
                'Could not read backup file');
        });
      } else {
        exportAll();
        refresh();
      }
    });
    window.addEventListener('wp:backup-created', refresh);
    window.addEventListener('wp:lang-changed', refresh);
    refresh();
  }

  w.WPbackup = {
    exportAll: exportAll,
    importFromFile: importFromFile,
    importViaPicker: importViaPicker,
    lastBackup: lastBackup,
    daysSinceBackup: daysSinceBackup,
    isStale: isStale,
    attachButton: attachButton
  };
})(window);
