import { ImageResponse } from "next/og"
import { getCharacter } from "@/lib/characters"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const characterId = searchParams.get("character")

    if (!characterId) {
      return new Response("Character ID required", { status: 400 })
    }

    const character = getCharacter(characterId)

    if (!character) {
      return new Response("Character not found", { status: 404 })
    }

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEF3C7",
          fontFamily: "system-ui",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#92400E",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          🐴 Horse Facts & Pics 🐴
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "60px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "4px solid #F59E0B",
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          {/* Character name */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#92400E",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "20px" }}>{character.emoji}</span>
            {character.name}
          </div>

          {/* Personality */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#B45309",
              marginBottom: "30px",
            }}
          >
            {character.personality}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "#92400E",
              lineHeight: "1.4",
              marginBottom: "30px",
              maxWidth: "700px",
            }}
          >
            {character.description.length > 150
              ? character.description.substring(0, 150) + "..."
              : character.description}
          </div>

          {/* Horse fact */}
          <div
            style={{
              backgroundColor: "#FEF3C7",
              padding: "24px",
              borderRadius: "16px",
              border: "2px solid #F59E0B",
              maxWidth: "700px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#92400E",
                marginBottom: "12px",
              }}
            >
              🐎 Horse Fact:
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#92400E",
                fontStyle: "italic",
                lineHeight: "1.3",
              }}
            >
              {character.fact.length > 120 ? character.fact.substring(0, 120) + "..." : character.fact}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            fontSize: "20px",
            color: "#92400E",
            fontWeight: "600",
          }}
        >
          Discover your horse personality!
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)

    // Простой fallback
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEF3C7",
          fontSize: "48px",
          fontWeight: "bold",
          color: "#92400E",
        }}
      >
        🐴 Horse Facts & Pics 🐴
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  }
}
