"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { StepsSection } from "@/components/steps-section"

export default function HomePage() {
  const [showAnalyzer, setShowAnalyzer] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Horse Facts Logo" width={40} height={40} className="rounded-lg" />
              <h1 className="text-xl font-bold text-amber-900">Horse Facts & Pics</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!showAnalyzer ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="mb-8">
                <Image
                  src="/banner.png"
                  alt="Horse Facts Banner"
                  width={600}
                  height={300}
                  className="mx-auto rounded-2xl shadow-lg"
                  priority
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Discover Your Horse Personality</h2>

              <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto">
                Connect your Farcaster account and discover which of 10 amazing horse facts matches your personality!
                From breathing experts to problem solvers, find your equine spirit.
              </p>

              <Button
                onClick={() => setShowAnalyzer(true)}
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                🐴 Start Analysis
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="font-semibold text-amber-900 mb-2">AI Analysis</h3>
                  <p className="text-amber-700 text-sm">
                    Advanced AI analyzes your Farcaster posts to match you with the perfect horse personality
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🐎</div>
                  <h3 className="font-semibold text-amber-900 mb-2">10 Unique Facts</h3>
                  <p className="text-amber-700 text-sm">
                    Discover fascinating horse facts while learning about your own personality traits
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="font-semibold text-amber-900 mb-2">Easy Sharing</h3>
                  <p className="text-amber-700 text-sm">
                    Share your horse personality with friends on Farcaster and other social platforms
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Steps Section */}
            <StepsSection />
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={() => setShowAnalyzer(false)}
              variant="ghost"
              className="mb-6 text-amber-700 hover:text-amber-900"
            >
              ← Back to Home
            </Button>
            <SentimentAnalyzer />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200/50 bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-amber-700">
            <p className="mb-2">🐴 Horse Facts & Pics - Discover Your Equine Personality</p>
            <p className="text-sm opacity-75">Powered by AI and fascinating horse facts</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
