"use client"

import { useEffect, useState } from "react"
import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { ShareButton } from "@/components/share-button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Heart, Users } from "lucide-react"
import Image from "next/image"
import sdk from "@farcaster/frame-sdk"

export default function Home() {
  const [fid, setFid] = useState<number | null>(null)
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context
      sdk.actions.ready()

      if (context?.user?.fid) {
        setFid(context.user.fid)
      }
      setIsSDKLoaded(true)
    }

    if (sdk && !isSDKLoaded) {
      load()
    }
  }, [isSDKLoaded])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <Image src="/banner.png" alt="Horse Facts & Pics" fill className="object-contain" priority />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Horse Facts & Pics
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover which of 10 unique horse personalities matches your Farcaster posts, complete with fascinating
              horse facts and beautiful imagery!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {fid ? (
          <SentimentAnalyzer fid={fid} />
        ) : (
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Horse Facts & Pics!</h2>
              <p className="text-gray-600 mb-6">
                Please open this app in a Farcaster client to analyze your personality.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-10 h-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10 Unique Personalities</h3>
              <p className="text-gray-600">
                From Breathing Expert to Problem Solver, discover which horse personality matches your posting style.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6 text-center">
              <Heart className="w-10 h-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fascinating Facts</h3>
              <p className="text-gray-600">
                Learn amazing horse facts, from their 360-degree vision to their incredible memory abilities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6 text-center">
              <Users className="w-10 h-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share & Compare</h3>
              <p className="text-gray-600">
                Share your horse personality with friends and see how your traits compare with others.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
