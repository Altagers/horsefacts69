import { ImageResponse } from "next/og"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const characterName = searchParams.get("characterName")
    const characterImage = searchParams.get("characterImage")

    if (!characterName) {
      return new Response("Missing characterName parameter", { status: 400 })
    }

    const character = Object.values(characters).find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === characterName.toLowerCase(),
    )

    if (!character) {
      return new Response("Character not found", { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"
    const imageUrl = characterImage?.startsWith("http")
      ? characterImage
      : `${baseUrl}${characterImage || character.imagePath}`

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
          backgroundImage: "linear-gradient(45deg, #FEF3C7 0%, #FED7AA 50%, #FEF3C7 100%)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginRight: "20px",
            }}
          >
            🐴
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#92400E",
            }}
          >
            Horse Facts & Pics
          </div>
          <div
            style={{
              fontSize: "48px",
              marginLeft: "20px",
              transform: "scaleX(-1)",
            }}
          >
            🐴
          </div>
        </div>

        {/* Character Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "3px solid #F59E0B",
            maxWidth: "1000px",
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
              width="300"
              height="200"
              style={{
                borderRadius: "16px",
                border: "4px solid #F59E0B",
                objectFit: "cover",
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
                fontSize: "48px",
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
                fontSize: "28px",
                fontWeight: "600",
                color: "#B45309",
                marginBottom: "20px",
              }}
            >
              {character.trait}
            </div>

            <div
              style={{
                fontSize: "20px",
                color: "#92400E",
                lineHeight: "1.4",
                marginBottom: "24px",
              }}
            >
              {character.description.length > 120
                ? character.description.substring(0, 120) + "..."
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
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#92400E",
                  marginBottom: "8px",
                }}
              >
                🐎 Horse Fact #{character.factNumber}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#92400E",
                  fontStyle: "italic",
                }}
              >
                {character.fact.length > 100 ? character.fact.substring(0, 100) + "..." : character.fact}
              </div>
            </div>
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
          Discover your horse personality at horsefacts-pics.vercel.app
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
