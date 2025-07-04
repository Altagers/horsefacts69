interface PersonalityScore {
  [key: string]: number
}

const personalityKeywords = {
  "breathing-expert": ["focus", "direct", "clear", "simple", "efficient", "straight", "point", "quick", "fast", "now"],
  "all-seeing-observer": ["see", "vision", "look", "watch", "notice", "observe", "aware", "perspective", "view", "eye"],
  "big-picture-thinker": [
    "big",
    "large",
    "huge",
    "massive",
    "grand",
    "scale",
    "overall",
    "complete",
    "comprehensive",
    "total",
  ],
  "efficient-rester": [
    "balance",
    "rest",
    "sleep",
    "relax",
    "chill",
    "calm",
    "peace",
    "comfortable",
    "adapt",
    "flexible",
  ],
  powerhouse: ["energy", "power", "strong", "intense", "passionate", "amazing", "incredible", "awesome", "wow", "!"],
  "lifelong-learner": [
    "learn",
    "study",
    "grow",
    "develop",
    "improve",
    "better",
    "knowledge",
    "understand",
    "discover",
    "new",
  ],
  "efficient-processor": [
    "work",
    "do",
    "make",
    "build",
    "create",
    "efficient",
    "optimize",
    "process",
    "handle",
    "manage",
  ],
  "loyal-friend": ["friend", "friendship", "loyal", "trust", "remember", "care", "love", "support", "help", "together"],
  "great-communicator": [
    "talk",
    "say",
    "tell",
    "share",
    "communicate",
    "express",
    "speak",
    "conversation",
    "chat",
    "discuss",
  ],
  "problem-solver": ["solve", "solution", "problem", "fix", "figure", "think", "idea", "smart", "clever", "strategy"],
}

export function analyzePersonality(texts: string[]): { character: string; confidence: number } {
  const scores: PersonalityScore = {}
  const allText = texts.join(" ").toLowerCase()

  // Initialize scores
  Object.keys(personalityKeywords).forEach((personality) => {
    scores[personality] = 0
  })

  // Count keyword matches
  Object.entries(personalityKeywords).forEach(([personality, keywords]) => {
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      const matches = allText.match(regex)
      if (matches) {
        scores[personality] += matches.length
      }
    })
  })

  // Bonus scoring for special patterns
  const emojiCount = (
    allText.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || []
  ).length
  if (emojiCount > 5) {
    scores["great-communicator"] += emojiCount * 0.5
  }

  const exclamationCount = (allText.match(/!/g) || []).length
  if (exclamationCount > 3) {
    scores["powerhouse"] += exclamationCount * 0.3
  }

  const questionCount = (allText.match(/\?/g) || []).length
  if (questionCount > 2) {
    scores["problem-solver"] += questionCount * 0.4
  }

  // Find the personality with highest score
  let maxScore = 0
  let selectedPersonality = "great-communicator" // default

  Object.entries(scores).forEach(([personality, score]) => {
    if (score > maxScore) {
      maxScore = score
      selectedPersonality = personality
    }
  })

  // Calculate confidence based on score distribution
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const confidence = totalScore > 0 ? Math.min(maxScore / totalScore, 1) : 0.5

  return {
    character: selectedPersonality,
    confidence: Math.max(confidence, 0.3), // minimum confidence
  }
}
