
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
    const SPEEDRUN_TARGETS = [25, 50, 100, 250, 500];
    const DIFFICULTIES = ['easy', 'medium', 'hard', 'insane', 'asian'];

    const CRYPTO_KEY = "BB_V12_SECURE_SALT_99823";

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
        let dataStr = atob(cipherB64);
        let res = '';
        for (let i = 0; i < dataStr.length; i++) {
          res += String.fromCharCode(dataStr.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return res;
      } catch (e) {
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
          console.warn("Anti-cheat validation mismatch! Restoring valid lower bound.");
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
          const jsonStr = JSON.stringify(value);
          const encrypted = xorEncryptDecrypt(jsonStr);
          localStorage.setItem(key, encrypted);
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

      clearRun() {
        try { localStorage.removeItem(SAVE_KEY); } catch {}
      }

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

        this.bindEvents();
        this.loadInitialState();
        this.renderUI();
        this.renderLeaderboard();
        this.renderModeTracker();
        this.updateTimerDisplay();

        requestAnimationFrame((time) => this.loop(time));
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
        });

        canvas.addEventListener('pointerdown', () => this.shoot());

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

        this.state.permUpgrades = mode === 'hell' ? { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 } : { ...meta.permUpgrades, ...(raw.permUpgrades || {}) };
        this.state.buffs = {
          doubleDamageTurns: Number(raw.buffs?.doubleDamageTurns) || 0
        };
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

        this.updateThemeClass();

        this.state.bricks = (saved.bricks || []).map((brick) => {
          const restored = { ...brick };
          restored.targetY = Number.isFinite(restored.targetY)
            ? restored.targetY
            : restored.y;
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

        this.state.anchorX = clamp(Number(raw.anchorX) || WIDTH / 2, 20, WIDTH - 20);

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

        label.textContent = (this.state.runMode === 'infinite' || this.state.runMode === 'hell')
          ? `${this.modeLabel(this.state.runMode)} Time`
          : `${this.modeLabel(this.state.runMode)} Time`;

        timer.textContent = (this.state.runMode === 'infinite' || this.state.runMode === 'hell')
          ? '—'
          : this.formatTime(this.currentElapsedMs());
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
          version: 12,
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

        this.updateThemeClass();
        this.spawnRow(false);
        closeModal('modeSelectModal');
        this.saveNow();
        this.renderUI();
      }

      exportSaveFile() {
        this.saveNow();
        const run = this.storage.getRun();

        const rawData = JSON.stringify({
          meta: this.storage.getMeta(),
          scores: this.storage.getScores(),
          modeRecords: this.storage.getModeRecords(),
          speedrunRecords: this.storage.getSpeedrunRecords(),
          game: run
        });

        const encryptedStr = xorEncryptDecrypt(rawData);

        const blob = new Blob([encryptedStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `brick_breaker_v12_${this.state?.runMode || 'save'}_level_${this.state?.level || 1}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }

      importSaveFile(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
          try {
            let dataStr = reader.result;
            let data;

            try {
              data = JSON.parse(dataStr);
            } catch {
              const decrypted = xorDecrypt(dataStr);
              if (decrypted) data = JSON.parse(decrypted);
            }

            if (!data || (!data.meta && !data.game)) throw new Error('Invalid save format');

            if (data.meta) this.storage.saveMeta(data.meta);
            if (data.scores && Array.isArray(data.scores)) this.storage.saveScores(data.scores);
            if (data.modeRecords) this.storage.saveModeRecords(data.modeRecords);
            if (data.speedrunRecords) this.storage.saveSpeedrunRecords(data.speedrunRecords);

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
            alert('Save data and leaderboards loaded successfully!');
          } catch {
            alert('Could not load that save file (Corrupted or Invalid Encrypted Save).');
          }

          event.target.value = '';
        };

        reader.readAsText(file);
      }

      wipeAllData() {
        if (confirm('Are you sure you want to wipe all data? This will permanently delete your active run, upgrades, high scores, and speedrun records.')) {
          const keysToRemove = [SAVE_KEY, META_KEY, SCORES_KEY, MODES_KEY, SPEEDRUNS_KEY];
          keysToRemove.forEach((key) => {
            try { localStorage.removeItem(key); } catch {}
          });
          
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
        }
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
            if (hellRoll < 0.20) type = 'crawler';
            else if (hellRoll < 0.35) type = 'devil';
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
          else if (type === 'angel' || type === 'turret' || type === 'crawler' || type === 'devil') value = Math.max(1, Math.round(value * 0.8));
          else if (['shield', 'shock', 'portal', 'teleport', 'parent', 'healer', 'directional', 'phase', 'magnet'].includes(type)) {
            value = Math.max(1, Math.round(value * 0.8));
          }

          if (isHell) {
            value = Math.max(1, Math.round(value * 2.5));
          }

          let extraProps = {};
          if (type === 'directional') {
            const possibleDirs = ['top', 'bottom', 'left', 'right'];
            shuffle(possibleDirs);
            extraProps.allowedDirs = [possibleDirs[0], possibleDirs[1]];
          }

          if (type === 'phase') {
            extraProps.phase = Math.random() < 0.5 ? 'solid' : 'liquid';
          }

          this.state.bricks.push({
            x: col * 120 + 5,
            y: spawnY,
            targetY,
            w: 110,
            h: 70,
            value,
            type,
            slideDir: Math.random() < .5 ? -1 : 1,
            slideSpeed: 1.5 + Math.random(),
            ...extraProps
          });
        }

        const freeColumns = [0, 1, 2, 3, 4, 5].filter((column) => !columns.includes(column));

        if (freeColumns.length && Math.random() < .75) {
          const column = freeColumns[Math.floor(Math.random() * freeColumns.length)];
          this.state.bonusBalls.push({
            x: column * 120 + 60,
            y: spawnY + 35,
            targetY: targetY + 35,
            r: 14,
            hit: false
          });
        }
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
        const luck = this.state.runMode === 'hell' ? 0 : (Number(this.state.permUpgrades.luck) || 0);
        const current = this.state.secCoins.get();
        const updated = Math.max(0, current + Math.round(amount * (1 + luck * .2)));
        this.state.coins = updated;
        this.state.secCoins.set(updated);
        this.persistMeta();
        this.renderUI();
      }

      addGems(amount) {
        if (this.state.runMode === 'hell') return;
        const current = this.state.secGems.get();
        const updated = Math.max(0, current + amount);
        this.state.gems = updated;
        this.state.secGems.set(updated);
        this.persistMeta();
        this.renderUI();
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
        if (type === 'doubleDamage') {
          return Math.round(30 * Math.pow(1.25, purchases));
        } else if (type === 'laserWipe') {
          return Math.round(40 * Math.pow(1.3, purchases));
        }
        return 50;
      }

      buyPermUpgrade(type) {
        if (this.state.runMode === 'hell') return;
        const config = {
          startAmmo: { max: 10, base: 5, status: 'permAmmoStatus', button: 'btnBuyPermAmmo' },
          critChance: { max: 10, base: 6, status: 'permCritStatus', button: 'btnBuyPermCrit' },
          ballSpeed: { max: 5, base: 8, status: 'permSpeedStatus', button: 'btnBuyPermSpeed' },
          luck: { max: 5, base: 10, status: 'permLuckStatus', button: 'btnBuyPermLuck' }
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
          return;
        }

        body.innerHTML = scores.map((entry, index) =>
          `<tr><td>${index + 1}</td><td>${entry.mode || 'Infinite'}: Level ${Number(entry.score) || 0}</td><td>${entry.date || ''}</td></tr>`
        ).join('');
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

        this.updateTimerDisplay();
        this.renderModeTracker();
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
            if (brick.type === 'crawler') {
              const nextY = brick.y + 0.25 * dt;
              const isBlocked = state.bricks.some(other => {
                if (other === brick) return false;
                const hOverlap = brick.x < other.x + other.w && brick.x + brick.w > other.x;
                const vOverlap = (nextY + brick.h > other.y) && (brick.y + brick.h <= other.y + 5);
                return hOverlap && vOverlap;
              });

              if (!isBlocked) {
                brick.y = nextY;
                brick.targetY = brick.y;
              }
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

      shoot() {
        const state = this.state;

        if (!state || state.paused || state.brickMoving || state.over || state.complete) return;
        if (state.turnInProgress || state.balls.some((ball) => ball.moving)) return;

        state.turnInProgress = true;

        const anchorY = BOTTOM_LINE - 20;
        const targetX = this.mouse.x;
        const targetY = Math.min(this.mouse.y, BOTTOM_LINE - 80);
        let dx = targetX - state.anchorX;
        let dy = targetY - anchorY;
        const magnitude = Math.hypot(dx, dy) || 1;

        if (dy > -40) dy = -40;
        dx /= magnitude;
        dy /= magnitude;

        const speedMultiplier = state.runMode === 'hell' ? 1 : (1 + (Number(state.permUpgrades.ballSpeed) || 0) * .1);
        const speed = 11 * speedMultiplier;

        state.balls = state.balls.slice(0, Math.max(1, state.ballCount));

        state.balls.forEach((ball, index) => {
          ball.x = state.anchorX;
          ball.y = anchorY;
          ball.vx = dx * speed;
          ball.vy = dy * speed;
          ball.moving = true;
          ball.downing = false;
          ball.shocking = false;
          ball.delay = index;
        });

        this.saveNow();
      }

      downBalls() {
        if (!this.state || this.state.paused || this.state.over || this.state.complete) return;

        for (const ball of this.state.balls) {
          if (!ball.moving) continue;
          ball.downing = true;
          ball.vx = 0;
          ball.vy = 12;
        }
      }

      updateBalls(dt) {
        const state = this.state;
        const speedMultiplier = state.runMode === 'hell' ? 1 : (1 + (Number(state.permUpgrades.ballSpeed) || 0) * .1);
        const baseSpeed = 11 * speedMultiplier;
        const subSteps = Math.max(1, Math.ceil(baseSpeed / 8));

        const magnetBricks = state.bricks.filter(b => b.type === 'magnet');

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
        const shieldBricks = this.state.bricks.filter(b => b.type === 'shield');

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
            const isProtected = shieldBricks.some(sb => {
              const sbCenterX = sb.x + sb.w / 2;
              const sbCenterY = sb.y + sb.h / 2;
              const bCenterX = brick.x + brick.w / 2;
              const bCenterY = brick.y + brick.h / 2;
              return Math.hypot(sbCenterX - bCenterX, sbCenterY - bCenterY) <= 150;
            });

            if (isProtected) {
              continue;
            }
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

          if (this.state.runMode !== 'hell' && !['hard', 'insane', 'asian'].includes(this.state.difficulty) &&
              this.state.buffs.doubleDamageTurns > 0) {
            damage = 1.5;
          }

          const critLevel = this.state.runMode === 'hell' ? 0 : (Number(this.state.permUpgrades.critChance) || 0);
          if (critLevel && Math.random() < critLevel * .05) damage *= 3;

          brick.value = Math.max(0, brick.value - damage);

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

          break;
        }
      }

      breakBrick(brick) {
        const index = this.state.bricks.indexOf(brick);
        if (index === -1) return;

        this.state.bricks.splice(index, 1);
        this.addBrickParticles(brick);
        this.addCoins(5);

        if (this.state.runMode !== 'hell' && Math.random() < .25) {
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

            other.value = Math.max(
              0,
              other.value - Math.ceil(this.state.level * .8)
            );

            if (other.value <= 0) {
              this.breakBrick(other);
            }
          }
        }

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

          const devilBricks = state.bricks.filter(b => b.type === 'devil');
          for (const db of devilBricks) {
            const col = Math.floor(db.x / 120);
            const tankHp = Math.max(5, Math.round(state.level * 5 * 2.5));
            state.bricks.push({
              x: col * 120 + 5,
              y: db.y - 80,
              targetY: db.y - 80,
              w: 110,
              h: 70,
              value: tankHp,
              type: 'tank',
              slideDir: 1,
              slideSpeed: 1.5
            });
          }
        }

        if (state.runMode !== 'hell' && !['hard', 'insane', 'asian'].includes(state.difficulty) &&
            state.buffs.doubleDamageTurns > 0) {
          state.buffs.doubleDamageTurns--;
        }

        const newLevel = state.level + 1;
        state.level = newLevel;
        state.secLevel.set(newLevel);
        state.bestLevel = Math.max(Number(state.bestLevel) || 1, state.level);

        this.addCoins(10);

        for (const brick of state.bricks) {
          brick.targetY += 80;

          if (brick.type === 'phase') {
            brick.phase = brick.phase === 'solid' ? 'liquid' : 'solid';
          }
        }

        const healerBricks = state.bricks.filter(b => b.type === 'healer');
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

        const angelBricks = state.bricks.filter(b => b.type === 'angel');
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
              if (other.value <= 0) {
                this.breakBrick(other);
              }
            }
          }
        }

        const turretBricks = state.bricks.filter(b => b.type === 'turret');
        for (const tb of turretBricks) {
          tb.value = 1;
          const potentialTargets = state.bricks.filter(b => b !== tb);
          shuffle(potentialTargets);
          const targets = potentialTargets.slice(0, 3);
          for (const t of targets) {
            const dmg = Math.max(1, Math.round(t.value * 0.25));
            t.value = Math.max(0, t.value - dmg);
            if (t.value <= 0) {
              this.breakBrick(t);
            }
          }
        }

        const teleportBricks = state.bricks.filter(b => b.type === 'teleport');
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
          this.endRun(true);
          return;
        }

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
        } else {
          this.updateEffects(dt);
        }

        requestAnimationFrame((time) => this.loop(time));
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

        const shieldBricks = state.bricks.filter(b => b.type === 'shield');

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
          ctx.save();
          ctx.strokeStyle = isHell ? '#feb2b2' : '#777';
          ctx.setLineDash([5, 12]);
          ctx.beginPath();
          ctx.moveTo(state.anchorX, BOTTOM_LINE - 20);
          ctx.lineTo(this.mouse.x, Math.min(this.mouse.y, BOTTOM_LINE - 70));
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = isHell ? '#fff' : '#222';
          ctx.font = "700 17px Poppins, sans-serif";
          ctx.textAlign = 'center';
          ctx.fillText(`x${state.ballCount}`, state.anchorX, HEIGHT - 25);
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
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 3;
          ctx.stroke();
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
  
