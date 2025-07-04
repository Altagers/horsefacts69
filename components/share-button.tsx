"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import sdk from "@farcaster/frame-sdk"
import { useEffect, useState } from "react"

export function ShareButton() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready()
      setIsSDKLoaded(true)
    }
    if (sdk && !isSDKLoaded) {
      load()
    }
  }, [isSDKLoaded])

  const handleShare = async () => {
    if (!isSDKLoaded) return

    try {
      const shareText = `🐴 Discover your horse personality with fascinating facts!

Which of the 10 unique horse personalities matches your Farcaster posts?

Try Horse Facts & Pics:`

      const result = await sdk.actions.composeCast({
        text: shareText,
        embeds: [window.location.origin],
      })

      if (result.isError) {
        console.error("Share error:", result.error)
      }
    } catch (error) {
      console.error("Failed to share:", error)
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="lg"
      className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-transparent"
    >
      <Share2 className="w-5 h-5 mr-2" />
      Share This App
    </Button>
  )
}
