
    const WIDTH = 710;
    const HEIGHT = 880;
    const TOP_LINE = 80;
    const BALL_TOP = 100;
    const BRICK_START_Y = 150;
    const BOTTOM_LINE = 800;

    const SAVE_KEY = 'brickBreaker_v9_resume_run';
    const META_KEY = 'brickBreaker_v9_resume_meta';
    const SCORES_KEY = 'brickBreaker_v9_resume_scores';
    const MODES_KEY = 'brickBreaker_v9_resume_modes';
    const SPEEDRUNS_KEY = 'brickBreaker_v9_resume_speedruns';
    const SPEEDRUN_TARGETS = [25, 50, 100, 250, 500];

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let gameManager;

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
        delay: 0,
        radius: 16
      };
    }

    function makeState(mode, meta) {
      const ballCount = 1 + (Number(meta.permUpgrades.startAmmo) || 0);

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
        pendingAmmo: 0,
        paused: false,
        turnInProgress: false,
        brickMoving: false,
        over: false,
        complete: false,
        elapsedMs: 0,
        runStartedAt: Date.now(),
        bestLevel: 1,
        integrity: {
          level: [1, 1, 1],
          coins: [meta.coins, meta.coins, meta.coins],
          gems: [meta.gems, meta.gems, meta.gems],
          ballCount: [ballCount, ballCount, ballCount]
        }
      };
    }

    function brickColor(type, value) {
      if (type === 'tnt') return '#e53e3e';
      if (type === 'ammo') return '#d69e2e';
      if (type === 'teleport') return '#805ad5';
      if (type === 'slider') return '#00b5d8';

      const hue = Math.max(0, 120 - (value - 1) * 3);
      return `hsl(${hue}, 85%, 55%)`;
    }

    class StorageManager {
      read(key, fallback) {
        try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : fallback;
        } catch {
          return fallback;
        }
      }

      write(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch {
          return false;
        }
      }

      getMeta() {
        const saved = this.read(META_KEY, defaultMeta());
        const defaults = defaultMeta();

        return {
          coins: Math.max(0, Number(saved.coins) || 0),
          gems: Math.max(0, Number(saved.gems) || 0),
          permUpgrades: { ...defaults.permUpgrades, ...(saved.permUpgrades || {}) }
        };
      }

      saveMeta(meta) { this.write(META_KEY, meta); }
      getRun() { return this.read(SAVE_KEY, null); }
      saveRun(run) { this.write(SAVE_KEY, run); }

      clearRun() {
        try { localStorage.removeItem(SAVE_KEY); } catch {}
      }

      getScores() { return this.read(SCORES_KEY, []); }

      addScore(score) {
        if (!Number.isFinite(score) || score < 1) return;

        const scores = this.getScores();
        scores.push({
          score: Math.floor(score),
          date: new Date().toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: '2-digit'
          })
        });

        scores.sort((a, b) => b.score - a.score);
        this.write(SCORES_KEY, scores.slice(0, 100));
      }

      getModeRecords() {
        return this.read(MODES_KEY, { infinite: 1 });
      }

      recordInfinite(level) {
        const records = this.getModeRecords();
        records.infinite = Math.max(Number(records.infinite) || 1, level);
        this.write(MODES_KEY, records);
      }

      getSpeedrunRecords() {
        const records = this.read(SPEEDRUNS_KEY, {});

        for (const target of SPEEDRUN_TARGETS) {
          const key = `speedrun_${target}`;
          if (!records[key]) records[key] = { bestMs: null, clears: 0 };
          if (!Number.isFinite(records[key].bestMs)) records[key].bestMs = null;
          records[key].clears = Number(records[key].clears) || 0;
        }

        return records;
      }

      recordSpeedrun(mode, elapsedMs) {
        const records = this.getSpeedrunRecords();
        if (!records[mode]) return;

        const time = Math.max(0, Math.round(elapsedMs));
        const old = records[mode].bestMs;
        records[mode].bestMs = old === null ? time : Math.min(old, time);
        records[mode].clears++;
        this.write(SPEEDRUNS_KEY, records);
      }
    }

    class GameManager {
      constructor() {
        this.storage = new StorageManager();

        this.modes = {
          infinite: { label: 'Infinite', target: null },
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

        // Resume an active saved game without showing the mode picker.
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
        this.state.permUpgrades = { ...meta.permUpgrades, ...(raw.permUpgrades || {}) };
        this.state.buffs = {
          doubleDamageTurns: Number(raw.buffs?.doubleDamageTurns) || 0
        };
        this.state.elapsedMs = Math.max(0, Number(raw.elapsedMs) || 0);
        this.state.runStartedAt = Date.now();
        this.state.paused = false;
        this.state.turnInProgress = Boolean(raw.turnInProgress);
        this.state.brickMoving = Boolean(raw.brickMoving);
        this.state.over = false;
        this.state.complete = false;
        this.state.integrity = raw.integrity || this.state.integrity;

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

        this.syncIntegrity();
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

        label.textContent = this.state.runMode === 'infinite'
          ? 'Infinite Run Time'
          : `${this.modeLabel(this.state.runMode)} Time`;

        timer.textContent = this.state.runMode === 'infinite'
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

        const wasRunning = !this.state.paused;
        this.state.elapsedMs = this.currentElapsedMs();

        const run = {
          version: 9,
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
            pendingAmmo: this.state.pendingAmmo,
            paused: this.state.paused,
            turnInProgress: this.state.turnInProgress,
            brickMoving: this.state.brickMoving,
            over: this.state.over,
            complete: this.state.complete,
            elapsedMs: this.state.elapsedMs,
            bestLevel: this.state.bestLevel,
            integrity: this.state.integrity
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
        this.state.difficulty = document.getElementById('difficultySelect').value;
        this.state.balls = Array.from({ length: this.state.ballCount }, () =>
          makeBall(this.state.anchorX, BOTTOM_LINE - 20)
        );

        this.spawnRow(false);
        closeModal('modeSelectModal');
        this.saveNow();
        this.renderUI();
      }

      exportSaveFile() {
        this.saveNow();
        const run = this.storage.getRun();
        if (!run) return;

        const blob = new Blob([JSON.stringify({
          meta: this.storage.getMeta(),
          game: run
        }, null, 2)], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `brick_breaker_${this.state.runMode}_level_${this.state.level}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }

      importSaveFile(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
          try {
            const data = JSON.parse(reader.result);
            if (data.meta) this.storage.saveMeta(data.meta);

            const run = data.game || data;
            if (!run.state || !Array.isArray(run.bricks)) {
              throw new Error('Invalid save file');
            }

            this.storage.saveRun(run);
            this.restoreRun(run);
            this.newRunDialogOpen = false;
            closeModal('modeSelectModal');
            this.renderUI();
            this.renderModeTracker();
          } catch {
            alert('Could not load that save file.');
          }

          event.target.value = '';
        };

        reader.readAsText(file);
      }

      /*
       * At the start of a run the row is placed at its normal level-1
       * location. Later rows begin one row above that location and animate
       * down into it while the existing row moves down. This prevents the
       * incoming row from overlapping the previous row.
       */
      spawnRow(animateIn = this.state.level > 1) {
        const count = this.getSpawnCount();
        const columns = shuffle([0, 1, 2, 3, 4, 5]).slice(0, count);
        const targetY = BRICK_START_Y;
        const spawnY = animateIn ? targetY - 80 : targetY;

        for (const col of columns) {
          const roll = Math.random();
          let type = 'normal';

          if (roll < .12) type = 'tnt';
          else if (roll < .24) type = 'ammo';
          else if (roll < .34) type = 'teleport';
          else if (roll < .47) type = 'slider';

          let value = this.state.level;
          if (type === 'ammo') value = Math.round(value * 1.5);

          this.state.bricks.push({
            x: col * 120 + 5,
            y: spawnY,
            targetY,
            w: 110,
            h: 70,
            value,
            type,
            slideDir: Math.random() < .5 ? -1 : 1,
            slideSpeed: 1.5 + Math.random()
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

      syncIntegrity() {
        for (const key of ['level', 'coins', 'gems', 'ballCount']) {
          const copies = this.state.integrity?.[key];
          if (!Array.isArray(copies) || copies.length !== 3) continue;

          const values = [...copies, Number(this.state[key]) || 0];
          const lowest = Math.min(...values);

          if (values.some((value) => value !== lowest)) {
            this.state[key] = lowest;
            this.state.integrity[key] = [lowest, lowest, lowest];
          } else {
            this.state.integrity[key] = [
              this.state[key], this.state[key], this.state[key]
            ];
          }
        }
      }

      updateIntegrity(key) {
        if (this.state.integrity?.[key]) {
          this.state.integrity[key] = [
            this.state[key], this.state[key], this.state[key]
          ];
        }
      }

      addCoins(amount) {
        const luck = Number(this.state.permUpgrades.luck) || 0;

        this.state.coins = Math.max(
          0,
          this.state.coins + Math.round(amount * (1 + luck * .2))
        );

        this.updateIntegrity('coins');
        this.persistMeta();
        this.renderUI();
      }

      addGems(amount) {
        this.state.gems = Math.max(0, this.state.gems + amount);
        this.updateIntegrity('gems');
        this.persistMeta();
        this.renderUI();
      }

      persistMeta() {
        this.storage.saveMeta({
          coins: this.state.coins,
          gems: this.state.gems,
          permUpgrades: this.state.permUpgrades
        });
      }

      buyPermUpgrade(type) {
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

        this.state.gems -= cost;
        this.state.permUpgrades[type] = level + 1;
        this.updateIntegrity('gems');

        if (type === 'startAmmo' && this.state.level === 1 &&
            !this.state.balls.some((ball) => ball.moving)) {
          const oldCount = this.state.ballCount;
          this.state.ballCount = 1 + this.state.permUpgrades.startAmmo;

          for (let i = oldCount; i < this.state.ballCount; i++) {
            this.state.balls.push(makeBall(this.state.anchorX, BOTTOM_LINE - 20));
          }

          this.updateIntegrity('ballCount');
        }

        this.persistMeta();
        this.renderUI();
        this.saveNow();
      }

      buyTempBuff(type) {
        if (this.state.over || this.state.complete) return;
        if (['hard', 'insane', 'asian'].includes(this.state.difficulty)) return;

        if (type === 'doubleDamage' && this.state.coins >= 30) {
          this.state.coins -= 30;
          this.state.buffs.doubleDamageTurns += 3;
        } else if (type === 'laserWipe' && this.state.coins >= 40 && this.state.bricks.length) {
          this.state.coins -= 40;

          const bottom = Math.max(...this.state.bricks.map((brick) => brick.y));
          const toRemove = this.state.bricks.filter((brick) => brick.y === bottom);

          for (const brick of toRemove) {
            this.breakBrick(brick);
          }
        } else {
          return;
        }

        this.updateIntegrity('coins');
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
            </div>`;
        }

        const select = document.getElementById('speedrunCategorySelect');
        const key = select?.value || 'speedrun_25';
        const config = this.modes[key];
        const speedrunRecords = this.storage.getSpeedrunRecords();
        const record = speedrunRecords[key];
        const container = document.getElementById('speedrunCategoryTracker');

        if (container && config && record) {
          container.innerHTML = `
            <div class="tracker-row"><strong>Category</strong><span>${config.label}</span></div>
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
          body.innerHTML = '<tr><td colspan="3" class="muted">No Infinite scores yet.</td></tr>';
          return;
        }

        body.innerHTML = scores.map((entry, index) =>
          `<tr><td>${index + 1}</td><td>${Number(entry.score) || 0}</td><td>${entry.date || ''}</td></tr>`
        ).join('');
      }

      renderUI() {
        const state = this.state;
        if (!state) return;

        document.getElementById('trackerCoins').textContent = state.coins;
        document.getElementById('trackerGems').textContent = state.gems;
        document.getElementById('coinsCountTempModal').textContent = state.coins;
        document.getElementById('gemsCountModal').textContent = state.gems;

        const hard = ['hard', 'insane', 'asian'].includes(state.difficulty);

        document.getElementById('trackerActiveBuffs').textContent = hard
          ? 'Disabled (Hard+ Difficulty)'
          : state.buffs.doubleDamageTurns > 0
            ? `1.5x Damage (${state.buffs.doubleDamageTurns} turns)`
            : 'None';

        document.getElementById('buff15xStatus').textContent = hard
          ? 'Disabled (Hard+)'
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
          const level = Number(state.permUpgrades[key]) || 0;
          const status = document.getElementById(statusId);
          const button = document.getElementById(buttonId);

          if (level >= max) {
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

        document.getElementById('btnBuy15x').disabled =
          hard || state.coins < 30 || state.over || state.complete;

        document.getElementById('btnBuyLaser').disabled =
          hard || state.coins < 40 || !state.bricks.length || state.over || state.complete;

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

        /*
         * Move sliders after vertical row movement. Check the proposed
         * horizontal position against every other brick whose vertical
         * rectangle overlaps. On collision, place the slider at the edge
         * of the other brick and reverse its direction.
         */
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

        const speed = 11 * (1 + (Number(state.permUpgrades.ballSpeed) || 0) * .1);

        state.balls = state.balls.slice(0, Math.max(1, state.ballCount));

        state.balls.forEach((ball, index) => {
          ball.x = state.anchorX;
          ball.y = anchorY;
          ball.vx = dx * speed;
          ball.vy = dy * speed;
          ball.moving = true;
          ball.downing = false;
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

        for (const ball of state.balls) {
          if (!ball.moving) continue;

          if (ball.delay > 0) {
            ball.delay -= dt;
            continue;
          }

          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

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

          if (!ball.downing) this.checkBallBrickCollision(ball);

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
            ball.vx = 0;
            ball.vy = 0;
            state.anchorX = ball.x;
          }
        }

        // Initial stationary balls do not advance the level.
        if (state.turnInProgress &&
            state.balls.length &&
            state.balls.every((ball) => !ball.moving)) {
          this.finishTurn();
        }
      }

      checkBallBrickCollision(ball) {
        for (const brick of [...this.state.bricks]) {
          if (!this.state.bricks.includes(brick)) continue;

          const closestX = clamp(ball.x, brick.x, brick.x + brick.w);
          const closestY = clamp(ball.y, brick.y, brick.y + brick.h);
          const dx = ball.x - closestX;
          const dy = ball.y - closestY;

          if (dx * dx + dy * dy > ball.radius * ball.radius) continue;

          let damage = 1;

          if (!['hard', 'insane', 'asian'].includes(this.state.difficulty) &&
              this.state.buffs.doubleDamageTurns > 0) {
            damage = 1.5;
          }

          const critLevel = Number(this.state.permUpgrades.critChance) || 0;
          if (critLevel && Math.random() < critLevel * .05) damage *= 3;

          brick.value = Math.max(0, brick.value - damage);

          if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
          else ball.vy *= -1;

          this.addCoins(1);

          // Remove the brick during the collision frame when HP reaches zero.
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

        if (Math.random() < .25) {
          this.addGems(1);
        }

        if (brick.type === 'ammo') {
          this.state.pendingAmmo++;
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

      finishTurn() {
        const state = this.state;

        if (!state.turnInProgress || state.paused || state.over || state.complete) return;

        state.turnInProgress = false;
        state.brickMoving = true;

        if (!['hard', 'insane', 'asian'].includes(state.difficulty) &&
            state.buffs.doubleDamageTurns > 0) {
          state.buffs.doubleDamageTurns--;
        }

        state.level++;
        state.bestLevel = Math.max(Number(state.bestLevel) || 1, state.level);
        this.updateIntegrity('level');
        this.addCoins(10);

        // Move all existing bricks down one row. The next row is spawned
        // above the play area and animates into BRICK_START_Y.
        for (const brick of state.bricks) {
          brick.targetY += 80;
        }

        for (const bonus of state.bonusBalls) {
          if (bonus.hit) continue;
          bonus.targetY = (Number.isFinite(bonus.targetY) ? bonus.targetY : bonus.y) + 80;
        }

        const bottomLimit = BOTTOM_LINE - 90;
        if (state.bricks.some((brick) => brick.targetY >= bottomLimit)) {
          this.endRun(false);
          return;
        }

        if (state.runMode === 'infinite') {
          this.storage.recordInfinite(state.level);
        } else if (state.level >= state.target) {
          this.endRun(true);
          return;
        }

        const caughtBonusBalls = state.bonusBalls.filter((bonus) => bonus.hit).length;
        state.bonusBalls = state.bonusBalls.filter((bonus) => !bonus.hit);

        const extraBalls = caughtBonusBalls + state.pendingAmmo;
        state.pendingAmmo = 0;

        if (extraBalls > 0) {
          state.ballCount += extraBalls;
          this.updateIntegrity('ballCount');
        }

        state.balls = Array.from({ length: state.ballCount }, () =>
          makeBall(state.anchorX, BOTTOM_LINE - 20)
        );

        // A newly spawned row starts one row above its final position.
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
          this.storage.recordSpeedrun(state.runMode, state.elapsedMs);
          this.storage.clearRun();
        } else {
          state.over = true;

          if (state.runMode === 'infinite') {
            this.storage.addScore(state.level);
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
          this.syncIntegrity();
          this.updateBricks(dt);
          this.updateBonusBalls(dt);
          this.updateBalls(dt);
          this.updateEffects(dt);

          // Check actual positions too, after animated rows have moved.
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

        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, TOP_LINE);
        ctx.lineTo(WIDTH, TOP_LINE);
        ctx.moveTo(0, BOTTOM_LINE);
        ctx.lineTo(WIDTH, BOTTOM_LINE);
        ctx.stroke();

        ctx.fillStyle = '#171717';
        ctx.font = "700 20px Poppins, sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Level: ${state.level}`, 18, 40);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#2b6cb0';
        ctx.font = "700 16px Poppins, sans-serif";
        ctx.fillText(this.modeLabel(state.runMode), WIDTH / 2, 40);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#d69e2e';
        ctx.font = "700 20px Poppins, sans-serif";
        ctx.fillText(`Balls: ${state.ballCount}`, WIDTH - 18, 40);

        for (const brick of state.bricks) {
          this.drawBrick(brick);
        }

        for (const bonus of state.bonusBalls) {
          if (bonus.hit) continue;

          ctx.beginPath();
          ctx.fillStyle = '#3dd462';
          ctx.arc(bonus.x, bonus.y, bonus.r, 0, Math.PI * 2);
          ctx.fill();
        }

        for (const ball of state.balls) {
          ctx.beginPath();
          ctx.fillStyle = state.buffs.doubleDamageTurns > 0 ? '#e53e3e' : '#5ba7f4';
          ctx.arc(ball.x, ball.y, ball.radius || 16, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!state.turnInProgress && !state.brickMoving && !state.paused &&
            !state.over && !state.complete) {
          ctx.save();
          ctx.strokeStyle = '#777';
          ctx.setLineDash([5, 12]);
          ctx.beginPath();
          ctx.moveTo(state.anchorX, BOTTOM_LINE - 20);
          ctx.lineTo(this.mouse.x, Math.min(this.mouse.y, BOTTOM_LINE - 70));
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = '#222';
          ctx.font = "700 17px Poppins, sans-serif";
          ctx.textAlign = 'center';
          ctx.fillText(`x${state.ballCount}`, state.anchorX, HEIGHT - 25);
        }

        if (state.paused && !state.over && !state.complete) {
          ctx.fillStyle = '#0005';
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.font = "700 30px Poppins, sans-serif";
          ctx.fillText('PAUSED', WIDTH / 2, HEIGHT / 2);
        }

        if (state.over || state.complete) {
          ctx.fillStyle = '#0009';
          ctx.fillRect(0, HEIGHT / 2 - 100, WIDTH, 200);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = "700 36px Poppins, sans-serif";

          ctx.fillText(
            state.complete ? `SPEEDRUN ${state.target} CLEAR!` : 'GAME OVER',
            WIDTH / 2,
            HEIGHT / 2 - 18
          );

          ctx.font = "600 21px Poppins, sans-serif";
          ctx.fillText(
            state.complete ? this.formatTime(state.elapsedMs) : `Level ${state.level}`,
            WIDTH / 2,
            HEIGHT / 2 + 32
          );
        }

        this.drawEffects();
      }

      drawBrick(brick) {
        ctx.save();

        const pulse = (Math.sin(Date.now() / 120) + 1) / 2;
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

          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(brick.x - 3, brick.y - 3, brick.w + 6, brick.h + 6, 12);
          } else {
            ctx.rect(brick.x - 3, brick.y - 3, brick.w + 6, brick.h + 6);
          }

          ctx.strokeStyle = '#d69e2e';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (brick.type === 'teleport') {
          ctx.strokeStyle = '#e9d8fd';
          ctx.lineWidth = 4;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
        } else if (brick.type === 'slider') {
          ctx.strokeStyle = '#e0fbfc';
          ctx.lineWidth = 3;
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
        ctx.fillText(String(Math.ceil(brick.value)), brick.x + brick.w / 2, brick.y + brick.h / 2);

        if (brick.type === 'slider') {
          ctx.font = "700 14px Poppins, sans-serif";
          ctx.fillText('◄  ►', brick.x + brick.w / 2, brick.y + 14);
        }

        ctx.restore();
      }
    }

    gameManager = new GameManager();
  
