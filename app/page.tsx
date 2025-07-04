"use client"

import { useEffect } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { DogIcon as Horse, Sparkles } from "lucide-react"

// Simple Sparkle component for background decoration
const BgSparkle = ({
  top,
  left,
  size = "w-6 h-6",
  rotate = "0",
  delay = "0s",
}: { top: string; left: string; size?: string; rotate?: string; delay?: string }) => (
  <Sparkles
    className={`absolute text-amber-200/40 ${size} transform rotate-${rotate} animate-pulse`}
    style={{ top, left, animationDelay: delay }}
  />
)

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4 pt-8 selection:bg-amber-200 selection:text-amber-900 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Sparkles */}
      <BgSparkle top="10%" left="15%" size="w-8 h-8" rotate="12" delay="0.2s" />
      <BgSparkle top="20%" left="80%" size="w-6 h-6" rotate="-15" delay="0.5s" />
      <BgSparkle top="60%" left="5%" size="w-10 h-10" rotate="5" delay="0.8s" />
      <BgSparkle top="75%" left="90%" size="w-8 h-8" rotate="-5" delay="0.3s" />
      <BgSparkle top="40%" left="45%" size="w-4 h-4" rotate="20" delay="0.6s" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-2xl mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Horse className="w-12 h-12 text-amber-600" />
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight">Horse Facts</h1>
          <Horse className="w-12 h-12 text-amber-600 scale-x-[-1]" />
        </div>
        <p className="text-xl text-gray-600 font-medium">Discover amazing horse facts that match your personality!</p>
      </header>

      {/* Main analyzer component */}
      <div className="relative z-10 w-full max-w-md">
        <SentimentAnalyzer />
      </div>

      <footer className="relative z-10 mt-16 text-center">
        <p className="text-sm text-gray-500">Powered by fascinating equine knowledge 🐎</p>
      </footer>
    </div>
  )
}
