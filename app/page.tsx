"use client"

import { useEffect } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { ShareButton } from "@/components/share-button"
import { StepsSection } from "@/components/steps-section"
import Image from "next/image"

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100">
      {/* Header */}
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <Image src="/logo.png" alt="Horse Facts Logo" width={48} height={48} className="rounded-xl shadow-md" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-amber-900">Horse Facts & Pics</h1>
              <p className="text-amber-700 font-medium">Discover Your Horse Personality</p>
            </div>
            <Image
              src="/logo.png"
              alt="Horse Facts Logo"
              width={48}
              height={48}
              className="rounded-xl shadow-md transform scale-x-[-1]"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-6xl">🐴</span>
            <h2 className="text-5xl font-bold text-amber-900">Amazing Horse Facts</h2>
            <span className="text-6xl transform scale-x-[-1]">🐴</span>
          </div>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Did you know horses have incredible abilities? Discover which amazing horse fact matches your personality
            based on your Farcaster posts!
          </p>
        </div>

        {/* Analyzer Component */}
        <div className="flex justify-center mb-12">
          <SentimentAnalyzer />
        </div>

        {/* Steps Section */}
        <div className="mb-12">
          <StepsSection />
        </div>

        {/* Share App */}
        <div className="text-center">
          <ShareButton />
        </div>
      </div>
    </main>
  )
}
