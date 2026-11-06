
    function openModal(id) {
      document.getElementById(id).classList.add('active');
    }
    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
    }

    function randomInt(...args) {
      if (args.length === 1) return Math.ceil(Math.random() * args[0]);
      if (args.length === 2) {
        if (args[0] > args[1]) throw Error("Start value greater than end value");
        return Math.ceil(Math.random() * (args[1] - args[0])) + args[0];
      }
    }

    function random(...args) {
      if (args.length === 1) return Math.random() * args[0];
      if (args.length === 2) {
        if (args[0] > args[1]) throw Error("Start value greater than end value");
        return Math.random() * (args[1] - args[0]) + args[0];
      }
    }

    const range = function (n, m) {
      if (arguments.length === 1) return Array.from({ length: n }).map((_, i) => i);
      if (arguments.length === 2) {
        if (n === m) return [n];
        else if (n < m) return Array.from({ length: m - n + 1 }).map((_, i) => i + n);
        else return Array.from({ length: n - m + 1 }).map((_, i) => m - i + (n - m));
      }
    };

    function normalize(n) { return n < 0 ? -1 : n > 0 ? 1 : 0; }
    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    function between(v, min, max) { return min <= v && v <= max; }
    const delay = (n) => new Promise((r) => setTimeout(r, n));

    class Vector {
      constructor(x = 0, y = 0) { this.x = x; this.y = y; }
      add(v) { this.x += v.x; this.y += v.y; }
      sub(v) { this.x -= v.x; this.y -= v.y; }
      mult(n) { this.x *= n; this.y *= n; }
      mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
      get() { return new Vector(this.x, this.y); }
      normalize() { this.x = normalize(this.x); this.y = normalize(this.y); }
      copy() { return new Vector(this.x, this.y); }
    }
    Vector.mult = (v, n) => new Vector(v.x * n, v.y * n);
    Vector.div = (v, n) => new Vector(v.x / n, v.y / n);

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

    function fillRoundRectCustom(x, y, w, h, radius, color = "#171717", borderStyle = "normal") {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = color;
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, radius);
      else ctx.rect(x, y, w, h);
      ctx.fill();

      if (borderStyle === 'tnt') {
        const pulse = (Math.sin(Date.now() / 120) + 1) / 2;
        ctx.lineWidth = 3 + pulse * 3;
        ctx.strokeStyle = `rgb(255, ${Math.floor(100 + pulse * 155)}, 100)`;
        ctx.setLineDash([8, 6]);
        ctx.stroke();
      } else if (borderStyle === 'ammo') {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.setLineDash([]);
        ctx.stroke();
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x - 3, y - 3, w + 6, h + 6, radius + 2);
        else ctx.rect(x - 3, y - 3, w + 6, h + 6);
        ctx.strokeStyle = "#d69e2e";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (borderStyle === 'teleport') {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#e9d8fd";
        ctx.setLineDash([3, 5]);
        ctx.stroke();
      } else if (borderStyle === 'slider') {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#e0fbfc";
        ctx.setLineDash([]);
        ctx.stroke();
      } else {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.setLineDash([]);
        ctx.stroke();
      }
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

    function clear() { ctx.clearRect(0, 0, width, height); }
    function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }

    const BASE_POWER = 0.3;
    const Mouse = { position: new Vector(0, 0) };

    class ExplosionEffect {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.radius = 20; this.maxRadius = 160;
        this.lifespan = 255;
      }
      update() { this.radius += 10; this.lifespan -= 18; }
      display() {
        if (this.lifespan <= 0) return;
        ctx.save(); ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 69, 0, ${this.lifespan / 500})`;
        ctx.strokeStyle = `rgba(255, 215, 0, ${this.lifespan / 255})`;
        ctx.lineWidth = 4; ctx.fill(); ctx.stroke(); ctx.closePath(); ctx.restore();
      }
      get isDead() { return this.lifespan <= 0 || this.radius >= this.maxRadius; }
    }

    class BallLine {
      display(state) {
        if (!state.ballMoving && !state.brickMoving && state.ballPos) {
          dashLine(state.ballPos.x, state.ballPos.y, Mouse.position.x, Math.min(Mouse.position.y, 720));
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
      setOnStop(f) { this.onStop = f; }
      applyForce(force) { const f = Vector.div(force, this.mass); this.acceleration.add(f); }
      update() { this.velocity.add(this.acceleration); this.position.add(this.velocity); this.acceleration.mult(0); }
      stop() { this.velocity = new Vector(0, 0); this.showDirection = true; if (this.onStop) this.onStop(this); this.downing = false; }
      down() { this.downing = true; this.velocity = new Vector(0, 30); }
      shoot(mousePos, speedMultiplier) {
        this.showDirection = false;
        const force = this.calcBallVelocity(this.angle(mousePos), speedMultiplier);
        this.applyForce(force);
      }
      calcBallVelocity(angle, speedMultiplier) {
        const power = BASE_POWER * (1 + (speedMultiplier || 0));
        return new Vector(100 * Math.cos(angle) * power, 100 * Math.sin(angle) * power);
      }
      angle(mousePos) { return Math.atan2(mousePos.y - this.position.y, mousePos.x - this.position.x); }
      display(state) {
        let ballColor = "#5ba7f4";
        const isHard = ['hard', 'insane', 'asian'].includes(state.difficulty);
        if (state && state.buffs && !isHard) {
          if (state.buffs.doubleDamageTurns > 0) ballColor = "#e53e3e";
        }
        circle(this.position.x, this.position.y, this.r, ballColor);
      }
      collideWith(brick, state) {
        if (this.downing) return false;
        const { x, y } = this.position; const r = this.r;
        const closestX = clamp(x, brick.x, brick.x + brick.w);
        const closestY = clamp(y, brick.y, brick.y + brick.h);
        const distanceX = x - closestX; const distanceY = y - closestY;
        const collided = (distanceX * distanceX + distanceY * distanceY) < r * r;
        if (!collided) return false;

        if (closestY === brick.y && between(closestX, brick.x - r + 3, brick.x + brick.w + r - 3)) {
          this.velocity.y *= -1; this.position.y = closestY - r;
        } else if (closestY === brick.y + brick.h && between(closestX, brick.x - r + 3, brick.x + brick.w + r - 3)) {
          this.velocity.y *= -1; this.position.y = closestY + r;
        } else if (closestX === brick.x && between(closestY, brick.y - r + 3, brick.y + brick.w + r - 3)) {
          this.velocity.x *= -1; this.position.x = closestX - r;
        } else if (closestX === brick.x + brick.w && between(closestY, brick.y - r + 3, brick.y + brick.w + r - 3)) {
          this.velocity.x *= -1; this.position.x = closestX + r;
        }
        return true;
      }
      collideWithBonusBall(bonusBall) {
        if (this.downing) return false;
        const x = this.position.x - bonusBall.x; const y = this.position.y - bonusBall.y;
        return (2 * this.r) >= Math.sqrt(x * x + y * y);
      }
      checkEdges() {
        if (this.position.x > width) { this.position.x = width; this.velocity.x *= -1; }
        else if (this.position.x < 0) { this.position.x = 0; this.velocity.x *= -1; }

        if (this.position.y > height - 100) {
          this.velocity.y *= -1; this.position.y = height - 100; this.stop();
        } else if (this.position.y < 100) {
          this.velocity.y *= -1; this.position.y = 100;
        }
      }
    }

    class Brick {
      constructor(n, x, y, start = n, type = 'normal', slideDir = 1) {
        this.type = type;
        this.n = (this.type === 'ammo') ? Math.round(n * 1.5) : n;
        this.start = start;
        this.gridX = x;
        this.x = x * 120 + 5;
        this.y = y * 80 + uiOffsetY + 5;
        this.targetY = this.y;
        this.w = 110; this.h = 70;
        this.borderRadius = 12;
        this.slideDir = slideDir || (Math.random() > 0.5 ? 1 : -1);
        this.slideSpeed = 2.0;
      }
      shouldMoveDown(state) {
        this.targetY = 80 * (state.level - this.start + 1) + uiOffsetY + 5;
        return this.y < this.targetY;
      }
      update(state, allBricks) {
        if (this.shouldMoveDown(state)) {
          this.y = Math.min(this.y + 10, 80 * (state.level - this.start + 1) + uiOffsetY + 5);
        } else if (this.y > this.targetY) {
          this.y = Math.max(this.y - 10, this.targetY);
        }

        if (this.type === 'slider' && !this.shouldMoveDown(state)) {
          const nextX = this.x + this.slideDir * this.slideSpeed;
          const minX = 5; const maxX = width - 5 - this.w;
          let hitBoundary = false;
          if (nextX <= minX) { this.x = minX; this.slideDir = 1; hitBoundary = true; }
          else if (nextX >= maxX) { this.x = maxX; this.slideDir = -1; hitBoundary = true; }

          if (!hitBoundary) {
            let collidedWithOther = false;
            if (allBricks) {
              for (const other of allBricks) {
                if (other !== this && Math.abs(other.y - this.y) < 20) {
                  const testRect = { x: nextX, y: this.y, w: this.w, h: this.h };
                  if (testRect.x < other.x + other.w && testRect.x + testRect.w > other.x) {
                    collidedWithOther = true; break;
                  }
                }
              }
            }
            if (collidedWithOther) this.slideDir *= -1;
            else this.x = nextX;
          }
        }
      }
      getHue() { return Math.max(0, 120 - (this.n - 1) * 3); }
      color() {
        if (this.type === 'tnt') return '#e53e3e';
        if (this.type === 'ammo') return '#d69e2e';
        if (this.type === 'teleport') return '#805ad5';
        if (this.type === 'slider') return '#00b5d8';
        return `hsl(${this.getHue()}, 85%, 55%)`;
      }
      display(state) {
        fillRoundRectCustom(this.x, this.y, this.w, this.h, this.borderRadius, this.color(), this.type);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px 'Poppins', system-ui, sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(this.n, this.x + this.w / 2, this.y + this.h / 2);

        if (this.type === 'slider') {
          ctx.font = "bold 14px 'Poppins', system-ui, sans-serif";
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fillText("◄   ►", this.x + this.w / 2, this.y + 14);
        }
      }
      hit(damage = 1) { this.n = Math.max(0, this.n - damage); }
      get broken() { return this.n <= 0; }
      get hitBottom() { return this.y >= height - uiOffsetY - 80; }
      toJSON() {
        return { n: this.n, start: this.start, x: this.gridX, y: Math.round((this.y - uiOffsetY - 5) / 80), type: this.type, slideDir: this.slideDir };
      }
    }

    class BrickParticle {
      constructor(n, x, y, hue = 120) {
        const i = n % 5; const j = ~~(n / 4);
        this.w = 22; this.h = 18; this.hue = hue;
        this.location = new Vector(x + i * this.w, y + j * this.h);
        this.acceleration = new Vector(0, 0);
        this.velocity = new Vector(i > 2 ? random(0, 0.5) : i === 2 ? random(-0.5, 0.5) : random(-0.5, 0), random(1, 3));
        this.lifespan = 255;
      }
      update() { this.velocity.add(this.acceleration); this.location.add(this.velocity); this.lifespan -= 4; }
      display() {
        fillRoundRectCustom(this.location.x, this.location.y, 22, 18, 4, typeof this.hue === 'string' ? this.hue : `hsla(${this.hue}, 85%, 55%, ${this.lifespan / 255})`, 'normal');
      }
      run() { this.update(); this.display(); }
      get isDead() { return this.lifespan < 0; }
    }

    class BrickParticleSystem {
      constructor(x, y, hue = 120) {
        this.particles = range(20).map((n) => new BrickParticle(n, x, y, hue));
      }
      run() { this.particles.forEach((particle) => particle.run()); }
      get isDead() { return !this.particles.length || this.particles[0].isDead; }
    }

    class BrickParticleSystems {
      constructor() { this.particleSystems = []; this.explosions = []; }
      addParticleSystem(...bricks) {
        const newPs = bricks.map((b) => new BrickParticleSystem(b.x, b.y, b.color ? b.color() : b.getHue()));
        this.particleSystems.push(...newPs);
      }
      addExplosion(x, y) { this.explosions.push(new ExplosionEffect(x, y)); }
      run() {
        this.particleSystems = this.particleSystems.filter((ps) => !ps.isDead);
        this.particleSystems.forEach((ps) => ps.run());
        this.explosions = this.explosions.filter(exp => !exp.isDead);
        this.explosions.forEach(exp => { exp.update(); exp.display(); });
      }
    }

    class BonusBall {
      constructor(n, x, y, start = n, hit = false) {
        this.start = start; this.r = 16;
        this.gridX = x;
        this.x = x * 120 + 56;
        this.y = y * 80 + 36 + uiOffsetY;
        this.hit = hit;
      }
      moveDownLittle(state) { this.y = Math.min(this.y + 10, 80 * (state.level - this.start + 1) + uiOffsetY + 40); }
      update(state) {
        if (this.hit) this.y = Math.min(this.y + 50, height - 100);
        else this.moveDownLittle(state);

        if (this.hit && this.y === height - 100 && state.brickMoving && state.ballPos) {
          if (this.x < state.ballPos.x) this.x = Math.min(this.x + 30, state.ballPos.x);
          else this.x = Math.max(this.x - 30, state.ballPos.x);
        }
      }
      display() { circle(this.x, this.y, this.r, "#3dd462"); }
      hitWithBall() { this.hit = true; }
      collideWith(ball) {
        const x = ball.position.x - this.x; const y = ball.position.y - this.y;
        const collided = (2 * this.r) >= Math.sqrt(x * x + y * y);
        if (collided) this.hit = true;
        return collided;
      }
      toJSON() {
        return { n: this.start, start: this.start, x: this.gridX, y: Math.round((this.y - 36 - uiOffsetY) / 80), hit: this.hit };
      }
    }

    class UI {
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
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(`Score: ${state.level}`, 20, uiOffsetY / 2);
        ctx.fillStyle = "#d69e2e";
        ctx.fillText(`Coins: ${state.coins} 🪙`, 160, uiOffsetY / 2);
        ctx.fillStyle = "#6b46c1";
        ctx.fillText(`Gems: ${state.gems} 💎`, 320, uiOffsetY / 2);
        ctx.fillStyle = "#171717";
        ctx.textAlign = "right";
        ctx.fillText(`High: ${state.bestLevel}`, width - 20, uiOffsetY / 2);
        ctx.restore();
      }
      showBallCount(state) {
        if (!state.ballMoving && state.ballPos) {
          ctx.save();
          ctx.fillStyle = "#171717";
          ctx.font = "bold 18px 'Poppins', system-ui, sans-serif";
          ctx.textAlign = "center"; ctx.textBaseline = "top";
          ctx.fillText(`x${state.ballCount}`, state.ballPos.x, height - 55);
          ctx.restore();
        }
      }
      gameOver() {
        fillRect(0, height / 2 - 100, width, 200, "rgba(0, 0, 0, 0.4)");
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 42px 'Poppins', system-ui, sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER!", width / 2, height / 2);
        ctx.restore();
      }
    }

    class Balls {
      constructor(state) {
        const xPos = state.ballPos ? state.ballPos.x : width / 2;
        const yPos = state.ballPos ? state.ballPos.y : height - 100;
        this.balls = range(state.ballCount).map(() => new Ball(2, xPos, yPos));
        this.onBallStop = (ball) => {
          if (!state.firstBallStop) {
            state.ballPos = ball.position.copy();
            state.firstBallStop = true;
          }
          ball.position.x = state.ballPos.x;
        };
        this.balls.forEach((ball) => ball.setOnStop(this.onBallStop));
      }
      collideWithBricks(bricks, state, gameManager) {
        const isHard = ['hard', 'insane', 'asian'].includes(state.difficulty);
        const baseDmg = (!isHard && state.buffs && state.buffs.doubleDamageTurns > 0) ? 1.5 : 1;
        const isCrit = state.permUpgrades.critChance > 0 && Math.random() < (state.permUpgrades.critChance * 0.05);
        const damage = isCrit ? baseDmg * 3 : baseDmg;

        bricks.bricks.forEach((brick) => {
          this.balls.forEach((ball) => {
            const collided = ball.collideWith(brick, state);
            if (collided) {
              brick.hit(damage);
              let coinReward = 1;
              if (state.permUpgrades.luck > 0) coinReward *= (1 + state.permUpgrades.luck * 0.2);
              if (gameManager) gameManager.addCoins(coinReward);
            }
          });
        });
      }
      collideWithBonusBall(bonusBalls) {
        this.balls.forEach((ball) => {
          bonusBalls.forEach((bonusBall) => {
            if (ball.collideWithBonusBall(bonusBall)) bonusBall.hitWithBall();
          });
        });
      }
      get allStopped() { return this.balls.every((ball) => ball.velocity.mag() === 0); }
      addBalls(state, n) {
        const newBalls = range(n).map(() => new Ball(2, state.ballPos.x, state.ballPos.y));
        newBalls.forEach((ball) => ball.setOnStop(this.onBallStop));
        this.balls.push(...newBalls);
      }
      async shoot(mousePos, state) {
        const speedMultiplier = state.permUpgrades.ballSpeed * 0.1;
        for (const ball of this.balls) {
          if (state.ballDowning) return;
          ball.shoot(mousePos, speedMultiplier);
          await delay(Math.max(50 - ~~(state.ballCount / 10), 10));
        }
      }
      display(state) {
        this.balls.forEach((ball) => {
          ball.update(); ball.checkEdges(); ball.display(state);
        });
      }
      down() { this.balls.forEach((ball) => ball.down()); }
    }

    class Bricks {
      constructor() {
        this.bricks = [];
        this.particleSystems = new BrickParticleSystems();
      }
      addBricks(state, newBrickIndeces) {
        const newBricks = newBrickIndeces.map((i) => {
          let type = 'normal';
          const r = Math.random();
          if (r < 0.15) type = 'tnt';
          else if (r < 0.30) type = 'ammo';
          else if (r < 0.42) type = 'teleport';
          else if (r < 0.57) type = 'slider';
          return new Brick(state.level, i, 0, state.level, type);
        });
        this.bricks.push(...newBricks);
      }
      display(state) {
        this.bricks.forEach((brick) => {
          brick.update(state, this.bricks);
          brick.display(state);
        });
        this.particleSystems.run();
      }
      break(gameManager, state) {
        const brokenBricks = this.bricks.filter((brick) => brick.broken);
        if (brokenBricks.length > 0 && gameManager) {
          let coinReward = brokenBricks.length * 5;
          if (state && state.permUpgrades.luck > 0) coinReward *= (1 + state.permUpgrades.luck * 0.2);
          gameManager.addCoins(coinReward);

          // Chance to drop gems on breaking bricks
          if (Math.random() < 0.25) {
            gameManager.addGems(1);
          }

          let ammoToGain = 0;
          brokenBricks.forEach(brick => {
            if (brick.type === 'tnt') {
              this.particleSystems.addExplosion(brick.x + brick.w / 2, brick.y + brick.h / 2);
              this.bricks.forEach(b => {
                if (!b.broken) {
                  const dx = (b.x + b.w / 2) - (brick.x + brick.w / 2);
                  const dy = (b.y + b.h / 2) - (brick.y + brick.h / 2);
                  if (Math.sqrt(dx * dx + dy * dy) <= 180) b.hit(Math.ceil(state.level * 0.8));
                }
              });
            } else if (brick.type === 'ammo') ammoToGain += 1;
          });
          if (ammoToGain > 0) state.pendingAmmoDrop = (state.pendingAmmoDrop || 0) + ammoToGain;
        }
        this.particleSystems.addParticleSystem(...brokenBricks);
        this.bricks = this.bricks.filter((brick) => !brick.broken);
        if (this.bricks.some(b => b.broken)) this.break(gameManager, state);
      }
      teleportBricks(state) {
        const maxAllowedY = height - uiOffsetY - 80 - (3 * 80);
        this.bricks.forEach(b => {
          if (b.type === 'teleport' && !b.broken) {
            let validSpots = [];
            const maxGridY = Math.floor((maxAllowedY - uiOffsetY - 5) / 80);
            for (let r = 0; r <= Math.max(0, maxGridY); r++) {
              for (let c = 0; c < 6; c++) {
                const targetY = r * 80 + uiOffsetY + 5;
                const occupied = this.bricks.some(other => other !== b && Math.abs(other.x - (c * 120 + 5)) < 10 && Math.abs(other.y - targetY) < 10);
                if (!occupied) validSpots.push({ x: c * 120 + 5, y: targetY, gridX: c });
              }
            }
            if (validSpots.length > 0) {
              const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
              b.x = spot.x; b.gridX = spot.gridX;
              b.start = state.level - Math.round((spot.y - uiOffsetY - 5) / 80);
              b.targetY = spot.y;
            }
          }
        });
      }
      shouldSlideDown(state) { return this.bricks.some(b => b.shouldMoveDown(state)); }
      get hitBottom() { return this.bricks.some(b => b.hitBottom); }
    }

    class BonusBalls {
      constructor() { this.bonusBalls = []; }
      addBonusBalls(state, newBonusBallIndex) {
        if (newBonusBallIndex !== undefined) {
          this.bonusBalls.push(new BonusBall(state.level, newBonusBallIndex, 0, state.level));
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
      removeHitBalls() { this.bonusBalls = this.bonusBalls.filter((b) => !b.hit || b.y > height); }
      get hitBallCount() { return this.bonusBalls.filter((ball) => ball.hit).length; }
    }

    class LocalStorageManager {
      constructor() {
        this.saveKey = "brickBreaker_v8_save";
        this.scoresKey = "brickBreaker_v8_top100";
        this.metaKey = "brickBreaker_v8_meta";
        this.storage = window.localStorage;
      }
      getMetaData() {
        try {
          const raw = this.storage.getItem(this.metaKey);
          return raw ? JSON.parse(raw) : { coins: 0, gems: 0, permUpgrades: { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 } };
        } catch (e) {
          return { coins: 0, gems: 0, permUpgrades: { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 } };
        }
      }
      setMetaData(meta) { try { this.storage.setItem(this.metaKey, JSON.stringify(meta)); } catch (e) {} }
      getSaveData() {
        try {
          const raw = this.storage.getItem(this.saveKey);
          return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
      }
      setSaveData(stateObj) { try { this.storage.setItem(this.saveKey, JSON.stringify(stateObj)); } catch (e) {} }
      clearSaveData() { this.storage.removeItem(this.saveKey); }
      getTopScores() {
        try {
          const raw = this.storage.getItem(this.scoresKey);
          return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
      }
      addScore(score) {
        if (!score || score < 1) return;
        let scores = this.getTopScores();
        scores.push({
          score: score,
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' }),
          id: Date.now()
        });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 100);
        try { this.storage.setItem(this.scoresKey, JSON.stringify(scores)); } catch (e) {}
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
        const meta = this.scoreStorage.getMetaData();

        this.state = {
          ballPos: new Vector(width / 2, height - 100),
          ballMoving: false,
          ballCount: 1 + (meta.permUpgrades.startAmmo || 0),
          ballDowning: false,
          brickMoving: false,
          firstBallStop: true,
          level: 1,
          over: false,
          coins: meta.coins || 0,
          gems: meta.gems || 0,
          pendingAmmoDrop: 0,
          difficulty: 'medium',
          permUpgrades: meta.permUpgrades || { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0 },
          buffs: { doubleDamageTurns: 0 },
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
        this.renderUIControls();
        this.renderLeaderboard();
      }

      changeDifficulty(mode) {
        if (this.isDifficultyLocked()) return;
        this.state.difficulty = mode;
        if (['hard', 'insane', 'asian'].includes(mode)) {
          this.state.buffs.doubleDamageTurns = 0;
        }
        this.renderUIControls();
        this.saveCurrentState();
      }

      isDifficultyLocked() {
        return this.state.level > 1 || this.state.ballMoving || this.state.brickMoving;
      }

      loadFromDataObject(data) {
        this.state.level = data.state.level || 1;
        this.state.ballCount = data.state.ballCount || (1 + (this.state.permUpgrades.startAmmo || 0));
        this.state.coins = data.state.coins !== undefined ? data.state.coins : this.state.coins;
        this.state.gems = data.state.gems !== undefined ? data.state.gems : this.state.gems;
        this.state.difficulty = data.state.difficulty || 'medium';
        this.state.bestLevel = Math.max(this.scoreStorage.getBestScore(), this.state.level);

        const diffSelect = document.getElementById("difficultySelect");
        if (diffSelect) diffSelect.value = this.state.difficulty;

        if (data.state.buffs) {
          this.state.buffs = {
            doubleDamageTurns: data.state.buffs.doubleDamageTurns || 0
          };
        }

        if (['hard', 'insane', 'asian'].includes(this.state.difficulty)) {
          this.state.buffs.doubleDamageTurns = 0;
        }

        if (data.state.ballPos) {
          this.state.ballPos = new Vector(data.state.ballPos.x, data.state.ballPos.y);
        } else {
          this.state.ballPos = new Vector(width / 2, height - 100);
        }

        this.balls = new Balls(this.state);
        this.bricks.bricks = (data.bricks || []).map(b => new Brick(b.n, b.x, b.y, b.start, b.type || 'normal', b.slideDir || 1));
        this.bonusBalls.bonusBalls = (data.bonusBalls || []).map(b => new BonusBall(b.n, b.x, b.y, b.start, b.hit));
      }

      addCoins(amount) {
        this.state.coins += Math.round(amount);
        this.saveMetaData();
        this.renderUIControls();
      }

      addGems(amount) {
        this.state.gems += Math.round(amount);
        this.saveMetaData();
        this.renderUIControls();
      }

      saveMetaData() {
        this.scoreStorage.setMetaData({
          coins: this.state.coins,
          gems: this.state.gems,
          permUpgrades: this.state.permUpgrades
        });
      }

      buyPermUpgrade(type) {
        const limits = {
          startAmmo: { max: 10, costBase: 5, costScale: 3 },
          critChance: { max: 10, costBase: 6, costScale: 4 },
          ballSpeed: { max: 5, costBase: 8, costScale: 5 },
          luck: { max: 5, costBase: 10, costScale: 6 }
        };

        const currentLvl = this.state.permUpgrades[type] || 0;
        const cfg = limits[type];
        if (!cfg || currentLvl >= cfg.max) return;

        // Scaling upgrade price in gems
        const cost = Math.round(cfg.costBase * Math.pow(1.5, currentLvl));
        if (this.state.gems >= cost) {
          this.state.gems -= cost;
          this.state.permUpgrades[type] = currentLvl + 1;

          if (type === 'startAmmo' && this.state.level === 1 && !this.state.ballMoving) {
            this.state.ballCount = 1 + this.state.permUpgrades.startAmmo;
            this.balls = new Balls(this.state);
          }

          this.saveMetaData();
          this.renderUIControls();
          this.saveCurrentState();
        }
      }

      buyTempBuff(type) {
        if (this.state.over) return;
        const isHard = ['hard', 'insane', 'asian'].includes(this.state.difficulty);
        if (isHard) return;

        if (type === 'doubleDamage') {
          const cost = 30;
          if (this.state.coins >= cost) {
            this.state.coins -= cost;
            this.state.buffs.doubleDamageTurns += 3;
          }
        } else if (type === 'laserWipe') {
          const cost = 40;
          if (this.state.coins >= cost && this.bricks.bricks.length > 0) {
            this.state.coins -= cost;
            let maxY = Math.max(...this.bricks.bricks.map(b => b.y));
            this.bricks.bricks.forEach(b => {
              if (Math.abs(b.y - maxY) < 10) b.n = 0;
            });
            this.bricks.break(this, this.state);
          }
        }
        this.saveMetaData();
        this.renderUIControls();
        this.saveCurrentState();
      }

      renderUIControls() {
        const coinsElem = document.getElementById("coinsCountModal");
        if (coinsElem) coinsElem.textContent = this.state.coins;
        const coinsTempElem = document.getElementById("coinsCountTempModal");
        if (coinsTempElem) coinsTempElem.textContent = this.state.coins;
        const gemsElem = document.getElementById("gemsCountModal");
        if (gemsElem) gemsElem.textContent = this.state.gems;

        // Update separate tracker container
        const trackerCoins = document.getElementById("trackerCoins");
        if (trackerCoins) trackerCoins.textContent = this.state.coins;
        const trackerGems = document.getElementById("trackerGems");
        if (trackerGems) trackerGems.textContent = this.state.gems;
        const trackerActiveBuffs = document.getElementById("trackerActiveBuffs");
        if (trackerActiveBuffs) {
          const isHard = ['hard', 'insane', 'asian'].includes(this.state.difficulty);
          if (isHard) {
            trackerActiveBuffs.textContent = "Disabled (Hard+ Difficulty)";
          } else {
            let tags = [];
            if (this.state.buffs && this.state.buffs.doubleDamageTurns > 0) {
              tags.push(`1.5x Dmg (${this.state.buffs.doubleDamageTurns}t)`);
            }
            trackerActiveBuffs.textContent = tags.length > 0 ? tags.join(", ") : "None";
          }
        }

        const diffSelect = document.getElementById("difficultySelect");
        if (diffSelect) {
          diffSelect.value = this.state.difficulty;
          diffSelect.disabled = this.isDifficultyLocked();
        }

        const limits = {
          startAmmo: { max: 10, costBase: 5, id: 'permAmmoStatus', btn: 'btnBuyPermAmmo' },
          critChance: { max: 10, costBase: 6, id: 'permCritStatus', btn: 'btnBuyPermCrit' },
          ballSpeed: { max: 5, costBase: 8, id: 'permSpeedStatus', btn: 'btnBuyPermSpeed' },
          luck: { max: 5, costBase: 10, id: 'permLuckStatus', btn: 'btnBuyPermLuck' }
        };

        for (let key in limits) {
          const cfg = limits[key];
          const lvl = this.state.permUpgrades[key] || 0;
          const statusElem = document.getElementById(cfg.id);
          const btnElem = document.getElementById(cfg.btn);

          if (statusElem && btnElem) {
            if (lvl >= cfg.max) {
              statusElem.textContent = `MAXED (Lvl ${cfg.max})`;
              btnElem.disabled = true;
              btnElem.textContent = "MAX";
            } else {
              const cost = Math.round(cfg.costBase * Math.pow(1.5, lvl));
              statusElem.textContent = `Lvl ${lvl}/${cfg.max} (Cost: ${cost} Gems)`;
              btnElem.disabled = this.state.gems < cost;
              btnElem.textContent = `Upgrade (${cost} Gems)`;
            }
          }
        }

        const isHard = ['hard', 'insane', 'asian'].includes(this.state.difficulty);

        const btn15x = document.getElementById("btnBuy15x");
        const status15x = document.getElementById("buff15xStatus");
        if (btn15x && status15x) {
          if (isHard) {
            btn15x.disabled = true;
            status15x.textContent = "Disabled (Hard+)";
          } else {
            btn15x.disabled = this.state.coins < 30;
            status15x.textContent = this.state.buffs.doubleDamageTurns > 0 ? `${this.state.buffs.doubleDamageTurns} turns left` : "Inactive";
          }
        }

        const btnLaser = document.getElementById("btnBuyLaser");
        const statusLaser = document.getElementById("buffLaserStatus");
        if (btnLaser) {
          if (isHard) {
            btnLaser.disabled = true;
            if (statusLaser) statusLaser.textContent = "Disabled (Hard+)";
          } else {
            btnLaser.disabled = this.state.coins < 40 || this.bricks.bricks.length === 0;
            if (statusLaser) statusLaser.textContent = "Instant Use";
          }
        }
      }

      saveCurrentState() {
        if (this.state.over) {
          this.scoreStorage.clearSaveData();
          return;
        }

        const saveData = {
          version: 8,
          timestamp: Date.now(),
          state: {
            level: this.state.level,
            ballCount: this.state.ballCount,
            coins: this.state.coins,
            gems: this.state.gems,
            difficulty: this.state.difficulty,
            buffs: this.state.buffs,
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
        const exportObj = {
          meta: this.scoreStorage.getMetaData(),
          game: data
        };
        const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `brick_breaker_v8_save_lvl${this.state.level}.json`;
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
            if (data && data.meta) {
              this.scoreStorage.setMetaData(data.meta);
            }
            if (data && data.game) {
              this.scoreStorage.setSaveData(data.game);
            } else if (data && data.state) {
              this.scoreStorage.setSaveData(data);
            }
            this.initGame();
          } catch (err) {
            alert("Failed to parse save file.");
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

      getSpawnCountByDifficulty() {
        const diff = this.state.difficulty || 'medium';
        if (diff === 'easy') return randomInt(1, 3);
        if (diff === 'medium') return Math.random() > 0.9 ? randomInt(1, 5) : randomInt(1, 4);
        if (diff === 'hard') return randomInt(1, 5);
        if (diff === 'insane') return randomInt(3, 5);
        if (diff === 'asian') return randomInt(4, 5);
        return randomInt(1, 4);
      }

      addBallsAndBricks() {
        const extraAmmo = this.state.pendingAmmoDrop || 0;
        this.state.pendingAmmoDrop = 0;

        const bonusBallCount = this.bonusBalls.hitBallCount + extraAmmo;
        const spawnCount = this.getSpawnCountByDifficulty();
        const newBrickIndeces = shuffle(range(6)).slice(0, spawnCount);
        const newBonusBallIndex = shuffle(range(6).filter((i) => !newBrickIndeces.includes(i)))[0];

        this.state.ballCount += bonusBallCount;
        this.balls.addBalls(this.state, bonusBallCount);
        this.bricks.addBricks(this.state, newBrickIndeces);
        this.bonusBalls.addBonusBalls(this.state, newBonusBallIndex);
      }

      shootBalls(e) {
        if (this.state.ballMoving || this.state.brickMoving || this.state.over) return;

        this.state.ballPos = null;
        this.state.ballMoving = true;
        this.state.ballDowning = false;
        this.state.firstBallStop = false;

        this.renderUIControls();

        const { x, y } = Mouse.position;
        this.balls.shoot({ x, y: Math.min(y, 720) }, this.state);
      }

      checkCollision() {
        this.balls.collideWithBricks(this.bricks, this.state, this);
        this.bonusBalls.collideWithBall(this.balls);
        this.bricks.break(this, this.state);
      }

      draw() {
        clear();
        this.ballLine.display(this.state);
        this.balls.display(this.state);
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

          const isHard = ['hard', 'insane', 'asian'].includes(this.state.difficulty);
          if (!isHard) {
            if (this.state.buffs.doubleDamageTurns > 0) this.state.buffs.doubleDamageTurns--;
          } else {
            this.state.buffs.doubleDamageTurns = 0;
          }

          this.renderUIControls();

          this.state.level += 1;
          let turnBonus = 10;
          if (this.state.permUpgrades.luck > 0) turnBonus *= (1 + this.state.permUpgrades.luck * 0.2);
          this.addCoins(turnBonus);
          this.state.bestLevel = Math.max(this.state.bestLevel, this.state.level);

          this.bricks.teleportBricks(this.state);
          this.addBallsAndBricks();
          this.saveCurrentState();
        }

        if (this.state.brickMoving) {
          if (!this.bricks.shouldSlideDown(this.state)) {
            this.state.brickMoving = false;
            this.bonusBalls.removeHitBalls();
            this.renderUIControls();
            this.saveCurrentState();
          }
        }

        if (this.bricks.hitBottom && !this.state.over) {
          this.ui.gameOver();
          this.state.over = true;
          this.scoreStorage.addScore(this.state.level);
          this.scoreStorage.clearSaveData();
          this.renderLeaderboard();
          this.renderUIControls();
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
      Mouse.position = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    });

    const gameManager = new GameManager();
    gameManager.run();
  
