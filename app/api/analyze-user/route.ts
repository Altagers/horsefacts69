import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { characters } from "@/lib/characters"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { fid } = await req.json()

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 })
    }

    console.log(`API: Analyzing user with FID: ${fid}`)

    // Fetch user's casts from Neynar
    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      headers: {
        "X-API-KEY": process.env.NEYNAR_API_KEY!,
      },
    })

    if (!neynarResponse.ok) {
      throw new Error(`Neynar API error: ${neynarResponse.status}`)
    }

    const neynarData = await neynarResponse.json()
    const casts = neynarData.casts || []

    if (casts.length === 0) {
      return NextResponse.json({ error: "No posts found for analysis" }, { status: 404 })
    }

    // Extract text content from casts
    const postTexts = casts
      .map((cast: any) => cast.text)
      .filter((text: string) => text && text.trim().length > 0)
      .slice(0, 20) // Limit to 20 most recent posts

    if (postTexts.length === 0) {
      return NextResponse.json({ error: "No text content found in posts" }, { status: 404 })
    }

    console.log(`API: Found ${postTexts.length} posts to analyze`)

    // Analyze with OpenAI
    const prompt = `
    Analyze these social media posts and determine which horse fact personality they match best. 
    
    Here are the horse fact personalities:
    1. The Breathing Expert - Focused, direct, respiratory specialist (horses breathe only through nostrils)
    2. The All-Seeing Observer - Visionary, aware, sees opportunities (horses have 360-degree vision)
    3. The Big Picture Thinker - Perceptive, insightful, grand perspective (horses have largest eyes among land mammals)
    4. The Efficient Rester - Adaptable, resourceful, knows when to rest (horses sleep standing up)
    5. The Powerhouse - Strong, energetic, gives their all (horse heart pumps 250L/min)
    6. The Lifelong Learner - Growing, evolving, never stops learning (horse teeth grow throughout life)
    7. The Efficient Processor - Resourceful, adaptable, makes most of what they have (horses digest without gallbladder)
    8. The Loyal Friend - Memorable, faithful, deep relationships (horses remember people for years)
    9. The Great Communicator - Expressive, social, great at communication (horses have 17+ facial expressions)
    10. The Problem Solver - Clever, ingenious, figures out solutions (horses learn to open doors)

    Posts to analyze:
    ${postTexts.join("\n---\n")}

    Based on the writing style, topics, and personality shown in these posts, which horse fact personality matches best? 
    Respond with just the key from this list: breathing, vision, eyes, sleep, heart, teeth, digestion, memory, expression, intelligence
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at analyzing social media posts to determine personality types based on horse facts. Respond with only the single key word that matches the personality.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 50,
      temperature: 0.7,
    })

    const result = completion.choices[0]?.message?.content?.trim().toLowerCase()
    console.log(`API: OpenAI analysis result: ${result}`)

    // Map result to character
    const character = characters[result as keyof typeof characters] || characters.memory // Default fallback

    console.log(`API: Selected character: ${character.name}`)

    return NextResponse.json({
      character,
      analysis: {
        postsAnalyzed: postTexts.length,
        selectedPersonality: result,
      },
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze posts. Please try again." }, { status: 500 })
  }
}
