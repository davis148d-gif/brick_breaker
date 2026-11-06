
    /**
     * Utility Math & Array Helpers
     **/
    function randomInt(...args) {
      if (args.length === 1) {
        const [n] = args;
        return Math.ceil(Math.random() * n);
      }

      if (args.length === 2) {
        const [start, end] = args;
        if (start > end) throw Error("Start value greater than end value");
        return Math.ceil(Math.random() * (end - start)) + start;
      }
    }

    function random(...args) {
      if (args.length === 1) {
        const [n] = args;
        return Math.random() * n;
      }

      if (args.length === 2) {
        const [start, end] = args;
        if (start > end) throw Error("Start value greater than end value");
        return Math.random() * (end - start) + start;
      }
    }

    const range = function (n, m) {
      if (arguments.length === 1)
        return Array.from({ length: n }).map((_, i) => i);

      if (arguments.length === 2) {
        if (n === m) return [n];
        else if (n < m) {
          return Array.from({ length: m - n + 1 }).map((_, i) => i + n);
        } else {
          return Array.from({ length: n - m + 1 }).map(
            (_, i) => m - i + (n - m)
          );
        }
      }
    };

    function normalize(n) {
      return n < 0 ? -1 : n > 0 ? 1 : 0;
    }

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    }

    function between(v, min, max) {
      return min <= v && v <= max;
    }

    const delay = (n) => new Promise((r) => setTimeout(r, n));
  

    /**
     * 2D Vector Physics Class
     **/
    class Vector {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }

      add(v) {
        this.x += v.x;
        this.y += v.y;
      }

      sub(v) {
        this.x -= v.x;
        this.y -= v.y;
      }

      mult(n) {
        this.x *= n;
        this.y *= n;
      }

      mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }

      get() {
        return new Vector(this.x, this.y);
      }

      normalize() {
        this.x = normalize(this.x);
        this.y = normalize(this.y);
      }

      copy() {
        return new Vector(this.x, this.y);
      }
    }

    Vector.mult = (v, n) => new Vector(v.x * n, v.y * n);
    Vector.div = (v, n) => new Vector(v.x / n, v.y / n);
  

    /**
     * Canvas Rendering Engine
     **/
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const width = 710;
    const height = 880;
    const uiOffsetY = 80;

    canvas.width = width;
    canvas.height = height;

    function line(x1, y1, x2, y2, color = "#000") {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function dashLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.setLineDash([5, 15]);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function fillRoundRect(x, y, w, h, radius, color = "#171717") {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, radius);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    function fillRect(x, y, w, h, color = "#171717") {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    function circle(x, y, r, color = "#000") {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    function clear() {
      ctx.clearRect(0, 0, width, height);
    }

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }
  

    /**
     * Main Game Entities & Controllers
     **/
    const POWER = 0.3;

    const Mouse = { position: new Vector(0, 0) };

    class BallLine {
      constructor() { }

      display(state) {
        if (!state.ballMoving && !state.brickMoving && state.ballPos) {
          dashLine(
            state.ballPos.x,
            state.ballPos.y,
            Mouse.position.x,
            Math.min(Mouse.position.y, 720)
          );
        }
      }
    }

    class Ball {
      constructor(mass, x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.mass = mass;
        this.r = this.mass * 8;
        this.showDirection = true;
      }

      setOnStop(f) {
        this.onStop = f;
      }

      applyForce(force) {
        const f = Vector.div(force, this.mass);
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      move(direction) {
        if (direction === "right") this.applyForce(new Vector(20, 0));
        else if (direction === "left") this.applyForce(new Vector(-20, 0));
      }

      stop() {
        this.velocity = new Vector(0, 0);
        this.showDirection = true;
        if (typeof this.onStop === "function") this.onStop(this);
        this.downing = false;
      }

      down() {
        this.downing = true;
        this.velocity = new Vector(0, 30);
      }

      shoot(mousePos) {
        this.showDirection = false;
        const force = this.calcBallVelocity(this.angle(mousePos));
        this.applyForce(force);
      }

      calcBallVelocity(angle) {
        return new Vector(
          100 * Math.cos(angle) * POWER,
          100 * Math.sin(angle) * POWER
        );
      }

      angle(mousePos) {
        const opposite = mousePos.y - this.position.y;
        const adjacent = mousePos.x - this.position.x;
        return Math.atan2(opposite, adjacent);
      }

      display() {
        circle(this.position.x, this.position.y, this.r, "#5ba7f4");
      }

      collideWith(brick) {
        if (this.downing) return false;

        const { x, y } = this.position;
        const r = this.r;

        const closestX = clamp(x, brick.x, brick.x + brick.w);
        const closestY = clamp(y, brick.y, brick.y + brick.h);

        const distanceX = x - closestX;
        const distanceY = y - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;

        const collided = distanceSquared < r * r;

        if (!collided) return false;

        if (
          closestY === brick.y &&
          between(closestX, brick.x - r + 3, brick.x + brick.w + r - 3)
        ) {
          this.velocity.y *= -1;
          this.position.y = closestY - r;
        } else if (
          closestY === brick.y + brick.h &&
          between(closestX, brick.x - r + 3, brick.x + brick.w + r - 3)
        ) {
          this.velocity.y *= -1;
          this.position.y = closestY + r;
        } else if (
          closestX === brick.x &&
          between(closestY, brick.y - r + 3, brick.y + brick.h + r - 3)
        ) {
          this.velocity.x *= -1;
          this.position.x = closestX - r;
        } else if (
          closestX === brick.x + brick.w &&
          between(closestY, brick.y - r + 3, brick.y + brick.h + r - 3)
        ) {
          this.velocity.x *= -1;
          this.position.x = closestX + r;
        }

        return true;
      }

      collideWithBonusBall(bonusBall) {
        if (this.downing) return false;

        const x = this.position.x - bonusBall.x;
        const y = this.position.y - bonusBall.y;
        const r = this.r;
        const collided = (2 * r) >= Math.sqrt(x * x + y * y);

        return collided;
      }

      checkEdges() {
        if (this.position.x > width) {
          this.position.x = width;
          this.velocity.x *= -1;
        } else if (this.position.x < 0) {
          this.position.x = 0;
          this.velocity.x *= -1;
        }

        if (this.position.y > height - 100) {
          this.velocity.y *= -1;
          this.position.y = height - 100;
          this.stop();
        } else if (this.position.y < 100) {
          this.velocity.y *= -1;
          this.position.y = 100;
        }
      }
    }

    class Brick {
      constructor(n, x, y, start = n) {
        this.n = n;
        this.start = start;

        this.x = x * 120 + 5;
        this.y = y * 80 + uiOffsetY + 5;
        this.w = 110;
        this.h = 70;
        this.gridX = x;
        this.borderRadius = 12;
      }

      shouldMoveDown(state) {
        return this.y < 80 * (state.level - this.start + 1) + uiOffsetY + 5;
      }

      update(state) {
        if (this.shouldMoveDown(state)) {
          this.y = Math.min(
            this.y + 10,
            80 * (state.level - this.start + 1) + uiOffsetY + 5
          );
        }
      }

      getHue() {
        // HP = 1 -> Pure Green (120°)
        // Higher HP shifts smoothly through Yellow (60°) down to Pure Red (0°)
        return Math.max(0, 120 - (this.n - 1) * 3);
      }

      color() {
        return `hsl(${this.getHue()}, 85%, 55%)`;
      }

      display(state) {
        fillRoundRect(this.x, this.y, this.w, this.h, this.borderRadius, this.color());
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px 'Poppins', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          this.n,
          this.x + this.w / 2,
          this.y + this.h / 2
        );
      }

      hit() {
        this.n--;
      }

      get broken() {
        return this.n <= 0;
      }

      get hitBottom() {
        return this.y >= height - uiOffsetY - 80;
      }

      toJSON() {
        return {
          n: this.n,
          start: this.start,
          x: this.gridX,
          y: Math.round((this.y - uiOffsetY - 5) / 80)
        };
      }
    }

    class BrickParticle {
      constructor(n, x, y, hue = 120) {
        const i = n % 5;
        const j = ~~(n / 4);

        this.w = 22;
        this.h = 18;
        this.hue = hue;
        this.location = new Vector(x + i * this.w, y + j * this.h);
        this.acceleration = new Vector(0, 0);
        this.velocity = new Vector(
          i > 2
            ? random(0, 0.5)
            : i === 2
              ? random(-0.5, 0.5)
              : random(-0.5, 0),
          random(1, 3)
        );
        this.lifespan = 255;
      }

      update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.lifespan -= 4;
      }

      display() {
        fillRoundRect(
          this.location.x,
          this.location.y,
          22,
          18,
          4,
          `hsla(${this.hue}, 85%, 55%, ${this.lifespan / 255})`
        );
      }

      run() {
        this.update();
        this.display();
      }

      get isDead() {
        return this.lifespan < 0;
      }
    }

    class BrickParticleSystem {
      constructor(x, y, hue = 120) {
        this.origin = new Vector(x, y);
        this.particles = range(20).map((n) => new BrickParticle(n, x, y, hue));
      }

      run() {
        this.particles.forEach((particle) => particle.run());
      }

      get isDead() {
        return !this.particles.length || this.particles[0].isDead;
      }
    }

    class BrickParticleSystems {
      constructor() {
        this.particleSystems = [];
      }

      addParticleSystem(...bricks) {
        const newPs = bricks.map((b) => new BrickParticleSystem(b.x, b.y, b.getHue()));
        this.particleSystems.push(...newPs);
      }

      run() {
        this.particleSystems = this.particleSystems.filter(
          (ps) => !ps.isDead
        );
        this.particleSystems.forEach((ps) => ps.run());
      }
    }

    class BonusBall {
      constructor(n, x, y, start = n, hit = false) {
        this.start = start;
        this.r = 16;
        this.gridX = x;
        this.x = x * 120 + 56;
        this.y = y * 80 + 36 + uiOffsetY;
        this.hit = hit;
      }

      moveDownLittle(state) {
        this.y = Math.min(
          this.y + 10,
          80 * (state.level - this.start + 1) + uiOffsetY + 40
        );
      }

      update(state) {
        if (this.hit) this.y = Math.min(this.y + 50, height - 100);
        else this.moveDownLittle(state);

        if (this.hit && this.y === height - 100 && state.brickMoving && state.ballPos) {
          if (this.x < state.ballPos.x) {
            this.x = Math.min(this.x + 30, state.ballPos.x);
          } else {
            this.x = Math.max(this.x - 30, state.ballPos.x);
          }
        }
      }

      display() {
        circle(this.x, this.y, this.r, "#3dd462");
      }

      hitWithBall() {
        this.hit = true;
      }

      collideWith(ball) {
        const x = ball.position.x - this.x;
        const y = ball.position.y - this.y;
        const r = this.r;
        const collided = (2 * r) >= Math.sqrt(x * x + y * y);

        if (collided) {
          this.hit = true;
        }
        return collided;
      }

      toJSON() {
        return {
          n: this.start,
          start: this.start,
          x: this.gridX,
          y: Math.round((this.y - 36 - uiOffsetY) / 80),
          hit: this.hit
        };
      }
    }

    class UI {
      constructor() { }

      display(state) {
        line(0, uiOffsetY, width, uiOffsetY);
        line(0, height - uiOffsetY, width, height - uiOffsetY);

        this.showBallCount(state);
        this.showScore(state);
      }

      showScore(state) {
        ctx.save();
        ctx.fillStyle = "#171717";
        ctx.font = "bold 20px 'Poppins', system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`Score: ${state.level}`, 30, uiOffsetY / 2);
        
        ctx.textAlign = "right";
        ctx.fillText(
          `High Score: ${state.bestLevel}`,
          width - 30,
          uiOffsetY / 2
        );
        ctx.restore();
      }

      showBallCount(state) {
        if (!state.ballMoving && state.ballPos) {
          ctx.save();
          ctx.fillStyle = "#171717";
          ctx.font = "bold 18px 'Poppins', system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(
            `x${state.ballCount}`,
            state.ballPos.x,
            height - 55
          );
          ctx.restore();
        }
      }

      gameOver() {
        fillRect(0, height / 2 - 100, width, 200, "rgba(0, 0, 0, 0.45)");
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 44px 'Poppins', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER!", width / 2, height / 2);
        ctx.restore();
      }
    }

    class Balls {
      constructor(state) {
        const xPos = state.ballPos ? state.ballPos.x : width / 2;
        const yPos = state.ballPos ? state.ballPos.y : height - 100;
        
        this.balls = range(state.ballCount).map(
          () => new Ball(2, xPos, yPos)
        );
        this.onBallStop = (ball) => {
          if (!state.firstBallStop) {
            state.ballPos = ball.position.copy();
            state.firstBallStop = true;
          }

          ball.position.x = state.ballPos.x;
        };
        this.balls.forEach((ball) => ball.setOnStop(this.onBallStop));
      }

      collideWithBricks(bricks) {
        bricks.bricks.forEach((brick) => {
          this.balls.forEach((ball) => {
            const collided = ball.collideWith(brick);
            if (collided) {
              brick.hit();
            }
          });
        });
      }

      collideWithBonusBall(bonusBalls) {
        this.balls.forEach((ball) => {
          bonusBalls.forEach((bonusBall) => {
            const collided = ball.collideWithBonusBall(bonusBall);
            if (collided) bonusBall.hitWithBall();
          });
        });
      }

      get allStopped() {
        return this.balls.every((ball) => ball.velocity.mag() === 0);
      }

      addBalls(state, n) {
        const newBalls = range(n).map(
          () => new Ball(2, state.ballPos.x, state.ballPos.y)
        );
        newBalls.forEach((ball) => ball.setOnStop(this.onBallStop));
        this.balls.push(...newBalls);
      }

      async shoot(mousePos, state) {
        for (const ball of this.balls) {
          if (state.ballDowning) return;
          ball.shoot(mousePos);
          await delay(Math.max(50 - ~~(state.ballCount / 10), 10));
        }
      }

      display() {
        this.balls.forEach((ball) => {
          ball.update();
          ball.checkEdges();
          ball.display();
        });
      }

      down() {
        this.balls.forEach((ball) => ball.down());
      }
    }

    class Bricks {
      constructor() {
        this.bricks = [];
        this.particleSystems = new BrickParticleSystems();
      }

      addBricks(state, newBrickIndeces) {
        const newBricks = newBrickIndeces.map(
          (i) => new Brick(state.level, i, 0, state.level)
        );
        this.bricks.push(...newBricks);
      }

      display(state) {
        this.bricks.forEach((brick) => {
          brick.update(state);
          brick.display(state);
        });

        this.particleSystems.run();
      }

      break() {
        const brokenBricks = this.bricks.filter((brick) => brick.broken);
        this.particleSystems.addParticleSystem(...brokenBricks);

        this.bricks = this.bricks.filter((brick) => !brick.broken);
      }

      shouldSlideDown(state) {
        return this.bricks[0] && this.bricks[0].shouldMoveDown(state);
      }

      get hitBottom() {
        return this.bricks[0] && this.bricks[0].hitBottom;
      }
    }

    class BonusBalls {
      constructor() {
        this.bonusBalls = [];
      }

      addBonusBalls(state, newBonusBallIndex) {
        if (newBonusBallIndex !== undefined) {
          this.bonusBalls = [
            ...this.bonusBalls,
            new BonusBall(state.level, newBonusBallIndex, 0, state.level),
          ];
        }
      }

      display(state) {
        this.bonusBalls.forEach((bonusBall) => {
          bonusBall.update(state);
          bonusBall.display();
        });
      }

      collideWithBall(balls) {
        this.bonusBalls.forEach((bonusBall) =>
          balls.balls.forEach((ball) => bonusBall.collideWith(ball))
        );
      }

      removeHitBalls() {
        this.bonusBalls = this.bonusBalls.filter(
          (b) => !b.hit || b.y > height
        );
      }

      get hitBallCount() {
        return this.bonusBalls.filter((ball) => ball.hit).length;
      }
    }

    class LocalStorageManager {
      constructor() {
        this.saveKey = "brickBreaker_v3_save";
        this.scoresKey = "brickBreaker_v3_top100";
        this.storage = window.localStorage;
      }

      getSaveData() {
        try {
          const raw = this.storage.getItem(this.saveKey);
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      }

      setSaveData(stateObj) {
        try {
          this.storage.setItem(this.saveKey, JSON.stringify(stateObj));
        } catch (e) {}
      }

      clearSaveData() {
        this.storage.removeItem(this.saveKey);
      }

      getTopScores() {
        try {
          const raw = this.storage.getItem(this.scoresKey);
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          return [];
        }
      }

      addScore(score) {
        if (!score || score < 1) return;
        let scores = this.getTopScores();
        const newEntry = {
          score: score,
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' }),
          id: Date.now()
        };
        scores.push(newEntry);
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 100);
        try {
          this.storage.setItem(this.scoresKey, JSON.stringify(scores));
        } catch (e) {}
        return scores;
      }

      getBestScore() {
        const scores = this.getTopScores();
        return scores.length > 0 ? scores[0].score : 1;
      }
    }

    class GameManager {
      constructor() {
        this.scoreStorage = new LocalStorageManager();
        this.initGame();
        canvas.addEventListener("click", (e) => this.shootBalls(e));
      }

      initGame() {
        const savedData = this.scoreStorage.getSaveData();

        this.state = {
          ballPos: new Vector(width / 2, height - 100),
          ballMoving: false,
          ballCount: 1,
          ballDowning: false,
          brickMoving: false,
          firstBallStop: true,
          level: 1,
          over: false,
          bestLevel: this.scoreStorage.getBestScore()
        };

        this.bricks = new Bricks();
        this.bonusBalls = new BonusBalls();

        if (savedData && savedData.state && !savedData.state.over) {
          this.loadFromDataObject(savedData);
        } else {
          this.balls = new Balls(this.state);
          this.addBallsAndBricks();
        }

        this.ballLine = new BallLine();
        this.ui = new UI();
        this.renderLeaderboard();
      }

      loadFromDataObject(data) {
        this.state.level = data.state.level || 1;
        this.state.ballCount = data.state.ballCount || 1;
        this.state.bestLevel = Math.max(this.scoreStorage.getBestScore(), this.state.level);
        
        if (data.state.ballPos) {
          this.state.ballPos = new Vector(data.state.ballPos.x, data.state.ballPos.y);
        } else {
          this.state.ballPos = new Vector(width / 2, height - 100);
        }

        this.balls = new Balls(this.state);
        this.bricks.bricks = (data.bricks || []).map(
          (b) => new Brick(b.n, b.x, b.y, b.start)
        );
        this.bonusBalls.bonusBalls = (data.bonusBalls || []).map(
          (b) => new BonusBall(b.n, b.x, b.y, b.start, b.hit)
        );
      }

      saveCurrentState() {
        if (this.state.over) {
          this.scoreStorage.clearSaveData();
          return;
        }

        const saveData = {
          version: 3,
          timestamp: Date.now(),
          state: {
            level: this.state.level,
            ballCount: this.state.ballCount,
            ballPos: this.state.ballPos ? { x: this.state.ballPos.x, y: this.state.ballPos.y } : { x: width / 2, y: height - 100 },
            over: this.state.over
          },
          bricks: this.bricks.bricks.map((b) => b.toJSON()),
          bonusBalls: this.bonusBalls.bonusBalls.map((b) => b.toJSON())
        };

        this.scoreStorage.setSaveData(saveData);
      }

      resetGame() {
        if (!this.state.over && this.state.level > 1) {
          this.scoreStorage.addScore(this.state.level);
        }
        this.scoreStorage.clearSaveData();
        this.initGame();
      }

      exportSaveFile() {
        this.saveCurrentState();
        const data = this.scoreStorage.getSaveData();
        if (!data) return;
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `brick_breaker_v3_save_lvl${this.state.level}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }

      importSaveFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data && data.state && data.bricks) {
              this.scoreStorage.setSaveData(data);
              this.initGame();
            } else {
              console.warn("Invalid save file format.");
            }
          } catch (err) {
            console.error("Failed to parse save file.");
          }
        };
        reader.readAsText(file);
        event.target.value = "";
      }

      renderLeaderboard() {
        const leaderboardBody = document.getElementById("leaderboardBody");
        if (!leaderboardBody) return;

        const scores = this.scoreStorage.getTopScores();
        leaderboardBody.innerHTML = "";

        if (scores.length === 0) {
          leaderboardBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#a0aec0; padding:16px;">No high scores yet!</td></tr>`;
          return;
        }

        scores.forEach((entry, idx) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td><strong>#${idx + 1}</strong></td>
            <td>${entry.score}</td>
            <td style="color:#718096; font-size:0.9em;">${entry.date}</td>
          `;
          leaderboardBody.appendChild(row);
        });
      }

      addBallsAndBricks() {
        const bonusBallCount = this.bonusBalls.hitBallCount;
        const newBrickIndeces = shuffle(range(6)).slice(
          0,
          Math.random() > 0.9 ? randomInt(5) : randomInt(4)
        );
        const newBonusBallIndex = shuffle(
          range(6).filter((i) => !newBrickIndeces.includes(i))
        )[0];

        this.state.ballCount += bonusBallCount;
        this.balls.addBalls(this.state, bonusBallCount);
        this.bricks.addBricks(this.state, newBrickIndeces);
        this.bonusBalls.addBonusBalls(this.state, newBonusBallIndex);
      }

      shootBalls() {
        if (
          this.state.ballMoving ||
          this.state.brickMoving ||
          this.state.over
        )
          return;

        this.state.ballPos = null;
        this.state.ballMoving = true;
        this.state.ballDowning = false;
        this.state.firstBallStop = false;

        const { x, y } = Mouse.position;
        this.balls.shoot({ x, y: Math.min(y, 720) }, this.state);
      }

      checkCollision() {
        this.balls.collideWithBricks(this.bricks);
        this.bonusBalls.collideWithBall(this.balls);
        this.bricks.break();
      }

      draw() {
        clear();
        this.ballLine.display(this.state);
        this.balls.display();
        this.bricks.display(this.state);
        this.bonusBalls.display(this.state);
        this.ui.display(this.state);
      }

      run() {
        this.draw();
        this.checkCollision();

        if (this.state.ballMoving && this.balls.allStopped) {
          this.state.ballMoving = false;
          this.state.brickMoving = true;

          this.state.level += 1;
          this.state.bestLevel = Math.max(this.state.bestLevel, this.state.level);

          this.addBallsAndBricks();
          this.saveCurrentState();
        }

        if (this.state.brickMoving) {
          if (!this.bricks.shouldSlideDown(this.state)) {
            this.state.brickMoving = false;
            this.bonusBalls.removeHitBalls();
            this.saveCurrentState();
          }
        }

        if (this.bricks.hitBottom && !this.state.over) {
          this.ui.gameOver();
          this.state.over = true;
          this.scoreStorage.addScore(this.state.level);
          this.scoreStorage.clearSaveData();
          this.renderLeaderboard();
        }

        window.requestAnimationFrame(() => this.run());
      }

      downBalls() {
        this.state.ballDowning = true;
        this.balls.down();
      }
    }

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      Mouse.position = new Vector(mx, my);
    });

    const gameManager = new GameManager();

    window.onload = function() {
      gameManager.run();
    };
  
