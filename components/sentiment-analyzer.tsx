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
      <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-amber-900">Your Horse Personality!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="relative">
            <Image
              src={result.imagePath || "/placeholder.svg"}
              alt={`Horse Fact ${result.factNumber}`}
              width={400}
              height={300}
              className="mx-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                {result.emoji} {result.name}
              </h3>
              <p className="text-lg font-semibold text-amber-700 mb-3">{result.trait}</p>
              <p className="text-amber-800 leading-relaxed">{result.description}</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">🐎 Horse Fact #{result.factNumber}</h4>
              <p className="text-amber-800 text-sm italic">{result.fact}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ShareResultButton character={result} />
            <Button
              onClick={() => {
                setResult(null)
                setError(null)
              }}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Analyze Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-amber-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-amber-900">🐴 Discover Your Horse Personality</CardTitle>
        <p className="text-amber-700">
          Connect with Farcaster to analyze your posts and discover which horse fact matches your personality!
        </p>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          size="lg"
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Your Posts...
            </>
          ) : (
            "🔍 Analyze My Personality"
          )}
        </Button>

        <div className="text-sm text-amber-600 space-y-2">
          <p>• We'll analyze your recent Farcaster posts</p>
          <p>• Match you with one of 10 horse personalities</p>
          <p>• Learn fascinating horse facts about yourself!</p>
        </div>
      </CardContent>
    </Card>
  )
}
