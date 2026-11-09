/**
 * ===================================================================
 * 💖 SANIYA'S BIRTHDAY SURPRISE - CONFIGURATION FILE 💖
 * ===================================================================
 */

window.BIRTHDAY_CONFIG = {
  // ─── BASIC INFO ───
  recipientName: "Saniya",
  nickname: "Sana",
  teasingName: "Saniya Bhootni 👻",
  senderName: "Tumhara Favorite Dost",
  birthdayDate: "17 November 2004",
  birthYear: "2004",

  // ─── 4-DIGIT PASSCODE SETTINGS ───
  // Passcode is 2004
  passcode: "2004",
  
  // Prank feature: First time entering 2004 shows a funny teasing message!
  enableFirstAttemptPrank: true,
  firstAttemptPrankMessage: "Hawww galat code! 😜 Sana Bhoot ko apna hi birth year yaad nahi? Wait... mazaak kar raha tha! 😂",
  firstAttemptHint: "💡 Mazaak tha cutie! Wapas se wahi code daalo (2004), ab open ho jayega! 💖",
  
  // Standard wrong message if someone enters anything other than 2004
  wrongCodeMessage: "Hawww Sana Bhoot! 👻 Galat code! 2004 daalna hai, bhool gayi kya?",
  successMessage: "Identity Verified! Welcome Saniya Bhootni 👻💖",

  // ─── BACKGROUND MUSIC SETTINGS (DUAL PLAYLIST: SHINCHAN & TAREEF) ───
  music: {
    initialTrackIndex: 0,
    autoPlay: true,
    defaultVolume: 0.85,
    playlist: [
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
    ]
  },

  // ─── SCREEN 1: MIDNIGHT COUNTDOWN ───
  countdown: {
    targetHour: 12,
    targetMinute: 0,
    targetSecond: 0,
    secondsToMidnight: 5,
    headline: "MIDNIGHT COUNTDOWN",
    subtext: "17 November aane wala hai... Dhadkan thaam lo Sana! 🕛✨"
  },

  // ─── SCREEN 2: SANIYA BHOOT PORTAL ───
  verification: {
    badge: "BIRTHDAY GIRL VERIFICATION",
    title: "Enter Your Secret Code",
    subtitle: "A special surprise for Saniya 💖",
    hintText: "Hint: Try 2004",
    instructions: "Apna 4-digit secret birthday code enter karo 💖",
    portraitImage: "saniya-portrait.jpg"
  },

  // ─── REEL FEATURE: TAP TO BEGIN SCREEN ───
  tapToBegin: {
    title: "Tap to Begin",
    subtitle: "A little surprise made with love for our favourite bhootni ✨"
  },

  // ─── SCREEN 3: TEASER / QUESTION ───
  teaser: {
    title: "Wait... Ek second Sana! 👀",
    subtitle: "Maine tumhare liye kuch bohot special banaya hai...",
    questionText: "Do you wanna see it? 💖",
    excitedQuestion: "Are you really, REALLY excited? 🥳✨",
    noButtonTeaseMessages: [
      "Arey bhootni, NO nahi dabana! 👻",
      "Pakka? Soch lo ek baar aur! 🥺",
      "Haww! Aise kaise mana kar rahi ho? 👉👈",
      "Option hi nahi hai, YES hi dabana padega! 😂",
      "Chup chap YES par click karo Sana! 💖"
    ]
  },

  // ─── REEL FEATURE: RETRO CAMERA (CAPTURE A MOMENT) ───
  retroCamera: {
    title: "Capture a Moment Just for You",
    subtitle: "Tap the camera and watch your memory come to life! 📸",
    image: "memory2.jpg",
    caption: "A sweet smile that brightens up the darkest day! 💖",
    date: "Golden Times ✨"
  },

  // ─── REEL FEATURE: INTERACTIVE SCRATCH CARD ───
  scratchCard: {
    title: "It's Your Birthday!",
    subtitle: "Scratch the card and see what special surprise is waiting for you 🎁",
    image: "saniya-portrait.jpg",
    headline: "You Are Truly One in a Million! 🌟",
    message: "Meri sabse favorite bhootni ko janamdin ki dher saari shubhkaamnayein! Hamesha aise hi muskurati raho aur apni positivity se sabka dil jeet ti raho! 💖✨",
    sign: "With all my love,\nTumhara Favorite Dost 🫶🏻"
  },

  // ─── REEL FEATURE: FINAL HEART CARD & REPLAY ───
  finalHeartCard: {
    title: "Happy Birthday Saniya",
    badge: "FROM THE BOTTOM OF MY HEART 💖",
    message: "Here's to another year of being exactly who you are — pure-hearted, crazy, hilarious and the best friend anyone could ever ask for.",
    signOff: "With love,\nTumhara Favorite Dost 💖"
  },

  // ─── MYSTERY GIFT POD 1: MEMORIES CLOTHESLINE ───
  memories: [
    {
      id: 1,
      image: "saniya-portrait.jpg",
      title: "The Birthday Girl ✨",
      caption: "Hamari sabse khoobsurat, cute aur favorite bhootni Saniya! 💖",
      date: "17 November Special"
    },
    {
      id: 2,
      image: "memory2.jpg",
      title: "Chup Chap Wali Smiles ✨",
      caption: "Jab photo khichwane ke liye bina nautanki ke maan gayi thi!",
      date: "Precious Moment"
    },
    {
      id: 3,
      image: "memory3.jpg",
      title: "Gussa & Dramebaazi 😜",
      caption: "Har baat pe muh banana aur fir 2 minute baad normal ho jana!",
      date: "Forever Memories"
    },
    {
      id: 4,
      image: "memory4.jpg",
      title: "Always There For Me 🤝",
      caption: "Chahe kitni bhi ladai ho, end me tum hi sabse achi dost ho.",
      date: "Unbreakable Bond"
    },
    {
      id: 5,
      image: "memory5.jpg",
      title: "Best Bhootni Ever 👻",
      caption: "Tum jaisi dost milna sach me kismat ki baat hai! 💖",
      date: "Golden Times"
    }
  ],

  // ─── MYSTERY GIFT POD 2: CAKE & WISH ───
  cake: {
    title: "Make A Wish, Sana! 🎂",
    subtitle: "Click each candle to blow it out (sweet flute tune bajegi)! 🎶",
    wishedHeadline: "🎉 HAPPY BIRTHDAY SANIYA! 🎉",
    wishedSubtext: "Bhagwan kare tumhari saari wishes aur dreams sach ho jayein! Khush raho hamesha ✨🍰"
  },

  // ─── MYSTERY GIFT POD 3: SPECIAL LETTER (HEARTFELT & EMOTIONAL) ───
  letter: {
    badge: "FROM MY HEART 💌",
    salutation: "Dearest Saniya (Meri Favorite Person & Sabse Pyaari Bhootni 👻💖),",
    paragraphs: [
      "Sabse pehle toh tumhe 21st Janamdin (17 November 2004) ki dher saari shubhkaamnayein! 🎂✨ Aaj ka din sach me bohot special hai, kyunki aaj meri sabse favorite dost is duniya me aayi thi (aur tabhi se bhoot ban ke sabko sata rahi hai! 😜).",
      "Tumhe 'Sana Bhoot' bol kar chidhana mera favorite kaam hai, lekin sach bolun toh tumhari presence meri life me sabse badi blessing hai. Jab bhi mera mood off hota hai ya koi tension hoti hai, tumhara ek text ya tumhari baatein sab theek kar deti hain. You are truly my safe place and my favorite person.",
      "'Unki tareef mein kahein kya, alfaaz hi nahi hain... Jo kuch mera hai sab kuch unka, unse zyada kasam se humko koi khaas hi nahi hai.' Yeh gaana sach me tumhare liye hi bana hai. Duniya me hazaron log hain, par tum jaisi pure-hearted, loyal aur pyaari dost koi dusri nahi ho sakti.",
      "Thank you Sana, har us waqt ke liye jab tumne bina bole meri baatein samjhi, meri khamoshi ko pehchana, aur har situation me mere saath khadi rahi. Chahe hum kitna bhi lad lein ya ek dusre ko sata lein, mere dil me tumhare liye respect aur pyaar hamesha sabse upar rahega.",
      "Is naye saal me, meri bas yahi dua hai ki tumhari aankhon me hamesha khushi ho, tumhara har dream pura ho, aur tumhari yeh pyari si smile kabhi kam na ho. Hamesha aise hi khilkhilati raho meri bhootni! 🌸💖",
      "Once again, Happy Birthday Saniya! Forever grateful to have you in my life. 🫶🏻🎉✨"
    ],
    signOff: "With endless love, respect & friendship,\nTumhara Favorite Dost 💖"
  },

  // ─── BONUS: SANA BHOOT TOP 5 CONFESSIONS 👻 ───
  bhootSpecialReasons: [
    { number: "01", title: "My Favorite Person Always", desc: "Chahe kitni bhi ladai ho, tumse baat kiye bina din pura nahi lagta!" },
    { number: "02", title: "Professional Dramebaaz", desc: "Baat baat par 10 expressions badalna aur cute si drama queen banna!" },
    { number: "03", title: "Cutest Smile in the World", desc: "Chahe kitna bhi gussa ho koi, tumhari ek smile dekh kar pighal jayega." },
    { number: "04", title: "Purest & Kindest Heart", desc: "Dikhati nahi ho par andar se sabki care sabse zyada karti ho." },
    { number: "05", title: "The Best Bhootni Ever", desc: "Duniya me hazaron dost honge, par meri Sana jaisi pyari bhootni sirf ek hai! 👻💖" }
  ]
};
