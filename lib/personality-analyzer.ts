import { characters } from "./characters"

interface PersonalityScore {
  [key: string]: number
}

export function analyzePersonality(texts: string[]): string {
  const allText = texts.join(" ").toLowerCase()
  const scores: PersonalityScore = {}

  // Initialize scores
  Object.keys(characters).forEach((key) => {
    scores[key] = 0
  })

  // Keyword analysis for each personality type
  const keywordMap = {
    "breathing-expert": ["focus", "direct", "clear", "simple", "efficient", "breath", "air", "clean"],
    "all-seeing-observer": ["see", "vision", "opportunity", "future", "aware", "watch", "observe", "notice"],
    "big-picture-thinker": ["big", "large", "comprehensive", "complete", "grand", "overall", "whole", "entire"],
    "efficient-rester": ["adapt", "flexible", "balance", "rest", "comfortable", "sleep", "relax", "calm"],
    powerhouse: ["energy", "power", "strong", "passionate", "amazing", "intense", "force", "drive"],
    "lifelong-learner": ["learn", "grow", "develop", "study", "improve", "knowledge", "education", "skill"],
    "efficient-processor": ["efficient", "optimize", "practical", "work", "process", "system", "organize"],
    "loyal-friend": ["remember", "friend", "loyal", "trust", "relationship", "connection", "bond", "care"],
    "great-communicator": ["talk", "speak", "communicate", "express", "share", "tell", "conversation", "social"],
    "problem-solver": ["solve", "solution", "problem", "clever", "strategy", "fix", "answer", "resolve"],
  }

  // Count keyword matches
  Object.entries(keywordMap).forEach(([personality, keywords]) => {
    keywords.forEach((keyword) => {
      const matches = (allText.match(new RegExp(keyword, "g")) || []).length
      scores[personality] += matches * 2 // Weight keyword matches
    })
  })

  // Emoji analysis (Great Communicator gets bonus for emojis)
  const emojiCount = (
    allText.match(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
    ) || []
  ).length
  scores["great-communicator"] += emojiCount

  // Punctuation analysis
  const exclamationCount = (allText.match(/!/g) || []).length
  const questionCount = (allText.match(/\?/g) || []).length

  scores["powerhouse"] += exclamationCount * 2
  scores["problem-solver"] += questionCount * 2

  // Text length analysis
  const avgLength = allText.length / texts.length
  if (avgLength > 100) {
    scores["big-picture-thinker"] += 3
    scores["lifelong-learner"] += 2
  } else if (avgLength < 30) {
    scores["breathing-expert"] += 3
    scores["efficient-processor"] += 2
  }

  // Find the personality with the highest score
  const topPersonality = Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0]

  // If all scores are 0, return a random personality
  if (scores[topPersonality] === 0) {
    const personalities = Object.keys(characters)
    return personalities[Math.floor(Math.random() * personalities.length)]
  }

  return topPersonality
}
