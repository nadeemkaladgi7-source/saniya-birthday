# 🎂 Saniya's Birthday Surprise Website (Sana Bhoot Special 👻)

Ek bohot hi khoobsurat, modern aur premium **Claymorphism (Soft 3D Pink Aesthetic)** birthday website jo khas **Saniya (Sana)** ke 17 November ke birthday ke liye banayi gayi hai! ✨

---

## 🌟 Features & Journey

1. **🕛 The Midnight Velvet Countdown (11:59:55 -> 12:00:00 AM)**
   - Analog Clock with smooth animated hands and digital time display.
   - Theatrical Velvet Curtains jo midnight hote hi light burst aur chime ke saath open hoti hain.
   - "Skip Countdown ⏩" button instant testing ke liye.

2. **🔐 Sana Bhoot Verification Portal (4-Digit Passcode Gate)**
   - Clay 3D tactile keypad with satisfying audio click effects.
   - Cameo mascot frame with Shinchan / Sana Bhoot badge.
   - **Default Passcode:** `1711` (17th November).
   - Agar galat passcode daalein toh card shake hota hai aur funny teasing aati hai: *"Hawww Sana Bhoot! 👻 Galat code! Try again!"*

3. **💖 Teaser Decision Screen ("Wait... Ek second Sana!")**
   - Playful dancing reaction GIF.
   - **YES Button:** Agle exciting step par le jata hai.
   - **NO Button:** Agar Sana "NO" dabane ki koshish kare toh button shrink hota hai aur cute teasing dialogue aate hain (*"Arey bhootni, NO nahi dabana!"*).

4. **🎁 3 Floating Clay Mystery Gift Boxes**
   - **📸 Mystery Box 1: Hanging Memories Clothesline**
     - Wooden clothesline with mini wooden pegs and hanging polaroids.
     - Natural sway physics jab hover ya click karein.
     - Kisi bhi polaroid par click karne se **Zoom Modal** khulta hai with handwritten captions.
   - **🎂 Mystery Box 2: Interactive Birthday Cake & Make A Wish**
     - 3-tier pastel clay cake with strawberries and whipped cream.
     - 7 interactive flickering candles — candles par click karke unhe bujha (blow out) sakte hain ya *"Blow All Candles"* button daba sakte hain.
     - Extinguish hone par confetti explosion aur celebration wish banner unroll hota hai!
   - **💌 Mystery Box 3: 3D Envelope & Heartfelt Letter (Live Typewriter)**
     - Clay wax seal stamp ("S 💖").
     - Emotional aur playful letter line-by-line real typewriter style me type hota hai.
     - "Skip Animation" aur "Replay" buttons.
   - **👻 Bonus: Sana Bhoot Special Corner**
     - Bottom me mascot card: *"Top 5 Reasons Why Sana is Special / Cutest Bhoot in the World"*.

5. **🎵 Floating Clay Music Player**
   - Top-right corner me floating clay pill with spinning vinyl disc & equalizer animation.
   - Built-in soothing ambient lo-fi melody bina kisi external file ke chalti hai.
   - Custom MP3 add karne ka option bhi available hai!

---

## 🚀 Abhi Run / Preview Kaise Karein?

1. Aap apne computer par is folder ko open karein:
   `C:\Users\DELL\.gemini\antigravity\scratch\saniya-birthday-surprise`
2. Simply **`index.html`** par double click karein! Yeh aapke kisi bhi browser (Chrome, Edge, Brave, etc.) me open ho jayega.

---

## 🎨 Photos & Music Baad Me Kaise Add Karein?

Maine sabhi settings ke liye ek clean **`config.js`** file banayi hai:

### 1. Photos Badalne Ke Liye:
- Apni pasand ki photos ko `assets/` folder me daal dein:
  - `memory1.jpg`
  - `memory2.jpg`
  - `memory3.jpg`
  - `memory4.jpg`
  - `memory5.jpg`
- Ya fir `config.js` me jaa kar `memories` section ke andar captions aur file names update kar lein.

### 2. Custom Gaana / MP3 Lagane Ke Liye:
- Apna favorite MP3 gaana `assets/` folder me save karein (jaise `assets/song.mp3`).
- `config.js` me line 26 par likhein:
  ```javascript
  customAudioFile: "assets/song.mp3",
  songTitle: "Tum Hi Ho ya Gaane Ka Naam 🎵",
  ```

### 3. Passcode Ya Message Change Karne Ke Liye:
- `config.js` me `passcode: "1711"` ko change karke koi bhi 4-digit code rakh sakte hain.
- `letter` section me paragraphs ko apni marzi ke mutabiq edit kar sakte hain.

---

## 🌐 Online Host Kaise Karein (Taaki Sana Apne Phone Par Dekh Sake)?

Jab aap photos aur song final kar lein, toh is website ko free me online host kar sakte hain:

### Option A: Vercel / Netlify (Sabse Fast - 1 Minute)
1. [vercel.com](https://vercel.com) ya [netlify.com](https://netlify.com) par jayein.
2. `saniya-birthday-surprise` folder ko drag and drop karein.
3. Aapko ek public link mil jayega (jaise `happy-birthday-saniya.vercel.app`) jo aap 17 Nov midnight ko use bhej sakte hain!

### Option B: GitHub Pages
1. Apne GitHub account par ek new repository banayein.
2. Is folder ke saare files upload karein.
3. Settings > Pages me jaa kar `main` branch select karke save karein. 1 minute me website live ho jayegi.
