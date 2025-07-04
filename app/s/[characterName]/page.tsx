import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareResultButton } from "@/components/share-result-button"
import { characters } from "@/lib/characters"
import Link from "next/link"

interface PageProps {
  params: {
    characterName: string
  }
}

// Generate static params for all characters
export function generateStaticParams() {
  return Object.values(characters).map((character) => ({
    characterName: character.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  }))
}

export default function CharacterPage({ params }: PageProps) {
  // Find character by matching the URL-friendly name
  const character = Object.values(characters).find(
    (char) =>
      char.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") === params.characterName,
  )

  if (!character) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Horse Facts Logo" width={40} height={40} className="rounded-lg" />
              <h1 className="text-xl font-bold text-amber-900">Horse Facts & Pics</h1>
            </div>
            <Link href="/">
              <Button variant="ghost" className="text-amber-700 hover:text-amber-900">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-amber-900">Horse Personality Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="relative">
              <Image
                src={character.imagePath || "/placeholder.svg"}
                alt={`Horse Fact ${character.factNumber}`}
                width={400}
                height={300}
                className="mx-auto rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  {character.emoji} {character.name}
                </h3>
                <p className="text-lg font-semibold text-amber-700 mb-3">{character.trait}</p>
                <p className="text-amber-800 leading-relaxed">{character.description}</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">🐎 Horse Fact #{character.factNumber}</h4>
                <p className="text-amber-800 text-sm italic">{character.fact}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ShareResultButton character={character} />
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 w-full sm:w-auto bg-transparent"
                >
                  Take Quiz Again
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
