import { type NextRequest, NextResponse } from "next/server"
import { analyzePersonality } from "@/lib/personality-analyzer"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fid } = body

    if (!fid) {
      return NextResponse.json({ error: "FID is required" }, { status: 400 })
    }

    console.log("🔍 Analyzing user with FID:", fid)

    // Get user's casts from Neynar
    const neynarApiKey = process.env.NEYNAR_API_KEY
    if (!neynarApiKey) {
      console.error("❌ NEYNAR_API_KEY not found")
      return NextResponse.json({ error: "API configuration error" }, { status: 500 })
    }

    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      headers: {
        "X-API-KEY": neynarApiKey,
        "Content-Type": "application/json",
      },
    })

    if (!neynarResponse.ok) {
      console.error("❌ Neynar API error:", neynarResponse.status)
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
    }

    const neynarData = await neynarResponse.json()
    const casts = neynarData.casts || []

    console.log(`📝 Found ${casts.length} casts for analysis`)

    // Extract text from casts
    const texts = casts.map((cast: any) => cast.text).filter(Boolean)

    if (texts.length === 0) {
      console.log("⚠️ No text content found, using default")
      return NextResponse.json({
        character: "great-communicator",
        confidence: 0.5,
      })
    }

    // Analyze personality using our word-based system
    const result = analyzePersonality(texts)

    console.log("✅ Analysis complete:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("❌ Analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
