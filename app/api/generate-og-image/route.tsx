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

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"

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
          backgroundImage: "linear-gradient(45deg, #FEF3C7 0%, #FED7AA 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #F59E0B20 0%, transparent 50%), radial-gradient(circle at 75% 75%, #EA580C20 0%, transparent 50%)",
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Character Image */}
          <img
            src={`${baseUrl}${character.image}`}
            alt={character.name}
            width="200"
            height="200"
            style={{
              borderRadius: "20px",
              marginBottom: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          />

          {/* Character Name */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1F2937",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {character.name}
          </div>

          {/* Personality */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#B45309",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            {character.personality}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#374151",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: "1.4",
              marginBottom: "30px",
            }}
          >
            {character.description}
          </div>

          {/* App Title */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#D97706",
              textAlign: "center",
            }}
          >
            🐴 Horse Facts & Pics
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
