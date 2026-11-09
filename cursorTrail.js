/**
 * ==============================================================================
 * ✨ MAGIC FAIRY DUST & HEARTS CURSOR TRAIL ✨
 * ==============================================================================
 * - Smooth 60fps canvas particle trail
 * - Emojis & glowing fairy dust (💖, ✨, 🌸, ⭐, 💕, ✦)
 * - Touch & mouse support with burst effect on tap/click
 * - Ultra-lightweight & zero CPU usage when idle
 * ==============================================================================
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__magicCursorTrailLoaded) return;
  window.__magicCursorTrailLoaded = true;

  const CONFIG = {
    maxParticles: 45,
    spawnDistance: 12, // pixels moved before spawning a particle
    colors: ['#ff70a6', '#ffd166', '#ff9ebb', '#c77dff', '#70d6ff', '#ffffff'],
    emojis: ['✨', '💖', '🌸', '⭐', '💕', '✦', '🪄']
  };

  let canvas = null;
  let ctx = null;
  let particles = [];
  let lastX = -1;
  let lastY = -1;
  let isRunning = false;
  let animationId = null;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'magic-cursor-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    canvas.style.display = 'block';

    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d', { alpha: true });

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Desktop Mouse Events
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });

    // Mobile Touch Events
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
  }

  function resize() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    if (ctx) ctx.scale(dpr, dpr);
  }

  function createParticle(x, y, isBurst = false) {
    if (particles.length > CONFIG.maxParticles && !isBurst) return;

    const isEmoji = Math.random() < 0.45;
    const emoji = isEmoji ? CONFIG.emojis[Math.floor(Math.random() * CONFIG.emojis.length)] : null;
    const color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    const angle = isBurst ? Math.random() * Math.PI * 2 : (Math.random() - 0.5) * 1.5;
    const speed = isBurst ? (Math.random() * 2.8 + 1.2) : (Math.random() * 1.2 + 0.3);

    particles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBurst ? 0.5 : 0.8), // slight upward float
      size: isEmoji ? (Math.random() * 6 + 14) : (Math.random() * 4 + 3),
      alpha: 1,
      decay: Math.random() * 0.02 + 0.018, // life duration ~50 frames
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      isEmoji: isEmoji,
      emoji: emoji,
      color: color
    });

    wakeLoop();
  }

  function burst(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      createParticle(x, y, true);
    }
  }

  function onPointerMove(e) {
    handleMove(e.clientX, e.clientY);
  }

  function onPointerDown(e) {
    burst(e.clientX, e.clientY, 8);
  }

  function onTouchMove(e) {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function onTouchStart(e) {
    if (e.touches && e.touches[0]) {
      burst(e.touches[0].clientX, e.touches[0].clientY, 8);
    }
  }

  function handleMove(x, y) {
    if (lastX === -1 || lastY === -1) {
      lastX = x;
      lastY = y;
      createParticle(x, y);
      return;
    }

    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist >= CONFIG.spawnDistance) {
      createParticle(x, y);
      lastX = x;
      lastY = y;
    }
  }

  function wakeLoop() {
    if (!isRunning) {
      isRunning = true;
      animationId = requestAnimationFrame(render);
    }
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.isEmoji) {
        ctx.font = `${Math.round(p.size)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
      } else {
        // Glowing Fairy Dust Star / Dot
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.restore();
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(render);
    } else {
      isRunning = false;
      cancelAnimationFrame(animationId);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
