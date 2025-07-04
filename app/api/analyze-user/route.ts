import { type NextRequest, NextResponse } from "next/server"
import { analyzePersonality } from "@/lib/personality-analyzer"

export async function POST(req: NextRequest) {
  try {
    const { fid } = await req.json()

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 })
    }

    console.log("🔍 Analyzing user with FID:", fid)

    // Get user's casts from Neynar
    const neynarApiKey = process.env.NEYNAR_API_KEY
    if (!neynarApiKey) {
      console.error("❌ NEYNAR_API_KEY is missing")
      return NextResponse.json({ error: "API configuration error" }, { status: 500 })
    }

    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      headers: {
        "X-API-KEY": neynarApiKey,
        "Content-Type": "application/json",
      },
    })

    if (!neynarResponse.ok) {
      console.error("❌ Neynar API error:", neynarResponse.status, await neynarResponse.text())
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
    }

    const neynarData = await neynarResponse.json()
    console.log("📊 Fetched", neynarData.casts?.length || 0, "casts")

    // Extract text from casts
    const texts = neynarData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    if (texts.length === 0) {
      console.log("⚠️ No texts found, using fallback")
      // Return a random character as fallback
      const fallbackCharacters = ["breathing-expert", "all-seeing-observer", "big-picture-thinker"]
      const randomCharacter = fallbackCharacters[Math.floor(Math.random() * fallbackCharacters.length)]
      return NextResponse.json({ character: randomCharacter })
    }

    // Analyze personality using our word-based system
    const character = analyzePersonality(texts)
    console.log("✅ Analysis complete, result:", character)

    return NextResponse.json({ character })
  } catch (error) {
    console.error("❌ Analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
