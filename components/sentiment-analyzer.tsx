"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { HorseFactCharacter } from "@/lib/characters"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShareResultButton } from "./share-result-button"
import { DogIcon as Horse, Sparkles } from "lucide-react"

const HorseFactsHeaderImage = () => (
  <div className="flex justify-center mb-8">
    <div className="relative">
      <Image
        src="/banner.png"
        alt="Horse Facts Banner"
        width={320}
        height={160}
        className="object-cover rounded-2xl shadow-lg"
        priority
      />
    </div>
  </div>
)

type AnalysisResult = {
  character: HorseFactCharacter
}

export function SentimentAnalyzer() {
  const { context } = useMiniKit()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    const userFid = context?.user?.fid

    if (!userFid) {
      setError("Please connect your Farcaster account to analyze your posts.")
      setLoading(false)
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    console.log(`Frontend: Determined FID to query: ${userFid}`)

    try {
      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid: userFid }),
      })
      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error || "Analysis failed")
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ResultScreen result={result} onReset={() => setResult(null)} />
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <HorseFactsHeaderImage />

      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Horse className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-800">What Horse Fact Are You?</h2>
            <Horse className="w-8 h-8 text-amber-600 scale-x-[-1]" />
          </div>
          <p className="text-gray-600 leading-relaxed">
            Let us analyze your Farcaster posts to discover which amazing horse fact matches your personality!
          </p>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={loading || !context?.user?.fid}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing Your Posts...
            </div>
          ) : !context?.user?.fid ? (
            "Connect Wallet to Analyze"
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Discover My Horse Fact!
              <Sparkles className="w-5 h-5" />
            </div>
          )}
        </Button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}

function ResultScreen({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  const character = result.character

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl text-center">
        {/* Character Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
            <span className="text-2xl">{character.emoji}</span>
            <span className="font-bold text-gray-800">You are...</span>
          </div>
        </div>

        {/* Character Name */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{character.name}</h2>

        {/* Trait */}
        <p className="text-lg text-amber-600 font-semibold mb-6">{character.trait}</p>

        {/* Horse Fact Image */}
        <div className="mb-6">
          <div className="relative inline-block">
            <Image
              src={character.imagePath || "/placeholder.svg"}
              alt={`Horse Fact ${character.factNumber}`}
              width={280}
              height={280}
              className="rounded-2xl shadow-lg border-4 border-white"
            />
            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              Fact #{character.factNumber}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100">
          <p className="text-gray-700 leading-relaxed font-medium">{character.description}</p>
        </div>

        {/* Share Button */}
        <ShareResultButton character={character} onReset={onReset} />
      </div>
    </div>
  )
}
