import { characters } from "@/lib/characters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

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
export async function generateMetadata({ params }: PageProps) {
  const characterName = params.characterName.toLowerCase().replace(/-/g, " ")
  const character = Object.values(characters).find((char) => char.name.toLowerCase() === characterName)

  if (!character) {
    return {
      title: "Character Not Found",
    }
  }

  return {
    title: `${character.name} - Horse Facts Personality`,
    description: character.description,
    openGraph: {
      title: `I'm ${character.name}!`,
      description: character.description,
      images: [character.imagePath],
    },
  }
}
