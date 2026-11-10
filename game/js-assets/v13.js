
    const WIDTH = 710;
    const HEIGHT = 880;
    const TOP_LINE = 80;
    const BALL_TOP = 100;
    const BRICK_START_Y = 150;
    const BOTTOM_LINE = 800;

    const SAVE_KEY = 'brickBreaker_v12_resume_run';
    const META_KEY = 'brickBreaker_v12_resume_meta';
    const SCORES_KEY = 'brickBreaker_v12_resume_scores';
    const MODES_KEY = 'brickBreaker_v12_resume_modes';
    const SPEEDRUNS_KEY = 'brickBreaker_v12_resume_speedruns';
    const STATS_KEY = 'brickBreaker_v13_lifetime_stats';
    const TAS_KEY = 'brickBreaker_v13_tas';

    const SPEEDRUN_TARGETS = [25, 50, 100, 250, 500];
    const DIFFICULTIES = ['easy', 'medium', 'hard', 'insane', 'asian'];
    const CRYPTO_KEY = 'BB_V12_SECURE_SALT_99823';

    const TIER_CHANCES = {
      common: 0.65,
      uncommon: 0.20,
      rare: 0.12,
      legendary: 0.03
    };

    const BRICK_TIERS = {
      common: ['normal', 'slider', 'magnet'],
      uncommon: ['tnt', 'ammo', 'portal', 'teleport', 'shock'],
      rare: ['shield', 'parent', 'healer', 'directional', 'phase'],
      legendary: ['tank', 'angel', 'turret']
    };

    const BRICK_TYPES = [
      'normal', 'slider', 'magnet', 'tnt', 'ammo', 'portal', 'teleport',
      'shock', 'shield', 'parent', 'healer', 'directional', 'phase',
      'tank', 'angel', 'turret', 'crawler', 'devil'
    ];

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let gameManager;

    function xorEncryptDecrypt(dataStr, key = CRYPTO_KEY) {
      let res = '';
      for (let i = 0; i < dataStr.length; i++) {
        res += String.fromCharCode(dataStr.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return btoa(res);
    }

    function xorDecrypt(cipherB64, key = CRYPTO_KEY) {
      try {
        const dataStr = atob(cipherB64);
        let res = '';
        for (let i = 0; i < dataStr.length; i++) {
          res += String.fromCharCode(dataStr.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return res;
      } catch {
        return null;
      }
    }

    function openModal(id) {
      document.getElementById(id)?.classList.add('active');
    }

    function closeModal(id) {
      document.getElementById(id)?.classList.remove('active');
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function shuffle(items) {
      const result = items.slice();
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    }

    function overlap(a, b) {
      return a !== b &&
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y;
    }

    function makeStats() {
      return {
        ballsFired: 0,
        turnsSurvived: 0,
        gemsEarned: 0,
        coinsEarned: 0,
        damageDealt: 0,
        bricksBroken: 0,
        bricksByType: Object.fromEntries(BRICK_TYPES.map((type) => [type, 0]))
      };
    }

    class SecureVar {
      constructor(val = 0) {
        this.set(val);
      }

      set(val) {
        const n = Number(val) || 0;
        this.v1 = n;
        this.v2 = n ^ 0x5A5A;
        this.v3 = n + 1337;
      }

      get() {
        const check1 = this.v1;
        const check2 = this.v2 ^ 0x5A5A;
        const check3 = this.v3 - 1337;

        if (check1 === check2 && check2 === check3) {
          return check1;
        } else {
          console.warn('Anti-cheat validation mismatch! Restoring valid lower bound.');
          const valid = Math.min(check1, check2, check3);
          this.set(valid);
          return valid;
        }
      }
    }

    function defaultMeta() {
      return {
        coins: 0,
        gems: 0,
        permUpgrades: { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 }
      };
    }

    function makeBall(x, y) {
      return {
        x, y,
        vx: 0, vy: 0,
        moving: false,
        downing: false,
        shocking: false,
        delay: 0,
        radius: 16
      };
    }

    function makeState(mode, meta) {
      const isHell = (mode === 'hell');
      const ballCount = isHell ? 1 : (1 + (Number(meta.permUpgrades.startAmmo) || 0));

      return {
        runMode: mode,
        target: mode.startsWith('speedrun_') ? Number(mode.split('_')[1]) : null,
        level: 1,
        coins: meta.coins,
        gems: meta.gems,
        permUpgrades: { ...meta.permUpgrades },
        difficulty: 'medium',
        ballCount,
        anchorX: WIDTH / 2,
        balls: [],
        bricks: [],
        bonusBalls: [],
        buffs: { doubleDamageTurns: 0 },
        shopPurchases: { doubleDamage: 0, laserWipe: 0 },
        pendingAmmo: 0,
        paused: false,
        turnInProgress: false,
        brickMoving: false,
        over: false,
        complete: false,
        elapsedMs: 0,
        runStartedAt: Date.now(),
        bestLevel: 1,
        secLevel: new SecureVar(1),
        secCoins: new SecureVar(meta.coins),
        secGems: new SecureVar(meta.gems),
        secBallCount: new SecureVar(ballCount),
        overlordTimer: 0,
        overlordDialogue: '"Mortal, your defiance amuses me..."'
      };
    }

    function brickColor(type, value) {
      if (type === 'tnt') return '#e53e3e';
      if (type === 'ammo') return '#d69e2e';
      if (type === 'portal') return '#805ad5';
      if (type === 'teleport') return '#2b6cb0';
      if (type === 'slider') return '#00b5d8';
      if (type === 'shock') return '#dd6b20';
      if (type === 'shield') return '#319795';
      if (type === 'parent') return '#b7791f';
      if (type === 'healer') return '#38a169';
      if (type === 'tank') return '#2d3748';
      if (type === 'angel') return '#d53f8c';
      if (type === 'turret') return '#4a5568';
      if (type === 'directional') return '#718096';
      if (type === 'phase') return '#4fd1c5';
      if (type === 'magnet') return '#d6bcfa';
      if (type === 'crawler') return '#ff4500';
      if (type === 'devil') return '#8b0000';

      const hue = Math.max(0, 120 - (value - 1) * 3);
      return `hsl(${hue}, 85%, 55%)`;
    }

    class StorageManager {
      readEncrypted(key, fallback) {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) return fallback;
          const decrypted = xorDecrypt(raw);
          return decrypted ? JSON.parse(decrypted) : fallback;
        } catch {
          return fallback;
        }
      }

      writeEncrypted(key, value) {
        try {
          localStorage.setItem(key, xorEncryptDecrypt(JSON.stringify(value)));
          return true;
        } catch {
          return false;
        }
      }

      getMeta() {
        const saved = this.readEncrypted(META_KEY, defaultMeta());
        const defaults = defaultMeta();

        return {
          coins: Math.max(0, Number(saved.coins) || 0),
          gems: Math.max(0, Number(saved.gems) || 0),
          permUpgrades: { ...defaults.permUpgrades, ...(saved.permUpgrades || {}) }
        };
      }

      saveMeta(meta) { this.writeEncrypted(META_KEY, meta); }
      getRun() { return this.readEncrypted(SAVE_KEY, null); }
      saveRun(run) { this.writeEncrypted(SAVE_KEY, run); }
      clearRun() { try { localStorage.removeItem(SAVE_KEY); } catch {} }

      getScores() { return this.readEncrypted(SCORES_KEY, []); }
      saveScores(scores) { this.writeEncrypted(SCORES_KEY, scores); }

      addScore(score, modeLabel = 'Infinite') {
        if (!Number.isFinite(score) || score < 1) return;
        const scores = this.getScores();
        scores.push({
          score: Math.floor(score),
          mode: modeLabel,
          date: new Date().toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: '2-digit'
          })
        });
        scores.sort((a, b) => b.score - a.score);
        this.writeEncrypted(SCORES_KEY, scores.slice(0, 100));
      }

      getModeRecords() {
        return this.readEncrypted(MODES_KEY, { infinite: 1, hell: 1 });
      }
      saveModeRecords(records) { this.writeEncrypted(MODES_KEY, records); }

      recordInfinite(level, isHell = false) {
        const records = this.getModeRecords();
        if (isHell) {
          records.hell = Math.max(Number(records.hell) || 1, level);
        } else {
          records.infinite = Math.max(Number(records.infinite) || 1, level);
        }
        this.writeEncrypted(MODES_KEY, records);
      }

      getSpeedrunRecords() {
        const records = this.readEncrypted(SPEEDRUNS_KEY, {});
        for (const target of SPEEDRUN_TARGETS) {
          const key = `speedrun_${target}`;
          if (!records[key]) records[key] = {};
          for (const diff of DIFFICULTIES) {
            if (!records[key][diff]) records[key][diff] = { bestMs: null, clears: 0 };
            if (!Number.isFinite(records[key][diff].bestMs)) records[key][diff].bestMs = null;
            records[key][diff].clears = Number(records[key][diff].clears) || 0;
          }
        }
        return records;
      }
      saveSpeedrunRecords(records) { this.writeEncrypted(SPEEDRUNS_KEY, records); }

      recordSpeedrun(mode, difficulty, elapsedMs) {
        const records = this.getSpeedrunRecords();
        if (!records[mode]) return;
        if (!records[mode][difficulty]) {
          records[mode][difficulty] = { bestMs: null, clears: 0 };
        }

        const time = Math.max(0, Math.round(elapsedMs));
        const old = records[mode][difficulty].bestMs;
        records[mode][difficulty].bestMs = old === null ? time : Math.min(old, time);
        records[mode][difficulty].clears++;
        this.writeEncrypted(SPEEDRUNS_KEY, records);
      }
    }

    class GameManager {
      constructor() {
        this.storage = new StorageManager();
        this.modes = {
          infinite: { label: 'Infinite', target: null },
          hell: { label: 'Hell Mode', target: null },
          speedrun_25: { label: 'Speedrun 25', target: 25 },
          speedrun_50: { label: 'Speedrun 50', target: 50 },
          speedrun_100: { label: 'Speedrun 100', target: 100 },
          speedrun_250: { label: 'Speedrun 250', target: 250 },
          speedrun_500: { label: 'Speedrun 500', target: 500 }
        };

        this.selectedMode = 'infinite';
        this.lastFrame = 0;
        this.saveTimer = 0;
        this.mouse = { x: WIDTH / 2, y: 400 };
        this.effects = [];
        this.newRunDialogOpen = false;

        this.stats = this.readStats();
        this.tas = this.readTas();
        this.tasRun = { lastElapsed: 0, segment: 0 };

        this.bindEvents();
        this.loadInitialState();
        this.updateThemeClass();
        this.renderUI();
        this.renderLeaderboard();
        this.renderModeTracker();
        this.updateTimerDisplay();
        this.updateAnalysis();
        this.updateTas();

        requestAnimationFrame((time) => this.loop(time));
      }

      readStats() {
        try {
          const raw = localStorage.getItem(STATS_KEY);
          if (!raw) return makeStats();
          const data = JSON.parse(raw);
          return data && typeof data === 'object' ? { ...makeStats(), ...data } : makeStats();
        } catch {
          return makeStats();
        }
      }

      saveStats() {
        try {
          localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
        } catch {}
      }

      readTas() {
        try {
          const raw = localStorage.getItem(TAS_KEY);
          return raw ? JSON.parse(raw) : {};
        } catch {
          return {};
        }
      }

      saveTas() {
        try {
          localStorage.setItem(TAS_KEY, JSON.stringify(this.tas));
        } catch {}
      }

      tasKey() {
        return `${this.state?.runMode || 'infinite'}_${this.state?.difficulty || 'medium'}`;
      }

      getTasRecord() {
        const key = this.tasKey();
        if (!this.tas[key]) this.tas[key] = { bestSegments: [], splits: [] };
        if (!Array.isArray(this.tas[key].bestSegments)) this.tas[key].bestSegments = [];
        if (!Array.isArray(this.tas[key].splits)) this.tas[key].splits = [];
        return this.tas[key];
      }

      bindEvents() {
        document.querySelectorAll('.mode-btn').forEach((button) => {
          button.addEventListener('click', () => {
            this.selectedMode = button.dataset.mode;
            document.querySelectorAll('.mode-btn').forEach((item) => {
              item.classList.toggle('active', item === button);
            });
          });
        });

        document.getElementById('difficultySelect').addEventListener('change', (event) => {
          if (!this.state || this.state.level > 1 || this.state.over || this.state.complete) return;
          this.state.difficulty = event.target.value;
          this.saveNow();
        });

        canvas.addEventListener('pointermove', (event) => {
          const rect = canvas.getBoundingClientRect();
          this.mouse.x = (event.clientX - rect.left) * WIDTH / rect.width;
          this.mouse.y = (event.clientY - rect.top) * HEIGHT / rect.height;
          this.updateAnalysis();
        });

        canvas.addEventListener('pointerdown', () => this.shoot());

        document.getElementById('analysisAngleInput').addEventListener('input', () => {
          this.updateAnalysis();
        });

        document.getElementById('analysisFireButton').addEventListener('click', () => {
          const value = Number(document.getElementById('analysisAngleInput').value);
          if (Number.isFinite(value)) {
            this.shoot(value);
          }
        });

        window.addEventListener('beforeunload', () => this.pauseTimerAndSave());

        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            this.pauseTimerAndSave();
          } else if (this.state && !this.state.paused &&
                     !this.state.over && !this.state.complete) {
            this.state.runStartedAt = Date.now();
          }
        });
      }

      loadInitialState() {
        const savedRun = this.storage.getRun();

        if (savedRun && savedRun.state && !savedRun.state.over && !savedRun.state.complete) {
          this.restoreRun(savedRun);
          this.state.paused = false;
          this.state.runStartedAt = Date.now();
          this.tasRun.lastElapsed = this.state.elapsedMs || 0;
          this.tasRun.segment = 0;
          return;
        }

        this.storage.clearRun();
        this.state = makeState('infinite', this.storage.getMeta());
        this.state.difficulty = document.getElementById('difficultySelect').value;
        this.state.balls = Array.from({ length: this.state.ballCount }, () =>
          makeBall(this.state.anchorX, BOTTOM_LINE - 20)
        );

        this.spawnRow(false);
        this.saveNow();
      }

      modeLabel(mode) {
        return this.modes[mode]?.label || 'Infinite';
      }

      updateThemeClass() {
        if (this.state && this.state.runMode === 'hell') {
          document.body.classList.add('hell-mode');
          document.getElementById('overlordPanel').style.display = 'block';
        } else {
          document.body.classList.remove('hell-mode');
          document.getElementById('overlordPanel').style.display = 'none';
        }
      }

      restoreRun(saved) {
        const meta = this.storage.getMeta();
        const raw = saved.state || {};
        const mode = this.modes[raw.runMode] ? raw.runMode : 'infinite';

        this.state = makeState(mode, meta);
        Object.assign(this.state, raw);

        this.state.runMode = mode;
        this.state.target = this.modes[mode].target;
        this.state.coins = Math.max(0, Number(raw.coins) || 0);
        this.state.gems = Math.max(0, Number(raw.gems) || 0);
        this.state.level = Math.max(1, Number(raw.level) || 1);
        this.state.ballCount = Math.max(1, Number(raw.ballCount) || 1);

        this.state.secLevel = new SecureVar(this.state.level);
        this.state.secCoins = new SecureVar(this.state.coins);
        this.state.secGems = new SecureVar(this.state.gems);
        this.state.secBallCount = new SecureVar(this.state.ballCount);

        this.state.permUpgrades = mode === 'hell'
          ? { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 }
          : { ...meta.permUpgrades, ...(raw.permUpgrades || {}) };

        this.state.buffs = { doubleDamageTurns: Number(raw.buffs?.doubleDamageTurns) || 0 };
        this.state.shopPurchases = {
          doubleDamage: Number(raw.shopPurchases?.doubleDamage) || 0,
          laserWipe: Number(raw.shopPurchases?.laserWipe) || 0
        };

        this.state.elapsedMs = Math.max(0, Number(raw.elapsedMs) || 0);
        this.state.runStartedAt = Date.now();
        this.state.paused = false;
        this.state.turnInProgress = Boolean(raw.turnInProgress);
        this.state.brickMoving = Boolean(raw.brickMoving);
        this.state.over = false;
        this.state.complete = false;
        this.state.overlordTimer = Number(raw.overlordTimer) || 0;
        this.state.overlordDialogue = raw.overlordDialogue || '"Mortal, your defiance amuses me..."';
        this.state.anchorX = clamp(Number(raw.anchorX) || WIDTH / 2, 20, WIDTH - 20);

        this.state.bricks = (saved.bricks || []).map((brick) => {
          const restored = { ...brick };
          restored.targetY = Number.isFinite(restored.targetY) ? restored.targetY : restored.y;
          return restored;
        });

        this.state.bonusBalls = (saved.bonusBalls || []).map((ball) => ({ ...ball }));
        this.state.balls = (saved.balls || []).map((ball) => ({
          ...makeBall(this.state.anchorX, BOTTOM_LINE - 20),
          ...ball
        }));

        if (!this.state.balls.length) {
          this.state.balls = Array.from({ length: this.state.ballCount }, () =>
            makeBall(this.state.anchorX, BOTTOM_LINE - 20)
          );
        }

        if (this.state.balls.some((ball) => ball.moving)) {
          this.state.turnInProgress = true;
        }

        const difficulty = document.getElementById('difficultySelect');
        if (difficulty) difficulty.value = this.state.difficulty || 'medium';

        this.verifyTripleVars();
      }

      currentElapsedMs() {
        if (!this.state) return 0;
        let elapsed = Number(this.state.elapsedMs) || 0;
        if (!this.state.paused && this.state.runStartedAt) {
          elapsed += Date.now() - this.state.runStartedAt;
        }
        return Math.max(0, elapsed);
      }

      formatTime(ms) {
        const centiseconds = Math.floor(ms / 10);
        const minutes = Math.floor(centiseconds / 6000);
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const fraction = centiseconds % 100;

        return `${String(minutes).padStart(2, '0')}:` +
          `${String(seconds).padStart(2, '0')}.` +
          `${String(fraction).padStart(2, '0')}`;
      }

      updateTimerDisplay() {
        if (!this.state) return;

        const timer = document.getElementById('speedrunTimer');
        const label = document.getElementById('timerLabel');
        if (!timer || !label) return;

        label.textContent = `${this.modeLabel(this.state.runMode)} Time`;
        timer.textContent = this.state.runMode.startsWith('speedrun_')
          ? this.formatTime(this.currentElapsedMs())
          : '—';
      }

      pauseTimerAndSave() {
        if (!this.state || this.state.over || this.state.complete) return;
        this.state.elapsedMs = this.currentElapsedMs();
        this.state.runStartedAt = null;
        this.saveNow();
      }

      saveNow() {
        if (!this.state || this.state.over || this.state.complete) return;
        this.verifyTripleVars();
        const wasRunning = !this.state.paused;
        this.state.elapsedMs = this.currentElapsedMs();

        const run = {
          version: 13,
          savedAt: Date.now(),
          state: {
            runMode: this.state.runMode,
            level: this.state.level,
            coins: this.state.coins,
            gems: this.state.gems,
            permUpgrades: this.state.permUpgrades,
            difficulty: this.state.difficulty,
            ballCount: this.state.ballCount,
            anchorX: this.state.anchorX,
            buffs: this.state.buffs,
            shopPurchases: this.state.shopPurchases,
            pendingAmmo: this.state.pendingAmmo,
            paused: this.state.paused,
            turnInProgress: this.state.turnInProgress,
            brickMoving: this.state.brickMoving,
            over: this.state.over,
            complete: this.state.complete,
            elapsedMs: this.state.elapsedMs,
            bestLevel: this.state.bestLevel,
            overlordTimer: this.state.overlordTimer,
            overlordDialogue: this.state.overlordDialogue
          },
          balls: this.state.balls.map((ball) => ({ ...ball })),
          bricks: this.state.bricks.map((brick) => ({ ...brick })),
          bonusBalls: this.state.bonusBalls.map((ball) => ({ ...ball }))
        };

        this.storage.saveRun(run);

        if (wasRunning && !document.hidden) {
          this.state.runStartedAt = Date.now();
        }

        this.updateTimerDisplay();
      }

      resetGame() {
        if (this.state && !this.state.over && !this.state.complete) {
          this.state.elapsedMs = this.currentElapsedMs();
          this.state.runStartedAt = null;
          this.state.paused = true;
          this.saveNow();
        }

        this.newRunDialogOpen = true;
        this.selectedMode = 'infinite';
        document.querySelectorAll('.mode-btn').forEach((button) => {
          button.classList.toggle('active', button.dataset.mode === 'infinite');
        });

        document.getElementById('modeModalMessage').textContent =
          'Starting a new run replaces the saved run. Choose a mode to continue.';
        openModal('modeSelectModal');
      }

      cancelNewRun() {
        if (!this.newRunDialogOpen) {
          closeModal('modeSelectModal');
          return;
        }

        this.newRunDialogOpen = false;
        closeModal('modeSelectModal');

        if (this.state && !this.state.over && !this.state.complete) {
          this.state.paused = false;
          this.state.runStartedAt = Date.now();
          this.saveNow();
        }
      }

      startSelectedMode() {
        if (!this.newRunDialogOpen) return;

        const mode = this.modes[this.selectedMode] ? this.selectedMode : 'infinite';
        this.newRunDialogOpen = false;
        this.storage.clearRun();
        this.effects = [];

        const meta = this.storage.getMeta();
        this.state = makeState(mode, meta);

        if (mode === 'hell') {
          this.state.ballCount = 1;
          this.state.secBallCount.set(1);
        }

        this.state.difficulty = document.getElementById('difficultySelect').value;
        this.state.balls = Array.from({ length: this.state.ballCount }, () =>
          makeBall(this.state.anchorX, BOTTOM_LINE - 20)
        );

        this.tasRun = { lastElapsed: 0, segment: 0 };
        this.updateThemeClass();
        this.spawnRow(false);
        closeModal('modeSelectModal');
        this.saveNow();
        this.renderUI();
      }

      getSaveBundle() {
        this.saveNow();
        return {
          version: 13,
          meta: this.storage.getMeta(),
          scores: this.storage.getScores(),
          modeRecords: this.storage.getModeRecords(),
          speedrunRecords: this.storage.getSpeedrunRecords(),
          stats: this.stats,
          tas: this.tas,
          game: this.storage.getRun()
        };
      }

      exportSaveFile() {
        this.saveNow();
        const bundle = this.getSaveBundle();
        const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `brick_breaker_v13_${this.state?.runMode || 'save'}_level_${this.state?.level || 1}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }

      showSaveCode() {
        try {
          const bundle = this.getSaveBundle();
          const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(bundle))));
          const modal = document.createElement('div');
          modal.className = 'modal-overlay active';
          modal.innerHTML = `
            <div class="modal-content" style="max-width:620px;">
              <button class="modal-close" aria-label="Close">&times;</button>
              <h2>Save Code</h2>
              <p class="muted">Copy this code to back up your run and records.</p>
              <textarea class="save-code-input" rows="10" readonly></textarea>
              <div class="modal-actions">
                <button type="button" class="copyBtn">Copy code</button>
              </div>
            </div>
          `;
          modal.querySelector('textarea').value = encoded;
          modal.querySelector('.modal-close').onclick = () => modal.remove();
          modal.querySelector('.copyBtn').onclick = async () => {
            try {
              await navigator.clipboard.writeText(encoded);
              alert('Save code copied.');
            } catch {
              modal.querySelector('textarea').select();
              document.execCommand('copy');
              alert('Save code selected/copied where supported.');
            }
          };
          modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.remove();
          });
          document.body.appendChild(modal);
        } catch {
          alert('Could not export save code.');
        }
      }

      importSaveCode() {
        const code = prompt('Paste a Brick Breaker save code:');
        if (!code) return;

        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
          this.applySaveBundle(decoded);
          alert('Save code loaded successfully!');
        } catch {
          alert('That save code is invalid or corrupted.');
        }
      }

      applySaveBundle(data) {
        if (!data || (!data.meta && !data.game && !data.state)) throw new Error('Invalid save data');

        if (data.meta) this.storage.saveMeta(data.meta);
        if (Array.isArray(data.scores)) this.storage.saveScores(data.scores);
        if (data.modeRecords) this.storage.saveModeRecords(data.modeRecords);
        if (data.speedrunRecords) this.storage.saveSpeedrunRecords(data.speedrunRecords);

        if (data.stats && typeof data.stats === 'object') {
          this.stats = { ...makeStats(), ...data.stats };
          this.stats.bricksByType = { ...makeStats().bricksByType, ...(data.stats.bricksByType || {}) };
          localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
        }

        if (data.tas && typeof data.tas === 'object') {
          this.tas = data.tas;
          localStorage.setItem(TAS_KEY, JSON.stringify(this.tas));
        }

        const run = data.game || data;
        if (run && run.state && Array.isArray(run.bricks)) {
          this.storage.saveRun(run);
          this.restoreRun(run);
        }

        this.newRunDialogOpen = false;
        closeModal('modeSelectModal');
        closeModal('settingsModal');
        this.renderUI();
        this.renderLeaderboard();
        this.renderModeTracker();
        this.updateTas();
      }

      importSaveFile(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
          try {
            let data;
            const text = String(reader.result || '');

            try {
              data = JSON.parse(text);
            } catch {
              const decrypted = xorDecrypt(text);
              if (decrypted) data = JSON.parse(decrypted);
            }

            if (!data || (!data.meta && !data.game && !data.state)) throw new Error('Invalid save format');

            this.applySaveBundle(data);
            alert('Save data and records loaded successfully!');
          } catch {
            alert('Could not load that save file (Corrupted or Invalid Save).');
          }

          event.target.value = '';
        };

        reader.readAsText(file);
      }

      wipeAllData() {
        if (confirm('Are you sure you want to wipe all data? This will permanently delete your active run, upgrades, high scores, speedrun records, TAS splits, and lifetime stats.')) {
          const keysToRemove = [SAVE_KEY, META_KEY, SCORES_KEY, MODES_KEY, SPEEDRUNS_KEY, STATS_KEY, TAS_KEY];
          keysToRemove.forEach((key) => {
            try { localStorage.removeItem(key); } catch {}
          });

          this.stats = makeStats();
          this.tas = {};
          this.effects = [];
          this.state = makeState('infinite', defaultMeta());
          this.state.balls = Array.from({ length: this.state.ballCount }, () =>
            makeBall(this.state.anchorX, BOTTOM_LINE - 20)
          );

          closeModal('settingsModal');
          this.updateThemeClass();
          this.spawnRow(false);
          this.saveNow();
          this.renderUI();
          this.renderLeaderboard();
          this.renderModeTracker();
          this.updateTas();
        }
      }

      getAimVector(angleDegrees = null) {
        let dx;
        let dy;

        if (Number.isFinite(angleDegrees)) {
          const radians = angleDegrees * Math.PI / 180;
          dx = Math.cos(radians);
          dy = Math.sin(radians);

          // Always aim upward for a valid shot.
          if (dy > -0.05) dy = -0.05;
        } else {
          const targetX = this.mouse.x;
          const targetY = Math.min(this.mouse.y, BOTTOM_LINE - 80);
          dx = targetX - this.state.anchorX;
          dy = targetY - (BOTTOM_LINE - 20);

          if (dy > -40) dy = -40;
        }

        const length = Math.hypot(dx, dy) || 1;
        return { x: dx / length, y: dy / length };
      }

      getMouseAimAngle() {
        const vector = this.getAimVector();
        return Math.atan2(vector.y, vector.x);
      }

      rayBoxHit(x, y, dx, dy, rect, radius) {
        const left = rect.x - radius;
        const right = rect.x + rect.w + radius;
        const top = rect.y - radius;
        const bottom = rect.y + rect.h + radius;

        let near = -Infinity;
        let far = Infinity;
        let normalX = 0;
        let normalY = 0;

        if (Math.abs(dx) < 1e-9) {
          if (x < left || x > right) return null;
        } else {
          const tx1 = (left - x) / dx;
          const tx2 = (right - x) / dx;
          const txNear = Math.min(tx1, tx2);
          const txFar = Math.max(tx1, tx2);

          if (txNear > near) {
            near = txNear;
            normalX = dx > 0 ? -1 : 1;
            normalY = 0;
          }
          far = Math.min(far, txFar);
        }

        if (Math.abs(dy) < 1e-9) {
          if (y < top || y > bottom) return null;
        } else {
          const ty1 = (top - y) / dy;
          const ty2 = (bottom - y) / dy;
          const tyNear = Math.min(ty1, ty2);
          const tyFar = Math.max(ty1, ty2);

          if (tyNear > near) {
            near = tyNear;
            normalX = 0;
            normalY = dy > 0 ? -1 : 1;
          }
          far = Math.min(far, tyFar);
        }

        if (far < near || far < 0) return null;

        if (near < 0) {
          return { distance: far, normalX: -normalX, normalY: -normalY };
        }

        return { distance: near, normalX, normalY };
      }

      predictAimPath(angleDegrees = null) {
        if (!this.state) return [];

        const radius = 16;
        let x = this.state.anchorX;
        let y = BOTTOM_LINE - 20;
        const direction = this.getAimVector(angleDegrees);
        let dx = direction.x;
        let dy = direction.y;
        const points = [{ x, y }];

        for (let bounce = 0; bounce < 32; bounce++) {
          let nearestDistance = Infinity;
          let hitType = null;
          let hitNormalX = 0;
          let normalY = 0;

          const wallCandidates = [];

          if (dx > 1e-9) {
            wallCandidates.push({
              distance: (WIDTH - radius - x) / dx,
              normalX: -1,
              normalY: 0,
              type: 'wall'
            });
          } else if (dx < -1e-9) {
            wallCandidates.push({
              distance: (radius - x) / dx,
              normalX: 1,
              normalY: 0,
              type: 'wall'
            });
          }

          if (dy < -1e-9) {
            wallCandidates.push({
              distance: (BALL_TOP + radius - y) / dy,
              normalX: 0,
              normalY: 1,
              type: 'wall'
            });
          }

          for (const candidate of wallCandidates) {
            if (candidate.distance > 0 && candidate.distance < nearestDistance) {
              nearestDistance = candidate.distance;
              hitType = candidate.type;
              hitNormalX = candidate.normalX;
              normalY = candidate.normalY;
            }
          }

          for (const brick of this.state.bricks) {
            const hit = this.rayBoxHit(x, y, dx, dy, brick, radius);
            if (hit && hit.distance > 0 && hit.distance < nearestDistance) {
              nearestDistance = hit.distance;
              hitType = 'brick';
              hitNormalX = hit.normalX;
              normalY = hit.normalY;
            }
          }

          if (!Number.isFinite(nearestDistance) || nearestDistance <= 0) break;

          x += dx * nearestDistance;
          y += dy * nearestDistance;
          points.push({ x, y });

          if (hitType === 'brick') break;

          if (hitNormalX !== 0) dx *= -1;
          if (normalY !== 0) dy *= -1;

          x += dx * 0.05;
          y += dy * 0.05;
        }

        return points;
      }

      spawnRow(animateIn = this.state.level > 1) {
        const count = this.getSpawnCount();
        const columns = shuffle([0, 1, 2, 3, 4, 5]).slice(0, count);
        const targetY = BRICK_START_Y;
        const spawnY = animateIn ? targetY - 80 : targetY;
        const isHell = (this.state.runMode === 'hell');

        for (const col of columns) {
          let type = 'normal';

          if (isHell) {
            const hellRoll = Math.random();
            if (hellRoll < 0.18) type = 'crawler';
            else if (hellRoll < 0.28) type = 'devil';
            else {
              const roll = Math.random();
              let chosenTier = 'common';
              let cumulative = 0;
              for (const [tier, chance] of Object.entries(TIER_CHANCES)) {
                cumulative += chance;
                if (roll <= cumulative) {
                  chosenTier = tier;
                  break;
                }
              }
              const tierList = BRICK_TIERS[chosenTier] || BRICK_TIERS.common;
              type = tierList[Math.floor(Math.random() * tierList.length)];
            }
          } else {
            const roll = Math.random();
            let chosenTier = 'common';
            let cumulative = 0;
            for (const [tier, chance] of Object.entries(TIER_CHANCES)) {
              cumulative += chance;
              if (roll <= cumulative) {
                chosenTier = tier;
                break;
              }
            }
            const tierList = BRICK_TIERS[chosenTier] || BRICK_TIERS.common;
            type = tierList[Math.floor(Math.random() * tierList.length)];
          }

          let value = this.state.level;
          if (type === 'ammo') value = Math.round(value * 1.5);
          else if (type === 'tank') value = Math.max(5, value * 5);
          else if (type === 'angel' || type === 'turret') value = 1;
          else if (type === 'crawler' || type === 'devil') value = Math.max(1, Math.round(value * 0.8));
          else if (['shield', 'shock', 'portal', 'teleport', 'parent', 'healer', 'directional', 'phase', 'magnet'].includes(type)) {
            value = Math.max(1, Math.round(value * 0.8));
          }

          if (isHell) value = Math.max(1, Math.round(value * 2.5));

          const brick = {
            x: col * 120 + 5,
            y: spawnY,
            targetY,
            w: 110,
            h: 70,
            value,
            type,
            slideDir: Math.random() < 0.5 ? -1 : 1,
            slideSpeed: 1.5 + Math.random()
          };

          if (type === 'directional') {
            const dirs = shuffle(['top', 'bottom', 'left', 'right']).slice(0, 2);
            brick.allowedDirs = dirs;
          }

          if (type === 'phase') {
            brick.phase = Math.random() < 0.5 ? 'solid' : 'liquid';
          }

          this.state.bricks.push(brick);
        }

        const freeColumns = [0, 1, 2, 3, 4, 5].filter((column) => !columns.includes(column));
        if (freeColumns.length && Math.random() < 0.75) {
          const column = freeColumns[Math.floor(Math.random() * freeColumns.length)];
          this.state.bonusBalls.push({
            x: column * 120 + 60,
            y: spawnY + 35,
            targetY: targetY + 35,
            r: 14,
            hit: false
          });
        }

        this.resolveBrickOverlaps();
      }

      resolveBrickOverlaps() {
        const bricks = this.state.bricks;
        const kept = [];

        for (const brick of bricks) {
          if (!kept.some((other) => overlap(brick, other))) {
            kept.push(brick);
            continue;
          }

          let placed = false;
          for (let row = 0; row < 8 && !placed; row++) {
            for (let col = 0; col < 6 && !placed; col++) {
              const candidate = {
                ...brick,
                x: col * 120 + 5,
                y: BRICK_START_Y + row * 80,
                targetY: BRICK_START_Y + row * 80
              };
              if (!kept.some((other) => overlap(candidate, other))) {
                brick.x = candidate.x;
                brick.y = candidate.y;
                brick.targetY = candidate.targetY;
                kept.push(brick);
                placed = true;
              }
            }
          }

          if (!placed) {
            const index = bricks.indexOf(brick);
            if (index !== -1) bricks.splice(index, 1);
          }
        }

        this.state.bricks = kept;
      }

      getSpawnCount() {
        switch (this.state.difficulty) {
          case 'easy': return randomInt(1, 3);
          case 'hard': return randomInt(1, 5);
          case 'insane': return randomInt(3, 5);
          case 'asian': return randomInt(4, 5);
          default: return randomInt(1, 4);
        }
      }

      verifyTripleVars() {
        if (!this.state) return;
        this.state.level = this.state.secLevel.get();
        this.state.coins = this.state.secCoins.get();
        this.state.gems = this.state.secGems.get();
        this.state.ballCount = this.state.secBallCount.get();
      }

      addCoins(amount) {
        const luckFactor = Number(this.state.permUpgrades.luck) || 0;
        const adjusted = Math.round(amount * (1 + luckFactor * 0.2));
        if (amount > 0) this.stats.coinsEarned += adjusted;

        const current = this.state.secCoins.get();
        const updated = Math.max(0, current + adjusted);
        this.state.coins = updated;
        this.state.secCoins.set(updated);
        this.persistMeta();
        this.renderUI();
        this.saveStats();
      }

      addGems(amount) {
        if (this.state.runMode === 'hell') return;

        if (amount > 0) this.stats.gemsEarned += amount;

        const current = this.state.secGems.get();
        const updated = Math.max(0, current + amount);
        this.state.gems = updated;
        this.state.secGems.set(updated);
        this.persistMeta();
        this.renderUI();
        this.saveStats();
      }

      persistMeta() {
        if (this.state.runMode === 'hell') return;
        this.storage.saveMeta({
          coins: this.state.coins,
          gems: this.state.gems,
          permUpgrades: this.state.permUpgrades
        });
      }

      getTempBuffCost(type) {
        const purchases = this.state?.shopPurchases?.[type] || 0;
        if (type === 'doubleDamage') return Math.round(30 * Math.pow(1.25, purchases));
        if (type === 'laserWipe') return Math.round(40 * Math.pow(1.3, purchases));
        return 50;
      }

      buyPermUpgrade(type) {
        if (this.state.runMode === 'hell') return;
        const config = {
          startAmmo: { max: 10, base: 5 },
          critChance: { max: 10, base: 6 },
          ballSpeed: { max: 5, base: 8 },
          luck: { max: 5, base: 10 }
        }[type];

        if (!config) return;

        const level = Number(this.state.permUpgrades[type]) || 0;
        if (level >= config.max) return;

        const cost = Math.round(config.base * Math.pow(1.5, level));
        if (this.state.gems < cost) return;

        this.addGems(-cost);
        this.state.permUpgrades[type] = level + 1;

        if (type === 'startAmmo' && this.state.level === 1 &&
            !this.state.balls.some((ball) => ball.moving)) {
          const oldCount = this.state.ballCount;
          const newCount = 1 + this.state.permUpgrades.startAmmo;
          this.state.ballCount = newCount;
          this.state.secBallCount.set(newCount);

          for (let i = oldCount; i < newCount; i++) {
            this.state.balls.push(makeBall(this.state.anchorX, BOTTOM_LINE - 20));
          }
        }

        this.persistMeta();
        this.renderUI();
        this.saveNow();
      }

      buyTempBuff(type) {
        if (this.state.over || this.state.complete || this.state.runMode === 'hell') return;
        if (['hard', 'insane', 'asian'].includes(this.state.difficulty)) return;

        const cost = this.getTempBuffCost(type);

        if (type === 'doubleDamage' && this.state.coins >= cost) {
          this.addCoins(-cost);
          this.state.buffs.doubleDamageTurns += 3;
          this.state.shopPurchases.doubleDamage = (this.state.shopPurchases.doubleDamage || 0) + 1;
        } else if (type === 'laserWipe' && this.state.coins >= cost && this.state.bricks.length) {
          this.addCoins(-cost);
          this.state.shopPurchases.laserWipe = (this.state.shopPurchases.laserWipe || 0) + 1;
          const bottom = Math.max(...this.state.bricks.map((brick) => brick.y));
          const toRemove = this.state.bricks.filter((brick) => brick.y === bottom);

          for (const brick of toRemove) {
            this.breakBrick(brick);
          }
        } else {
          return;
        }

        this.persistMeta();
        this.renderUI();
        this.saveNow();
      }

      showTrackerTab(tab) {
        const speedrun = tab === 'speedrun';
        document.getElementById('generalTrackerPane').hidden = speedrun;
        document.getElementById('speedrunTrackerPane').hidden = !speedrun;
        document.getElementById('generalTrackerTab').classList.toggle('active', !speedrun);
        document.getElementById('speedrunTrackerTab').classList.toggle('active', speedrun);
        this.renderModeTracker();
      }

      renderModeTracker() {
        const records = this.storage.getModeRecords();
        const infinite = document.getElementById('modeTrackerList');

        if (infinite) {
          infinite.innerHTML = `
            <div class="tracker-row">
              <strong>Infinite best level</strong>
              <span>${Number(records.infinite) || 1}</span>
            </div>
            <div class="tracker-row">
              <strong>Hell Mode best level</strong>
              <span>${Number(records.hell) || 1}</span>
            </div>`;
        }

        const selectCat = document.getElementById('speedrunCategorySelect');
        const selectDiff = document.getElementById('speedrunDiffSelect');
        const catKey = selectCat?.value || 'speedrun_25';
        const diffKey = selectDiff?.value || 'medium';

        const config = this.modes[catKey];
        const speedrunRecords = this.storage.getSpeedrunRecords();
        const record = speedrunRecords[catKey]?.[diffKey];
        const container = document.getElementById('speedrunCategoryTracker');

        if (container && config && record) {
          container.innerHTML = `
            <div class="tracker-row"><strong>Category</strong><span>${config.label}</span></div>
            <div class="tracker-row"><strong>Difficulty</strong><span style="text-transform:uppercase">${diffKey}</span></div>
            <div class="tracker-row"><strong>Target level</strong><span>${config.target}</span></div>
            <div class="tracker-row"><strong>Best time</strong><span>${record.bestMs === null ? 'No clear' : this.formatTime(record.bestMs)}</span></div>
            <div class="tracker-row"><strong>Completions</strong><span>${record.clears}</span></div>`;
        }
      }

      renderLeaderboard() {
        const body = document.getElementById('leaderboardBody');
        const scores = this.storage.getScores();

        if (!body) return;

        if (!scores.length) {
          body.innerHTML = '<tr><td colspan="3" class="muted">No high scores yet.</td></tr>';
        } else {
          body.innerHTML = scores.map((entry, index) =>
            `<tr><td>${index + 1}</td><td>${entry.mode || 'Infinite'}: Level ${Number(entry.score) || 0}</td><td>${entry.date || ''}</td></tr>`
          ).join('');
        }

        const speedrunRecords = this.storage.getSpeedrunRecords();
        const speedrunRows = [];

        for (const target of SPEEDRUN_TARGETS) {
          const mode = `speedrun_${target}`;
          for (const diff of DIFFICULTIES) {
            const record = speedrunRecords[mode]?.[diff];
            if (record?.bestMs !== null && record?.bestMs !== undefined) {
              speedrunRows.push(`<div class="tracker-row"><strong>${target} · ${diff.toUpperCase()}</strong><span>${this.formatTime(record.bestMs)} (${record.clears} clears)</span></div>`);
            }
          }
        }

        document.getElementById('speedrunLeaderboard').innerHTML =
          speedrunRows.length ? speedrunRows.join('') : '<p class="muted">No speedrun clears yet.</p>';

        const statsRows = [
          ['Balls fired', this.stats.ballsFired],
          ['Turns survived', this.stats.turnsSurvived],
          ['Gems earned', this.stats.gemsEarned],
          ['Coins earned', this.stats.coinsEarned],
          ['Damage dealt', Number(this.stats.damageDealt).toFixed(1)],
          ['Bricks broken', this.stats.bricksBroken]
        ];

        const typeRows = BRICK_TYPES.map((type) => {
          return [`${type[0].toUpperCase()}${type.slice(1)} bricks broken`, this.stats.bricksByType[type] || 0];
        });

        document.getElementById('lifetimeStats').innerHTML =
          [...statsRows, ...typeRows].map(([label, value]) => {
            return `<div class="tracker-row"><strong>${label}</strong><span>${value}</span></div>`;
          }).join('');
      }

      showLeaderboardPage(page) {
        const pages = {
          scores: 'leaderboardScoresPage',
          speedruns: 'leaderboardSpeedrunsPage',
          stats: 'leaderboardStatsPage'
        };

        Object.entries(pages).forEach(([key, id]) => {
          document.getElementById(id).hidden = key !== page;
        });

        document.querySelectorAll('.leaderboard-tabs button').forEach((button) => {
          const active =
            (page === 'scores' && button.textContent.toLowerCase().includes('high scores')) ||
            (page === 'speedruns' && button.textContent.toLowerCase().includes('speedruns')) ||
            (page === 'stats' && button.textContent.toLowerCase().includes('lifetime'));
          button.classList.toggle('active', active);
        });
      }

      renderUI() {
        const state = this.state;
        if (!state) return;

        this.verifyTripleVars();

        document.getElementById('trackerCoins').textContent = state.coins;
        document.getElementById('trackerGems').textContent = state.gems;
        document.getElementById('coinsCountTempModal').textContent = state.coins;
        document.getElementById('gemsCountModal').textContent = state.gems;

        const isHell = (state.runMode === 'hell');
        const hard = ['hard', 'insane', 'asian'].includes(state.difficulty) || isHell;

        document.getElementById('trackerActiveBuffs').textContent = isHell
          ? 'Hell Nullification (No Upgrades)'
          : hard
            ? 'Disabled (Hard+ Difficulty)'
            : state.buffs.doubleDamageTurns > 0
              ? `1.5x Damage (${state.buffs.doubleDamageTurns} turns)`
              : 'None';

        document.getElementById('buff15xStatus').textContent = hard
          ? 'Disabled'
          : state.buffs.doubleDamageTurns > 0
            ? `${state.buffs.doubleDamageTurns} turns left`
            : 'Inactive';

        const difficultySelect = document.getElementById('difficultySelect');
        difficultySelect.value = state.difficulty || 'medium';
        difficultySelect.disabled = state.level > 1 || state.over || state.complete;

        const upgrades = [
          ['startAmmo', 10, 5, 'permAmmoStatus', 'btnBuyPermAmmo'],
          ['critChance', 10, 6, 'permCritStatus', 'btnBuyPermCrit'],
          ['ballSpeed', 5, 8, 'permSpeedStatus', 'btnBuyPermSpeed'],
          ['luck', 5, 10, 'permLuckStatus', 'btnBuyPermLuck']
        ];

        for (const [key, max, base, statusId, buttonId] of upgrades) {
          const level = isHell ? 0 : (Number(state.permUpgrades[key]) || 0);
          const status = document.getElementById(statusId);
          const button = document.getElementById(buttonId);

          if (isHell) {
            status.textContent = 'NULLIFIED IN HELL';
            button.textContent = 'LOCKED';
            button.disabled = true;
          } else if (level >= max) {
            status.textContent = `MAXED (${max})`;
            button.textContent = 'MAX';
            button.disabled = true;
          } else {
            const cost = Math.round(base * Math.pow(1.5, level));
            status.textContent = `Lvl ${level}/${max} — ${cost} Gems`;
            button.textContent = `Upgrade (${cost})`;
            button.disabled = state.gems < cost;
          }
        }

        const cost15x = this.getTempBuffCost('doubleDamage');
        const costLaser = this.getTempBuffCost('laserWipe');

        const btn15x = document.getElementById('btnBuy15x');
        btn15x.textContent = `Buy (${cost15x} C)`;
        btn15x.disabled = hard || state.coins < cost15x || state.over || state.complete;

        const btnLaser = document.getElementById('btnBuyLaser');
        btnLaser.textContent = `Buy (${costLaser} C)`;
        btnLaser.disabled = hard || state.coins < costLaser || !state.bricks.length || state.over || state.complete;

        const speechEl = document.getElementById('overlordSpeech');
        if (speechEl) {
          speechEl.textContent = state.overlordDialogue || '"Mortal, your defiance amuses me..."';
        }

        document.getElementById('tasPanel').hidden = !state.runMode.startsWith('speedrun_');
        this.updateTimerDisplay();
        this.renderModeTracker();
        this.updateAnalysis();
        this.updateTas();
      }

      updateAnalysis() {
        if (!this.state) return;

        const input = document.getElementById('analysisAngleInput');
        const inputIsFocused = document.activeElement === input;
        const mouseAngle = this.getMouseAimAngle();
        const mouseDeg = mouseAngle * 180 / Math.PI;

        if (!inputIsFocused) {
          input.value = mouseDeg.toFixed(1);
        }

        const chosen = Number.isFinite(Number(input.value)) && inputIsFocused
          ? Number(input.value)
          : mouseDeg;

        const radians = chosen * Math.PI / 180;
        const vx = Math.cos(radians);
        const vy = Math.sin(radians);
        const speedMultiplier = this.state.runMode === 'hell'
          ? 1
          : 1 + (Number(this.state.permUpgrades.ballSpeed) || 0) * 0.1;
        const speed = 11 * speedMultiplier;
        const safeVy = Math.abs(vy) < 0.001 ? 0.001 : vy;

        const anchorY = BOTTOM_LINE - 20;
        const timeToTop = Math.max(0, (BALL_TOP - anchorY) / (safeVy * speed));
        const horizontalTravel = vx * speed * timeToTop;

        document.getElementById('analysisAngle').textContent = `${chosen.toFixed(2)}°`;
        document.getElementById('analysisDetails').innerHTML = `
          <div>Mouse aim: <strong>${mouseDeg.toFixed(2)}°</strong></div>
          <div>Selected angle: <strong>${chosen.toFixed(2)}°</strong></div>
          <div>Direction vector: <strong>(${vx.toFixed(4)}, ${vy.toFixed(4)})</strong></div>
          <div>Velocity: <strong>(${(vx * speed).toFixed(2)}, ${(vy * speed).toFixed(2)}) px/frame</strong></div>
          <div>Speed magnitude: <strong>${speed.toFixed(2)} px/frame</strong></div>
          <div>Estimated time to top line: <strong>${Number.isFinite(timeToTop) ? timeToTop.toFixed(1) : '—'} frames</strong></div>
          <div>Estimated horizontal travel: <strong>${Number.isFinite(horizontalTravel) ? horizontalTravel.toFixed(1) : '—'} px</strong></div>
          <div>Firing origin: <strong>(${this.state.anchorX.toFixed(1)}, ${anchorY})</strong></div>`;
      }

      updateTas() {
        const panel = document.getElementById('tasPanel');
        if (!panel || !this.state) return;

        if (!this.state.runMode.startsWith('speedrun_')) {
          panel.hidden = true;
          return;
        }

        panel.hidden = false;

        const record = this.getTasRecord();
        const elapsed = this.currentElapsedMs();
        const splitRows = [];
        let totalBest = 0;

        for (let index = 0; index < Math.max(record.splits.length, record.bestSegments.length); index++) {
          const split = Number(record.splits[index]) || 0;
          const best = Number(record.bestSegments[index]) || 0;

          if (best > 0) totalBest += best;
          if (!split && !best) continue;

          const delta = split - best;
          const sign = delta > 0 ? '+' : delta < 0 ? '-' : '±';
          const deltaText = Math.abs(delta) ? `${sign}${this.formatTime(Math.abs(delta))}` : '±0.00';
          const css = delta > 0 ? 'tas-delta-slower' : delta < 0 ? 'tas-delta-faster' : '';

          splitRows.push(`
            <div class="tracker-row">
              <strong>Turn ${index + 1}</strong>
              <span>
                ${this.formatTime(split || 0)}
                <small class="${css}">${deltaText}</small>
              </span>
            </div>
          `);
        }

        document.getElementById('tasSummary').innerHTML = `
          <div class="tracker-row"><strong>Current total</strong><span>${this.formatTime(elapsed)}</span></div>
          <div class="tracker-row"><strong>Best segment total</strong><span>${totalBest ? this.formatTime(totalBest) : '—'}</span></div>
        `;

        document.getElementById('tasSegments').innerHTML = splitRows.length
          ? splitRows.join('')
          : '<p class="muted">Turn splits will appear after your first turn.</p>';
      }

      recordTasSegment() {
        if (!this.state || !this.state.runMode.startsWith('speedrun_')) return;

        const record = this.getTasRecord();
        const currentElapsed = this.currentElapsedMs();
        const segmentIndex = this.tasRun.segment || 0;

        const split = Math.max(0, currentElapsed - (this.tasRun.lastElapsed || 0));
        record.splits[segmentIndex] = split;

        if (!Number.isFinite(record.bestSegments[segmentIndex]) || split < record.bestSegments[segmentIndex]) {
          record.bestSegments[segmentIndex] = split;
        }

        this.tas[this.tasKey()] = record;
        this.tasRun.segment = segmentIndex + 1;
        this.tasRun.lastElapsed = currentElapsed;

        this.saveTas();
        this.updateTas();
      }

      shoot(angleDegrees = null) {
        const state = this.state;

        if (!state || state.paused || state.brickMoving || state.over || state.complete) return;
        if (state.turnInProgress || state.balls.some((ball) => ball.moving)) return;

        state.turnInProgress = true;

        const direction = this.getAimVector(angleDegrees);
        const dx = direction.x;
        const dy = direction.y;

        const speedMultiplier = state.runMode === 'hell'
          ? 1
          : (1 + (Number(state.permUpgrades.ballSpeed) || 0) * 0.1);

        const speed = 11 * speedMultiplier;

        state.balls = state.balls.slice(0, Math.max(1, state.ballCount));

        state.balls.forEach((ball, index) => {
          ball.x = state.anchorX;
          ball.y = BOTTOM_LINE - 20;
          ball.vx = dx * speed;
          ball.vy = dy * speed;
          ball.moving = true;
          ball.downing = false;
          ball.shocking = false;
          ball.delay = index;
        });

        this.stats.ballsFired += state.balls.length;
        this.saveStats();
        this.saveNow();
      }

      downBalls() {
        if (!this.state || this.state.paused || this.state.over || this.state.complete) return;

        let recalledAny = false;

        for (const ball of this.state.balls) {
          if (!ball.moving) continue;

          if (ball.delay > 0) {
            ball.moving = false;
            ball.downing = false;
            ball.shocking = false;
            ball.vx = 0;
            ball.vy = 0;
            ball.delay = 0;
            ball.x = this.state.anchorX;
            ball.y = BOTTOM_LINE - 20;
            continue;
          }

          ball.downing = true;
          ball.vx = 0;
          ball.vy = 12;
          recalledAny = true;
        }

        if (!recalledAny && this.state.turnInProgress && this.state.balls.every((ball) => !ball.moving)) {
          this.finishTurn();
        }
      }

      updateBricks(dt) {
        const state = this.state;
        let stillMoving = false;

        for (const brick of state.bricks) {
          if (brick.y < brick.targetY) {
            brick.y = Math.min(brick.y + 10 * dt, brick.targetY);
          } else if (brick.y > brick.targetY) {
            brick.y = Math.max(brick.y - 10 * dt, brick.targetY);
          }

          if (Math.abs(brick.y - brick.targetY) > .01) {
            stillMoving = true;
          }
        }

        if (state.runMode === 'hell' && !state.turnInProgress && !state.brickMoving) {
          for (const brick of state.bricks) {
            if (brick.type !== 'crawler') continue;

            const nextY = brick.y + 0.25 * dt;
            const blocked = state.bricks.some((other) => {
              if (other === brick) return false;
              const hOverlap = brick.x < other.x + other.w && brick.x + brick.w > other.x;
              const vOverlap = (nextY + brick.h > other.y) && (brick.y + brick.h <= other.y + 5);
              return hOverlap && vOverlap;
            });

            if (!blocked) {
              brick.y = nextY;
              brick.targetY = brick.y;
            }
          }
        }

        if (!state.brickMoving) {
          for (const brick of state.bricks) {
            if (brick.type !== 'slider') continue;

            const minX = 5;
            const maxX = WIDTH - 5 - brick.w;
            let nextX = brick.x + brick.slideDir * brick.slideSpeed * dt;
            let collision = null;

            if (nextX <= minX) {
              brick.x = minX;
              brick.slideDir = 1;
              continue;
            }

            if (nextX >= maxX) {
              brick.x = maxX;
              brick.slideDir = -1;
              continue;
            }

            for (const other of state.bricks) {
              if (other === brick) continue;

              const verticalOverlap =
                brick.y < other.y + other.h &&
                brick.y + brick.h > other.y;

              const horizontalOverlap =
                nextX < other.x + other.w &&
                nextX + brick.w > other.x;

              if (verticalOverlap && horizontalOverlap) {
                collision = other;
                break;
              }
            }

            if (collision) {
              if (brick.slideDir > 0) {
                brick.x = Math.max(minX, collision.x - brick.w);
                brick.slideDir = -1;
              } else {
                brick.x = Math.min(maxX, collision.x + collision.w);
                brick.slideDir = 1;
              }
            } else {
              brick.x = nextX;
            }
          }
        }

        if (state.brickMoving && !stillMoving) {
          state.brickMoving = false;
          state.bonusBalls = state.bonusBalls.filter((ball) => !ball.hit);
          this.resolveBrickOverlaps();
          this.renderUI();
          this.saveNow();
        }
      }

      updateBonusBalls(dt) {
        for (const bonus of this.state.bonusBalls) {
          if (!Number.isFinite(bonus.targetY)) bonus.targetY = bonus.y;
          if (bonus.y < bonus.targetY) {
            bonus.y = Math.min(bonus.y + 10 * dt, bonus.targetY);
          } else if (bonus.y > bonus.targetY) {
            bonus.y = Math.max(bonus.y - 10 * dt, bonus.targetY);
          }
        }
      }

      updateBalls(dt) {
        const state = this.state;
        const speedMultiplier = state.runMode === 'hell'
          ? 1
          : (1 + (Number(state.permUpgrades.ballSpeed) || 0) * 0.1);
        const baseSpeed = 11 * speedMultiplier;
        const subSteps = Math.max(1, Math.ceil(baseSpeed / 8));
        const magnetBricks = state.bricks.filter((b) => b.type === 'magnet');

        for (const ball of this.state.balls) {
          if (!ball.moving) continue;

          if (ball.delay > 0) {
            ball.delay -= dt;
            continue;
          }

          const stepDt = dt / subSteps;

          for (let step = 0; step < subSteps; step++) {
            if (!ball.moving) break;

            for (const mb of magnetBricks) {
              const mbCenterX = mb.x + mb.w / 2;
              const mbCenterY = mb.y + mb.h / 2;
              const dist = Math.hypot(mbCenterX - ball.x, mbCenterY - ball.y);
              if (dist < 180 && dist > 2) {
                const pullStrength = 0.15 * stepDt;
                ball.vx += (mbCenterX - ball.x) / dist * pullStrength;
                ball.vy += (mbCenterY - ball.y) / dist * pullStrength;
              }
            }

            ball.x += ball.vx * stepDt;
            ball.y += ball.vy * stepDt;

            if (ball.x < ball.radius) {
              ball.x = ball.radius;
              ball.vx = Math.abs(ball.vx);
            } else if (ball.x > WIDTH - ball.radius) {
              ball.x = WIDTH - ball.radius;
              ball.vx = -Math.abs(ball.vx);
            }

            if (ball.y < BALL_TOP) {
              ball.y = BALL_TOP;
              ball.vy = Math.abs(ball.vy);
            }

            if (ball.shocking) {
              ball.vx = 0;
              ball.vy = 16;
            } else if (!ball.downing) {
              this.checkBallBrickCollision(ball);
            }

            for (const bonus of state.bonusBalls) {
              if (!bonus.hit &&
                  Math.hypot(ball.x - bonus.x, ball.y - bonus.y) < ball.radius + bonus.r) {
                bonus.hit = true;
              }
            }

            if (ball.y >= BOTTOM_LINE - 20) {
              ball.y = BOTTOM_LINE - 20;
              ball.moving = false;
              ball.downing = false;
              ball.shocking = false;
              ball.vx = 0;
              ball.vy = 0;
              state.anchorX = ball.x;
            }
          }
        }

        if (state.turnInProgress &&
            state.balls.length &&
            state.balls.every((ball) => !ball.moving)) {
          this.finishTurn();
        }
      }

      checkBallBrickCollision(ball) {
        const shieldBricks = this.state.bricks.filter((b) => b.type === 'shield');

        for (const brick of [...this.state.bricks]) {
          if (!this.state.bricks.includes(brick)) continue;

          if (brick.type === 'phase' && brick.phase === 'liquid') {
            const closestX = clamp(ball.x, brick.x, brick.x + brick.w);
            const closestY = clamp(ball.y, brick.y, brick.y + brick.h);
            const dx = ball.x - closestX;
            const dy = ball.y - closestY;

            if (dx * dx + dy * dy <= ball.radius * ball.radius) {
              if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
              else ball.vy *= -1;
            }
            continue;
          }

          const closestX = clamp(ball.x, brick.x, brick.x + brick.w);
          const closestY = clamp(ball.y, brick.y, brick.y + brick.h);
          const dx = ball.x - closestX;
          const dy = ball.y - closestY;

          if (dx * dx + dy * dy > ball.radius * ball.radius) continue;

          if (brick.type !== 'shield') {
            const isProtected = shieldBricks.some((sb) => {
              const sbCenterX = sb.x + sb.w / 2;
              const sbCenterY = sb.y + sb.h / 2;
              const bCenterX = brick.x + brick.w / 2;
              const bCenterY = brick.y + brick.h / 2;
              return Math.hypot(sbCenterX - bCenterX, sbCenterY - bCenterY) <= 150;
            });

            if (isProtected) continue;
          }

          if (brick.type === 'directional' && brick.allowedDirs) {
            let hitDir = 'top';
            if (Math.abs(dx) > Math.abs(dy)) {
              hitDir = dx > 0 ? 'right' : 'left';
            } else {
              hitDir = dy > 0 ? 'bottom' : 'top';
            }

            if (!brick.allowedDirs.includes(hitDir)) {
              if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
              else ball.vy *= -1;
              continue;
            }
          }

          let damage = 1;

          if (this.state.runMode !== 'hell' &&
              !['hard', 'insane', 'asian'].includes(this.state.difficulty) &&
              this.state.buffs.doubleDamageTurns > 0) {
            damage = 1.5;
          }

          const critLevel = this.state.runMode === 'hell'
            ? 0
            : (Number(this.state.permUpgrades.critChance) || 0);

          if (critLevel && Math.random() < critLevel * .05) damage *= 3;

          brick.value = Math.max(0, brick.value - damage);
          this.stats.damageDealt += damage;

          if (brick.type === 'shock') {
            ball.shocking = true;
            ball.vx = 0;
            ball.vy = 16;
            this.addShockParticles(ball.x, ball.y);
          } else if (brick.type === 'portal') {
            const targetX = randomInt(40, WIDTH - 40);
            const targetY = randomInt(BRICK_START_Y + 120, BOTTOM_LINE - 120);

            this.addPortalParticles(ball.x, ball.y);
            ball.x = targetX;
            ball.y = targetY;
            this.addPortalParticles(ball.x, ball.y);
          } else {
            if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
            else ball.vy *= -1;
          }

          this.addCoins(1);

          if (brick.value <= 0) {
            this.breakBrick(brick);
          }

          this.saveStats();
          break;
        }
      }

      breakBrick(brick) {
        const index = this.state.bricks.indexOf(brick);
        if (index === -1) return;

        this.state.bricks.splice(index, 1);
        this.addBrickParticles(brick);
        this.stats.bricksBroken++;
        this.stats.bricksByType[brick.type] = (this.stats.bricksByType[brick.type] || 0) + 1;

        this.addCoins(5);

        if (this.state.runMode !== 'hell' && Math.random() < 0.25) {
          this.addGems(1);
        }

        if (brick.type === 'ammo') {
          this.state.pendingAmmo++;
        }

        if (brick.type === 'parent') {
          const childCount = randomInt(1, 3);
          const childHp = Math.max(1, Math.round(this.state.level / 3));
          for (let i = 0; i < childCount; i++) {
            const randomCol = randomInt(0, 5);
            this.state.bricks.push({
              x: randomCol * 120 + 5,
              y: brick.y,
              targetY: brick.targetY,
              w: 110,
              h: 70,
              value: childHp,
              type: 'normal',
              slideDir: 1,
              slideSpeed: 1.5
            });
          }
          this.resolveBrickOverlaps();
        }

        if (brick.type === 'tnt') {
          this.addExplosion(brick);

          const nearby = [...this.state.bricks].filter((other) =>
            Math.hypot(
              (other.x + other.w / 2) - (brick.x + brick.w / 2),
              (other.y + other.h / 2) - (brick.y + brick.h / 2)
            ) <= 180
          );

          for (const other of nearby) {
            if (!this.state.bricks.includes(other)) continue;
            const dmg = Math.ceil(this.state.level * .8);
            other.value = Math.max(0, other.value - dmg);
            this.stats.damageDealt += dmg;

            if (other.value <= 0) {
              this.breakBrick(other);
            }
          }
        }

        this.saveStats();
        this.renderUI();
      }

      triggerOverlordSpell() {
        const spells = [
          {
            dialogue: '"Feel the scorching heat! Your bricks shall heal and harden!"',
            action: () => {
              for (const b of this.state.bricks) {
                b.value = Math.round(b.value * 1.2 + 2);
              }
            }
          },
          {
            dialogue: '"Darkness multiplies! A Devil spawns from the abyss!"',
            action: () => {
              const col = randomInt(0, 5);
              const isHell = (this.state.runMode === 'hell');
              let val = Math.max(1, Math.round(this.state.level * 0.8));
              if (isHell) val = Math.round(val * 2.5);

              this.state.bricks.push({
                x: col * 120 + 5,
                y: BRICK_START_Y,
                targetY: BRICK_START_Y,
                w: 110,
                h: 70,
                value: val,
                type: 'devil',
                slideDir: 1,
                slideSpeed: 1.5
              });
              this.resolveBrickOverlaps();
            }
          },
          {
            dialogue: '"A crawler shall press upon your doom!"',
            action: () => {
              const col = randomInt(0, 5);
              const isHell = (this.state.runMode === 'hell');
              let val = Math.max(1, Math.round(this.state.level * 0.8));
              if (isHell) val = Math.round(val * 2.5);

              this.state.bricks.push({
                x: col * 120 + 5,
                y: BRICK_START_Y,
                targetY: BRICK_START_Y,
                w: 110,
                h: 70,
                value: val,
                type: 'crawler',
                slideDir: 1,
                slideSpeed: 1.5
              });
              this.resolveBrickOverlaps();
            }
          },
          {
            dialogue: '"Perish in sulfur! Your balls shall falter and slow!"',
            action: () => {
              for (const ball of this.state.balls) {
                ball.vx *= 0.8;
                ball.vy *= 0.8;
              }
            }
          }
        ];

        const chosen = spells[Math.floor(Math.random() * spells.length)];
        this.state.overlordDialogue = chosen.dialogue;
        chosen.action();
      }

      spawnDevilTank(devilBrick) {
        if (this.state.bricks.filter((brick) => brick.type === 'tank').length >= 3) return;

        const rowSpacing = 80;
        const maxRowsAbove = Math.max(1, Math.floor((devilBrick.y - BRICK_START_Y) / rowSpacing));
        const rowOffset = randomInt(1, maxRowsAbove);

        const targetY = devilBrick.y - rowOffset * rowSpacing;
        if (targetY < BRICK_START_Y) return;

        const candidate = {
          x: randomInt(0, 5) * 120 + 5,
          y: targetY,
          targetY,
          w: 110,
          h: 70,
          value: Math.max(5, Math.round(this.state.level * 5 * 2.5)),
          type: 'tank',
          slideDir: 1,
          slideSpeed: 1.5
        };

        if (!this.state.bricks.some((other) => overlap(candidate, other))) {
          this.state.bricks.push(candidate);
        }
      }

      finishTurn() {
        const state = this.state;
        if (!state.turnInProgress || state.paused || state.over || state.complete) return;

        state.turnInProgress = false;
        state.brickMoving = true;

        if (state.runMode === 'hell') {
          state.overlordTimer++;
          if (state.overlordTimer >= 2) {
            state.overlordTimer = 0;
            this.triggerOverlordSpell();
          }

          const devilBricks = state.bricks.filter((b) => b.type === 'devil');
          for (const db of devilBricks) {
            this.spawnDevilTank(db);
          }
        }

        if (state.runMode !== 'hell' &&
            !['hard', 'insane', 'asian'].includes(state.difficulty) &&
            state.buffs.doubleDamageTurns > 0) {
          state.buffs.doubleDamageTurns--;
        }

        const newLevel = state.level + 1;
        state.level = newLevel;
        state.secLevel.set(newLevel);
        state.bestLevel = Math.max(Number(state.bestLevel) || 1, state.level);

        this.stats.turnsSurvived++;
        this.saveStats();

        this.addCoins(10);

        for (const brick of state.bricks) {
          brick.targetY += 80;
          if (brick.type === 'phase') {
            brick.phase = brick.phase === 'solid' ? 'liquid' : 'solid';
          }
        }

        const healerBricks = state.bricks.filter((b) => b.type === 'healer');
        for (const hb of healerBricks) {
          const hbCenterX = hb.x + hb.w / 2;
          const hbCenterY = hb.y + hb.h / 2;

          for (const other of state.bricks) {
            if (other === hb) continue;
            const oCenterX = other.x + other.w / 2;
            const oCenterY = other.y + other.h / 2;
            if (Math.hypot(hbCenterX - oCenterX, hbCenterY - oCenterY) <= 180) {
              other.value = Math.round(other.value * 1.25);
            }
          }
        }

        const angelBricks = state.bricks.filter((b) => b.type === 'angel');
        for (const ab of angelBricks) {
          ab.value = 1;
          const abCenterX = ab.x + ab.w / 2;
          const abCenterY = ab.y + ab.h / 2;

          for (const other of state.bricks) {
            if (other === ab) continue;
            const oCenterX = other.x + other.w / 2;
            const oCenterY = other.y + other.h / 2;
            if (Math.hypot(abCenterX - oCenterX, abCenterY - oCenterY) <= 180) {
              const dmg = Math.max(1, Math.round(other.value * 0.25));
              other.value = Math.max(0, other.value - dmg);
              this.stats.damageDealt += dmg;

              if (other.value <= 0) {
                this.breakBrick(other);
              }
            }
          }
        }

        const turretBricks = state.bricks.filter((b) => b.type === 'turret');
        for (const tb of turretBricks) {
          tb.value = 1;
          const targets = shuffle(state.bricks.filter((b) => b !== tb)).slice(0, 3);
          for (const t of targets) {
            const dmg = Math.max(1, Math.round(t.value * 0.25));
            t.value = Math.max(0, t.value - dmg);
            this.stats.damageDealt += dmg;

            if (t.value <= 0) {
              this.breakBrick(t);
            }
          }
        }

        const teleportBricks = state.bricks.filter((b) => b.type === 'teleport');
        for (const tb of teleportBricks) {
          const newCol = randomInt(0, 5);
          tb.x = newCol * 120 + 5;
          this.addPortalParticles(tb.x + tb.w / 2, tb.targetY + tb.h / 2);
        }

        for (const bonus of state.bonusBalls) {
          if (bonus.hit) continue;
          bonus.targetY = (Number.isFinite(bonus.targetY) ? bonus.targetY : bonus.y) + 80;
        }

        const bottomLimit = BOTTOM_LINE - 90;
        if (state.bricks.some((brick) => brick.targetY >= bottomLimit || brick.y >= bottomLimit)) {
          this.endRun(false);
          return;
        }

        if (state.runMode === 'infinite') {
          this.storage.recordInfinite(state.level, false);
        } else if (state.runMode === 'hell') {
          this.storage.recordInfinite(state.level, true);
        } else if (state.level >= state.target) {
          this.recordTasSegment();
          this.endRun(true);
          return;
        }

        this.recordTasSegment();

        const caughtBonusBalls = state.bonusBalls.filter((bonus) => bonus.hit).length;
        state.bonusBalls = state.bonusBalls.filter((bonus) => !bonus.hit);

        const extraBalls = caughtBonusBalls + state.pendingAmmo;
        state.pendingAmmo = 0;

        if (extraBalls > 0) {
          const newBallCount = state.ballCount + extraBalls;
          state.ballCount = newBallCount;
          state.secBallCount.set(newBallCount);
        }

        state.balls = Array.from({ length: state.ballCount }, () =>
          makeBall(state.anchorX, BOTTOM_LINE - 20)
        );

        this.spawnRow(true);
        this.resolveBrickOverlaps();
        this.renderUI();
        this.saveNow();
      }

      addBrickParticles(brick) {
        const color = brickColor(brick.type, brick.value);
        for (let i = 0; i < 16; i++) {
          this.effects.push({
            type: 'particle',
            x: brick.x + Math.random() * brick.w,
            y: brick.y + Math.random() * brick.h,
            vx: (Math.random() - .5) * 5,
            vy: Math.random() * -4 - 1,
            life: 45 + Math.random() * 20,
            color,
            size: 4 + Math.random() * 5
          });
        }
      }

      addPortalParticles(x, y) {
        for (let i = 0; i < 12; i++) {
          this.effects.push({
            type: 'particle',
            x, y,
            vx: (Math.random() - .5) * 6,
            vy: (Math.random() - .5) * 6,
            life: 25 + Math.random() * 15,
            color: '#805ad5',
            size: 5
          });
        }
      }

      addShockParticles(x, y) {
        for (let i = 0; i < 12; i++) {
          this.effects.push({
            type: 'particle',
            x, y,
            vx: (Math.random() - .5) * 8,
            vy: Math.random() * 4,
            life: 20 + Math.random() * 15,
            color: '#dd6b20',
            size: 6
          });
        }
      }

      addExplosion(brick) {
        this.effects.push({
          type: 'explosion',
          x: brick.x + brick.w / 2,
          y: brick.y + brick.h / 2,
          radius: 12,
          life: 18
        });
      }

      updateEffects(dt) {
        for (const effect of this.effects) {
          effect.life -= dt;

          if (effect.type === 'particle') {
            effect.x += effect.vx * dt;
            effect.y += effect.vy * dt;
            effect.vy += .15 * dt;
          } else {
            effect.radius += 7 * dt;
          }
        }

        this.effects = this.effects.filter((effect) => effect.life > 0);
      }

      drawEffects() {
        for (const effect of this.effects) {
          ctx.save();

          if (effect.type === 'particle') {
            ctx.globalAlpha = Math.min(1, effect.life / 50);
            ctx.fillStyle = effect.color;
            ctx.fillRect(effect.x, effect.y, effect.size, effect.size);
          } else {
            ctx.globalAlpha = Math.min(1, effect.life / 18);
            ctx.beginPath();
            ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 69, 0, .25)';
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 4;
            ctx.fill();
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      endRun(won) {
        const state = this.state;
        if (state.over || state.complete) return;

        state.elapsedMs = this.currentElapsedMs();
        state.runStartedAt = null;
        state.paused = true;
        state.turnInProgress = false;
        state.brickMoving = false;

        if (won) {
          state.complete = true;
          this.storage.recordSpeedrun(state.runMode, state.difficulty, state.elapsedMs);
          this.storage.clearRun();
        } else {
          state.over = true;

          if (state.runMode === 'infinite') {
            this.storage.addScore(state.level, 'Infinite');
          } else if (state.runMode === 'hell') {
            this.storage.addScore(state.level, 'Hell Mode');
          }

          this.storage.clearRun();
        }

        this.renderUI();
        this.renderLeaderboard();
        this.renderModeTracker();
        this.updateTas();
      }

      checkBottom() {
        if (this.state.bricks.some((brick) =>
          Math.max(brick.y, brick.targetY) + brick.h >= BOTTOM_LINE - 20
        )) {
          this.endRun(false);
        }
      }

      loop(timestamp) {
        const dt = this.lastFrame
          ? Math.min((timestamp - this.lastFrame) / 16.67, 2)
          : 1;

        this.lastFrame = timestamp;

        try {
          this.draw();

          if (this.state && !this.state.paused && !this.state.over && !this.state.complete) {
            this.verifyTripleVars();
            this.updateBricks(dt);
            this.updateBonusBalls(dt);
            this.updateBalls(dt);
            this.updateEffects(dt);
            this.checkBottom();

            this.saveTimer += dt;
            if (this.saveTimer >= 60) {
              this.saveTimer = 0;
              this.saveNow();
            }

            this.updateTimerDisplay();
            this.updateAnalysis();
            this.updateTas();
          } else {
            this.updateEffects(dt);
          }
        } catch (error) {
          console.error('Brick Breaker update error:', error);
        } finally {
          requestAnimationFrame((time) => this.loop(time));
        }
      }

      draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const state = this.state;
        if (!state) return;

        const isHell = (state.runMode === 'hell');

        ctx.strokeStyle = isHell ? '#741d1d' : '#222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, TOP_LINE);
        ctx.lineTo(WIDTH, TOP_LINE);
        ctx.moveTo(0, BOTTOM_LINE);
        ctx.lineTo(WIDTH, BOTTOM_LINE);
        ctx.stroke();

        ctx.fillStyle = isHell ? '#feb2b2' : '#171717';
        ctx.font = "700 20px Poppins, sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Level: ${state.level}`, 18, 40);

        ctx.textAlign = 'center';
        ctx.fillStyle = isHell ? '#fc8181' : '#2b6cb0';
        ctx.font = "700 16px Poppins, sans-serif";
        ctx.fillText(`${this.modeLabel(state.runMode)} (${state.difficulty.toUpperCase()})`, WIDTH / 2, 40);

        ctx.textAlign = 'right';
        ctx.fillStyle = isHell ? '#f6e05e' : '#d69e2e';
        ctx.font = "700 20px Poppins, sans-serif";
        ctx.fillText(`Balls: ${state.ballCount}`, WIDTH - 18, 40);

        const shieldBricks = state.bricks.filter((b) => b.type === 'shield');

        for (const sb of shieldBricks) {
          const sbCenterX = sb.x + sb.w / 2;
          const sbCenterY = sb.y + sb.h / 2;

          ctx.save();
          ctx.beginPath();
          ctx.arc(sbCenterX, sbCenterY, 150, 0, Math.PI * 2);
          ctx.fillStyle = isHell ? 'rgba(155, 44, 44, 0.15)' : 'rgba(49, 151, 149, 0.12)';
          ctx.fill();
          ctx.strokeStyle = isHell ? 'rgba(252, 129, 129, 0.4)' : 'rgba(49, 151, 149, 0.4)';
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();
        }

        for (const brick of state.bricks) {
          this.drawBrick(brick, shieldBricks);
        }

        for (const bonus of state.bonusBalls) {
          if (bonus.hit) continue;
          ctx.beginPath();
          ctx.fillStyle = isHell ? '#ff6b6b' : '#3dd462';
          ctx.arc(bonus.x, bonus.y, bonus.r, 0, Math.PI * 2);
          ctx.fill();
        }

        for (const ball of state.balls) {
          ctx.beginPath();
          ctx.fillStyle = ball.shocking ? '#dd6b20' : (isHell ? '#fc8181' : (state.buffs.doubleDamageTurns > 0 ? '#e53e3e' : '#5ba7f4'));
          ctx.arc(ball.x, ball.y, ball.radius || 16, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!state.turnInProgress && !state.brickMoving && !state.paused &&
            !state.over && !state.complete) {
          const input = document.getElementById('analysisAngleInput');
          const useManual = document.activeElement === input && Number.isFinite(Number(input.value));
          const angleDegrees = useManual ? Number(input.value) : null;
          const path = this.predictAimPath(angleDegrees);
          const shownAngle = useManual ? Number(input.value) : this.getMouseAimAngle() * 180 / Math.PI;

          ctx.save();
          ctx.strokeStyle = isHell ? '#feb2b2' : '#777';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 8]);

          ctx.beginPath();
          if (path.length > 0) {
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
              ctx.lineTo(path[i].x, path[i].y);
            }
          }
          ctx.stroke();

          ctx.setLineDash([]);
          ctx.fillStyle = isHell ? '#fff' : '#222';
          ctx.font = "700 14px Poppins, sans-serif";
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(`Aim: ${shownAngle.toFixed(1)}°`, 18, BOTTOM_LINE + 35);

          ctx.font = "700 17px Poppins, sans-serif";
          ctx.textAlign = 'center';
          ctx.fillText(`x${state.ballCount}`, state.anchorX, HEIGHT - 25);
          ctx.restore();
        }

        if (state.paused && !state.over && !state.complete) {
          ctx.fillStyle = isHell ? '#2d0a0ae6' : '#0005';
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.font = "700 30px Poppins, sans-serif";
          ctx.fillText('PAUSED', WIDTH / 2, HEIGHT / 2);
        }

        if (state.over || state.complete) {
          ctx.fillStyle = isHell ? '#2d0a0af2' : '#0009';
          ctx.fillRect(0, HEIGHT / 2 - 100, WIDTH, 200);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = "700 36px Poppins, sans-serif";

          ctx.fillText(
            state.complete ? `SPEEDRUN ${state.target} CLEAR!` : (isHell ? 'HELL CONSUMED YOU' : 'GAME OVER'),
            WIDTH / 2,
            HEIGHT / 2 - 18
          );

          ctx.font = "600 21px Poppins, sans-serif";
          ctx.fillText(
            state.complete ? `${this.formatTime(state.elapsedMs)} [${state.difficulty.toUpperCase()}]` : `Level ${state.level}`,
            WIDTH / 2,
            HEIGHT / 2 + 32
          );
        }

        this.drawEffects();
      }

      drawBrick(brick, shieldBricks = []) {
        ctx.save();

        const pulse = (Math.sin(Date.now() / 120) + 1) / 2;
        const isLiquid = (brick.type !== 'shield' && shieldBricks.some(sb => {
          const sbCenterX = sb.x + sb.w / 2;
          const sbCenterY = sb.y + sb.h / 2;
          const bCenterX = brick.x + brick.w / 2;
          const bCenterY = brick.y + brick.h / 2;
          return Math.hypot(sbCenterX - bCenterX, sbCenterY - bCenterY) <= 150;
        })) || (brick.type === 'phase' && brick.phase === 'liquid');

        if (isLiquid) {
          ctx.globalAlpha = 0.45;
        }

        ctx.fillStyle = brickColor(brick.type, brick.value);
        ctx.beginPath();

        if (ctx.roundRect) ctx.roundRect(brick.x, brick.y, brick.w, brick.h, 10);
        else ctx.rect(brick.x, brick.y, brick.w, brick.h);

        ctx.fill();
        ctx.lineWidth = 2;
        ctx.setLineDash([]);

        if (brick.type === 'tnt') {
          ctx.lineWidth = 3 + pulse * 3;
          ctx.strokeStyle = `rgb(255, ${Math.floor(100 + pulse * 155)}, 100)`;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
        } else if (brick.type === 'ammo') {
          ctx.strokeStyle = '#fff';
          ctx.stroke();
        } else if (brick.type === 'portal') {
          ctx.strokeStyle = '#e9d8fd';
          ctx.lineWidth = 4;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
        } else if (brick.type === 'teleport') {
          ctx.strokeStyle = '#90cdf4';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (brick.type === 'slider') {
          ctx.strokeStyle = '#e0fbfc';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (brick.type === 'shock') {
          ctx.strokeStyle = '#ffc078';
          ctx.lineWidth = 4;
          ctx.setLineDash([6, 4]);
          ctx.stroke();
        } else if (brick.type === 'shield') {
          ctx.strokeStyle = '#81e6d9';
          ctx.lineWidth = 4;
          ctx.stroke();
        } else if (brick.type === 'parent') {
          ctx.strokeStyle = '#f6ad55';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (brick.type === 'healer') {
          ctx.strokeStyle = '#68d391';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (brick.type === 'tank') {
          ctx.strokeStyle = '#1a202c';
          ctx.lineWidth = 4;
          ctx.stroke();
        } else if (brick.type === 'angel') {
          ctx.strokeStyle = '#fbb6ce';
          ctx.lineWidth = 3;
          ctx.setLineDash([2, 2]);
          ctx.stroke();
        } else if (brick.type === 'turret') {
          ctx.strokeStyle = '#cbd5e0';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (brick.type === 'directional') {
          const allowed = brick.allowedDirs || ['top', 'bottom'];
          const colorMap = {
            top: '#ffd166',
            bottom: '#38bdf8',
            left: '#c084fc',
            right: '#f472b6'
          };

          ctx.save();
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 3;
          ctx.stroke();

          for (const side of allowed) {
            const pad = 4;
            if (side === 'top') {
              ctx.strokeStyle = colorMap.top;
              ctx.beginPath();
              ctx.moveTo(brick.x + pad, brick.y + pad);
              ctx.lineTo(brick.x + brick.w - pad, brick.y + pad);
              ctx.stroke();
            } else if (side === 'bottom') {
              ctx.strokeStyle = colorMap.bottom;
              ctx.beginPath();
              ctx.moveTo(brick.x + pad, brick.y + brick.h - pad);
              ctx.lineTo(brick.x + brick.w - pad, brick.y + brick.h - pad);
              ctx.stroke();
            } else if (side === 'left') {
              ctx.strokeStyle = colorMap.left;
              ctx.beginPath();
              ctx.moveTo(brick.x + pad, brick.y + pad);
              ctx.lineTo(brick.x + pad, brick.y + brick.h - pad);
              ctx.stroke();
            } else if (side === 'right') {
              ctx.strokeStyle = colorMap.right;
              ctx.beginPath();
              ctx.moveTo(brick.x + brick.w - pad, brick.y + pad);
              ctx.lineTo(brick.x + brick.w - pad, brick.y + brick.h - pad);
              ctx.stroke();
            }
          }
          ctx.restore();
        } else if (brick.type === 'phase') {
          ctx.strokeStyle = '#9edebe';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (brick.type === 'magnet') {
          ctx.strokeStyle = '#e9d8fd';
          ctx.lineWidth = 3;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
        } else if (brick.type === 'crawler') {
          ctx.strokeStyle = '#ff8533';
          ctx.lineWidth = 3 + pulse * 2;
          ctx.setLineDash([4, 2]);
          ctx.stroke();
        } else if (brick.type === 'devil') {
          ctx.strokeStyle = '#ff4d4d';
          ctx.lineWidth = 4;
          ctx.stroke();
        } else {
          ctx.strokeStyle = '#111';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.setLineDash([]);
        ctx.fillStyle = '#fff';
        ctx.font = "700 22px Poppins, sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let label = String(Math.ceil(brick.value));
        ctx.fillText(label, brick.x + brick.w / 2, brick.y + brick.h / 2);

        if (isLiquid) {
          ctx.strokeStyle = '#319795';
          ctx.lineWidth = 3;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(brick.x - 2, brick.y - 2, brick.w + 4, brick.h + 4);
        }

        ctx.restore();
      }
    }

    gameManager = new GameManager();
  
