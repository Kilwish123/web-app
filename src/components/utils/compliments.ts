// File: src/utils/compliments.ts
export const COMPLIMENTS = [
    "You're my go-to happy pill ❤️",
    "Your smile brightens everyone's day ✨",
    "You're awesome at making others feel special 🌟",
    "Your energy is contagious in the best way 🎉",
    "You have the kindest heart I know 💖",
    "Being around you makes everything better 🌈",
    "You inspire me to be a better person ⭐",
    "Your positivity is just magical ✨"
  ];
  
  export const getRandomCompliment = () => {
    return COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
  };