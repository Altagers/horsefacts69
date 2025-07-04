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
    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=25`, {
      headers: {
        "X-API-KEY": process.env.NEYNAR_API_KEY || "",
        "Content-Type": "application/json",
      },
    })

    if (!neynarResponse.ok) {
      console.error("Neynar API error:", neynarResponse.status, neynarResponse.statusText)
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
    }

    const userData = await neynarResponse.json()
    console.log("Fetched casts:", userData.casts?.length || 0)

    // Extract text from casts
    const texts = userData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    if (texts.length === 0) {
      console.log("No texts found, using fallback")
      // Fallback to a random personality if no casts
      const personalities = [
        "breathing-expert",
        "all-seeing-observer",
        "big-picture-thinker",
        "efficient-rester",
        "powerhouse",
        "lifelong-learner",
        "efficient-processor",
        "loyal-friend",
        "great-communicator",
        "problem-solver",
      ]
      const randomPersonality = personalities[Math.floor(Math.random() * personalities.length)]
      return NextResponse.json({ character: randomPersonality })
    }

    // Analyze personality using word-based analysis
    const personality = analyzePersonality(texts)
    console.log("Determined personality:", personality)

    return NextResponse.json({ character: personality })
  } catch (error) {
    console.error("Error in analyze-user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
