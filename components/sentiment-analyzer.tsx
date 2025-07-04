"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareResultButton } from "@/components/share-result-button"
import { getCharacter } from "@/lib/characters"
import Image from "next/image"
import sdk from "@farcaster/frame-sdk"

export function SentimentAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      // Get user context from Farcaster
      const context = await sdk.context
      const fid = context?.user?.fid

      if (!fid) {
        throw new Error("Unable to get user information")
      }

      console.log("🔍 Starting analysis for FID:", fid)

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
      console.log("✅ Analysis result:", data)

      setResult(data)
    } catch (err) {
      console.error("❌ Analysis error:", err)
      setError("Failed to analyze your personality. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  if (result) {
    const character = getCharacter(result.character)
    if (!character) {
      return <div>Character not found</div>
    }

    return (
      <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-amber-900">Your Horse Personality</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              className="object-contain rounded-2xl"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-amber-900 mb-2">
              {character.emoji} {character.name}
            </h3>
            <p className="text-xl font-semibold text-amber-700 mb-4">{character.personality}</p>
            <p className="text-lg text-amber-800 leading-relaxed mb-6">{character.description}</p>
          </div>

          <div className="bg-amber-100 rounded-xl p-6 border-2 border-amber-200">
            <h4 className="font-bold text-amber-900 mb-3 text-lg">🐎 Horse Fact:</h4>
            <p className="text-amber-800 italic">{character.fact}</p>
          </div>

          <div className="flex flex-col gap-4">
            <ShareResultButton character={character} />
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              Analyze Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-amber-900 mb-4">🐴 Discover Your Horse Personality</CardTitle>
        <p className="text-lg text-amber-700">
          Find out which amazing horse fact matches your personality based on your Farcaster posts!
        </p>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="relative w-16 h-16 mx-auto">
              <Image src={`/${num}.png`} alt={`Horse fact ${num}`} fill className="object-contain rounded-lg" />
            </div>
          ))}
        </div>

        {error && <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          size="lg"
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing Your Posts...
            </div>
          ) : (
            "🔍 Analyze My Personality"
          )}
        </Button>

        <p className="text-sm text-amber-600">
          We'll analyze your recent Farcaster posts to determine which horse fact best represents your personality!
        </p>
      </CardContent>
    </Card>
  )
}
