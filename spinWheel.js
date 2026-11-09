/**
 * ==============================================================================
 * 🎡 SANIYA KI FARMAISH - WHEEL OF DEMANDS (AFREEN BIRTHDAY STYLE) 🍦
 * ==============================================================================
 * - High-precision canvas wheel rendering with pastel gradients
 * - Guaranteed realistic landing on "Ice Cream Party on Nadeem 🍦"
 * - Audio ticking sound during spin & celebration fanfare on land
 * - Official VIP Demand Voucher Modal with unique code
 * - Unlocks Gift #3 upon claiming the voucher!
 * ==============================================================================
 */

(function () {
  'use strict';

  let wheelCanvas = null;
  let isWheelSpinning = false;
  let currentWheelAngle = 0;

  const wheelPrizes = [
    { label: "Pizza Party 🍕", color: "#ff8da1", text: "#ffffff" },
    { label: "Ice Cream Party 🍦", color: "#ffd1dc", text: "#5c1b30" },
    { label: "Win Next Fight 🎟️", color: "#ffb6c1", text: "#5c1b30" },
    { label: "1 Hr Rant Pass 🗣️", color: "#fae3cb", text: "#5c1b30" },
    { label: "Coffee & Chill ☕", color: "#fce4ec", text: "#5c1b30" },
    { label: "Mystery Wish 🎁", color: "#ffd700", text: "#5c3800" }
  ];

  function init() {}

  function start() {
    renderStage();
  }

  function renderStage() {
    const stage = document.getElementById('spinWheel-stage');
    if (!stage) return;

    stage.innerHTML = `
      <div class="wheel-stage-wrapper">
        <div class="wheel-sparkle-pill">SANIYA KI FARMAISH 🎡</div>
        <h2 class="wheel-main-title">Wheel of Demands</h2>
        <p class="wheel-sub-desc">Wheel ghumao aur apna official birthday treat voucher jeeto!</p>

        <!-- The Physical Wheel -->
        <div class="wheel-stage-container">
          <div class="wheel-pointer-pin">▼</div>
          <div class="wheel-outer-ring">
            <canvas id="saniya-wheel-canvas" width="340" height="340"></canvas>
            <div class="wheel-center-pin" id="saniya-wheel-spin-pin">
              <span class="pin-text">SPIN</span>
            </div>
          </div>
        </div>

        <div class="wheel-actions-bar">
          <button type="button" class="arcade-btn-play spin-wheel-cta-btn" id="saniya-spin-btn">
            🎡 Spin The Wheel!
          </button>
        </div>

        <!-- Voucher Reveal Modal (Afreen Style) -->
        <div class="wheel-voucher-modal" id="saniya-voucher-modal">
          <div class="voucher-backdrop"></div>
          <div class="voucher-card">
            <div class="voucher-gold-seal">VIP PASS 🎟️</div>
            <h3 class="voucher-title">🎉 OFFICIAL DEMAND VOUCHER 🎉</h3>
            <div class="voucher-prize-name" id="saniya-voucher-prize">Ice Cream Party on Nadeem 🍦</div>
            <p class="voucher-disclaimer">
              Presented to Birthday Queen <strong>Saniya (Sana)</strong>.<br>
              Nadeem is strictly obligated by Bestie Law to fulfill this demand! 🤝✨
            </p>
            <div class="voucher-code-pill">CODE: #QUEEN-SANA-2026</div>
            <button type="button" class="arcade-btn-play voucher-claim-btn" id="saniya-voucher-claim-btn">
              Claim Voucher & Gift #3 💖
            </button>
          </div>
        </div>

      </div>
    `;

    wheelCanvas = document.getElementById('saniya-wheel-canvas');
    drawWheel();

    const spinBtn = document.getElementById('saniya-spin-btn');
    const pinBtn = document.getElementById('saniya-wheel-spin-pin');
    const claimBtn = document.getElementById('saniya-voucher-claim-btn');

    if (spinBtn) spinBtn.addEventListener('click', spinWheel);
    if (pinBtn) pinBtn.addEventListener('click', spinWheel);
    if (claimBtn) claimBtn.addEventListener('click', claimReward);
  }

  function drawWheel() {
    if (!wheelCanvas) return;
    const ctx = wheelCanvas.getContext('2d');
    const width = wheelCanvas.width;
    const height = wheelCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 4;
    const sliceAngle = (2 * Math.PI) / wheelPrizes.length;

    ctx.clearRect(0, 0, width, height);

    wheelPrizes.forEach((prize, idx) => {
      const angle = idx * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = prize.text;
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(prize.label, radius - 16, 5);
      ctx.restore();
    });
  }

  function spinWheel() {
    if (isWheelSpinning) return;
    isWheelSpinning = true;

    const spinBtn = document.getElementById('saniya-spin-btn');
    if (spinBtn) spinBtn.disabled = true;

    // Guaranteed landing on Ice Cream Party 🍦 (Index 1) with natural realistic jitter (Afreen style)
    const pickedIdx = 1; // "Ice Cream Party 🍦"
    const sliceDeg = 360 / wheelPrizes.length;
    const sliceCenter = (pickedIdx + 0.5) * sliceDeg;
    const naturalJitter = (Math.random() - 0.5) * 18;
    const targetDegUnderPointer = (270 - sliceCenter + naturalJitter + 360) % 360;

    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const finalAngle = currentWheelAngle + extraSpins + ((targetDegUnderPointer - (currentWheelAngle % 360) + 360) % 360);

    wheelCanvas.style.transition = 'transform 4.2s cubic-bezier(0.15, 0.9, 0.2, 1)';
    wheelCanvas.style.transform = `rotate(${finalAngle}deg)`;

    // Tick sound during spin
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      if (window.ArcadeUtils.SoundManager.playClick) window.ArcadeUtils.SoundManager.playClick();
      tickCount++;
      if (tickCount >= 24) clearInterval(tickInterval);
    }, 170);

    setTimeout(() => {
      currentWheelAngle = finalAngle;
      isWheelSpinning = false;
      if (spinBtn) spinBtn.disabled = false;

      if (window.ArcadeUtils.SoundManager.playWin) window.ArcadeUtils.SoundManager.playWin();
      if (window.ArcadeUtils.launchConfetti) window.ArcadeUtils.launchConfetti(85);

      const modal = document.getElementById('saniya-voucher-modal');
      if (modal) modal.classList.add('show');
    }, 4300);
  }

  function claimReward() {
    const modal = document.getElementById('saniya-voucher-modal');
    if (modal) modal.classList.remove('show');

    window.ArcadeUtils.markGameCompleted('spinWheel');
    window.ArcadeUtils.showReward('spinWheel', () => {
      if (window.ArcadeHub) window.ArcadeHub.closeGameView();
    });
  }

  function reset() {
    start();
  }

  window.SpinWheelGame = {
    start,
    reset,
    spin: spinWheel
  };

  document.addEventListener('DOMContentLoaded', init);
})();
