import { type NextRequest, NextResponse } from "next/server"
import { analyzePersonality } from "@/lib/personality-analyzer"

export async function POST(request: NextRequest) {
  try {
    const { fid } = await request.json()

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 })
    }

    console.log("Analyzing user with FID:", fid)

    // Get user's casts from Neynar
    const neynarApiKey = process.env.NEYNAR_API_KEY
    if (!neynarApiKey) {
      console.error("NEYNAR_API_KEY is not set")
      return NextResponse.json({ error: "API configuration error" }, { status: 500 })
    }

    const castsResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      headers: {
        "X-API-KEY": neynarApiKey,
        "Content-Type": "application/json",
      },
    })

    if (!castsResponse.ok) {
      console.error("Failed to fetch casts:", castsResponse.status, castsResponse.statusText)
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
    }

    const castsData = await castsResponse.json()
    console.log("Fetched casts:", castsData.casts?.length || 0)

    // Extract text from casts
    const texts = castsData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    if (texts.length === 0) {
      console.log("No texts found, using fallback")
      // Fallback to a random character if no posts
      const fallbackCharacters = ["breathing-expert", "all-seeing-observer", "big-picture-thinker"]
      const randomCharacter = fallbackCharacters[Math.floor(Math.random() * fallbackCharacters.length)]
      return NextResponse.json({ character: randomCharacter })
    }

    // Analyze personality using our word-based system
    const character = analyzePersonality(texts)
    console.log("Analysis result:", character)

    return NextResponse.json({ character })
  } catch (error) {
    console.error("Error in analyze-user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
