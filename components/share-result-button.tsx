"use client"

import { Button } from "@/components/ui/button"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { Character } from "@/lib/characters"

interface ShareResultButtonProps {
  character: Character
}

export function ShareResultButton({ character }: ShareResultButtonProps) {
  const { sdk } = useMiniKit()

  const handleShare = () => {
    const characterSlug = character.name.toLowerCase().replace(/\s+/g, "-")
    const shareUrl = `${window.location.origin}/s/${characterSlug}`

    const shareText = `I'm ${character.name}! ${character.emoji} ${character.trait}

${character.description}

🐎 Horse Fact #${character.factNumber}: ${character.fact}

Discover your horse personality:`

    if (sdk?.actions?.composeCast) {
      sdk.actions.composeCast({
        text: shareText,
        embeds: [shareUrl],
      })
    } else {
      // Fallback for environments where SDK is not available
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
      🚀 Share My Result
    </Button>
  )
}
