"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import sdk from "@farcaster/frame-sdk"

export function ShareButton() {
  const handleShare = async () => {
    try {
      const shareText = `🐴 Just discovered my horse personality! 

Find out which amazing horse fact matches your personality based on your posts.

10 unique personalities, each with fascinating horse facts! 🐎`

      await sdk.actions.composeCast({
        text: shareText,
        embeds: [window.location.origin],
      })
    } catch (error) {
      console.error("Failed to share:", error)
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="lg"
      className="border-amber-300 text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg font-semibold rounded-xl bg-transparent"
    >
      <Share2 className="w-5 h-5 mr-2" />
      Share This App
    </Button>
  )
}
