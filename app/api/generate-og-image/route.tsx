import { ImageResponse } from "next/og"
import { getCharacter } from "@/lib/characters"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const characterId = searchParams.get("character")

    console.log("🖼️ OG Image request for character:", characterId)

    if (!characterId) {
      console.error("❌ No character ID provided")
      return new Response("Character ID required", { status: 400 })
    }

    const character = getCharacter(characterId)

    if (!character) {
      console.error("❌ Character not found:", characterId)
      return new Response("Character not found", { status: 404 })
    }

    console.log("✅ Generating OG image for:", character.name)

    // Используем статичное изображение вместо динамической загрузки
    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"

    const response = new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEF3C7",
          backgroundImage: "linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FDBA74 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            fontSize: "60px",
            opacity: 0.3,
          }}
        >
          🐴
        </div>
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "60px",
            opacity: 0.3,
            transform: "scaleX(-1)",
          }}
        >
          🐴
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50px",
            fontSize: "40px",
            opacity: 0.2,
          }}
        >
          🌾
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "50px",
            fontSize: "40px",
            opacity: 0.2,
          }}
        >
          🌾
        </div>

        {/* Main content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "32px",
            padding: "60px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "6px solid #F59E0B",
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          {/* Header */}
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#92400E",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "15px" }}>🐴</span>
            Horse Facts & Pics
            <span style={{ marginLeft: "15px", transform: "scaleX(-1)" }}>🐴</span>
          </div>

          {/* Character info */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#92400E",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ marginRight: "20px" }}>{character.emoji}</span>
            {character.name}
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#B45309",
              marginBottom: "30px",
            }}
          >
            {character.personality}
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#92400E",
              lineHeight: "1.4",
              marginBottom: "40px",
              maxWidth: "800px",
            }}
          >
            {character.description.length > 120
              ? character.description.substring(0, 120) + "..."
              : character.description}
          </div>

          {/* Horse fact box */}
          <div
            style={{
              backgroundColor: "#FEF3C7",
              padding: "30px",
              borderRadius: "20px",
              border: "3px solid #F59E0B",
              maxWidth: "800px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#92400E",
                marginBottom: "15px",
              }}
            >
              🐎 Horse Fact:
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#92400E",
                fontStyle: "italic",
                lineHeight: "1.3",
              }}
            >
              {character.fact.length > 100 ? character.fact.substring(0, 100) + "..." : character.fact}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "40px",
              fontSize: "24px",
              color: "#92400E",
              fontWeight: "600",
            }}
          >
            Discover your horse personality!
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
    )

    console.log("✅ OG image generated successfully")
    return response
  } catch (error) {
    console.error("❌ Error generating OG image:", error)

    // Fallback изображение
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
