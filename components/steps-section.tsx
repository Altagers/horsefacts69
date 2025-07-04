"use client"

import { Card, CardContent } from "@/components/ui/card"

export function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "Connect",
      description: "Link your Farcaster account to get started",
      icon: "🔗",
    },
    {
      number: "2",
      title: "Analyze",
      description: "Our AI analyzes your recent posts and personality",
      icon: "🤖",
    },
    {
      number: "3",
      title: "Discover",
      description: "Learn which horse fact matches your personality",
      icon: "🐎",
    },
    {
      number: "4",
      title: "Share",
      description: "Share your horse personality with friends",
      icon: "📱",
    },
  ]

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-center text-amber-900 mb-8">How It Works</h3>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.number} className="border-amber-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                {step.number}
              </div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h4 className="font-semibold text-amber-900 mb-2">{step.title}</h4>
              <p className="text-amber-700 text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
