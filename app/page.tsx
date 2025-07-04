"use client"

import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { ShareButton } from "@/components/share-button"
import Image from "next/image"
import { useEffect } from "react"
import sdk from "@farcaster/frame-sdk"

export default function Home() {
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100">
      {/* Header */}
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="Horse Facts Logo" width={50} height={50} className="rounded-xl" />
              <div>
                <h1 className="text-2xl font-bold text-amber-900">Horse Facts & Pics</h1>
                <p className="text-amber-700">Discover your horse personality</p>
              </div>
            </div>
            <ShareButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image src="/banner.png" alt="Horse Facts Banner" fill className="object-contain" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Which Horse Fact Are You?</h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Discover your unique personality through amazing horse facts! We'll analyze your Farcaster posts and match
            you with one of 10 fascinating horse characteristics.
          </p>
        </div>

        {/* Main Analyzer */}
        <SentimentAnalyzer />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-amber-900 mb-12">Amazing Horse Facts Await</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              { num: 1, title: "Breathing", desc: "Only through nostrils" },
              { num: 2, title: "Vision", desc: "360-degree awareness" },
              { num: 3, title: "Eyes", desc: "Largest among mammals" },
              { num: 4, title: "Sleep", desc: "Standing up ability" },
              { num: 5, title: "Heart", desc: "250L per minute" },
              { num: 6, title: "Teeth", desc: "Grow for lifetime" },
              { num: 7, title: "Digestion", desc: "No gallbladder needed" },
              { num: 8, title: "Memory", desc: "Recognize after years" },
              { num: 9, title: "Expression", desc: "17+ facial expressions" },
              { num: 10, title: "Intelligence", desc: "Learn mechanisms" },
            ].map((fact) => (
              <div key={fact.num} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <Image
                    src={`/${fact.num}.png`}
                    alt={`Horse fact ${fact.num}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <h4 className="font-semibold text-amber-900 text-sm">{fact.title}</h4>
                <p className="text-xs text-amber-700">{fact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-amber-900 text-white">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold mb-2">🐴 Horse Facts & Pics</p>
          <p className="text-amber-200">Discover the amazing world of horses through personality analysis</p>
        </div>
      </footer>
    </main>
  )
}
