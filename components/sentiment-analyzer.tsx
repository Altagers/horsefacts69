"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { ShareResultButton } from "./share-result-button"
import Image from "next/image"
import type { HorseFactCharacter } from "@/lib/characters"

declare global {
  interface Window {
    MiniKit?: {
      user?: {
        fid?: number
      }
    }
  }
}

export function SentimentAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<HorseFactCharacter | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      // Get FID from MiniKit or use a test FID
      let fid = window.MiniKit?.user?.fid

      if (!fid) {
        // For testing purposes, you can use a test FID
        fid = 3
        console.log("Frontend: No MiniKit FID found, using test FID:", fid)
      }

      console.log("Frontend: Determined FID to query:", fid)

      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const data = await response.json()
      setResult(data.character)
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (result) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-amber-900 mb-2">
              🎉 Your Horse Personality Revealed!
            </CardTitle>
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

            {/* Character Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-amber-900 mb-2">
                  {result.emoji} {result.name}
                </h3>
                <p className="text-xl font-semibold text-amber-700 mb-4">{result.trait}</p>
                <p className="text-lg text-amber-800 leading-relaxed max-w-lg mx-auto">{result.description}</p>
              </div>

              {/* Horse Fact */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 max-w-lg mx-auto">
                <h4 className="font-bold text-amber-900 mb-3 text-lg">🐎 Amazing Horse Fact</h4>
                <p className="text-amber-800 italic leading-relaxed">{result.fact}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <ShareResultButton character={result} onReset={() => setResult(null)} />
              <Button
                onClick={() => {
                  setResult(null)
                  setError(null)
                }}
                variant="outline"
                size="lg"
                className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold px-6"
              >
                🔄 Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Image */}
      <div className="text-center mb-8">
        <Image
          src="/banner.png"
          alt="Horse Facts Banner"
          width={400}
          height={200}
          className="mx-auto rounded-2xl shadow-lg border-4 border-amber-200"
          priority
        />
      </div>

      <Card className="border-amber-200 bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-amber-900 mb-4">🐴 Discover Your Horse Personality</CardTitle>
          <p className="text-lg text-amber-700 leading-relaxed">
            We'll analyze your Farcaster posts to discover which amazing horse fact matches your unique personality!
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Analyzing Your Posts...
              </>
            ) : (
              "🔍 Discover My Horse Fact!"
            )}
          </Button>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">How it works:</h3>
            <div className="text-amber-700 space-y-2 text-left max-w-md mx-auto">
              <p>• 📝 We analyze your recent Farcaster posts</p>
              <p>• 🧠 Match your writing style to horse personalities</p>
              <p>• 🐎 Discover fascinating horse facts about yourself!</p>
              <p>• 🎉 Share your result with friends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
