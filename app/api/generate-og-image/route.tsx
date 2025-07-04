import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage")

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"

    if (!characterName || !characterImagePublicPath) {
      return new Response("Missing character information", { status: 400 })
    }

    const characterImageUrl = new URL(characterImagePublicPath, baseUrl).toString()

    const characterData = Object.values(characters).find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === characterName.toLowerCase(),
    )

    if (!characterData) {
      return new Response("Character not found", { status: 404 })
    }

    const bgGradient = "linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FBBF24 100%)"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: bgGradient,
          padding: "40px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div style={{ fontSize: "48px" }}>🐴</div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1F2937",
              margin: 0,
            }}
          >
            Horse Facts
          </h1>
          <div style={{ fontSize: "48px", transform: "scaleX(-1)" }}>🐴</div>
        </div>

        {/* Character Image */}
        <img
          src={characterImageUrl || "/placeholder.svg"}
          width={280}
          height={280}
          style={{
            borderRadius: "20px",
            border: "6px solid white",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            marginBottom: "32px",
          }}
          alt={characterData.name}
        />

        {/* Character Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "32px" }}>{characterData.emoji}</span>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              color: "#1F2937",
              margin: 0,
              textAlign: "center",
            }}
          >
            I'm {characterData.name}!
          </h2>
        </div>

        {/* Fact Number Badge */}
        <div
          style={{
            background: "#F59E0B",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "8px 20px",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          Horse Fact #{characterData.factNumber}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "28px",
            color: "#374151",
            textAlign: "center",
            maxWidth: "90%",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {characterData.description}
        </p>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.error(`OG Image Error: Failed to generate ImageResponse:`, e.message)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
