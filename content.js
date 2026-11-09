/**
 * ==============================================================================
 * 💖 SANIYA'S BIRTHDAY ARCADE - MASTER CONTENT CONFIGURATION 💖
 * ==============================================================================
 * Birthday: 17 November | Bestie: Saniya (Sana) 🌸 | Best Friend: Nadeem 🌟
 * 4 Special Birthday Mini-Games (Flappy Sana, Balloon Wishes, Wheel of Demands & Secret Vault)
 * ==============================================================================
 */

window.ARCADE_CONTENT = {
  // ─── 1. CORE PERSONAL INFO ───
  personal: {
    birthdayPerson: "Saniya",
    nickname: "Sana",
    senderName: "Nadeem",
    birthdayDate: "17 November",
    age: "21",
    tagline: "The Official Birthday Games Arcade 🎮💖"
  },

  // ─── 2. ARCADE HUB HEADINGS & EASTER EGGS ───
  arcadeHub: {
    heroTitle: "Saniya's Birthday Arcade 🕹️✨",
    heroSubtitle: "4 super cute & fun mini games made specially for Sana. Win games to unlock all secret gifts & reveal the Grand Finale!",
    progressLabel: "Gifts Unlocked",
    easterEggTriggerCount: 5,
    easterEggMessage: "🎉 SECRET SANA SQUAD EASTER EGG! 👻💖\n\nOfficial Notice: Saniya is awarded the trophy for 'World's Cutest Dramebaaz Bestie' hamesha ke liye!"
  },

  // ─── 3. GAME 1: FLAPPY SANA (SKY HIGH RUN) 🐥 ───
  flappySana: {
    title: "Flappy Sana 🐥🎈",
    description: "Tap to flap! Fly Sana through pastel balloon skies, collect sweets & dodge study books!",
    difficulty: "Cute • Addictive",
    targetScore: 10,
    winMessage: "HIGH FLYER QUEEN! ☁️✨ You guided Sana safely through the sky! Gift #1 Unlocked!",
    rewardTitle: "Gift #1: The Wings of Freedom 🪽",
    rewardText: "May you always fly high towards your biggest dreams and wildest adventures!"
  },

  // ─── 4. GAME 2: BALLOON POP WISHES 🎈✨ ───
  balloonPop: {
    title: "Balloon Pop Wishes 🎈✨",
    description: "Tap to burst 8 dreamy pastel balloons and reveal heartfelt secret birthday wishes & compliments!",
    difficulty: "Relaxing • Heartwarming",
    wishes: [
      {
        id: 1,
        color: "#ff70a6",
        badge: "WISH #1 🎂",
        title: "Endless Adventures",
        text: "May your 21st year be packed with spontaneous road trips, cafe hopping, beautiful sunsets, and unforgettable memories!"
      },
      {
        id: 2,
        color: "#70d6ff",
        badge: "SECRET #2 ✨",
        title: "Your Contagious Smile",
        text: "Your laughter has this magical power to turn anyone's terrible day into a good one. Never stop smiling so brightly!"
      },
      {
        id: 3,
        color: "#ffd670",
        badge: "BLESSING #3 🌟",
        title: "Zero Exam / Career Stress",
        text: "May all your hardest exams feel easy, interviews go smoothly, and every single dream you have fall right into place."
      },
      {
        id: 4,
        color: "#e8ae68",
        badge: "TRUTH #4 🍕",
        title: "Free Calories Pass",
        text: "I wish that for this entire year, all pizzas, pastas, chocolates, and late-night snacks magically have 0 calories!"
      },
      {
        id: 5,
        color: "#b392ac",
        badge: "MEMORY #5 📸",
        title: "The Unfiltered Talks",
        text: "Thank you for being that one person I can text at 2 AM or call for hours without ever running out of things to talk about."
      },
      {
        id: 6,
        color: "#9bf6ff",
        badge: "STRENGTH #6 🛡️",
        title: "Stronger Than You Know",
        text: "Whenever doubt creeps in, remember that you are capable of extraordinary things. You are tough, smart, and unstoppable."
      },
      {
        id: 7,
        color: "#caffbf",
        badge: "PROMISE #7 🤝",
        title: "Always In Your Corner",
        text: "No matter how old we get or where life takes us, remember you always have Nadeem cheering for you from the front row."
      },
      {
        id: 8,
        color: "#ffc6ff",
        badge: "FINALE #8 💖",
        title: "The Happiest Birthday!",
        text: "To the most special, hilarious, and genuinely caring person: Happy 21st Birthday, Saniya! You deserve the world!"
      }
    ],
    winMessage: "ALL BALLOONS POPPED! 🎈 Each wish is sealed in the universe with a golden ribbon. Gift #2 Unlocked!",
    rewardTitle: "Gift #2: The Bottle of Starlight 🍾✨",
    rewardText: "Filled with 8 cosmic wishes that will follow you all through your 21st year!"
  },

  // ─── 5. GAME 3: SANIYA KI FARMAISH - WHEEL OF DEMANDS 🎡🍦 ───
  spinWheel: {
    title: "Wheel of Demands 🎡🍦",
    description: "Wheel ghumao aur apna guaranteed official birthday treat voucher jeeto (Ice Cream Party on Nadeem)!",
    difficulty: "Lucky • Guaranteed Treat",
    winMessage: "BINGO! 🎉 You won the official Ice Cream Party on Nadeem! Gift #3 Unlocked!",
    rewardTitle: "Gift #3: The Ice Cream Party Pass 🍦🎟️",
    rewardText: "Guaranteed unlimited ice cream treat, fully sponsored by Nadeem! Valid hamesha ke liye!"
  },

  // ─── 6. GAME 4: SECRET MYSTERY VAULT (GRAND CLIMAX) 🔐 ───
  secretVault: {
    title: "Secret Mystery Vault 🔐✨",
    description: "Solve the birthday riddle, enter the secret 4-digit code, and unlock the Grand Finale surprise!",
    difficulty: "Mystery • Climax",
    clue: "💡 Clue: The most special 4-digit date in November when an angel was born (DDMM)...",
    secretCode: "1711",
    winMessage: "ACCESS GRANTED! 🔓 The vault door is opening! Preparing the Grand Birthday Finale!",
    rewardTitle: "Gift #4: The Grand Finale Golden Key 🗝️",
    rewardText: "All games conquered! The ultimate birthday surprise from Nadeem is officially unlocked!"
  },

  // ─── 7. GRAND FINALE: THE ULTIMATE SURPRISE ───
  grandFinale: {
    badge: "✦ ALL GIFTS UNLOCKED ✦",
    title: "Happy 21st Birthday, Saniya! 🎂🌸",
    subtitle: "A heartfelt letter from your best friend, sealed with unconditional love.",
    letterSalutation: "Dearest Sana,",
    letterParagraphs: [
      "Happy 21st Birthday to the one person who brings non-stop laughter, drama, and pure sunshine into my life!",
      "From endless gossip sessions and food cravings to laughing over the silliest things at midnight, having you as my best friend is the greatest blessing.",
      "You have the kindest heart, the sweetest smile, and an energy that makes everything 10x brighter. Never change the bubbly, caring, slightly dramatic soul that you are.",
      "On your 21st milestone, I wish you endless adventures, success in everything you dream of, infinite chocolates, and happiness that never fades away.",
      "Stay blessed, stay happy, and remember—I'm always cheering for you in every chapter of life!"
    ],
    letterSignoff: "Forever your biggest supporter & bestie,",
    letterAuthor: "Nadeem 💖",
    cakeWishPrompt: "Make a wish in your heart, then tap the candles to blow them out! 🕯️✨",
    cakeBlownMessage: "🎉 YOUR WISH IS GRANTED! May all your dreams come true hamesha! 🎂💖"
  }
};
