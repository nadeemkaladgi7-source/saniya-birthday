/**
 * ==============================================================================
 * 🐥 FLAPPY SANA (SKY HIGH BIRTHDAY ADVENTURE) 🎈
 * ==============================================================================
 * - Tap to Flap, Pastel Clouds & Balloon Columns
 * - Super Cute Party Hat Avatar with Flapping Wing
 * - Collectible Stars & Sweets
 * - Forgiving, Fun, Non-frustrating Birthday Physics!
 * ==============================================================================
 */

(function () {
  'use strict';

  let canvas, ctx;
  let animId = null;
  let isRunning = false;
  let score = 0;
  let targetScore = 10;
  let hasWon = false;

  // Sana Bird
  const bird = {
    x: 70,
    y: 200,
    vy: 0,
    gravity: 0.28,
    jump: -5.8,
    radius: 20,
    rotation: 0,
    wingAngle: 0
  };

  // Pipes / Obstacles
  let pipes = [];
  let stars = [];
  let clouds = [];
  let particles = [];
  let pipeTimer = 0;

  function init() {
    canvas = document.getElementById('flappySana-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Flap listener
    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      flap();
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && isRunning) {
        e.preventDefault();
        flap();
      }
    });

    initClouds();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = (rect.width || 340) * dpr;
    canvas.height = (rect.height || 420) * dpr;
    if (ctx) ctx.scale(dpr, dpr);
  }

  function initClouds() {
    clouds = [];
    const rect = canvas ? canvas.getBoundingClientRect() : { width: 340, height: 420 };
    for (let i = 0; i < 4; i++) {
      clouds.push({
        x: Math.random() * rect.width,
        y: Math.random() * (rect.height * 0.6) + 20,
        speed: Math.random() * 0.4 + 0.2,
        scale: Math.random() * 0.5 + 0.8
      });
    }
  }

  function flap() {
    if (!isRunning) {
      reset();
      return;
    }
    bird.vy = bird.jump;
    if (window.ArcadeUtils.SoundManager.playFlap) window.ArcadeUtils.SoundManager.playFlap();

    // Spawn tiny puff particles behind bird
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: bird.x - 15,
        y: bird.y + 10,
        vx: -Math.random() * 2 - 1,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        color: '#ffffff',
        life: 1
      });
    }
  }

  function spawnPipe() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 340;
    const h = rect.height || 420;

    const gap = 145; // Very generous gap for cute fun!
    const minTop = 60;
    const maxTop = h - gap - 70;
    const topHeight = Math.floor(Math.random() * (maxTop - minTop)) + minTop;

    pipes.push({
      x: w + 20,
      width: 52,
      topHeight,
      bottomY: topHeight + gap,
      passed: false
    });

    // 50% chance of a collectible star in middle of gap
    if (Math.random() < 0.6) {
      stars.push({
        x: w + 20 + 26,
        y: topHeight + gap / 2,
        collected: false
      });
    }
  }

  function loop() {
    if (!isRunning) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 340;
    const h = rect.height || 420;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Clouds
    clouds.forEach(c => {
      c.x -= c.speed;
      if (c.x < -60) c.x = w + 40;
      drawCloud(c.x, c.y, c.scale);
    });

    // 2. Bird Physics
    bird.vy += bird.gravity;
    bird.y += bird.vy;
    bird.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, bird.vy * 0.08));
    bird.wingAngle += 0.25;

    // Floor / Ceiling check
    if (bird.y + bird.radius > h - 15) {
      gameOver();
      return;
    }
    if (bird.y - bird.radius < 0) {
      bird.y = bird.radius;
      bird.vy = 0;
    }

    // 3. Pipe Spawning & Updating
    pipeTimer++;
    if (pipeTimer > 100) {
      spawnPipe();
      pipeTimer = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      const p = pipes[i];
      p.x -= 1.8;

      // Draw Top Pipe (Pastel Candy Pillar)
      drawPastelPipe(p.x, 0, p.width, p.topHeight, true);
      // Draw Bottom Pipe
      drawPastelPipe(p.x, p.bottomY, p.width, h - p.bottomY, false);

      // Collision Detection
      if (
        bird.x + bird.radius - 4 > p.x &&
        bird.x - bird.radius + 4 < p.x + p.width
      ) {
        if (bird.y - bird.radius + 4 < p.topHeight || bird.y + bird.radius - 4 > p.bottomY) {
          gameOver();
          return;
        }
      }

      // Score increment when passing pipe
      if (!p.passed && p.x + p.width < bird.x) {
        p.passed = true;
        score++;
        updateUI();
        if (window.ArcadeUtils.SoundManager.playPop) window.ArcadeUtils.SoundManager.playPop();

        if (score >= targetScore && !hasWon) {
          hasWon = true;
          winGame();
        }
      }

      // Offscreen cleanup
      if (p.x + p.width < -30) {
        pipes.splice(i, 1);
      }
    }

    // 4. Collectible Stars
    for (let i = stars.length - 1; i >= 0; i--) {
      const st = stars[i];
      st.x -= 1.8;

      if (!st.collected) {
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', st.x, st.y);

        // Check pickup
        if (Math.hypot(bird.x - st.x, bird.y - st.y) < bird.radius + 14) {
          st.collected = true;
          score++;
          updateUI();
          if (window.ArcadeUtils.SoundManager.playChime) window.ArcadeUtils.SoundManager.playChime();

          if (score >= targetScore && !hasWon) {
            hasWon = true;
            winGame();
          }
        }
      }

      if (st.x < -30) stars.splice(i, 1);
    }

    // 5. Draw Bird
    drawBird(bird.x, bird.y, bird.rotation);

    // 6. Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const pr = particles[i];
      pr.x += pr.vx;
      pr.y += pr.vy;
      pr.life -= 0.04;
      if (pr.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = pr.life;
      ctx.fillStyle = pr.color;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, pr.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animId = requestAnimationFrame(loop);
  }

  function drawBird(x, y, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    // Cute Soft Pink Body
    ctx.fillStyle = '#ffb3c6';
    ctx.beginPath();
    ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
    ctx.fill();

    // Rosy Cheeks
    ctx.fillStyle = '#ff4d6d';
    ctx.beginPath();
    ctx.arc(6, 4, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Cute Eye with Sparkle
    ctx.fillStyle = '#222222';
    ctx.beginPath();
    ctx.arc(8, -5, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(9.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Little Beak
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.moveTo(16, -2);
    ctx.lineTo(24, 0);
    ctx.lineTo(16, 4);
    ctx.closePath();
    ctx.fill();

    // Flapping Wing
    const wingY = Math.sin(bird.wingAngle) * 5;
    ctx.fillStyle = '#ff8fa3';
    ctx.beginPath();
    ctx.ellipse(-6, wingY, 9, 6, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Party Birthday Hat on head! 🎉
    ctx.fillStyle = '#70d6ff';
    ctx.beginPath();
    ctx.moveTo(-4, -16);
    ctx.lineTo(2, -30);
    ctx.lineTo(8, -15);
    ctx.closePath();
    ctx.fill();
    // Hat pom-pom
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(2, -31, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.arc(15, -8, 14, 0, Math.PI * 2);
    ctx.arc(30, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPastelPipe(x, y, w, h, isTop) {
    ctx.save();
    // Gradient
    const grad = ctx.createLinearGradient(x, 0, x + w, 0);
    grad.addColorStop(0, '#c8b6ff');
    grad.addColorStop(1, '#b8c0ff');
    ctx.fillStyle = grad;

    // Body
    ctx.fillRect(x, y, w, h);

    // Rim
    ctx.fillStyle = '#ffd6a5';
    const rimH = 14;
    const rimY = isTop ? y + h - rimH : y;
    ctx.fillRect(x - 3, rimY, w + 6, rimH);
    ctx.restore();
  }

  function updateUI() {
    const scEl = document.getElementById('flappySana-score');
    if (scEl) scEl.textContent = `Score: ${score} / ${targetScore}`;
  }

  function winGame() {
    isRunning = false;
    cancelAnimationFrame(animId);
    window.ArcadeUtils.markGameCompleted('flappySana', score);
    setTimeout(() => {
      window.ArcadeUtils.showReward('flappySana', () => {
        if (window.ArcadeHub) window.ArcadeHub.closeGameView();
      });
    }, 400);
  }

  function gameOver() {
    isRunning = false;
    cancelAnimationFrame(animId);
    if (window.ArcadeUtils.SoundManager.playError) window.ArcadeUtils.SoundManager.playError();
    window.ArcadeUtils.showToast("Aww! Cloud crash! Tap 'Retry' to fly again! 🐥", "warning");

    const btn = document.getElementById('flappySana-retry-btn');
    if (btn) btn.style.display = 'inline-block';
  }

  function start() {
    if (!canvas) init();
    resizeCanvas();
    reset();
  }

  function reset() {
    cancelAnimationFrame(animId);
    score = 0;
    hasWon = false;
    pipes = [];
    stars = [];
    particles = [];
    pipeTimer = 0;
    bird.y = 180;
    bird.vy = 0;
    isRunning = true;

    const btn = document.getElementById('flappySana-retry-btn');
    if (btn) btn.style.display = 'none';

    updateUI();
    loop();
  }

  function stop() {
    isRunning = false;
    cancelAnimationFrame(animId);
  }

  window.FlappySanaGame = {
    start,
    reset,
    stop,
    flap
  };

  document.addEventListener('DOMContentLoaded', init);
})();
