"use client"

import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { ShareButton } from "@/components/share-button"
import Image from "next/image"

export default function Home() {
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

        {/* Fun Facts Preview */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-amber-900 text-center mb-8">🐎 Sample Horse Facts</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🫁", fact: "Horses can only breathe through their nostrils, not their mouth!" },
              { emoji: "👁️", fact: "Horses have almost 360-degree vision with eyes on the sides of their head!" },
              { emoji: "💪", fact: "A horse's heart can pump up to 250 liters of blood per minute!" },
              { emoji: "🧠", fact: "Horses can learn to open doors and use simple mechanisms!" },
              { emoji: "😴", fact: "Horses can sleep standing up thanks to joint-locking mechanisms!" },
              { emoji: "📚", fact: "Horse teeth grow throughout their entire lifetime!" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="text-3xl mb-3 text-center">{item.emoji}</div>
                <p className="text-amber-800 text-center font-medium">{item.fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Share App */}
        <div className="text-center mt-16">
          <ShareButton />
        </div>
      </div>
    </main>
  )
}
