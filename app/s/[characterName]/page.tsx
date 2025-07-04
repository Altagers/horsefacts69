import { characters } from "@/lib/characters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

interface PageProps {
  params: {
    characterName: string
  }
}

export default function CharacterPage({ params }: PageProps) {
  // Find character by name (case insensitive, handle spaces and dashes)
  const characterName = params.characterName.toLowerCase().replace(/-/g, " ")
  const character = Object.values(characters).find((char) => char.name.toLowerCase() === characterName)

  if (!character) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-amber-900 mb-2">
              {character.emoji} {character.name}
            </CardTitle>
            <p className="text-xl font-semibold text-amber-700">{character.trait}</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Character Image */}
            <div className="relative mx-auto w-80 h-60">
              <Image
                src={character.imagePath || "/placeholder.svg"}
                alt={`Horse Fact ${character.factNumber}`}
                fill
                className="object-cover rounded-xl shadow-lg border-4 border-amber-200"
              />
              <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                Fact #{character.factNumber}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-amber-800 leading-relaxed max-w-lg mx-auto">{character.description}</p>

              {/* Horse Fact */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 max-w-lg mx-auto">
                <h4 className="font-bold text-amber-900 mb-3 text-lg">🐎 Amazing Horse Fact</h4>
                <p className="text-amber-800 italic leading-relaxed">{character.fact}</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-6">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  🔍 Discover Your Horse Personality
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

// Generate static params for all characters
export async function generateStaticParams() {
  return Object.values(characters).map((character) => ({
    characterName: character.name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const characterNameParam = decodeURIComponent(params.characterName)
  const character = Object.values(characters).find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === characterNameParam.toLowerCase(),
  )

  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"
  const appName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Horse Facts Analyzer"

  // Ensure icon and splash URLs are absolute and have defaults
  const appIcon = process.env.NEXT_PUBLIC_APP_ICON || "/logo.png"
  const appIconUrl = appIcon.startsWith("http")
    ? appIcon
    : `${appBaseUrl}${appIcon.startsWith("/") ? "" : "/"}${appIcon}`

  const appSplashImage = process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || "/splash.png"
  const appSplashImageUrl = appSplashImage.startsWith("http")
    ? appSplashImage
    : `${appBaseUrl}${appSplashImage.startsWith("/") ? "" : "/"}${appSplashImage}`

  const appSplashBackgroundColor = process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#FEF3C7"
  const defaultFcFrameImage = process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${appBaseUrl}/banner.png`

  // Define the frame structure based on your working example
  let frameDefinition: any

  if (!character) {
    frameDefinition = {
      version: "next", // As per your example
      imageUrl: defaultFcFrameImage,
      button: {
        title: "Open Horse Facts",
        action: {
          type: "launch_frame",
          name: appName,
          url: appBaseUrl,
          splashImageUrl: appSplashImageUrl,
          splashBackgroundColor: appSplashBackgroundColor,
        },
      },
    }
    return {
      title: "Horse Facts Analyzer Result",
      description: "Discover which horse fact matches your personality!",
      openGraph: {
        // Fallback OG tags
        title: "Horse Facts Analyzer",
        description: "Which horse fact are you? Find out!",
        images: [{ url: defaultFcFrameImage }],
      },
      other: {
        "fc:frame": JSON.stringify(frameDefinition),
      },
    }
  }

  const dynamicImageUrl = new URL("/api/generate-og-image", appBaseUrl)
  dynamicImageUrl.searchParams.set("characterName", characterNameParam)
  dynamicImageUrl.searchParams.set("characterImage", character.imagePath)

  frameDefinition = {
    version: "next", // As per your example
    imageUrl: dynamicImageUrl.toString(), // Dynamic image for the character
    button: {
      title: `I'm ${character.name}! Open Analyzer`, // Button title
      action: {
        type: "launch_frame",
        name: appName, // Name of the Mini App to launch
        url: appBaseUrl, // URL of the Mini App to launch
        splashImageUrl: appSplashImageUrl,
        splashBackgroundColor: appSplashBackgroundColor,
      },
    },
  }

  return {
    title: `I'm ${character.name}! - Horse Facts Result`,
    description: `I discovered I'm ${character.name} using the Horse Facts Analyzer! ${character.description}`,
    // OpenGraph tags as fallback for other platforms
    openGraph: {
      title: `I'm ${character.name}! ${character.emoji}`,
      description: character.description,
      images: [{ url: dynamicImageUrl.toString(), width: 1200, height: 630, alt: `${character.name} Result` }],
    },
    // Farcaster Frame metadata using the single JSON object structure
    other: {
      "fc:frame": JSON.stringify(frameDefinition),
    },
  }
}

// Fallback page content (remains the same)
export function SharePage({ params }: PageProps) {
  const characterNameParam = decodeURIComponent(params.characterName)
  const character = Object.values(characters).find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === characterNameParam.toLowerCase(),
  )
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-6">Oops! Horse Fact Not Found</h1>
        <p className="text-xl text-amber-700 mb-8">We couldn't find that horse fact result.</p>
        <a href={appBaseUrl}>
          <Button className="text-xl px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl">
            Discover Your Horse Fact!
          </Button>
        </a>
      </div>
    )
  }

  const ogImageUrl = `${appBaseUrl}/api/generate-og-image?characterName=${encodeURIComponent(characterNameParam)}&characterImage=${encodeURIComponent(character.imagePath)}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 text-center">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-amber-200 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">This result was shared:</h2>
        <img
          src={ogImageUrl || "/placeholder.svg"}
          alt={`${character.name} Result`}
          width={400}
          height={210}
          className="rounded-lg shadow-xl border-2 border-amber-200 mx-auto mb-6"
        />
        <p className="text-lg text-amber-800 mb-8">
          It looks like someone shared their result: They're {character.name}! {character.emoji}
        </p>
        <a href={appBaseUrl}>
          <Button className="text-xl px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl">
            Find YOUR Horse Personality!
          </Button>
        </a>
      </div>
      <p className="text-sm text-amber-600 mt-8">
        You were viewing a shared result. Click above to discover your own horse fact!
      </p>
    </div>
  )
}
