
// ─── DUAL ASSET FALLBACK (HANDLES BOTH ROOT & ASSETS/ FOLDER ON GITHUB) ───
window.__assetFallbackInstalled = true;
window.addEventListener('error', function(e) {
  if (e.target && e.target.tagName === 'IMG') {
    const src = e.target.getAttribute('src');
    if (src && !e.target.dataset.triedFallback) {
      e.target.dataset.triedFallback = 'true';
      if (src.startsWith('assets/')) {
        e.target.src = src.replace('assets/', '');
      } else {
        e.target.src = 'assets/' + src;
      }
    }
  }
}, true);

/**
 * ===================================================================
 * 💖 SANIYA'S BIRTHDAY SURPRISE - CORE INTERACTION SCRIPT 💖
 * ===================================================================
 */

const CFG = window.BIRTHDAY_CONFIG || {};

/* ─── 1. WEB AUDIO API SOUND SYSTEM & FLUTE SYNTHESIZER ─── */
let audioCtx = null;
let masterGainNode = null;
let currentVolume = (CFG.music && CFG.music.defaultVolume) || 0.75;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
      masterGainNode = audioCtx.createGain();
      masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
      masterGainNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function setMasterVolume(val) {
  currentVolume = parseFloat(val);
  if (masterGainNode && audioCtx) {
    masterGainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
  }
  const bgAudio = document.getElementById('bg-audio');
  if (bgAudio) {
    bgAudio.volume = currentVolume;
  }
}

function playSoftClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.12 * currentVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);
    osc.connect(gain);
    gain.connect(masterGainNode || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {}
}

function playClockTick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(820, ctx.currentTime);
    gain.gain.setValueAtTime(0.08 * currentVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(masterGainNode || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
}

function playMidnightChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.14);
      gain.gain.linearRampToValueAtTime(0.16 * currentVolume, ctx.currentTime + idx * 0.14 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 1.2);
      osc.connect(gain);
      gain.connect(masterGainNode || ctx.destination);
      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 1.3);
    });
  } catch (e) {}
}

function playExtinguishSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.22;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.22);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18 * currentVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainNode || ctx.destination);
    noise.start();
  } catch (e) {}
}

function playCameraClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    // High click + noise burst
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.22 * currentVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(masterGainNode || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

function playScratchSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, ctx.currentTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05 * currentVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainNode || ctx.destination);
    noise.start();
  } catch (e) {}
}

function playHeartPulseSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.25 * currentVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(masterGainNode || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (e) {}
}

/* ─── REAL FLUTE SYNTHESIS: HAPPY BIRTHDAY TUNE ─── */
function playFluteHappyBirthday() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Melody notes & durations (in seconds)
    // Happy Birthday notes:
    // G4, G4, A4, G4, C5, B4
    // G4, G4, A4, G4, D5, C5
    // G4, G4, G5, E5, C5, B4, A4
    // F5, F5, E5, C5, D5, C5
    const melody = [
      { f: 392.00, d: 0.35, pause: 0.1 },  // Hap-
      { f: 392.00, d: 0.35, pause: 0.1 },  // py
      { f: 440.00, d: 0.60, pause: 0.1 },  // Birth-
      { f: 392.00, d: 0.60, pause: 0.1 },  // day
      { f: 523.25, d: 0.60, pause: 0.1 },  // to
      { f: 493.88, d: 1.10, pause: 0.2 },  // you

      { f: 392.00, d: 0.35, pause: 0.1 },  // Hap-
      { f: 392.00, d: 0.35, pause: 0.1 },  // py
      { f: 440.00, d: 0.60, pause: 0.1 },  // Birth-
      { f: 392.00, d: 0.60, pause: 0.1 },  // day
      { f: 587.33, d: 0.60, pause: 0.1 },  // to
      { f: 523.25, d: 1.10, pause: 0.2 },  // you

      { f: 392.00, d: 0.35, pause: 0.1 },  // Hap-
      { f: 392.00, d: 0.35, pause: 0.1 },  // py
      { f: 783.99, d: 0.60, pause: 0.1 },  // Birth-
      { f: 659.25, d: 0.60, pause: 0.1 },  // day
      { f: 523.25, d: 0.60, pause: 0.1 },  // dear
      { f: 493.88, d: 0.60, pause: 0.1 },  // Sa-
      { f: 440.00, d: 1.10, pause: 0.2 },  // na!

      { f: 698.46, d: 0.35, pause: 0.1 },  // Hap-
      { f: 698.46, d: 0.35, pause: 0.1 },  // py
      { f: 659.25, d: 0.60, pause: 0.1 },  // Birth-
      { f: 523.25, d: 0.60, pause: 0.1 },  // day
      { f: 587.33, d: 0.60, pause: 0.1 },  // to
      { f: 523.25, d: 1.50, pause: 0.4 }   // you!
    ];

    let startTime = ctx.currentTime + 0.1;

    melody.forEach(note => {
      // Flute oscillator (Sine wave with delicate vibrato LFO)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Vibrato LFO for natural breathy flute feeling
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5.5, startTime); // 5.5 Hz vibrato
      lfoGain.gain.setValueAtTime(note.f * 0.015, startTime); // subtle pitch vibrato
      lfo.connect(osc.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, startTime);

      // Flute envelope: gentle breath attack, sustained body, soft breath release
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.22 * currentVolume, startTime + 0.07);
      gain.gain.setValueAtTime(0.20 * currentVolume, startTime + note.d - 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

      osc.connect(gain);
      gain.connect(masterGainNode || ctx.destination);

      lfo.start(startTime);
      osc.start(startTime);
      lfo.stop(startTime + note.d);
      osc.stop(startTime + note.d);

      startTime += note.d + note.pause;
    });

  } catch (e) {
    console.error("Flute error:", e);
  }
}

/* ─── BUILT-IN ALFAAZ ACOUSTIC MELODY PROGRESSION ─── */
let loFiInterval = null;
let isLoFiPlaying = false;

function startSynthesizedLoFi() {
  if (isLoFiPlaying) return;
  isLoFiPlaying = true;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Gentle acoustic chord progression matching romantic ballad
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [293.66, 349.23, 440.00, 523.25], // Dm7
    [196.00, 246.94, 293.66, 349.23]  // G7
  ];
  let chordIdx = 0;

  function playChord() {
    if (!isLoFiPlaying) return;
    const currentChord = chords[chordIdx % chords.length];
    chordIdx++;

    currentChord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.045 * currentVolume, ctx.currentTime + i * 0.06 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 2.2);

      osc.connect(gain);
      gain.connect(masterGainNode || ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + 2.4);
    });
  }

  playChord();
  loFiInterval = setInterval(playChord, 2200);
}

function stopSynthesizedLoFi() {
  isLoFiPlaying = false;
  if (loFiInterval) {
    clearInterval(loFiInterval);
    loFiInterval = null;
  }
}

/* ─── 2. TOP PLAYLIST MUSIC PLAYER SYSTEM ─── */
const bgAudio = document.getElementById('bg-audio');
const playerTrackCover = document.getElementById('player-track-cover');
const playerTrackTitle = document.getElementById('player-track-title');
const playerTrackArtist = document.getElementById('player-track-artist');
const playerTimeCurrent = document.getElementById('player-time-current');
const playerTimeTotal = document.getElementById('player-time-total');
const playerProgressFill = document.getElementById('player-progress-fill');
const playerEqualizer = document.getElementById('player-equalizer');
const discSpinRing = document.getElementById('disc-spin-ring');
const svgPlay = document.getElementById('svg-play');
const svgPause = document.getElementById('svg-pause');

// Dual playlist: Shinchan first, then Tareef song
const PLAYLIST = (CFG.music && CFG.music.playlist && CFG.music.playlist.length) ? CFG.music.playlist : [
  {
    id: "shinchan",
    title: "Aaj Tumhara B'Day Hai 🎂",
    artist: "Shinchan Special",
    file: "shinchan_song.mp3",
    cover: "shinchan-birthday.png",
    duration: "0:37"
  },
  {
    id: "tareef",
    title: "Tareef Mein Kya Kahen ✨",
    artist: "With Love 💖",
    file: "tareef_song.mp3",
    cover: "tareef_cover.jpg",
    duration: "0:31"
  }
];

let currentTrackIndex = 0;
let isMusicActive = false;

function formatAudioTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function initMusicPlayer() {
  if (bgAudio) {
    bgAudio.addEventListener('timeupdate', onAudioTimeUpdate);
    bgAudio.addEventListener('ended', onAudioEnded);
    bgAudio.addEventListener('loadedmetadata', () => {
      if (playerTimeTotal && bgAudio.duration && !isNaN(bgAudio.duration)) {
        playerTimeTotal.textContent = formatAudioTime(bgAudio.duration);
      }
    });
    bgAudio.addEventListener('error', () => {
      const src = bgAudio.getAttribute('src') || '';
      if (src && !bgAudio.dataset.triedFallback) {
        bgAudio.dataset.triedFallback = 'true';
        if (src.startsWith('assets/')) {
          bgAudio.src = src.replace('assets/', '');
        } else {
          bgAudio.src = 'assets/' + src;
        }
        bgAudio.load();
        if (isMusicActive) bgAudio.play().catch(() => {});
      }
    });
  }

  loadTrack(0, true);

  // Attempt instant autoplay on website open
  tryAutoPlayImmediately();
}

function tryAutoPlayImmediately() {
  if (!bgAudio) return;
  bgAudio.volume = (CFG.music && CFG.music.defaultVolume) || 0.85;

  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isMusicActive = true;
      if (svgPlay) svgPlay.classList.add('hidden-icon');
      if (svgPause) svgPause.classList.remove('hidden-icon');
      if (playerEqualizer) playerEqualizer.classList.add('playing');
      if (discSpinRing) discSpinRing.classList.add('playing');
    }).catch(() => {
      // Browser autoplay policy blocked unprompted sound:
      // Unlock immediately on the very first touch, tap, key, or click anywhere!
      const unlockAudio = () => {
        if (bgAudio && bgAudio.paused) {
          bgAudio.play().then(() => {
            isMusicActive = true;
            if (svgPlay) svgPlay.classList.add('hidden-icon');
            if (svgPause) svgPause.classList.remove('hidden-icon');
            if (playerEqualizer) playerEqualizer.classList.add('playing');
            if (discSpinRing) discSpinRing.classList.add('playing');
          }).catch(e => console.log("Play gesture error:", e));
        }
        ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
          window.removeEventListener(evt, unlockAudio, true);
        });
      };
      ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAudio, { capture: true, once: true });
      });
    });
  }
}

function loadTrack(index, autoPlay = true) {
  if (index < 0) index = PLAYLIST.length - 1;
  if (index >= PLAYLIST.length) index = 0;
  currentTrackIndex = index;

  const track = PLAYLIST[currentTrackIndex];
  if (!track) return;

  if (playerTrackTitle) playerTrackTitle.textContent = track.title;
  if (playerTrackArtist) playerTrackArtist.textContent = `${track.artist} • Track ${currentTrackIndex + 1}/${PLAYLIST.length}`;
  if (playerTrackCover) playerTrackCover.src = track.cover || 'shinchan-birthday.png';
  if (playerTimeTotal) playerTimeTotal.textContent = track.duration || "0:35";
  if (playerTimeCurrent) playerTimeCurrent.textContent = "0:00";
  if (playerProgressFill) playerProgressFill.style.width = "0%";

  // Update pills
  document.querySelectorAll('.pill-btn').forEach((btn, idx) => {
    if (idx === currentTrackIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (bgAudio) {
    delete bgAudio.dataset.triedFallback;
    bgAudio.src = track.file;
    bgAudio.load();
    if (autoPlay) {
      playMusic();
    }
  }
}

function switchTrack(index) {
  playSoftClick();
  loadTrack(index, true);
}

function nextTrack() {
  playSoftClick();
  loadTrack((currentTrackIndex + 1) % PLAYLIST.length, true);
}

function prevTrack() {
  playSoftClick();
  loadTrack((currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length, true);
}

function onAudioTimeUpdate() {
  if (!bgAudio || !bgAudio.duration) return;
  const curr = bgAudio.currentTime;
  const dur = bgAudio.duration;
  if (playerTimeCurrent) playerTimeCurrent.textContent = formatAudioTime(curr);
  if (playerTimeTotal && !isNaN(dur) && dur > 0) playerTimeTotal.textContent = formatAudioTime(dur);
  if (playerProgressFill && dur > 0) {
    const pct = Math.min(100, Math.max(0, (curr / dur) * 100));
    playerProgressFill.style.width = `${pct}%`;
  }
}

function onAudioEnded() {
  // Move to next track automatically when finished
  nextTrack();
}

function seekAudio(e) {
  if (!bgAudio || !bgAudio.duration) return;
  const trackBar = document.getElementById('player-progress-track');
  if (!trackBar) return;
  const rect = trackBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  bgAudio.currentTime = ratio * bgAudio.duration;
  onAudioTimeUpdate();
}

function togglePlayMusic() {
  playSoftClick();
  if (isMusicActive) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isMusicActive = true;
  if (svgPlay) svgPlay.classList.add('hidden-icon');
  if (svgPause) svgPause.classList.remove('hidden-icon');
  if (playerEqualizer) playerEqualizer.classList.add('playing');
  if (discSpinRing) discSpinRing.classList.add('playing');

  if (bgAudio) {
    if (!bgAudio.src || bgAudio.src === '' || bgAudio.src.endsWith('/')) {
      const track = PLAYLIST[currentTrackIndex];
      bgAudio.src = track.file;
    }
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        startSynthesizedLoFi();
      });
    }
  } else {
    startSynthesizedLoFi();
  }
}

function pauseMusic() {
  isMusicActive = false;
  if (svgPlay) svgPlay.classList.remove('hidden-icon');
  if (svgPause) svgPause.classList.add('hidden-icon');
  if (playerEqualizer) playerEqualizer.classList.remove('playing');
  if (discSpinRing) discSpinRing.classList.remove('playing');

  if (bgAudio) {
    bgAudio.pause();
  }
  stopSynthesizedLoFi();
}

/* ─── 3. CLOCK DIAL TICKS & NUMERALS ─── */
(function initClockFace() {
  const tg = document.getElementById('clock-ticks');
  if (!tg) return;
  for (let i = 0; i < 60; i++) {
    const ang = (i * 6) * Math.PI / 180;
    const isMajor = (i % 5 === 0);
    const r1 = 118, r2 = isMajor ? 108 : 113;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 140 + r1 * Math.sin(ang));
    line.setAttribute('y1', 140 - r1 * Math.cos(ang));
    line.setAttribute('x2', 140 + r2 * Math.sin(ang));
    line.setAttribute('y2', 140 - r2 * Math.cos(ang));
    line.setAttribute('stroke', isMajor ? '#c2185b' : '#ff80ab');
    line.setAttribute('stroke-width', isMajor ? '2.5' : '1.3');
    line.setAttribute('stroke-linecap', 'round');
    tg.appendChild(line);
  }

  const ng = document.getElementById('clock-numerals');
  if (!ng) return;
  const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  numerals.forEach((num, idx) => {
    const ang = (idx * 30) * Math.PI / 180;
    const r = 94;
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', 140 + r * Math.sin(ang));
    t.setAttribute('y', 140 - r * Math.cos(ang));
    t.setAttribute('font-family', "'Outfit', sans-serif");
    t.setAttribute('font-size', '13');
    t.setAttribute('font-weight', '800');
    t.setAttribute('fill', '#ad1457');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = num;
    ng.appendChild(t);
  });
})();

/* ─── 4. SCREEN 1: COUNTDOWN & REVEAL ─── */
const hhEl = document.getElementById('hh');
const mmEl = document.getElementById('mm');
const ssEl = document.getElementById('ss');
const secHand = document.getElementById('second-hand');
const minHand = document.getElementById('minute-hand');
const hrHand = document.getElementById('hour-hand');

const padZero = n => String(n).padStart(2, '0');
let countLeft = (CFG.countdown && CFG.countdown.secondsToMidnight) || 5;
let countdownInterval = null;

function updateClockHands(h, m, s) {
  if (hhEl) hhEl.textContent = padZero(h);
  if (mmEl) mmEl.textContent = padZero(m);
  if (ssEl) ssEl.textContent = padZero(s);

  if (secHand) secHand.style.transform = `rotate(${s === 0 ? 360 : s * 6}deg)`;
  if (minHand) minHand.style.transform = `rotate(${(m + s / 60) * 6}deg)`;
  if (hrHand)  hrHand.style.transform  = `rotate(${((h % 12) + m / 60) * 30}deg)`;
}

function startCountdown() {
  updateClockHands(11, 59, 60 - countLeft);

  countdownInterval = setInterval(() => {
    countLeft--;
    if (countLeft > 0) {
      updateClockHands(11, 59, 60 - countLeft);
      playClockTick();
    } else {
      clearInterval(countdownInterval);
      updateClockHands(12, 0, 0);
      playMidnightChime();
      setTimeout(triggerMidnightReveal, 650);
    }
  }, 1000);
}

function skipCountdownDirectly() {
  if (countdownInterval) clearInterval(countdownInterval);
  updateClockHands(12, 0, 0);
  playMidnightChime();
  triggerMidnightReveal();
}

function triggerMidnightReveal() {
  const flash = document.getElementById('midnight-flash-burst');
  if (flash) flash.classList.add('flash');

  if (!isMusicActive) {
    playMusic();
  }

  setTimeout(() => {
    document.getElementById('curtain-left').classList.add('open');
    document.getElementById('curtain-right').classList.add('open');
    document.getElementById('countdown-wrap').classList.add('hidden');
    launchConfetti();
  }, 400);

  setTimeout(() => {
    const quizScreen = document.getElementById('quiz-screen');
    quizScreen.classList.remove('hidden-screen');
    quizScreen.classList.add('show-screen');
  }, 1100);
}

/* ─── 5. SCREEN 2: PASSCODE 2004 WITH FIRST-ATTEMPT PRANK & REEL KEYPAD ─── */
const TARGET_PASSCODE = String(CFG.passcode || "2004");
let enteredDigits = "";
let attemptCount = 0;

function updatePasscodeDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`b${i}`);
    if (!dot) continue;
    if (i < enteredDigits.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  }
}
updatePasscodeDots();

function pressKey(digit) {
  playSoftClick();
  // Ensure background music starts playing immediately if paused
  if (bgAudio && bgAudio.paused) {
    bgAudio.play().then(() => {
      isMusicActive = true;
      if (svgPlay) svgPlay.classList.add('hidden-icon');
      if (svgPause) svgPause.classList.remove('hidden-icon');
      if (playerEqualizer) playerEqualizer.classList.add('playing');
      if (discSpinRing) discSpinRing.classList.add('playing');
    }).catch(e => console.log(e));
  }

  if (enteredDigits.length < 4) {
    enteredDigits += digit;
    updatePasscodeDots();
    if (enteredDigits.length === 4) {
      setTimeout(submitPasscode, 220);
    }
  }
}

function deleteDigit() {
  playSoftClick();
  if (enteredDigits.length > 0) {
    enteredDigits = enteredDigits.slice(0, -1);
    updatePasscodeDots();
  }
}

function submitPasscode() {
  const card = document.getElementById('quiz-card');
  const txt = document.getElementById('quiz-text');
  const retryBtn = document.getElementById('retry-btn');

  if (enteredDigits.length < 4) {
    if (txt) txt.textContent = "Please enter all 4 digits! ✨";
    shakeElement(card);
    return;
  }

  // ─── PRANK LOGIC ON FIRST ATTEMPT WITH 2004 ───
  if (enteredDigits === TARGET_PASSCODE) {
    attemptCount++;

    if (attemptCount === 1 && CFG.enableFirstAttemptPrank) {
      // First attempt prank: Show Shinchan Prank Modal!
      shakeElement(card);
      openModal('prank-modal');
      enteredDigits = "";
      updatePasscodeDots();
      return;
    }

    // Correct Passcode Verified!
    if (txt) txt.textContent = CFG.successMessage || "Identity Verified! Welcome Saniya Bhootni 👻💖";
    launchConfetti();
    playMidnightChime();

    setTimeout(() => {
      document.getElementById('quiz-screen').classList.remove('show-screen');
      document.getElementById('quiz-screen').classList.add('hidden-screen');

      // Go to Tap to Begin Screen (Reel Feature)
      const tapBeginScreen = document.getElementById('tap-to-begin-screen');
      if (tapBeginScreen) {
        tapBeginScreen.classList.remove('hidden-screen');
        tapBeginScreen.classList.add('show-screen');
      } else {
        const surpriseScreen = document.getElementById('surprise-screen');
        surpriseScreen.classList.remove('hidden-screen');
        surpriseScreen.classList.add('show-screen');
      }
    }, 600);

  } else {
    // Incorrect Code
    if (txt) txt.textContent = CFG.wrongCodeMessage || "Hawww Sana Bhoot! 👻 Galat code! 2004 daalna hai, bhool gayi kya?";
    shakeElement(card);
    if (retryBtn) retryBtn.classList.remove('hidden-btn');
  }
}

function closePrankModal() {
  playSoftClick();
  closeModal('prank-modal');
  enteredDigits = "";
  updatePasscodeDots();
  const txt = document.getElementById('quiz-text');
  if (txt) txt.textContent = "Ab wapas 2004 daalo cutie! 💖";
}

function resetQuiz() {
  playSoftClick();
  enteredDigits = "";
  updatePasscodeDots();
  const txt = document.getElementById('quiz-text');
  const retryBtn = document.getElementById('retry-btn');

  if (txt) txt.textContent = "";
  if (retryBtn) retryBtn.classList.add('hidden-btn');
}

function showPasscodeHint() {
  playSoftClick();
  const txt = document.getElementById('quiz-text');
  if (txt) {
    txt.innerHTML = "<span style='color:#a83d53;'>💡 Hint: Sana ka birth year (2004) daalo! 🎂</span>";
  }
}

/* ─── TAP TO BEGIN SCREEN TRANSITION (REEL FEATURE) ─── */
function proceedFromTapToBegin() {
  playSoftClick();
  launchConfetti();
  playHeartPulseSound();

  // Ensure audio is running
  if (bgAudio && bgAudio.paused) {
    bgAudio.play().then(() => {
      isMusicActive = true;
      if (svgPlay) svgPlay.classList.add('hidden-icon');
      if (svgPause) svgPause.classList.remove('hidden-icon');
      if (playerEqualizer) playerEqualizer.classList.add('playing');
      if (discSpinRing) discSpinRing.classList.add('playing');
    }).catch(e => console.log(e));
  }

  const tapBegin = document.getElementById('tap-to-begin-screen');
  const surpriseScreen = document.getElementById('surprise-screen');

  if (tapBegin) {
    tapBegin.classList.remove('show-screen');
    tapBegin.classList.add('hidden-screen');
  }

  if (surpriseScreen) {
    surpriseScreen.classList.remove('hidden-screen');
    surpriseScreen.classList.add('show-screen');
  }
}

function shakeElement(el) {
  if (!el) return;
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
}

/* ─── 6. SCREEN 3: TEASER / DECISION SCREEN ─── */
let noClickCount = 0;

function handleChoice(choice) {
  playSoftClick();
  const danceGif = document.getElementById('dance-gif');
  const promptEl = document.getElementById('surprise-prompt');
  const noBtn = document.getElementById('btn-no');

  if (choice === 'no') {
    noClickCount++;
    if (danceGif) danceGif.src = "shinchan-pleading.gif";
    
    const teaseMessages = CFG.teaser?.noButtonTeaseMessages || [
      "Arey bhootni, NO nahi dabana! 👻",
      "Haww! Aise kaise mana kar rahi ho? 👉👈",
      "Option hi nahi hai, YES hi dabana padega! 😂"
    ];
    const msg = teaseMessages[(noClickCount - 1) % teaseMessages.length];
    
    if (promptEl) {
      promptEl.innerHTML = `<span style="color:#ad1457; font-weight:800;">${msg}</span><br>Click YES cutie! 🥺💖`;
    }
    shakeElement(noBtn);

    if (noBtn) {
      const scale = Math.max(0.65, 1 - noClickCount * 0.1);
      noBtn.style.transform = `scale(${scale})`;
    }
    return;
  }

  // Choice === 'yes'
  launchConfetti();
  const teaserTitle = document.getElementById('teaser-title');
  if (teaserTitle) teaserTitle.textContent = "Are you really, REALLY excited? 🥳✨";
  if (danceGif) danceGif.src = "shinchan-excited.gif";
  if (promptEl) promptEl.textContent = "Ek baar aur dil se YES bolo Sana! 💖";

  const buttonsWrap = document.getElementById('teaser-buttons');
  if (buttonsWrap) {
    buttonsWrap.innerHTML = `
      <button class="clay-pill-btn btn-yes" onclick="finishTeaserAndRevealGifts()">
        <span class="btn-icon">🎉</span>
        <span class="btn-text">YES, BOHOT EXCITED!</span>
      </button>
      <button class="clay-pill-btn btn-yes" onclick="finishTeaserAndRevealGifts()">
        <span class="btn-icon">💖</span>
        <span class="btn-text">YESSS!</span>
      </button>
    `;
  }
}

function finishTeaserAndRevealGifts() {
  playMidnightChime();
  launchConfetti();
  
  const surpriseScreen = document.getElementById('surprise-screen');
  const giftScreen = document.getElementById('gift-screen');

  setTimeout(() => {
    surpriseScreen.classList.remove('show-screen');
    surpriseScreen.classList.add('hidden-screen');

    giftScreen.classList.remove('hidden-screen');
    giftScreen.classList.add('show-screen');
    launchConfetti();
  }, 450);
}

/* ─── 7. SCREEN 4: MYSTERY GIFT PODS (INCLUDES REEL SURPRISES) ─── */
function openMysteryBox(podNum) {
  playSoftClick();
  launchConfetti();
  if (podNum === 1) {
    openModal('memories-modal');
  } else if (podNum === 2) {
    openModal('cake-modal');
  } else if (podNum === 3) {
    openModal('camera-modal');
  } else if (podNum === 4) {
    openModal('scratch-modal');
    setTimeout(initScratchCard, 200);
  } else if (podNum === 5) {
    openModal('letter-modal');
    startLetterTypewriter();
  } else if (podNum === 6) {
    openModal('final-heart-modal');
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    const musicBar = document.getElementById('top-music-bar');
    if (musicBar) {
      musicBar.style.display = 'none';
    }
  }
}

function closeModal(modalId) {
  playSoftClick();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
  const remaining = document.querySelectorAll('.clay-modal-overlay:not(.hidden)');
  if (remaining.length === 0) {
    document.body.classList.remove('modal-open');
    const musicBar = document.getElementById('top-music-bar');
    if (musicBar) {
      musicBar.style.display = '';
    }
  }
}

/* ─── 8. MODAL 1: HANGING MEMORIES CLOTHESLINE ─── */
function renderMemoriesClothesline() {
  const track = document.getElementById('clothesline-track');
  if (!track || !CFG.memories) return;
  track.innerHTML = '';

  CFG.memories.forEach((mem, index) => {
    const tilt = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3) * 1.5);
    const item = document.createElement('div');
    item.className = 'hanging-polaroid-item';
    item.style.transform = `rotate(${tilt}deg)`;
    item.onclick = () => openPhotoZoom(mem);

    item.innerHTML = `
      <div class="wooden-peg"></div>
      <div class="polaroid-img-box">
        <img src="${mem.image}" alt="${mem.title}" loading="lazy" />
      </div>
      <div class="polaroid-caption-area">
        <h4 class="polaroid-title">${mem.title}</h4>
        <p class="polaroid-sub">${mem.caption}</p>
      </div>
    `;
    track.appendChild(item);
  });
}

function scrollClothesline(dir) {
  playSoftClick();
  const wrap = document.getElementById('clothesline-scroll-wrap');
  if (wrap) {
    wrap.scrollBy({ left: dir * 260, behavior: 'smooth' });
  }
}

function openPhotoZoom(mem) {
  playSoftClick();
  document.getElementById('zoom-img').src = mem.image;
  document.getElementById('zoom-title').textContent = mem.title;
  document.getElementById('zoom-caption').textContent = mem.caption;
  document.getElementById('zoom-date').textContent = mem.date || "Special Memory";
  openModal('photo-zoom-modal');
}

/* ─── 9. MODAL 2: CAKE & BLOW 5 CANDLES (REEL STYLE) ─── */
let blownCandlesCount = 0;
let isWishFinished = false;
const TOTAL_CANDLES = 5;

function updateCandleCounterDisplay() {
  const countDisplay = document.getElementById('candle-count-display');
  if (countDisplay) {
    const remaining = Math.max(0, TOTAL_CANDLES - blownCandlesCount);
    if (remaining === 0) {
      countDisplay.textContent = "(All blown! 🎉)";
    } else {
      countDisplay.textContent = `(${remaining} of ${TOTAL_CANDLES} left)`;
    }
  }
}

function blowCandle(num, e) {
  if (e) e.stopPropagation();
  const flame = document.getElementById(`flame-${num}`);
  if (flame && !flame.classList.contains('extinguished')) {
    flame.classList.add('extinguished');
    playExtinguishSound();
    blownCandlesCount++;
    updateCandleCounterDisplay();

    if (blownCandlesCount >= TOTAL_CANDLES) {
      setTimeout(completeCakeWish, 350);
    }
  }
}

function blowNextCandleOnStage(e) {
  if (blownCandlesCount >= TOTAL_CANDLES) return;
  // If user tapped on a button or banner, don't hijack
  if (e.target.closest('button') || e.target.closest('.cake-wish-banner')) return;

  for (let i = 1; i <= TOTAL_CANDLES; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame && !flame.classList.contains('extinguished')) {
      blowCandle(i, e);
      break;
    }
  }
}

function blowAllCandles(e) {
  if (e) e.stopPropagation();
  playExtinguishSound();
  for (let i = 1; i <= TOTAL_CANDLES; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.add('extinguished');
  }
  blownCandlesCount = TOTAL_CANDLES;
  updateCandleCounterDisplay();
  setTimeout(completeCakeWish, 350);
}

function completeCakeWish() {
  if (isWishFinished) return;
  isWishFinished = true;
  
  // Play Indian Flute Happy Birthday Melody!
  playFluteHappyBirthday();
  launchConfetti();
  setTimeout(launchConfetti, 400);

  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.remove('hidden');

  const btnRelight = document.getElementById('btn-relight');
  if (btnRelight) btnRelight.classList.remove('hidden-btn');
}

function relightCandles(e) {
  if (e) e.stopPropagation();
  playSoftClick();
  blownCandlesCount = 0;
  isWishFinished = false;
  updateCandleCounterDisplay();

  for (let i = 1; i <= TOTAL_CANDLES; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.remove('extinguished');
  }

  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.add('hidden');

  const btnRelight = document.getElementById('btn-relight');
  if (btnRelight) btnRelight.classList.add('hidden-btn');
}

/* ─── 10. MODAL 3: RETRO CAMERA - CAPTURE A MOMENT (REEL FEATURE) ─── */
let hasSnappedPhoto = false;

function snapCameraPhoto() {
  playCameraClick();
  
  // Flash overlay trigger
  const flash = document.getElementById('camera-flash-overlay');
  if (flash) {
    flash.classList.add('flash-active');
    setTimeout(() => flash.classList.remove('flash-active'), 140);
  }

  // Slide out ejected polaroid with Saniya's photo
  const ejectBox = document.getElementById('camera-photo-eject');
  const continueBtn = document.getElementById('btn-camera-continue');
  
  if (ejectBox) {
    const ejectedImg = document.getElementById('camera-ejected-img');
    if (ejectedImg) {
      ejectedImg.src = 'saniya-portrait.jpg';
    }
    const ejectedTitle = document.getElementById('camera-ejected-title');
    if (ejectedTitle) ejectedTitle.textContent = "Saniya 💖";
    const ejectedCaption = document.getElementById('camera-ejected-caption');
    if (ejectedCaption) ejectedCaption.textContent = "The most special smile in the universe ✨";
    
    // Re-trigger animation cleanly
    ejectBox.classList.remove('hidden');
    ejectBox.style.animation = 'none';
    ejectBox.offsetHeight; /* trigger reflow */
    ejectBox.style.animation = '';
    
    launchConfetti();

    // Automatically scroll down to reveal Saniya's photo smoothly
    setTimeout(() => {
      ejectBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const modalCard = document.querySelector('#camera-modal .camera-modal-container');
      if (modalCard) {
        modalCard.scrollTo({
          top: modalCard.scrollHeight,
          behavior: 'smooth'
        });
      }
      const modalOverlay = document.getElementById('camera-modal');
      if (modalOverlay) {
        modalOverlay.scrollTo({
          top: modalOverlay.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 220);
  }
  
  if (continueBtn) {
    continueBtn.classList.remove('hidden-btn');
  }
  
  hasSnappedPhoto = true;
}

/* ─── 11. MODAL 4: INTERACTIVE SCRATCH CARD (REEL FEATURE) ─── */
let isScratchInitialized = false;
let isScratching = false;
let scratchedPixelsCount = 0;
let totalScratchPixels = 0;
let hasScratchRevealed = false;

function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width || 340;
  const h = canvas.height || 340;
  totalScratchPixels = w * h;
  scratchedPixelsCount = 0;
  hasScratchRevealed = false;

  // Reset continue button
  const continueBtn = document.getElementById('btn-scratch-continue');
  if (continueBtn) continueBtn.classList.add('hidden-btn');

  // Fill canvas with festive shimmering metallic rose-gold coating
  ctx.globalCompositeOperation = 'source-over';
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#c7586e');
  grad.addColorStop(0.35, '#e58f9f');
  grad.addColorStop(0.7, '#c96478');
  grad.addColorStop(1, '#a83c50');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Add decorative sparkles and text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let i = 0; i < 40; i++) {
    const rx = Math.random() * w;
    const ry = Math.random() * h;
    const rsize = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(rx, ry, rsize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gift icon & text on foil
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Fredoka, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎁 SCRATCH ME 🎁', w / 2, h / 2 - 12);

  ctx.font = '600 13px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Rub to reveal your secret surprise! ✨', w / 2, h / 2 + 18);

  if (isScratchInitialized) return;
  isScratchInitialized = true;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function doScratch(pos) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
    ctx.fill();
    playScratchSound();

    scratchedPixelsCount++;
    if (scratchedPixelsCount % 16 === 0) {
      checkScratchPercentage();
    }
  }

  function checkScratchPercentage() {
    if (hasScratchRevealed) return;
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let clearCount = 0;
      const step = 32; // sampling step
      const totalSamples = (w * h) / (step / 4);

      for (let i = 3; i < data.length; i += step) {
        if (data[i] === 0) clearCount++;
      }

      if (clearCount / totalSamples > 0.40) {
        revealEntireScratchCard();
      }
    } catch (e) {}
  }

  function revealEntireScratchCard() {
    if (hasScratchRevealed) return;
    hasScratchRevealed = true;
    
    // Smoothly clear canvas
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(0, 0, w, h);

    launchConfetti();
    playMidnightChime();

    const hintText = document.getElementById('scratch-instruction-text');
    if (hintText) hintText.innerHTML = "🎉 <strong>Surprise Unlocked! Happy Birthday Sana!</strong> 💖";

    const continueBtn = document.getElementById('btn-scratch-continue');
    if (continueBtn) continueBtn.classList.remove('hidden-btn');
  }

  // Pointer / Touch Handlers
  canvas.addEventListener('mousedown', (e) => {
    isScratching = true;
    doScratch(getPos(e));
  });
  window.addEventListener('mouseup', () => { isScratching = false; });
  canvas.addEventListener('mousemove', (e) => {
    if (!isScratching) return;
    doScratch(getPos(e));
  });

  canvas.addEventListener('touchstart', (e) => {
    isScratching = true;
    doScratch(getPos(e));
  }, { passive: true });
  window.addEventListener('touchend', () => { isScratching = false; });
  canvas.addEventListener('touchmove', (e) => {
    if (!isScratching) return;
    doScratch(getPos(e));
  }, { passive: true });
}

/* ─── 12. MODAL 6: REPLAY ENTIRE EXPERIENCE (REEL STYLE) ─── */
function replayEntireExperience() {
  playSoftClick();
  
  // Close all open modals
  const modals = document.querySelectorAll('.clay-modal-overlay');
  modals.forEach(m => m.classList.add('hidden'));

  // Reset passcode state
  enteredDigits = "";
  updatePasscodeDots();
  attemptCount = 0;

  // Reset candle state
  blownCandlesCount = 0;
  isWishFinished = false;
  for (let i = 1; i <= TOTAL_CANDLES; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.remove('extinguished');
  }
  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.add('hidden');
  updateCandleCounterDisplay();

  // Hide gift screen, teaser screen, tap-to-begin screen
  const giftScreen = document.getElementById('gift-screen');
  const surpriseScreen = document.getElementById('surprise-screen');
  const tapBegin = document.getElementById('tap-to-begin-screen');
  const quizScreen = document.getElementById('quiz-screen');

  if (giftScreen) {
    giftScreen.classList.remove('show-screen');
    giftScreen.classList.add('hidden-screen');
  }
  if (surpriseScreen) {
    surpriseScreen.classList.remove('show-screen');
    surpriseScreen.classList.add('hidden-screen');
  }
  if (tapBegin) {
    tapBegin.classList.remove('show-screen');
    tapBegin.classList.add('hidden-screen');
  }

  // Show passcode screen fresh
  if (quizScreen) {
    quizScreen.classList.remove('hidden-screen');
    quizScreen.classList.add('show-screen');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  launchConfetti();
}

/* ─── 10. MODAL 3: LETTER & LIVE TYPEWRITER ─── */
let letterTypewriterTimer = null;
let isLetterTyping = false;

function startLetterTypewriter() {
  if (letterTypewriterTimer) clearTimeout(letterTypewriterTimer);
  isLetterTyping = true;

  const bodyEl = document.getElementById('letter-body-content');
  if (!bodyEl) return;
  bodyEl.innerHTML = '';

  const paragraphs = CFG.letter?.paragraphs || [
    "Happy Birthday Saniya! Tum meri sabse achi dost ho.",
    "Hamesha aise hi khush raho aur muskurati raho! 💖"
  ];

  let pIndex = 0;
  let charIndex = 0;
  let currentPEl = null;

  function typeNextCharacter() {
    if (!isLetterTyping) return;

    if (pIndex >= paragraphs.length) {
      isLetterTyping = false;
      const cursor = document.querySelector('.letter-typing-cursor');
      if (cursor) cursor.remove();
      return;
    }

    if (!currentPEl) {
      currentPEl = document.createElement('p');
      bodyEl.appendChild(currentPEl);
      charIndex = 0;
    }

    const currentText = paragraphs[pIndex];
    if (charIndex < currentText.length) {
      currentPEl.textContent = currentText.substring(0, charIndex + 1);
      
      let cursor = document.querySelector('.letter-typing-cursor');
      if (!cursor) {
        cursor = document.createElement('span');
        cursor.className = 'letter-typing-cursor';
      }
      currentPEl.appendChild(cursor);
      
      charIndex++;
      letterTypewriterTimer = setTimeout(typeNextCharacter, 24);
    } else {
      pIndex++;
      currentPEl = null;
      letterTypewriterTimer = setTimeout(typeNextCharacter, 280);
    }
  }

  typeNextCharacter();
}

function skipLetterTypewriter() {
  playSoftClick();
  if (letterTypewriterTimer) clearTimeout(letterTypewriterTimer);
  isLetterTyping = false;

  const bodyEl = document.getElementById('letter-body-content');
  if (!bodyEl) return;
  bodyEl.innerHTML = '';

  const paragraphs = CFG.letter?.paragraphs || [];
  paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    bodyEl.appendChild(p);
  });
}

function restartLetterTypewriter() {
  playSoftClick();
  startLetterTypewriter();
}

/* ─── 11. MODAL 4: SANA BHOOT SPECIAL LIST 👻 ─── */
function openBhootSpecialModal() {
  playSoftClick();
  const listEl = document.getElementById('bhoot-reasons-list');
  if (listEl && CFG.bhootSpecialReasons) {
    listEl.innerHTML = '';
    CFG.bhootSpecialReasons.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bhoot-reason-card';
      card.innerHTML = `
        <div class="reason-num-pill">${item.number}</div>
        <div class="reason-details">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `;
      listEl.appendChild(card);
    });
  }
  openModal('bhoot-modal');
}

/* ─── 12. SMOOTH 60FPS CONFETTI CANVAS ENGINE ─── */
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId = null;

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

function launchConfetti() {
  const colors = ['#e91e63', '#ff4081', '#ffb300', '#ab47bc', '#4fc3f7', '#ffffff'];
  for (let i = 0; i < 90; i++) {
    confettiParticles.push({
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * (0.2 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : 'circle'
    });
  }

  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.38;
    p.vx *= 0.98;
    p.rotation += p.vRot;
    p.opacity -= 0.007;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    }

    ctx.restore();

    if (p.opacity <= 0 || p.y > window.innerHeight + 20) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimationId = null;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

/* ─── 13. PHYSICAL KEYBOARD SHORTCUTS ─── */
window.addEventListener('keydown', e => {
  const quizScreen = document.getElementById('quiz-screen');
  if (quizScreen && quizScreen.classList.contains('show-screen')) {
    if (e.key >= '0' && e.key <= '9') {
      pressKey(e.key);
    } else if (e.key === 'Backspace') {
      deleteDigit();
    } else if (e.key === 'Enter') {
      submitPasscode();
    }
    return;
  }

  if (e.key === 'Escape') {
    ['memories-modal', 'photo-zoom-modal', 'cake-modal', 'letter-modal', 'bhoot-modal'].forEach(mId => {
      closeModal(mId);
    });
  }
});

/* ─── 14. INITIALIZATION ON PAGE LOAD ─── */
document.addEventListener('DOMContentLoaded', () => {
  initMusicPlayer();
  renderMemoriesClothesline();
  startCountdown();
});
