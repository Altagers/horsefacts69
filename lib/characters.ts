export interface Character {
  id: string
  name: string
  description: string
  image: string
  fact: string
  personality: string
}

export const characters: Record<string, Character> = {
  "breathing-expert": {
    id: "breathing-expert",
    name: "Breathing Expert",
    description:
      "You're focused and direct, just like horses who can only breathe through their nostrils. You get straight to the point and don't waste time on unnecessary detours.",
    image: "/1.png",
    fact: "Horses cannot breathe through their mouth – only through their nostrils",
    personality: "The Direct Communicator",
  },
  "all-seeing-observer": {
    id: "all-seeing-observer",
    name: "All-Seeing Observer",
    description:
      "You have incredible awareness and can see opportunities others miss, just like horses with their almost 360-degree vision. You notice details that escape everyone else.",
    image: "/2.png",
    fact: "Their eyes are located on the sides of their head, providing almost 360-degree vision, but there are blind spots in front and behind",
    personality: "The Perceptive Visionary",
  },
  "big-picture-thinker": {
    id: "big-picture-thinker",
    name: "Big Picture Thinker",
    description:
      "You see the world in grand scale and comprehensive detail, just like horses who have the largest eyes among all terrestrial mammals. You think big and dream bigger.",
    image: "/3.png",
    fact: "Horses have the largest eyes among all terrestrial mammals",
    personality: "The Visionary Dreamer",
  },
  "efficient-rester": {
    id: "efficient-rester",
    name: "Efficient Rester",
    description:
      "You're incredibly adaptable and can find balance anywhere, just like horses who can sleep standing up but know when they need deep rest. You optimize your energy perfectly.",
    image: "/4.png",
    fact: 'They can sleep standing up thanks to a "locking mechanism" in their joints, but they need to lie down for deep sleep',
    personality: "The Balanced Optimizer",
  },
  powerhouse: {
    id: "powerhouse",
    name: "Powerhouse",
    description:
      "You have incredible energy and passion that drives everything you do, just like a horse's heart that can pump 250 liters of blood per minute. You bring intensity to every moment.",
    image: "/5.png",
    fact: "A horse's heart weighs about 4-5 kg and can pump up to 250 liters of blood per minute during intense running",
    personality: "The Energetic Force",
  },
  "lifelong-learner": {
    id: "lifelong-learner",
    name: "Lifelong Learner",
    description:
      "You're constantly growing and developing, just like horses whose teeth grow throughout their lifetime. You never stop improving and learning new things.",
    image: "/6.png",
    fact: "Horse teeth grow throughout their lifetime, and their age can be determined by tooth wear",
    personality: "The Continuous Grower",
  },
  "efficient-processor": {
    id: "efficient-processor",
    name: "Efficient Processor",
    description:
      "You work efficiently and get things done without unnecessary complications, just like horses who digest plant food perfectly without a gallbladder. You optimize everything.",
    image: "/7.png",
    fact: "Horses don't have a gallbladder, but this doesn't prevent them from digesting plant food",
    personality: "The Streamlined Worker",
  },
  "loyal-friend": {
    id: "loyal-friend",
    name: "Loyal Friend",
    description:
      "You have an incredible memory and form lasting relationships, just like horses who can recognize people after years. You value connections and never forget a friend.",
    image: "/8.png",
    fact: "Horses have excellent memory and can recognize people after years",
    personality: "The Faithful Companion",
  },
  "great-communicator": {
    id: "great-communicator",
    name: "Great Communicator",
    description:
      "You're incredibly expressive and great at communicating, just like horses who have more than 17 different facial expressions. You connect with people naturally.",
    image: "/9.png",
    fact: "They use facial expressions to communicate, having more than 17 facial expressions",
    personality: "The Expressive Connector",
  },
  "problem-solver": {
    id: "problem-solver",
    name: "Problem Solver",
    description:
      "You're clever and resourceful, always finding creative solutions, just like horses who can learn to open doors and use simple mechanisms. You figure things out.",
    image: "/10.png",
    fact: "Horses are capable of learning to open doors, unscrew caps, and use simple mechanisms",
    personality: "The Creative Innovator",
  },
}

export function getCharacter(id: string): Character | null {
  return characters[id] || null
}

export function getAllCharacters(): Character[] {
  return Object.values(characters)
}
