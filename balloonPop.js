/**
 * ==============================================================================
 * 🎈 BALLOON POP WISHES (INTERACTIVE BIRTHDAY SURPRISES) ✨
 * ==============================================================================
 * - 8 Floating Pastel Balloons with Physics Bobbing
 * - Realistic Pop Sound & Confetti Burst
 * - Reveals Heartfelt Polaroid Compliments & Birthday Wishes
 * - Unlocks Gift #4 upon popping all 8 balloons!
 * ==============================================================================
 */

(function () {
  'use strict';

  let wishes = [];
  let poppedIds = new Set();

  function init() {
    // Lazy initialized on start()
  }

  function start() {
    const config = (window.ARCADE_CONTENT && window.ARCADE_CONTENT.balloonPop) || {};
    wishes = config.wishes || [];
    poppedIds = new Set();
    renderStage();
  }

  function renderStage() {
    const stage = document.getElementById('balloonPop-stage');
    if (!stage) return;

    const count = poppedIds.size;
    const total = wishes.length;

    stage.innerHTML = `
      <div class="balloon-game-container">
        <!-- Header Bar -->
        <div class="balloon-stats-bar">
          <span class="balloon-counter-tag">🎈 Balloons Popped: ${count}/${total}</span>
          <span style="font-size:0.85rem; color:var(--arcade-text-muted);">
            Tap any floating balloon to pop & reveal its secret wish!
          </span>
        </div>

        <!-- Floating Balloons Sky -->
        <div class="balloon-sky-grid" id="balloon-sky-grid">
          ${wishes.map((w, idx) => {
            const isPopped = poppedIds.has(w.id);
            return `
              <div class="balloon-item ${isPopped ? 'balloon-popped' : ''}" 
                   style="--balloon-color: ${w.color}; --bob-delay: ${(idx * 0.35).toFixed(2)}s;"
                   data-id="${w.id}">
                <div class="balloon-sphere">
                  <span class="balloon-shine"></span>
                  <span class="balloon-number">${idx + 1}</span>
                </div>
                <div class="balloon-knot"></div>
                <div class="balloon-string"></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Attach click listeners to all balloons
    const items = stage.querySelectorAll('.balloon-item:not(.balloon-popped)');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const id = parseInt(el.getAttribute('data-id'), 10);
        popBalloon(id, el);
      });
    });

    // Check if all are already popped
    if (count >= total && total > 0) {
      handleAllPopped();
    }
  }

  function popBalloon(id, el) {
    if (poppedIds.has(id)) return;
    poppedIds.add(id);

    // Audio & Confetti
    if (window.ArcadeUtils.SoundManager.playPop) window.ArcadeUtils.SoundManager.playPop();
    if (window.ArcadeUtils.launchConfetti) window.ArcadeUtils.launchConfetti(40);

    // Pop animation
    el.classList.add('balloon-pop-burst');

    const wish = wishes.find(w => w.id === id);
    setTimeout(() => {
      el.classList.add('balloon-popped');
      showWishModal(wish);
    }, 280);
  }

  function showWishModal(wish) {
    if (!wish) return;

    if (window.ArcadeUtils.SoundManager.playChime) window.ArcadeUtils.SoundManager.playChime();

    const overlay = document.createElement('div');
    overlay.className = 'wish-modal-overlay';
    overlay.innerHTML = `
      <div class="wish-polaroid-card">
        <div class="wish-badge-chip">${wish.badge}</div>
        <h3 class="wish-card-title">${wish.title}</h3>
        <p class="wish-card-body">"${wish.text}"</p>
        <button type="button" class="arcade-btn-play wish-close-btn" id="wish-close-btn">
          Keep Wish In My Heart 💖
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const btn = overlay.querySelector('#wish-close-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (window.ArcadeUtils.SoundManager.playClick) window.ArcadeUtils.SoundManager.playClick();
        overlay.classList.add('wish-modal-exit');
        setTimeout(() => {
          overlay.remove();
          renderStage();
        }, 250);
      });
    }
  }

  function handleAllPopped() {
    window.ArcadeUtils.markGameCompleted('balloonPop');
    setTimeout(() => {
      window.ArcadeUtils.showReward('balloonPop', () => {
        if (window.ArcadeHub) window.ArcadeHub.closeGameView();
      });
    }, 500);
  }

  function reset() {
    start();
  }

  window.BalloonPopGame = {
    start,
    reset
  };

  document.addEventListener('DOMContentLoaded', init);
})();
