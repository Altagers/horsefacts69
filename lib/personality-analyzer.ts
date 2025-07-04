// Word-based personality analysis for horse facts
import { characters } from "./characters"

interface PersonalityScore {
  [key: string]: number
}

export function analyzePersonality(texts: string[]): string {
  const combinedText = texts.join(" ").toLowerCase()
  const scores: PersonalityScore = {}

  // Initialize scores
  Object.keys(characters).forEach((key) => {
    scores[key] = 0
  })

  // Define keywords for each personality
  const personalityKeywords = {
    "breathing-expert": ["focus", "direct", "clear", "simple", "efficient", "breath", "air", "nose"],
    "all-seeing-observer": ["see", "vision", "watch", "observe", "look", "view", "perspective", "aware"],
    "big-picture-thinker": ["big", "large", "huge", "massive", "comprehensive", "complete", "grand", "wide"],
    "efficient-rester": ["rest", "sleep", "relax", "comfortable", "balance", "adapt", "flexible", "easy"],
    powerhouse: ["energy", "power", "strong", "passionate", "amazing", "intense", "force", "drive"],
    "lifelong-learner": ["learn", "grow", "develop", "study", "improve", "knowledge", "education", "skill"],
    "efficient-processor": ["efficient", "optimize", "practical", "work", "process", "system", "organize"],
    "loyal-friend": ["friend", "loyal", "trust", "remember", "relationship", "bond", "connection", "care"],
    "great-communicator": ["talk", "speak", "communicate", "express", "share", "tell", "conversation"],
    "problem-solver": ["solve", "solution", "problem", "fix", "clever", "strategy", "think", "smart"],
  }

  // Count keyword matches
  Object.entries(personalityKeywords).forEach(([personality, keywords]) => {
    keywords.forEach((keyword) => {
      const matches = (combinedText.match(new RegExp(keyword, "g")) || []).length
      scores[personality] += matches * 2
    })
  })

  // Bonus points for specific patterns
  const emojiCount = (
    combinedText.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) ||
    []
  ).length
  if (emojiCount > 5) {
    scores["great-communicator"] += 3
  }

  const exclamationCount = (combinedText.match(/!/g) || []).length
  if (exclamationCount > 3) {
    scores["powerhouse"] += 2
  }

  const questionCount = (combinedText.match(/\?/g) || []).length
  if (questionCount > 2) {
    scores["problem-solver"] += 2
  }

  // Find the personality with the highest score
  const topPersonality = Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0]

  // If no clear winner, use fallback logic
  if (scores[topPersonality] === 0) {
    if (combinedText.length > 500) {
      return "great-communicator"
    } else if (combinedText.includes("work") || combinedText.includes("build")) {
      return "efficient-processor"
    } else {
      return "breathing-expert"
    }
  }

  return topPersonality
}
