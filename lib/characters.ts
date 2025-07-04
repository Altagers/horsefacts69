// Horse facts to match different personality types
export interface HorseFactCharacter {
  name: string
  emoji: string
  color: string
  trait: string
  description: string
  factNumber: number
  imagePath: string
  fact: string
}

export const characters: Record<string, HorseFactCharacter> = {
  breathing: {
    name: "The Breathing Expert",
    emoji: "🐴",
    color: "blue",
    trait: "Focused & Direct",
    description:
      "Like horses who can only breathe through their nostrils, you're focused and direct in your approach to life!",
    factNumber: 1,
    imagePath: "/1.png",
    fact: "Horses cannot breathe through their mouth – only through their nostrils",
  },
  vision: {
    name: "The All-Seeing Observer",
    emoji: "👁️",
    trait: "Visionary & Aware",
    color: "green",
    description: "With almost 360-degree awareness like a horse's vision, you see opportunities others miss!",
    factNumber: 2,
    imagePath: "/2.png",
    fact: "Their eyes are located on the sides of their head, providing almost 360-degree vision, but there are blind spots in front and behind",
  },
  eyes: {
    name: "The Big Picture Thinker",
    emoji: "🔍",
    trait: "Perceptive & Insightful",
    color: "purple",
    description:
      "Like horses with the largest eyes among terrestrial mammals, you have a grand perspective on everything!",
    factNumber: 3,
    imagePath: "/3.png",
    fact: "Horses have the largest eyes among all terrestrial mammals",
  },
  sleep: {
    name: "The Efficient Rester",
    emoji: "😴",
    trait: "Adaptable & Resourceful",
    color: "orange",
    description:
      "You can adapt to any situation, just like horses who can sleep standing up but know when to rest deeply!",
    factNumber: 4,
    imagePath: "/4.png",
    fact: 'They can sleep standing up thanks to a "locking mechanism" in their joints, but they need to lie down for deep sleep',
  },
  heart: {
    name: "The Powerhouse",
    emoji: "❤️",
    trait: "Strong & Energetic",
    color: "red",
    description: "Your energy is incredible! Like a horse's heart pumping 250 liters per minute, you give your all!",
    factNumber: 5,
    imagePath: "/5.png",
    fact: "A horse's heart weighs about 4-5 kg and can pump up to 250 liters of blood per minute during intense running",
  },
  teeth: {
    name: "The Lifelong Learner",
    emoji: "🦷",
    trait: "Growing & Evolving",
    color: "yellow",
    description: "You never stop growing and learning, just like horse teeth that grow throughout their lifetime!",
    factNumber: 6,
    imagePath: "/6.png",
    fact: "Horse teeth grow throughout their lifetime, and their age can be determined by tooth wear",
  },
  digestion: {
    name: "The Efficient Processor",
    emoji: "🌱",
    trait: "Resourceful & Adaptable",
    color: "green",
    description: "You make the most of what you have, like horses who digest perfectly without a gallbladder!",
    factNumber: 7,
    imagePath: "/7.png",
    fact: "Horses don't have a gallbladder, but this doesn't prevent them from digesting plant food",
  },
  memory: {
    name: "The Loyal Friend",
    emoji: "🧠",
    trait: "Memorable & Faithful",
    color: "blue",
    description: "Your relationships are deep and lasting, just like horses who remember people after years!",
    factNumber: 8,
    imagePath: "/8.png",
    fact: "Horses have excellent memory and can recognize people after years",
  },
  expression: {
    name: "The Great Communicator",
    emoji: "😊",
    trait: "Expressive & Social",
    color: "pink",
    description:
      "You're incredibly expressive, using more ways to communicate than most people realize - just like horses with 17+ facial expressions!",
    factNumber: 9,
    imagePath: "/9.png",
    fact: "They use facial expressions to communicate, having more than 17 facial expressions",
  },
  intelligence: {
    name: "The Problem Solver",
    emoji: "🔧",
    trait: "Clever & Ingenious",
    color: "purple",
    description:
      "You're incredibly clever and can figure out complex solutions, just like horses who learn to open doors and use mechanisms!",
    factNumber: 10,
    imagePath: "/10.png",
    fact: "Horses are capable of learning to open doors, unscrew caps, and use simple mechanisms",
  },
}
