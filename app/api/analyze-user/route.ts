import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { characters } from "@/lib/characters"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fid = body.fid

    if (!fid) {
      throw new Error("FID not provided in the request body")
    }

    console.log(`Backend: Received request to analyze FID: ${fid}`)

    // Check environment variables
    if (!process.env.NEYNAR_API_KEY) {
      throw new Error("Neynar API key not configured")
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured")
    }

    console.log(`Backend: Querying Neynar API for FID: ${fid}`)

    // Fetch user casts from Neynar API
    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": process.env.NEYNAR_API_KEY,
      },
    })

    if (!neynarResponse.ok) {
      const errorText = await neynarResponse.text()
      console.error(`Backend: Neynar API error for FID ${fid}: ${errorText}`)
      throw new Error(`Neynar API error: ${neynarResponse.status} - ${errorText}`)
    }

    const neynarData = await neynarResponse.json()
    const castTexts = neynarData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    if (castTexts.length === 0) {
      console.log(`Backend: No casts found for FID ${fid}. Defaulting to memory.`)
      return NextResponse.json({ character: characters.memory })
    }

    // Prepare the prompt and call OpenAI API
    const allPosts = castTexts.slice(0, 20).join("\n---\n")
    console.log(`Backend: Sending ${castTexts.length} cast(s) to OpenAI for FID ${fid}.`)

    const { text: characterName } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a personality analyzer for Horse Facts personalities. Analyze the user's posts and determine which character they match best. Be specific and look for distinct patterns:

BREATHING - The Breathing Expert:
- Focused, direct communication style
- Prefers clear, straightforward approaches
- Posts about efficiency, clarity, getting to the point
- Language: "direct", "clear", "focused", "straightforward"

VISION - The All-Seeing Observer:
- Visionary posts, sees big picture and opportunities
- Shares insights about trends, future possibilities
- Posts about awareness, observation, spotting patterns
- Language: "opportunity", "vision", "see", "observe", "aware"

EYES - The Big Picture Thinker:
- Perceptive, insightful content
- Shares comprehensive analyses and broad perspectives
- Posts about understanding complex situations
- Language: "perspective", "insight", "comprehensive", "understand"

SLEEP - The Efficient Rester:
- Adaptable, resourceful approach to challenges
- Posts about work-life balance, efficiency, adaptation
- Knows when to push and when to rest
- Language: "adapt", "balance", "efficient", "resourceful"

HEART - The Powerhouse:
- High energy, passionate posts
- Shares content about giving maximum effort
- Posts about strength, determination, going all-out
- Language: "energy", "power", "strong", "passionate", "maximum"

TEETH - The Lifelong Learner:
- Always sharing learning experiences
- Posts about growth, development, continuous improvement
- Educational content, teaching others
- Language: "learn", "grow", "develop", "improve", "education"

DIGESTION - The Efficient Processor:
- Resourceful, makes the most of available resources
- Posts about optimization, doing more with less
- Practical, no-waste approach
- Language: "efficient", "optimize", "practical", "resourceful"

MEMORY - The Loyal Friend:
- Posts about relationships, loyalty, remembering people
- Shares memories, values long-term connections
- Faithful, reliable communication style
- Language: "remember", "loyal", "friend", "connection", "relationship"

EXPRESSION - The Great Communicator:
- Very expressive, uses emojis, varied communication styles
- Posts about communication, social interaction
- Engaging, social content
- Language: lots of emojis, varied expressions, social terms

INTELLIGENCE - The Problem Solver:
- Posts about solving problems, finding creative solutions
- Shares clever workarounds, innovative approaches
- Technical or strategic content
- Language: "solve", "solution", "clever", "innovative", "strategy"

Respond with ONLY the character key that best matches the overall pattern. Choose from: breathing, vision, eyes, sleep, heart, teeth, digestion, memory, expression, intelligence`,
      prompt: `Analyze these social media posts and determine which Horse Facts personality this person is most like:\n\n${allPosts}`,
      maxTokens: 15,
      temperature: 0.4,
    })

    console.log(`Backend: OpenAI response for FID ${fid}: ${characterName}`)

    // Map the OpenAI response to our character data
    const normalizedCharacterName = characterName.trim().toLowerCase()
    const matchedCharacter = characters[normalizedCharacterName as keyof typeof characters]

    if (!matchedCharacter) {
      console.error(
        `Backend: OpenAI returned an unknown character for FID ${fid}: '${characterName}'. Defaulting to memory.`,
      )
      return NextResponse.json({ character: characters.memory })
    }

    console.log(`Backend: Matched character for FID ${fid}: ${matchedCharacter.name}`)
    return NextResponse.json({
      character: matchedCharacter,
    })
  } catch (error) {
    console.error("Backend: Error in analyze-user route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to analyze user data",
      },
      { status: 500 },
    )
  }
}
