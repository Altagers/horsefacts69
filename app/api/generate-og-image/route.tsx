import { ImageResponse } from "next/og"
import { getCharacter } from "@/lib/characters"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const characterId = searchParams.get("character")

    console.log("🖼️ Generating OG image for character:", characterId)

    if (!characterId) {
      console.error("❌ No character ID provided")
      return new Response("Character ID required", { status: 400 })
    }

    const character = getCharacter(characterId)

    if (!character) {
      console.error("❌ Character not found:", characterId)
      return new Response("Character not found", { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"
    const imageUrl = `${baseUrl}${character.image}`

    console.log("✅ Generating image for:", character.name, "Image URL:", imageUrl)

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
          position: "relative",
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

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginRight: "15px",
            }}
          >
            🐴
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#92400E",
            }}
          >
            Horse Facts & Pics
          </div>
          <div
            style={{
              fontSize: "40px",
              marginLeft: "15px",
              transform: "scaleX(-1)",
            }}
          >
            🐴
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "4px solid #F59E0B",
            maxWidth: "1000px",
            zIndex: 1,
          }}
        >
          {/* Character Image */}
          <div
            style={{
              display: "flex",
              marginRight: "40px",
            }}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={character.name}
              width="280"
              height="280"
              style={{
                borderRadius: "20px",
                border: "4px solid #F59E0B",
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
          </div>

          {/* Character Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: "bold",
                color: "#92400E",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "16px" }}>{character.emoji}</span>
              {character.name}
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "600",
                color: "#B45309",
                marginBottom: "20px",
              }}
            >
              {character.personality}
            </div>

            <div
              style={{
                fontSize: "18px",
                color: "#92400E",
                lineHeight: "1.4",
                marginBottom: "24px",
              }}
            >
              {character.description.length > 140
                ? character.description.substring(0, 140) + "..."
                : character.description}
            </div>

            <div
              style={{
                backgroundColor: "#FEF3C7",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #F59E0B",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#92400E",
                  marginBottom: "8px",
                }}
              >
                🐎 Horse Fact:
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#92400E",
                  fontStyle: "italic",
                  lineHeight: "1.3",
                }}
              >
                {character.fact.length > 120 ? character.fact.substring(0, 120) + "..." : character.fact}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "30px",
            fontSize: "20px",
            color: "#92400E",
            fontWeight: "600",
            zIndex: 1,
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
    console.error("❌ Error generating OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
