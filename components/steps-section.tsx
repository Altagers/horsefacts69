"use client"

import { Card, CardContent } from "@/components/ui/card"

export function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "Connect",
      description: "Link your Farcaster account to analyze your posts",
      emoji: "🔗",
    },
    {
      number: "2",
      title: "Analyze",
      description: "Our AI examines your posting style and personality",
      emoji: "🧠",
    },
    {
      number: "3",
      title: "Discover",
      description: "Learn which amazing horse fact matches your personality",
      emoji: "🐴",
    },
    {
      number: "4",
      title: "Share",
      description: "Share your horse personality with friends on Farcaster",
      emoji: "🚀",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-amber-900 text-center mb-8">How It Works</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card
            key={step.number}
            className="border-amber-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200"
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <div className="text-3xl mb-3">{step.emoji}</div>
              <h4 className="font-semibold text-amber-900 mb-2">{step.title}</h4>
              <p className="text-amber-700 text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
