// Word-based personality analysis for horse facts
export function analyzePersonality(text: string): keyof typeof import("./characters").characters {
  const lowerText = text.toLowerCase()

  // Define keyword patterns for each personality type
  const patterns = {
    breathing: {
      keywords: [
        "focus",
        "direct",
        "clear",
        "straight",
        "simple",
        "efficient",
        "clean",
        "pure",
        "minimal",
        "essential",
      ],
      weight: 0,
    },
    vision: {
      keywords: [
        "see",
        "vision",
        "opportunity",
        "future",
        "trend",
        "observe",
        "watch",
        "notice",
        "spot",
        "aware",
        "perspective",
      ],
      weight: 0,
    },
    eyes: {
      keywords: [
        "big",
        "large",
        "huge",
        "massive",
        "grand",
        "comprehensive",
        "complete",
        "full",
        "total",
        "entire",
        "whole",
      ],
      weight: 0,
    },
    sleep: {
      keywords: ["adapt", "flexible", "balance", "rest", "relax", "chill", "easy", "comfortable", "adjust", "change"],
      weight: 0,
    },
    heart: {
      keywords: [
        "energy",
        "power",
        "strong",
        "intense",
        "passionate",
        "love",
        "heart",
        "pump",
        "drive",
        "force",
        "amazing",
        "incredible",
      ],
      weight: 0,
    },
    teeth: {
      keywords: [
        "learn",
        "grow",
        "develop",
        "study",
        "education",
        "knowledge",
        "skill",
        "improve",
        "better",
        "progress",
        "evolve",
      ],
      weight: 0,
    },
    digestion: {
      keywords: [
        "efficient",
        "optimize",
        "resource",
        "practical",
        "useful",
        "work",
        "process",
        "handle",
        "manage",
        "deal",
      ],
      weight: 0,
    },
    memory: {
      keywords: [
        "remember",
        "friend",
        "friendship",
        "loyal",
        "trust",
        "relationship",
        "connection",
        "bond",
        "family",
        "love",
        "care",
      ],
      weight: 0,
    },
    expression: {
      keywords: [
        "😀",
        "😊",
        "😂",
        "🎉",
        "❤️",
        "💕",
        "✨",
        "🔥",
        "💪",
        "👏",
        "lol",
        "haha",
        "awesome",
        "great",
        "amazing",
        "wonderful",
      ],
      weight: 0,
    },
    intelligence: {
      keywords: [
        "solve",
        "solution",
        "problem",
        "fix",
        "hack",
        "clever",
        "smart",
        "genius",
        "brilliant",
        "idea",
        "think",
        "strategy",
      ],
      weight: 0,
    },
  }

  // Count keyword matches for each personality
  for (const [personality, data] of Object.entries(patterns)) {
    for (const keyword of data.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      const matches = (lowerText.match(regex) || []).length
      data.weight += matches
    }
  }

  // Add bonus points for emoji usage (expression personality)
  const emojiCount = (
    text.match(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
    ) || []
  ).length
  if (emojiCount > 5) {
    patterns.expression.weight += emojiCount * 2
  }

  // Add bonus for exclamation marks (heart/energy personality)
  const exclamationCount = (text.match(/!/g) || []).length
  if (exclamationCount > 3) {
    patterns.heart.weight += exclamationCount
  }

  // Add bonus for question marks (intelligence/problem solving)
  const questionCount = (text.match(/\?/g) || []).length
  if (questionCount > 2) {
    patterns.intelligence.weight += questionCount
  }

  // Find the personality with the highest weight
  let maxWeight = 0
  let selectedPersonality: keyof typeof patterns = "memory" // default fallback

  for (const [personality, data] of Object.entries(patterns)) {
    if (data.weight > maxWeight) {
      maxWeight = data.weight
      selectedPersonality = personality as keyof typeof patterns
    }
  }

  // If no clear winner, use text length and posting frequency to decide
  if (maxWeight === 0) {
    const textLength = text.length
    const wordCount = text.split(/\s+/).length

    if (textLength > 2000) {
      return "expression" // Very talkative = great communicator
    } else if (wordCount < 50) {
      return "breathing" // Concise = focused and direct
    } else if (text.includes("http") || text.includes("link")) {
      return "vision" // Shares links = visionary
    } else {
      return "memory" // Default to loyal friend
    }
  }

  console.log(
    `Personality analysis results:`,
    Object.entries(patterns)
      .map(([k, v]) => `${k}: ${v.weight}`)
      .join(", "),
  )
  console.log(`Selected personality: ${selectedPersonality} with weight: ${maxWeight}`)

  return selectedPersonality
}
