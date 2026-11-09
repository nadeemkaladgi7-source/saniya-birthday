/**
 * ==============================================================================
 * 🔐 SECRET MYSTERY VAULT (GRAND FINALE CLIMAX) 🗝️✨
 * ==============================================================================
 * - Interactive Rose-Gold Vault with Tactile Numeric Keypad
 * - Birthday Riddle Clue: 17th November (1711)
 * - 3D Vault Door Opening Animation with Radiant Golden Beams
 * - Reveals the Golden Finale Key to Trigger the Grand Finale!
 * ==============================================================================
 */

(function () {
  'use strict';

  let enteredCode = "";
  let targetCode = "1711";
  let isUnlocked = false;

  function init() {
    // Lazy initialized on start()
  }

  function start() {
    const config = (window.ARCADE_CONTENT && window.ARCADE_CONTENT.secretVault) || {};
    targetCode = config.secretCode || "1711";
    enteredCode = "";
    isUnlocked = false;

    renderStage();
  }

  function renderStage() {
    const stage = document.getElementById('secretVault-stage');
    if (!stage) return;

    stage.innerHTML = `
      <div class="vault-container">
        
        <!-- Riddle Clue Card -->
        <div class="vault-clue-card">
          <div class="vault-clue-badge">✦ THE FINAL MASTER KEY ✦</div>
          <h3 class="vault-clue-title">Solve The Birthday Passcode 🔐</h3>
          <p class="vault-clue-hint">
            💡 Clue: The most special 4-digit date in November when an angel was born (Date + Month: DDMM)...
          </p>
        </div>

        <!-- Physical Vault Safe -->
        <div class="vault-safe-door-frame">
          <div class="vault-safe-door ${isUnlocked ? 'vault-door-open' : ''}" id="vault-safe-door">
            
            <!-- Vault Wheel -->
            <div class="vault-wheel-hub" id="vault-wheel">
              <div class="vault-wheel-handle handle-1"></div>
              <div class="vault-wheel-handle handle-2"></div>
              <div class="vault-wheel-handle handle-3"></div>
              <div class="vault-wheel-handle handle-4"></div>
              <div class="vault-wheel-center">🗝️</div>
            </div>

            <!-- Digital Display Screen -->
            <div class="vault-screen" id="vault-screen">
              <span class="vault-digits" id="vault-digits">_ _ _ _</span>
            </div>

            <!-- Numeric Keypad -->
            <div class="vault-keypad">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `
                <button type="button" class="vault-key" data-val="${n}">${n}</button>
              `).join('')}
              <button type="button" class="vault-key vault-key-fn" data-val="C">✕ C</button>
              <button type="button" class="vault-key" data-val="0">0</button>
              <button type="button" class="vault-key vault-key-fn vault-key-ok" data-val="OK">✓ OK</button>
            </div>

          </div>

          <!-- Inside Chamber (Visible when Door Opens) -->
          <div class="vault-chamber ${isUnlocked ? 'chamber-revealed' : ''}" id="vault-chamber">
            <div class="chamber-glow-rays"></div>
            <div class="chamber-key-trophy">🗝️</div>
            <h4 class="chamber-title">THE GRAND FINALE KEY</h4>
            <p class="chamber-desc">All 4 arcade secrets unlocked! You are ready for the ultimate birthday surprise, Sana!</p>
            <button type="button" class="arcade-btn-play chamber-unlock-btn" id="chamber-unlock-btn">
              Open Grand Finale Now! 🎉✨
            </button>
          </div>
        </div>

      </div>
    `;

    // Keypad listeners
    const keys = stage.querySelectorAll('.vault-key');
    keys.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        pressKey(val);
      });
    });

    const chamberBtn = document.getElementById('chamber-unlock-btn');
    if (chamberBtn) {
      chamberBtn.addEventListener('click', triggerFinale);
    }
  }

  function pressKey(val) {
    if (isUnlocked) return;

    if (val === 'C') {
      if (window.ArcadeUtils.SoundManager.playClick) window.ArcadeUtils.SoundManager.playClick();
      enteredCode = "";
      updateDisplay();
      return;
    }

    if (val === 'OK') {
      verifyCode();
      return;
    }

    if (enteredCode.length < 4) {
      if (window.ArcadeUtils.SoundManager.playClick) window.ArcadeUtils.SoundManager.playClick();
      enteredCode += val;
      updateDisplay();

      // Auto check when 4 digits entered
      if (enteredCode.length === 4) {
        setTimeout(verifyCode, 200);
      }
    }
  }

  function updateDisplay() {
    const el = document.getElementById('vault-digits');
    if (!el) return;

    if (enteredCode.length === 0) {
      el.textContent = '_ _ _ _';
      el.className = 'vault-digits';
      return;
    }

    const masked = enteredCode.split('').map(() => '●').join(' ');
    el.textContent = masked + ' ' + '_ '.repeat(4 - enteredCode.length).trim();
  }

  function verifyCode() {
    const screenEl = document.getElementById('vault-screen');
    const digitsEl = document.getElementById('vault-digits');

    if (enteredCode === targetCode) {
      // SUCCESS!
      isUnlocked = true;
      if (digitsEl) digitsEl.textContent = 'OPEN! ✨';
      if (screenEl) screenEl.classList.add('screen-success');

      if (window.ArcadeUtils.SoundManager.playWin) window.ArcadeUtils.SoundManager.playWin();
      if (window.ArcadeUtils.launchConfetti) window.ArcadeUtils.launchConfetti(80);

      // Spin vault wheel
      const wheel = document.getElementById('vault-wheel');
      if (wheel) wheel.classList.add('wheel-spinning');

      // Open door after wheel spins
      setTimeout(() => {
        const door = document.getElementById('vault-safe-door');
        const chamber = document.getElementById('vault-chamber');
        if (door) door.classList.add('vault-door-open');
        if (chamber) chamber.classList.add('chamber-revealed');
        if (window.ArcadeUtils.SoundManager.playFanfare) window.ArcadeUtils.SoundManager.playFanfare();
      }, 700);

    } else {
      // WRONG CODE
      if (window.ArcadeUtils.SoundManager.playError) window.ArcadeUtils.SoundManager.playError();
      if (screenEl) screenEl.classList.add('screen-error');
      if (digitsEl) digitsEl.textContent = 'ERR! ❌';

      window.ArcadeUtils.showToast("Wrong Code! Hint: Saniya ki birthday date (17 Nov -> 1711) socho 🙈", "warning");

      setTimeout(() => {
        enteredCode = "";
        if (screenEl) screenEl.classList.remove('screen-error');
        updateDisplay();
      }, 900);
    }
  }

  function triggerFinale() {
    window.ArcadeUtils.markGameCompleted('secretVault');
    if (window.ArcadeHub) {
      window.ArcadeHub.closeGameView();
      setTimeout(() => {
        window.ArcadeHub.triggerGrandFinale();
      }, 350);
    }
  }

  function reset() {
    start();
  }

  window.SecretVaultGame = {
    start,
    reset
  };

  document.addEventListener('DOMContentLoaded', init);
})();
