/**
 * ==============================================================================
 * 🕹️ SANIYA'S BIRTHDAY ARCADE - MASTER CONTROLLER & HUB SCRIPT 🕹️
 * ==============================================================================
 * - Progress tracking (X/6 gifts)
 * - Game view switcher
 * - Easter egg listener (tap 5 times)
 * - Grand Finale Cinematic Surprise with Typewriter Letter & Blowable Candles
 * ==============================================================================
 */

(function () {
  'use strict';

  let easterEggTaps = 0;
  let easterEggTimer = null;
  let activeGameId = null;

  function initArcadeHub() {
    renderGameCards();
    updateProgress();
    attachEasterEgg();
  }

  // ─── 1. RENDER 6 GAME CARDS ───
  function renderGameCards() {
    const grid = document.getElementById('arcade-games-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const gamesMeta = [
      {
        id: 'flappySana',
        icon: '🐥',
        config: window.ARCADE_CONTENT.flappySana,
        starter: () => window.FlappySanaGame && window.FlappySanaGame.start()
      },
      {
        id: 'balloonPop',
        icon: '🎈',
        config: window.ARCADE_CONTENT.balloonPop,
        starter: () => window.BalloonPopGame && window.BalloonPopGame.start()
      },
      {
        id: 'spinWheel',
        icon: '🎡',
        config: window.ARCADE_CONTENT.spinWheel,
        starter: () => window.SpinWheelGame && window.SpinWheelGame.start()
      },
      {
        id: 'secretVault',
        icon: '🔐',
        config: window.ARCADE_CONTENT.secretVault,
        starter: () => window.SecretVaultGame && window.SecretVaultGame.start()
      }
    ];

    gamesMeta.forEach(g => {
      const isDone = window.ArcadeUtils.isGameCompleted(g.id);
      const best = window.ArcadeUtils.getBestScore(g.id);

      const card = document.createElement('div');
      card.className = 'arcade-game-card';
      card.id = `card-${g.id}`;

      card.innerHTML = `
        <div class="card-top-row">
          <div class="game-icon-box">${g.icon}</div>
          <span class="game-status-badge ${isDone ? 'badge-completed' : 'badge-locked'}">
            ${isDone ? '✓ Completed' : 'Tap to Play'}
          </span>
        </div>

        <div class="game-info-wrap">
          <span class="game-difficulty-tag">${g.config.difficulty || 'Fun'}</span>
          <h3>${g.config.title}</h3>
          <p>${g.config.description}</p>
        </div>

        <div class="card-action-row">
          <span class="game-best-score">
            ${isDone ? (best > 0 ? `Best Score: ${best}` : 'Gift Unlocked! 🎁') : 'Reward: Secret Gift'}
          </span>
          <button type="button" class="arcade-btn-play" aria-label="Play ${g.config.title}">
            ${isDone ? 'Play Again ↻' : 'Play ➜'}
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        window.ArcadeUtils.SoundManager.playPop();
        openGameView(g.id, g.starter);
      });

      grid.appendChild(card);
    });
  }

  // ─── 2. PROGRESS BAR & GIFTS UNLOCKED ───
  function updateProgress() {
    const total = 4;
    const count = window.ArcadeUtils.getCompletedCount();
    const percent = Math.min(100, Math.round((count / total) * 100));

    const fill = document.getElementById('arcade-progress-fill');
    if (fill) fill.style.width = `${percent}%`;

    const countPill = document.getElementById('progress-count-pill');
    if (countPill) countPill.textContent = `${count}/${total} Gifts Unlocked`;

    const finaleCta = document.getElementById('arcade-finale-cta');
    if (finaleCta) {
      if (count >= total) {
        finaleCta.style.display = 'inline-flex';
      } else {
        finaleCta.style.display = 'none';
      }
    }

    renderGameCards();
  }

  // ─── 3. GAME VIEW NAVIGATION ───
  function openGameView(gameId, starterFn) {
    activeGameId = gameId;

    // Hide all game views
    document.querySelectorAll('.arcade-game-view').forEach(v => v.classList.add('hidden'));

    // Show target game view
    const targetView = document.getElementById(`${gameId}-view`);
    if (targetView) {
      targetView.classList.remove('hidden');
      targetView.scrollTop = 0;
      if (typeof starterFn === 'function') starterFn();
    }
  }

  function closeGameView() {
    // If active game has a stop hook
    if (activeGameId === 'flappySana' && window.FlappySanaGame) window.FlappySanaGame.stop();

    document.querySelectorAll('.arcade-game-view').forEach(v => v.classList.add('hidden'));
    activeGameId = null;
    updateProgress();
  }

  // ─── 4. EASTER EGG (TAP 5 TIMES) ───
  function attachEasterEgg() {
    const title = document.getElementById('arcade-hero-title');
    if (!title) return;

    title.addEventListener('click', () => {
      easterEggTaps++;
      window.ArcadeUtils.SoundManager.playClick();

      clearTimeout(easterEggTimer);
      easterEggTimer = setTimeout(() => { easterEggTaps = 0; }, 2000);

      if (easterEggTaps >= (window.ARCADE_CONTENT.arcadeHub.easterEggTriggerCount || 5)) {
        easterEggTaps = 0;
        window.ArcadeUtils.SoundManager.playFanfare();
        window.ArcadeUtils.launchConfetti(90);
        alert(window.ARCADE_CONTENT.arcadeHub.easterEggMessage);
      }
    });
  }

  // ─── 5. GRAND FINALE CINEMATIC SURPRISE ───
  function triggerGrandFinale() {
    window.ArcadeUtils.SoundManager.playFanfare();
    window.ArcadeUtils.launchConfetti(120);

    const config = window.ARCADE_CONTENT.grandFinale;

    let overlay = document.getElementById('grand-finale-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'grand-finale-overlay';
      overlay.className = 'grand-finale-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="finale-card-stage">
        <div class="finale-badge">${config.badge}</div>
        <h1 class="finale-title">${config.title}</h1>
        <p style="color:var(--arcade-text-sub);">${config.subtitle}</p>

        <!-- The Typewriter Letter Card -->
        <div class="finale-letter-scroll">
          <div class="finale-salutation">${config.letterSalutation}</div>
          <div class="finale-body-text" id="finale-typewriter-text"></div>
          <div class="finale-signoff">
            ${config.letterSignoff}<br>
            <strong>${config.letterAuthor}</strong>
          </div>
        </div>

        <!-- Interactive Finale Cake with Candles -->
        <div class="finale-cake-interactive">
          <div class="cake-candles-row" id="finale-candles-row">
            <div class="interactive-candle" onclick="blowFinaleCandle(0)">
              <div class="candle-flame" id="flame-0"></div>
              <div class="candle-stick"></div>
            </div>
            <div class="interactive-candle" onclick="blowFinaleCandle(1)">
              <div class="candle-flame" id="flame-1"></div>
              <div class="candle-stick"></div>
            </div>
            <div class="interactive-candle" onclick="blowFinaleCandle(2)">
              <div class="candle-flame" id="flame-2"></div>
              <div class="candle-stick"></div>
            </div>
            <div class="interactive-candle" onclick="blowFinaleCandle(3)">
              <div class="candle-flame" id="flame-3"></div>
              <div class="candle-stick"></div>
            </div>
            <div class="interactive-candle" onclick="blowFinaleCandle(4)">
              <div class="candle-flame" id="flame-4"></div>
              <div class="candle-stick"></div>
            </div>
          </div>
          <div class="interactive-cake-box" onclick="blowAllFinaleCandles()" title="Tap to blow all candles!">
            <div class="cake-tiers-svg">🎂</div>
          </div>
          <p id="finale-cake-prompt" style="color:var(--arcade-gold); font-size:0.92rem; font-weight:700;">
            ${config.cakeWishPrompt}
          </p>
        </div>

        <button class="arcade-btn-primary" onclick="closeGrandFinale()" style="margin-top:10px; background:linear-gradient(135deg, #ffd166, #ff758c); color:#21091a; font-weight:800; padding:10px 28px; border-radius:9999px; border:none; cursor:pointer;">
          Back to Arcade 🎮
        </button>
      </div>
    `;

    overlay.style.display = 'flex';

    // Typewriter effect
    typewriterLetter(config.letterParagraphs);
  }

  function typewriterLetter(paragraphs) {
    const container = document.getElementById('finale-typewriter-text');
    if (!container) return;
    container.innerHTML = '';

    paragraphs.forEach((pText) => {
      const p = document.createElement('p');
      p.textContent = pText;
      container.appendChild(p);
    });
  }

  let candlesBlown = 0;
  window.blowFinaleCandle = function (idx) {
    const flame = document.getElementById(`flame-${idx}`);
    if (flame && !flame.classList.contains('blown')) {
      flame.classList.add('blown');
      candlesBlown++;
      window.ArcadeUtils.SoundManager.playPop();

      if (candlesBlown >= 5) {
        onAllCandlesBlown();
      }
    }
  };

  window.blowAllFinaleCandles = function () {
    for (let i = 0; i < 5; i++) {
      const flame = document.getElementById(`flame-${i}`);
      if (flame) flame.classList.add('blown');
    }
    candlesBlown = 5;
    window.ArcadeUtils.SoundManager.playPop();
    onAllCandlesBlown();
  };

  function onAllCandlesBlown() {
    window.ArcadeUtils.SoundManager.playWin();
    window.ArcadeUtils.launchConfetti(120);
    const prompt = document.getElementById('finale-cake-prompt');
    if (prompt) {
      prompt.textContent = window.ARCADE_CONTENT.grandFinale.cakeBlownMessage;
      prompt.style.color = '#10b981';
      prompt.style.fontSize = '1.05rem';
    }
  }

  window.closeGrandFinale = function () {
    const overlay = document.getElementById('grand-finale-overlay');
    if (overlay) overlay.style.display = 'none';
  };

  // Global exposure
  window.ArcadeHub = {
    init: initArcadeHub,
    openGameView,
    closeGameView,
    updateProgress,
    triggerGrandFinale
  };

  document.addEventListener('DOMContentLoaded', () => {
    initArcadeHub();
  });
})();
