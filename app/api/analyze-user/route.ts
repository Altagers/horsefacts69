import { type NextRequest, NextResponse } from "next/server"
import { characters } from "@/lib/characters"
import { analyzePersonality } from "@/lib/personality-analyzer"

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

    // Analyze personality using word matching
    const allPosts = castTexts.slice(0, 20).join(" ")
    console.log(`Backend: Analyzing ${castTexts.length} cast(s) for FID ${fid}.`)

    const personalityKey = analyzePersonality(allPosts)
    const matchedCharacter = characters[personalityKey]

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
