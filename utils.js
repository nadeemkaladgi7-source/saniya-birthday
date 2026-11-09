/**
 * ==============================================================================
 * 🛠️ SANIYA'S BIRTHDAY ARCADE - CORE UTILITIES & HELPERS 🛠️
 * ==============================================================================
 * - Offline Web Audio Synthesizer (Pops, Chimes, Fanfare with Mute toggle)
 * - Standalone 60fps Canvas Confetti & Sparkles
 * - LocalStorage Progress & Score Tracker
 * - Floating Toast Notifications
 * ==============================================================================
 */

(function () {
  'use strict';

  // ─── 1. LOCAL STORAGE PROGRESS TRACKER ───
  const STORAGE_KEY = 'saniya_arcade_save_v3';

  function getSaveData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return {
      completedGames: {}, // { 'saniyadle': true, ... }
      bestScores: {},     // { 'catcher': 180, ... }
      soundMuted: true,   // Default OFF to avoid surprise as requested
      easterEggUnlocked: false
    };
  }

  function saveStorageData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }

  // ─── 2. WEB AUDIO API SYNTHESIZER ───
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const SoundManager = {
    isMuted() {
      return getSaveData().soundMuted !== false; // Default true (muted)
    },

    setMuted(muted) {
      const data = getSaveData();
      data.soundMuted = !!muted;
      saveStorageData(data);
      this.updateUI();
    },

    toggleMute() {
      this.setMuted(!this.isMuted());
      return this.isMuted();
    },

    updateUI() {
      const btn = document.getElementById('arcade-sound-toggle');
      if (btn) {
        const muted = this.isMuted();
        btn.innerHTML = muted ? '🔇 <span>Sound: Off</span>' : '🔊 <span>Sound: On</span>';
        btn.setAttribute('aria-label', muted ? 'Turn sound on' : 'Turn sound off');
        btn.classList.toggle('sound-active', !muted);
      }
    },

    playPop() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    },

    playChime() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.07);
          gain.gain.setValueAtTime(0.12, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.3);
        });
      } catch (e) {}
    },

    playClick() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
      } catch (e) {}
    },

    playError() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        [280, 220].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.08, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.15);
        });
      } catch (e) {}
    },

    playWin() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.18, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.4);
        });
      } catch (e) {}
    },

    playFanfare() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const melody = [
          { f: 523.25, d: 0.12, t: 0 },
          { f: 659.25, d: 0.12, t: 0.12 },
          { f: 783.99, d: 0.15, t: 0.24 },
          { f: 1046.5, d: 0.4,  t: 0.42 }
        ];
        melody.forEach(n => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(n.f, now + n.t);
          gain.gain.setValueAtTime(0.2, now + n.t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + n.t);
          osc.stop(now + n.t + n.d);
        });
      } catch (e) {}
    },

    playSwoosh() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } catch (e) {}
    },

    playFlap() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    },

    playCrack() {
      if (this.isMuted()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        [500, 1200, 300].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.02);
          gain.gain.setValueAtTime(0.15, now + idx * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.02 + 0.07);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.02);
          osc.stop(now + idx * 0.02 + 0.07);
        });
      } catch (e) {}
    }
  };

  // ─── 3. STANDALONE CANVAS CONFETTI & SPARKLES ───
  let confettiCanvas = null;
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimId = null;

  function initConfettiCanvas() {
    if (!confettiCanvas) {
      confettiCanvas = document.getElementById('arcade-confetti-canvas');
      if (!confettiCanvas) {
        confettiCanvas = document.createElement('canvas');
        confettiCanvas.id = 'arcade-confetti-canvas';
        confettiCanvas.className = 'arcade-confetti-canvas';
        document.body.appendChild(confettiCanvas);
      }
      confettiCtx = confettiCanvas.getContext('2d');
      resizeConfettiCanvas();
      window.addEventListener('resize', resizeConfettiCanvas);
    }
  }

  function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function launchArcadeConfetti(count = 75) {
    initConfettiCanvas();
    if (!confettiCtx) return;

    const colors = ['#ff6eb9', '#ffb347', '#ffd166', '#a0e7e5', '#b4f8c8', '#c299db', '#ffffff'];
    const width = confettiCanvas.width;
    const height = confettiCanvas.height;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.4 - height * 0.2,
        w: Math.random() * 10 + 6,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 4 + 3,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 8,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        opacity: 1
      });
    }

    if (!confettiAnimId) {
      renderConfetti();
    }
  }

  function renderConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;

      if (p.y > confettiCanvas.height) {
        p.opacity -= 0.05;
      }

      if (p.opacity <= 0) {
        confettiParticles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rot * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillStyle = p.color;

      if (p.shape === 'rect') {
        confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      }
      confettiCtx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimId = requestAnimationFrame(renderConfetti);
    } else {
      confettiAnimId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // ─── 4. FLOATING TOAST NOTIFICATION ───
  function showArcadeToast(msg, type = 'info', duration = 3000) {
    let container = document.getElementById('arcade-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'arcade-toast-container';
      container.className = 'arcade-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `arcade-toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '🎉' : type === 'warning' ? '⚠️' : '🌸'}</span> <span class="toast-msg">${msg}</span>`;
    container.appendChild(toast);

    if (type === 'success') SoundManager.playChime();
    else if (type === 'warning') SoundManager.playError();
    else SoundManager.playPop();

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  // ─── 5. ARCADE REWARD MODAL HELPER ───
  function showGameReward(gameKey, onRewardClosed) {
    const content = window.ARCADE_CONTENT;
    const gameContent = content ? content[gameKey] : null;
    if (!gameContent) return;

    SoundManager.playWin();
    launchArcadeConfetti(90);

    const overlay = document.createElement('div');
    overlay.className = 'arcade-reward-modal-overlay';
    overlay.innerHTML = `
      <div class="arcade-reward-modal-card">
        <div class="reward-sparkles-row">✨ 🎁 ✨</div>
        <div class="reward-badge-chip">SURPRISE UNLOCKED!</div>
        <h3 class="reward-title">${gameContent.rewardTitle || 'Gift Unlocked!'}</h3>
        <p class="reward-desc">${gameContent.rewardText || 'You did it, Saniya!'}</p>
        <p class="reward-message-quote">"${gameContent.winMessage || 'Keep shining!'}"</p>
        <button class="arcade-btn-primary reward-claim-btn" id="claim-reward-btn">
          Collect Gift & Continue 💖
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const claimBtn = overlay.querySelector('#claim-reward-btn');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        SoundManager.playPop();
        overlay.classList.add('reward-modal-exit');
        setTimeout(() => {
          overlay.remove();
          if (typeof onRewardClosed === 'function') onRewardClosed();
        }, 300);
      });
    }
  }

  // ─── 6. EXPORT GLOBAL ARCADE UTILS ───
  window.ArcadeUtils = {
    // Storage
    getSaveData,
    saveStorageData,
    isGameCompleted(id) {
      return !!getSaveData().completedGames[id];
    },
    markGameCompleted(id, score = null) {
      const data = getSaveData();
      data.completedGames[id] = true;
      if (score !== null) {
        if (!data.bestScores[id] || score > data.bestScores[id]) {
          data.bestScores[id] = score;
        }
      }
      saveStorageData(data);
      if (window.ArcadeHub && typeof window.ArcadeHub.updateProgress === 'function') {
        window.ArcadeHub.updateProgress();
      }
    },
    getBestScore(id) {
      return getSaveData().bestScores[id] || 0;
    },
    getCompletedCount() {
      const data = getSaveData();
      const activeIds = ['flappySana', 'balloonPop', 'spinWheel', 'secretVault'];
      return activeIds.filter(id => Boolean(data.completedGames && data.completedGames[id])).length;
    },
    resetProgress() {
      saveStorageData({
        completedGames: {},
        bestScores: {},
        soundMuted: SoundManager.isMuted(),
        easterEggUnlocked: false
      });
      if (window.ArcadeHub && typeof window.ArcadeHub.updateProgress === 'function') {
        window.ArcadeHub.updateProgress();
      }
    },

    // Audio
    SoundManager,

    // Visuals & Assets
    resolveAssetPath(path) {
      if (!path) return '';
      if (path.startsWith('assets/')) {
        return '../' + path;
      }
      return path;
    },
    launchConfetti: launchArcadeConfetti,
    showToast: showArcadeToast,
    showReward: showGameReward
  };

  // Auto-init sound UI on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    SoundManager.updateUI();
  });
})();
