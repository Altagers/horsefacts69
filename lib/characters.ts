export interface HorseFactCharacter {
  name: string
  trait: string
  description: string
  fact: string
  factNumber: number
  imagePath: string
  emoji: string
}

export const characters: Record<string, HorseFactCharacter> = {
  "breathing-expert": {
    name: "Breathing Expert",
    trait: "The Focused Achiever",
    description:
      "You're direct and efficient, just like horses who can only breathe through their nostrils. You focus on what matters most and don't get distracted by unnecessary complications.",
    fact: "Horses cannot breathe through their mouth – only through their nostrils",
    factNumber: 1,
    imagePath: "/1.png",
    emoji: "🫁",
  },
  "all-seeing-observer": {
    name: "All-Seeing Observer",
    trait: "The Visionary",
    description:
      "Like horses with their incredible 360-degree vision, you see opportunities and details that others miss. You're always aware of your surroundings and think ahead.",
    fact: "Their eyes are located on the sides of their head, providing almost 360-degree vision, but there are blind spots in front and behind",
    factNumber: 2,
    imagePath: "/2.png",
    emoji: "👁️",
  },
  "big-picture-thinker": {
    name: "Big Picture Thinker",
    trait: "The Grand Visionary",
    description:
      "You see the world in grand scale, just like horses who have the largest eyes among all land mammals. You focus on comprehensive solutions and big ideas.",
    fact: "Horses have the largest eyes among all terrestrial mammals",
    factNumber: 3,
    imagePath: "/3.png",
    emoji: "🔍",
  },
  "efficient-rester": {
    name: "Efficient Rester",
    trait: "The Balanced Achiever",
    description:
      "You know how to balance work and rest perfectly. Like horses who can sleep standing up but need to lie down for deep sleep, you adapt to any situation.",
    fact: "They can sleep standing up thanks to a 'locking mechanism' in their joints, but they need to lie down for deep sleep",
    factNumber: 4,
    imagePath: "/4.png",
    emoji: "😴",
  },
  powerhouse: {
    name: "Powerhouse",
    trait: "The Energetic Force",
    description:
      "You're full of energy and passion, just like a horse's incredible heart that can pump 250 liters of blood per minute. You bring intensity to everything you do.",
    fact: "A horse's heart weighs about 4-5 kg and can pump up to 250 liters of blood per minute during intense running",
    factNumber: 5,
    imagePath: "/5.png",
    emoji: "💪",
  },
  "lifelong-learner": {
    name: "Lifelong Learner",
    trait: "The Continuous Grower",
    description:
      "You never stop growing and learning, just like horse teeth that grow throughout their lifetime. You're always developing new skills and knowledge.",
    fact: "Horse teeth grow throughout their lifetime, and their age can be determined by tooth wear",
    factNumber: 6,
    imagePath: "/6.png",
    emoji: "📚",
  },
  "efficient-processor": {
    name: "Efficient Processor",
    trait: "The Streamlined Optimizer",
    description:
      "You're incredibly efficient and don't need unnecessary complications. Like horses who don't have a gallbladder but digest perfectly, you optimize everything.",
    fact: "Horses don't have a gallbladder, but this doesn't prevent them from digesting plant food",
    factNumber: 7,
    imagePath: "/7.png",
    emoji: "⚡",
  },
  "loyal-friend": {
    name: "Loyal Friend",
    trait: "The Faithful Companion",
    description:
      "You have an incredible memory for people and relationships, just like horses who can recognize people after years. You're the friend everyone can count on.",
    fact: "Horses have excellent memory and can recognize people after years",
    factNumber: 8,
    imagePath: "/8.png",
    emoji: "🤝",
  },
  "great-communicator": {
    name: "Great Communicator",
    trait: "The Expressive Connector",
    description:
      "You're incredibly expressive and great at communicating, just like horses who have more than 17 different facial expressions. You connect with people naturally.",
    fact: "They use facial expressions to communicate, having more than 17 facial expressions",
    factNumber: 9,
    imagePath: "/9.png",
    emoji: "😊",
  },
  "problem-solver": {
    name: "Problem Solver",
    trait: "The Clever Innovator",
    description:
      "You're incredibly clever and can figure out complex problems, just like horses who can learn to open doors and use simple mechanisms. You find solutions others can't see.",
    fact: "Horses are capable of learning to open doors, unscrew caps, and use simple mechanisms",
    factNumber: 10,
    imagePath: "/10.png",
    emoji: "🧠",
  },
}
