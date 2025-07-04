export function analyzePersonality(texts: string[]): string {
  const allText = texts.join(" ").toLowerCase()

  // Define keywords for each personality
  const personalityKeywords = {
    "breathing-expert": ["focus", "direct", "clear", "simple", "efficient", "breath", "air", "nose", "direct"],
    "all-seeing-observer": ["see", "vision", "look", "watch", "observe", "notice", "view", "perspective", "aware"],
    "big-picture-thinker": ["big", "large", "huge", "massive", "comprehensive", "complete", "grand", "wide", "broad"],
    "efficient-rester": ["sleep", "rest", "relax", "adapt", "flexible", "balance", "comfortable", "easy", "chill"],
    powerhouse: ["energy", "power", "strong", "passionate", "amazing", "awesome", "incredible", "intense", "force"],
    "lifelong-learner": ["learn", "grow", "develop", "study", "improve", "education", "knowledge", "skill", "progress"],
    "efficient-processor": ["work", "efficient", "optimize", "practical", "process", "system", "organize", "method"],
    "loyal-friend": ["friend", "loyal", "trust", "remember", "relationship", "connection", "bond", "support"],
    "great-communicator": ["talk", "speak", "communicate", "express", "share", "tell", "conversation", "social"],
    "problem-solver": ["solve", "solution", "problem", "fix", "clever", "smart", "strategy", "think", "idea"],
  }

  const scores: Record<string, number> = {}

  // Initialize scores
  Object.keys(personalityKeywords).forEach((personality) => {
    scores[personality] = 0
  })

  // Count keyword matches
  Object.entries(personalityKeywords).forEach(([personality, keywords]) => {
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "g")) || []).length
      scores[personality] += matches
    })
  })

  // Bonus points for specific patterns
  const emojiCount = (
    allText.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || []
  ).length
  if (emojiCount > 5) {
    scores["great-communicator"] += 3
  }

  const exclamationCount = (allText.match(/!/g) || []).length
  if (exclamationCount > 3) {
    scores["powerhouse"] += 2
  }

  const questionCount = (allText.match(/\?/g) || []).length
  if (questionCount > 2) {
    scores["problem-solver"] += 2
  }

  // Find personality with highest score
  let maxScore = 0
  let selectedPersonality = "breathing-expert"

  Object.entries(scores).forEach(([personality, score]) => {
    if (score > maxScore) {
      maxScore = score
      selectedPersonality = personality
    }
  })

  // If no clear winner, use text length patterns
  if (maxScore === 0) {
    const avgLength = allText.length / texts.length
    if (avgLength > 100) return "big-picture-thinker"
    if (avgLength < 30) return "efficient-processor"
    if (texts.length > 20) return "great-communicator"
    return "breathing-expert"
  }

  return selectedPersonality
}
