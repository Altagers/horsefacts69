export interface Character {
  name: string
  trait: string
  description: string
  fact: string
  factNumber: number
  imagePath: string
  emoji: string
}

export const characters: Record<string, Character> = {
  "breathing-expert": {
    name: "Breathing Expert",
    trait: "The Focused Achiever",
    description:
      "You're direct and focused, just like horses who can only breathe through their nostrils. You know how to concentrate on what matters most and don't get distracted by unnecessary things.",
    fact: "Horses cannot breathe through their mouth – only through their nostrils",
    factNumber: 1,
    imagePath: "/1.png",
    emoji: "🫁",
  },
  "all-seeing-observer": {
    name: "All-Seeing Observer",
    trait: "The Visionary",
    description:
      "You have an incredible ability to see opportunities and perspectives others miss, just like horses with their amazing 360-degree vision. You're always aware of what's happening around you.",
    fact: "Their eyes are located on the sides of their head, providing almost 360-degree vision, but there are blind spots in front and behind",
    factNumber: 2,
    imagePath: "/2.png",
    emoji: "👁️",
  },
  "big-picture-thinker": {
    name: "Big Picture Thinker",
    trait: "The Comprehensive Viewer",
    description:
      "You see the world in grand detail and notice things others overlook, just like horses who have the largest eyes among all land mammals. You appreciate the full scope of any situation.",
    fact: "Horses have the largest eyes among all terrestrial mammals",
    factNumber: 3,
    imagePath: "/3.png",
    emoji: "🔍",
  },
  "efficient-rester": {
    name: "Efficient Rester",
    trait: "The Adaptive Balancer",
    description:
      "You know how to balance efficiency with rest, just like horses who can sleep standing up but know when they need deep rest. You're adaptable and know when to conserve energy.",
    fact: "They can sleep standing up thanks to a 'locking mechanism' in their joints, but they need to lie down for deep sleep",
    factNumber: 4,
    imagePath: "/4.png",
    emoji: "😴",
  },
  powerhouse: {
    name: "Powerhouse",
    trait: "The Energetic Force",
    description:
      "You have incredible energy and passion that drives everything you do, just like a horse's powerful heart that can pump 250 liters of blood per minute. You bring intensity to every project.",
    fact: "A horse's heart weighs about 4-5 kg and can pump up to 250 liters of blood per minute during intense running",
    factNumber: 5,
    imagePath: "/5.png",
    emoji: "💪",
  },
  "lifelong-learner": {
    name: "Lifelong Learner",
    trait: "The Continuous Grower",
    description:
      "You never stop growing and learning, just like horse teeth that grow throughout their entire lifetime. You're always developing new skills and expanding your knowledge.",
    fact: "Horse teeth grow throughout their lifetime, and their age can be determined by tooth wear",
    factNumber: 6,
    imagePath: "/6.png",
    emoji: "📚",
  },
  "efficient-processor": {
    name: "Efficient Processor",
    trait: "The Streamlined Optimizer",
    description:
      "You're incredibly efficient at processing and handling complex tasks, just like horses who don't need a gallbladder but still digest perfectly. You find ways to optimize everything.",
    fact: "Horses don't have a gallbladder, but this doesn't prevent them from digesting plant food",
    factNumber: 7,
    imagePath: "/7.png",
    emoji: "⚡",
  },
  "loyal-friend": {
    name: "Loyal Friend",
    trait: "The Faithful Connector",
    description:
      "You have an amazing memory for people and relationships, just like horses who can recognize people after years apart. You value deep, lasting connections with others.",
    fact: "Horses have excellent memory and can recognize people after years",
    factNumber: 8,
    imagePath: "/8.png",
    emoji: "🤝",
  },
  "great-communicator": {
    name: "Great Communicator",
    trait: "The Expressive Connector",
    description:
      "You're incredibly expressive and great at communicating, just like horses who have more than 17 different facial expressions. You connect with people naturally and share emotions easily.",
    fact: "They use facial expressions to communicate, having more than 17 facial expressions",
    factNumber: 9,
    imagePath: "/9.png",
    emoji: "😊",
  },
  "problem-solver": {
    name: "Problem Solver",
    trait: "The Clever Innovator",
    description:
      "You're incredibly clever at figuring out solutions and learning new skills, just like horses who can learn to open doors and use simple mechanisms. You love tackling challenges.",
    fact: "Horses are capable of learning to open doors, unscrew caps, and use simple mechanisms",
    factNumber: 10,
    imagePath: "/10.png",
    emoji: "🧠",
  },
}
