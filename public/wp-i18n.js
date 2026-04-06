/* ════════════════════════════════════════════════
   Wild Project — Shared i18n (EN / DE)
   Default: EN. Toggle via WPi18n.setLang('de').
   Usage: <span data-i18n="nav.plan">Plan</span>
          <input data-i18n-ph="common.search" placeholder="Search">
   ════════════════════════════════════════════════ */
(function(w) {
  'use strict';

  var STORE = 'wp_lang';

  var dict = {
    en: {
      nav: {
        workspace: 'Workspace', plan: 'Plan', season: 'Season', month: 'Month',
        block: 'Block', week: 'Week', session: 'Session', journal: 'Journal',
        players: 'Players', notebook: 'Notebook', brand: 'Brand Guide',
        tools: 'Tools', back: '← Workspace'
      },
      common: {
        save: 'Save', delete: 'Delete', add: 'Add', new: 'New', search: 'Search',
        today: 'Today', all: 'All', none: 'None', back: 'Back', edit: 'Edit',
        cancel: 'Cancel', confirm: 'Confirm', export: 'Export', import: 'Import',
        backup: 'Backup', language: 'Language', theme: 'Theme',
        empty: '— empty —', loading: 'Loading…', saved: 'Saved',
        date: 'Date', time: 'Time', name: 'Name', notes: 'Notes',
        title: 'Title', duration: 'Duration', minutes: 'min', total: 'Total'
      },
      backup: {
        button: 'Backup all', exportAll: 'Export all data',
        importAll: 'Restore from backup',
        warning: 'Restore will OVERWRITE all current data. Continue?',
        success: 'Backup created',
        importSuccess: 'Backup restored — page will reload',
        importFail: 'Could not read backup file',
        days: 'days since backup', never: 'no backup yet',
        reminderTitle: 'Backup reminder',
        reminderText: 'Your last backup is {n} days old. Save to iCloud Drive now.',
        saveTo: 'Save to iCloud Drive for safety'
      },
      season: {
        title: 'Season', year: 'Season Year', goals: 'Season Goals',
        notes: 'Season Notes', phases: 'Phases', off: 'Off-Season',
        pre: 'Pre-Season', in: 'In-Season', macroBar: 'Macrocycle',
        addBlock: 'New Block', current: 'Current Season'
      },
      month: {
        title: 'Month', focus: 'Monthly Focus', kpis: 'Key Targets',
        weekThemes: 'Weekly Themes', notes: 'Notes', weeks: 'Weeks',
        weekN: 'Week'
      },
      block: {
        title: 'Training Block', name: 'Block Name', start: 'Start',
        end: 'End', color: 'Color', focus: 'Block Focus', notes: 'Notes',
        addBlock: 'New Block', blocks: 'Blocks', listEmpty: '— no blocks yet —',
        days: 'days', sessions: 'sessions'
      },
      week: {
        title: 'Week', theme: 'Week Theme', notes: 'Week Notes',
        mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri',
        sat: 'Sat', sun: 'Sun', addSlot: '+ slot', kw: 'CW'
      },
      session: {
        title: 'Session', date: 'Date', time: 'Time', location: 'Location',
        category: 'Category', block: 'Block', goal: 'Goal',
        focus: 'Focus', warmup: 'Warm-up', main: 'Main', end: 'Cool-down',
        drill: 'Drill', addDrill: '+ drill', equipment: 'Equipment',
        addItem: '+ item', lineup: 'Lineup', goalies: 'Goalies',
        defense: 'Defense', forwards: 'Forwards', scratches: 'Scratches',
        line: 'Line', pair: 'Pair', notes: 'Notes', totalDuration: 'Total',
        print: 'Print Lineup', attachPdf: 'Attach CoachThem PDF',
        newSession: 'New Session', listEmpty: '— no sessions yet —',
        emptyState: 'No session selected', emptyHint: '+ to start',
        lw: 'LW', c: 'C', rw: 'RW', d: 'D', g: 'G',
        noPlayer: '— select player —', selectBlock: '— no block —',
        durationMin: 'min', noLocation: 'no location'
      },
      cat: {
        ice: 'Ice', dryland: 'Dryland', game: 'Game', video: 'Video',
        meeting: 'Meeting', recovery: 'Recovery', off: 'Off'
      },
      phases: { off: 'OFF', pre: 'PRE', in: 'IN' }
    },

    de: {
      nav: {
        workspace: 'Workspace', plan: 'Plan', season: 'Saison', month: 'Monat',
        block: 'Block', week: 'Woche', session: 'Einheit', journal: 'Journal',
        players: 'Kader', notebook: 'Notizbuch', brand: 'Brand Guide',
        tools: 'Tools', back: '← Workspace'
      },
      common: {
        save: 'Speichern', delete: 'Löschen', add: 'Hinzufügen', new: 'Neu',
        search: 'Suchen', today: 'Heute', all: 'Alle', none: 'Keine',
        back: 'Zurück', edit: 'Bearbeiten', cancel: 'Abbrechen',
        confirm: 'Bestätigen', export: 'Export', import: 'Import',
        backup: 'Backup', language: 'Sprache', theme: 'Theme',
        empty: '— leer —', loading: 'Lädt…', saved: 'Gespeichert',
        date: 'Datum', time: 'Zeit', name: 'Name', notes: 'Notizen',
        title: 'Titel', duration: 'Dauer', minutes: 'Min', total: 'Gesamt'
      },
      backup: {
        button: 'Alles sichern', exportAll: 'Alle Daten exportieren',
        importAll: 'Aus Backup wiederherstellen',
        warning: 'Wiederherstellen ÜBERSCHREIBT alle aktuellen Daten. Fortfahren?',
        success: 'Backup erstellt',
        importSuccess: 'Backup wiederhergestellt — Seite lädt neu',
        importFail: 'Backup-Datei konnte nicht gelesen werden',
        days: 'Tage seit letztem Backup', never: 'Noch kein Backup',
        reminderTitle: 'Backup-Erinnerung',
        reminderText: 'Letztes Backup ist {n} Tage alt. Jetzt in iCloud Drive sichern.',
        saveTo: 'Zur Sicherheit in iCloud Drive ablegen'
      },
      season: {
        title: 'Saison', year: 'Saisonjahr', goals: 'Saisonziele',
        notes: 'Saison-Notizen', phases: 'Phasen', off: 'Off-Season',
        pre: 'Vorbereitung', in: 'Saisonbetrieb', macroBar: 'Makrozyklus',
        addBlock: 'Neuer Block', current: 'Aktuelle Saison'
      },
      month: {
        title: 'Monat', focus: 'Monatsfokus', kpis: 'Hauptziele',
        weekThemes: 'Wochen-Schwerpunkte', notes: 'Notizen', weeks: 'Wochen',
        weekN: 'KW'
      },
      block: {
        title: 'Trainingsblock', name: 'Blockname', start: 'Start',
        end: 'Ende', color: 'Farbe', focus: 'Blockfokus', notes: 'Notizen',
        addBlock: 'Neuer Block', blocks: 'Blöcke', listEmpty: '— noch keine Blöcke —',
        days: 'Tage', sessions: 'Einheiten'
      },
      week: {
        title: 'Woche', theme: 'Wochen-Schwerpunkt', notes: 'Wochen-Notizen',
        mon: 'Mo', tue: 'Di', wed: 'Mi', thu: 'Do', fri: 'Fr',
        sat: 'Sa', sun: 'So', addSlot: '+ Slot', kw: 'KW'
      },
      session: {
        title: 'Einheit', date: 'Datum', time: 'Zeit', location: 'Ort',
        category: 'Kategorie', block: 'Block', goal: 'Ziel',
        focus: 'Schwerpunkt', warmup: 'Aufwärmen', main: 'Hauptteil', end: 'Ausklang',
        drill: 'Übung', addDrill: '+ Übung', equipment: 'Material',
        addItem: '+ Position', lineup: 'Aufstellung', goalies: 'Torhüter',
        defense: 'Verteidiger', forwards: 'Stürmer', scratches: 'Überzählige',
        line: 'Reihe', pair: 'Paar', notes: 'Notizen', totalDuration: 'Gesamt',
        print: 'Aufstellung drucken', attachPdf: 'CoachThem PDF anhängen',
        newSession: 'Neue Einheit', listEmpty: '— noch keine Einheiten —',
        emptyState: 'Keine Einheit gewählt', emptyHint: '+ zum Starten',
        lw: 'LF', c: 'C', rw: 'RF', d: 'V', g: 'T',
        noPlayer: '— Spieler wählen —', selectBlock: '— kein Block —',
        durationMin: 'Min', noLocation: 'kein Ort'
      },
      cat: {
        ice: 'Eis', dryland: 'Dryland', game: 'Spiel', video: 'Video',
        meeting: 'Meeting', recovery: 'Regeneration', off: 'Frei'
      },
      phases: { off: 'OFF', pre: 'VOR', in: 'SAI' }
    }
  };

  function current() {
    return localStorage.getItem(STORE) || 'en';
  }

  function get(key) {
    var lang = current();
    var parts = key.split('.');
    var v = dict[lang];
    for (var i = 0; i < parts.length; i++) {
      v = v && v[parts[i]];
    }
    if (v == null && lang !== 'en') {
      // fallback to EN
      v = dict.en;
      for (var j = 0; j < parts.length; j++) {
        v = v && v[parts[j]];
      }
    }
    return v != null ? v : key;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function(el) {
      el.textContent = get(el.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
      el.placeholder = get(el.dataset.i18nPh);
    });
    root.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      el.title = get(el.dataset.i18nTitle);
    });
    document.documentElement.lang = current();
  }

  function setLang(l) {
    if (l !== 'en' && l !== 'de') l = 'en';
    localStorage.setItem(STORE, l);
    apply();
    window.dispatchEvent(new CustomEvent('wp:lang-changed', { detail: { lang: l } }));
  }

  function toggle() {
    setLang(current() === 'en' ? 'de' : 'en');
  }

  function attachToggle(btnEl) {
    if (!btnEl) return;
    function refresh() {
      btnEl.textContent = current() === 'en' ? 'EN' : 'DE';
      btnEl.title = get('common.language');
    }
    btnEl.addEventListener('click', toggle);
    window.addEventListener('wp:lang-changed', refresh);
    refresh();
  }

  // Cross-tab sync
  window.addEventListener('storage', function(e) {
    if (e.key === STORE) apply();
  });

  w.WPi18n = {
    get: get, t: get, apply: apply, setLang: setLang,
    toggle: toggle, current: current, attachToggle: attachToggle, dict: dict
  };

  // Auto-apply on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { apply(); });
  } else {
    apply();
  }
})(window);
