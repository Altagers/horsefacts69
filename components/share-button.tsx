"use client"

import { Button } from "@/components/ui/button"
import { useMiniKit } from "@coinbase/onchainkit/minikit"

export function ShareButton() {
  const { sdk } = useMiniKit()

  const handleShare = () => {
    const shareText = `🐴 Just discovered my horse personality! 

These amazing horse facts will blow your mind - from horses who can only breathe through their nostrils to those with 360-degree vision! 

Find out which incredible horse trait matches YOUR personality:`

    const shareUrl = window.location.origin

    if (sdk?.actions?.composeCast) {
      sdk.actions.composeCast({
        text: shareText,
        embeds: [shareUrl],
      })
    } else {
      // Fallback
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + " " + shareUrl)}`
      window.open(twitterUrl, "_blank")
    }
  }

  return (
    <Button
      onClick={handleShare}
      size="lg"
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
    >
      🚀 Share This App
    </Button>
  )
}
