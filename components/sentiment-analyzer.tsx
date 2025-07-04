"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareResultButton } from "@/components/share-result-button"
import { characters } from "@/lib/characters"
import Image from "next/image"

export function SentimentAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { fid } = useMiniKit()

  const handleAnalyze = async () => {
    if (!fid) {
      setError("Please connect your Farcaster account first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

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
      console.error("Analysis error:", err)
      setError("Failed to analyze your personality. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (result) {
    const character = characters[result]
    if (!character) {
      setError("Character not found")
      setResult(null)
      return null
    }

    return (
      <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
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

          {/* Share Button */}
          <div className="pt-6">
            <ShareResultButton character={character} />
          </div>

          {/* Try Again Button */}
          <Button
            onClick={() => {
              setResult(null)
              setError(null)
            }}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-900 mb-2">🐴 Horse Personality Analyzer</CardTitle>
        <p className="text-amber-700">
          Discover which amazing horse fact matches your personality based on your Farcaster posts!
        </p>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !fid}
          size="lg"
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing Your Posts...
            </>
          ) : (
            "🔍 Analyze My Personality"
          )}
        </Button>

        {!fid && <p className="text-sm text-amber-600">Connect your Farcaster account to start the analysis</p>}
      </CardContent>
    </Card>
  )
}
