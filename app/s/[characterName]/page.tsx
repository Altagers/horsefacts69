import type { Metadata, ResolvingMetadata } from "next"
import { characters } from "@/lib/characters"
import { Button } from "@/components/ui/button"
import { DogIcon as Horse } from "lucide-react"

type Props = {
  params: { characterName: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const characterNameParam = decodeURIComponent(params.characterName)
  const character = Object.values(characters).find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === characterNameParam.toLowerCase(),
  )

  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"
  const appName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Horse Facts Analyzer"

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

  let frameDefinition: any

  if (!character) {
    frameDefinition = {
      version: "next",
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
    version: "next",
    imageUrl: dynamicImageUrl.toString(),
    button: {
      title: `I'm ${character.name}! Open Analyzer`,
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
    title: `I'm ${character.name}! - Horse Facts Result`,
    description: `I discovered I'm ${character.name} using the Horse Facts Analyzer! ${character.description}`,
    openGraph: {
      title: `I'm ${character.name}! ${character.emoji}`,
      description: character.description,
      images: [{ url: dynamicImageUrl.toString(), width: 1200, height: 630, alt: `${character.name} Result` }],
    },
    other: {
      "fc:frame": JSON.stringify(frameDefinition),
    },
  }
}

export default function SharePage({ params }: Props) {
  const characterNameParam = decodeURIComponent(params.characterName)
  const character = Object.values(characters).find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === characterNameParam.toLowerCase(),
  )
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 text-center">
        <div className="flex items-center gap-3 mb-6">
          <Horse className="w-12 h-12 text-amber-600" />
          <h1 className="text-4xl font-bold text-gray-800">Oops! Horse Fact Not Found</h1>
        </div>
        <p className="text-xl text-gray-600 mb-8">We couldn't find that horse fact result.</p>
        <a href={appBaseUrl}>
          <Button className="text-lg px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl">
            Discover Your Horse Fact!
          </Button>
        </a>
      </div>
    )
  }

  const ogImageUrl = `${appBaseUrl}/api/generate-og-image?characterName=${encodeURIComponent(characterNameParam)}&characterImage=${encodeURIComponent(character.imagePath)}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 text-center">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-200 max-w-lg w-full">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Horse className="w-8 h-8 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-800">Shared Horse Fact Result</h2>
        </div>

        <img
          src={ogImageUrl || "/placeholder.svg"}
          alt={`${character.name} Result`}
          width={400}
          height={210}
          className="rounded-lg shadow-xl border-2 border-gray-200 mx-auto mb-6"
        />

        <p className="text-lg text-gray-700 mb-8">
          Someone shared their result: They're {character.name}! {character.emoji}
        </p>

        <a href={appBaseUrl}>
          <Button className="text-lg px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl">
            Find YOUR Horse Fact!
          </Button>
        </a>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        You were viewing a shared result. Click above to discover your own horse fact!
      </p>
    </div>
  )
}
