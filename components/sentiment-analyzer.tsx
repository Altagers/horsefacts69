"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareResultButton } from "@/components/share-result-button"
import { characters } from "@/lib/characters"
import type { HorseFactCharacter } from "@/lib/characters"
import Image from "next/image"

export function SentimentAnalyzer() {
  const { context } = useMiniKit()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<HorseFactCharacter | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!context?.user?.fid) {
      setError("User not found. Please make sure you're logged in.")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      console.log("🔍 Starting analysis for FID:", context.user.fid)

      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fid: context.user.fid,
        }),
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.status}`)
      }

      const data = await response.json()
      console.log("📊 Analysis result:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      const character = characters[data.character]
      if (!character) {
        throw new Error("Character not found")
      }

      setResult(character)
    } catch (err) {
      console.error("❌ Analysis error:", err)
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  if (result) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-amber-900 mb-2">
            {result.emoji} {result.name}
          </CardTitle>
          <p className="text-xl font-semibold text-amber-700">{result.trait}</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Character Image */}
          <div className="relative mx-auto w-80 h-60">
            <Image
              src={result.imagePath || "/placeholder.svg"}
              alt={`Horse Fact ${result.factNumber}`}
              fill
              className="object-cover rounded-xl shadow-lg border-4 border-amber-200"
            />
            <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              Fact #{result.factNumber}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg text-amber-800 leading-relaxed max-w-lg mx-auto">{result.description}</p>

            {/* Horse Fact */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 max-w-lg mx-auto">
              <h4 className="font-bold text-amber-900 mb-3 text-lg">🐎 Amazing Horse Fact</h4>
              <p className="text-amber-800 italic leading-relaxed">{result.fact}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <ShareResultButton character={result} onReset={handleReset} />
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent px-8 py-3 rounded-xl"
            >
              🔄 Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-4xl">🐴</span>
          <CardTitle className="text-2xl font-bold text-amber-900">Horse Facts Analyzer</CardTitle>
          <span className="text-4xl transform scale-x-[-1]">🐴</span>
        </div>
        <p className="text-amber-700">Discover which horse personality matches your Farcaster posts!</p>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        {context?.user ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
              {context.user.pfp_url && (
                <Image
                  src={context.user.pfp_url || "/placeholder.svg"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-amber-300"
                />
              )}
              <div className="text-left">
                <p className="font-semibold text-amber-900">{context.user.display_name || context.user.username}</p>
                <p className="text-sm text-amber-600">@{context.user.username}</p>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              size="lg"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Your Posts...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  Discover My Horse Personality
                </div>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-amber-600">Please connect your Farcaster account to continue</p>
            <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto" />
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 font-medium">⚠️ {error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
