"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import { ShareResultButton } from "./share-result-button"
import { getCharacter } from "@/lib/characters"
import Image from "next/image"

interface SentimentAnalyzerProps {
  fid: number
}

export function SentimentAnalyzer({ fid }: SentimentAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setResult(data.character)
    } catch (err) {
      setError("Internal error при попытке анализа.")
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const character = result ? getCharacter(result) : null

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!result && (
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Your Horse Personality</h2>
              <p className="text-gray-600">
                Based on your Farcaster posts, we'll match you with one of 10 unique horse personalities and fascinating
                facts!
              </p>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Your Posts...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze My Personality
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <Button
              onClick={handleAnalyze}
              variant="outline"
              className="mt-4 border-red-200 text-red-600 hover:bg-red-100 bg-transparent"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {character && (
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20" />
              <div className="relative p-8 text-center">
                <div className="mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">You're {character.name}!</h2>
                  <p className="text-xl text-amber-700 font-semibold mb-4">{character.personality}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">{character.description}</p>
                  <div className="bg-amber-100 rounded-lg p-4">
                    <p className="text-sm font-semibold text-amber-800 mb-2">🐴 Horse Fact:</p>
                    <p className="text-amber-700 text-sm">{character.fact}</p>
                  </div>
                </div>

                <ShareResultButton character={character} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
