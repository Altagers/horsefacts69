import { getCharacter } from "@/lib/characters"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ShareResultButton } from "@/components/share-result-button"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"

interface PageProps {
  params: {
    characterName: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const character = getCharacter(params.characterName)

  if (!character) {
    return {
      title: "Character Not Found - Horse Facts & Pics",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"
  const ogImageUrl = `${baseUrl}/api/generate-og-image?character=${character.id}`

  return {
    title: `${character.name} - Horse Facts & Pics`,
    description: `${character.description} Horse Fact: ${character.fact}`,
    openGraph: {
      title: `I'm ${character.name}! ${character.emoji} ${character.personality}`,
      description: character.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${character.name} - ${character.personality}`,
        },
      ],
      type: "website",
      siteName: "Horse Facts & Pics",
      url: `${baseUrl}/s/${character.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `I'm ${character.name}! ${character.emoji} ${character.personality}`,
      description: character.description,
      images: [ogImageUrl],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: ogImageUrl,
        button: {
          title: `I'm ${character.name}! Open Analyzer`,
          action: {
            type: "launch_frame",
            name: "Horse Facts & Pics",
            url: baseUrl,
            splashImageUrl: `${baseUrl}/splash.png`,
            splashBackgroundColor: "#FEF3C7",
          },
        },
      }),
    },
  }
}

export async function generateStaticParams() {
  const characterIds = [
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

  return characterIds.map((characterName) => ({
    characterName,
  }))
}

export default function CharacterPage({ params }: PageProps) {
  const character = getCharacter(params.characterName)

  if (!character) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20" />
              <div className="relative p-8 text-center">
                <div className="mb-8">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {character.emoji} {character.name}
                  </h1>
                  <p className="text-2xl text-amber-700 font-semibold mb-6">{character.personality}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-8">
                  <p className="text-gray-700 text-xl leading-relaxed mb-6">{character.description}</p>
                  <div className="bg-amber-100 rounded-lg p-6">
                    <p className="text-lg font-semibold text-amber-800 mb-3">🐴 Horse Fact:</p>
                    <p className="text-amber-700 text-lg">{character.fact}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <ShareResultButton character={character} />
                  <div className="text-center">
                    <a href="/" className="text-amber-600 hover:text-amber-700 font-medium text-lg underline">
                      ← Discover Your Own Horse Personality
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
