import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { characters } from "@/lib/characters"

/**
 * POST /api/analyze-user
 * Body: { fid: number }
 *
 * 1. Pull up to 25 recent casts from Neynar.
 * 2. Ask the OpenAI model which “horse fact personality” fits best.
 * 3. Return the matched character object.
 */
export const maxDuration = 60 // 60-second function timeout

export async function POST(req: NextRequest) {
  try {
    const { fid } = await req.json<{ fid: number }>()

    if (!fid) {
      return NextResponse.json({ error: "fid is required" }, { status: 400 })
    }

    /* ---------------- Fetch posts from Neynar ---------------- */
    if (!process.env.NEYNAR_API_KEY) {
      return NextResponse.json({ error: "NEYNAR_API_KEY not set" }, { status: 500 })
    }

    const feedRes = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      headers: { "X-API-KEY": process.env.NEYNAR_API_KEY },
    })

    if (!feedRes.ok) {
      const txt = await feedRes.text()
      return NextResponse.json({ error: `Neynar error (${feedRes.status}): ${txt}` }, { status: 502 })
    }

    const feedJson = await feedRes.json()
    const texts: string[] = feedJson.casts?.map((c: any) => c.text)?.filter((t: string) => t && t.trim().length) ?? []

    if (texts.length === 0) {
      return NextResponse.json({ error: "No textual casts found for this user." }, { status: 404 })
    }

    /* ---------------- Ask OpenAI which fact fits ---------------- */
    const prompt = `
You are a personality analyser.  
Match the author of the following posts to the ONE horse-fact personality
from the list. Respond with ONLY the key word:

breathing  –  focused, direct, respiratory-expert  
vision     –  visionary, aware, opportunity-seer  
eyes       –  perceptive, big-picture thinker  
sleep      –  adaptable, efficient rester  
heart      –  powerhouse, energetic, gives everything  
teeth      –  lifelong learner, always growing  
digestion  –  resourceful, makes most of what they have  
memory     –  loyal friend, remembers for years  
expression –  great communicator, highly expressive  
intelligence – clever problem solver, opens doors  

Posts:
${texts.slice(0, 20).join("\n---\n")}
`.trim()

    const { text: key } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 10,
      temperature: 0.4,
    })

    const chosen = characters[key.trim().toLowerCase() as keyof typeof characters] ?? characters.memory

    return NextResponse.json({ character: chosen })
  } catch (err) {
    console.error("analyze-user error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
