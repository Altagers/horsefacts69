// Horse facts to match different personality types
export interface HorseFactCharacter {
  name: string
  emoji: string
  color: string
  trait: string
  description: string
  factNumber: number
  imagePath: string
}

export const characters: Record<string, HorseFactCharacter> = {
  breathing: {
    name: "The Breathing Expert",
    emoji: "🐴",
    color: "blue",
    trait: "Respiratory Specialist",
    description:
      "Like horses who can only breathe through their nostrils, you're focused and direct in your approach to life!",
    factNumber: 1,
    imagePath: "/1.png",
  },
  vision: {
    name: "The All-Seeing Observer",
    emoji: "👁️",
    trait: "Visionary & Aware",
    color: "green",
    description: "With almost 360-degree awareness like a horse's vision, you see opportunities others miss!",
    factNumber: 2,
    imagePath: "/2.png",
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
  },
  heart: {
    name: "The Powerhouse",
    emoji: "❤️",
    trait: "Strong & Energetic",
    color: "red",
    description: "Your energy is incredible! Like a horse's heart pumping 250 liters per minute, you give your all!",
    factNumber: 5,
    imagePath: "/5.png",
  },
  teeth: {
    name: "The Lifelong Learner",
    emoji: "🦷",
    trait: "Growing & Evolving",
    color: "yellow",
    description: "You never stop growing and learning, just like horse teeth that grow throughout their lifetime!",
    factNumber: 6,
    imagePath: "/6.png",
  },
  digestion: {
    name: "The Efficient Processor",
    emoji: "🌱",
    trait: "Resourceful & Adaptable",
    color: "green",
    description: "You make the most of what you have, like horses who digest perfectly without a gallbladder!",
    factNumber: 7,
    imagePath: "/7.png",
  },
  memory: {
    name: "The Loyal Friend",
    emoji: "🧠",
    trait: "Memorable & Faithful",
    color: "blue",
    description: "Your relationships are deep and lasting, just like horses who remember people after years!",
    factNumber: 8,
    imagePath: "/8.png",
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
  },
}
