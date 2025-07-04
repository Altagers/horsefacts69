"use client"

import { Button } from "@/components/ui/button"
import type { HorseFactCharacter } from "@/lib/characters"

interface ShareResultButtonProps {
  character: HorseFactCharacter
  onReset?: () => void
}

export function ShareResultButton({ character, onReset }: ShareResultButtonProps) {
  const handleShare = () => {
    const shareText = `I just discovered I'm "${character.name}" - ${character.trait}! 🐴\n\n${character.description}\n\nDiscover your horse personality:`
    const shareUrl = `${window.location.origin}/s/${character.name.toLowerCase().replace(/\s+/g, "-")}`

    // Try to use Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `I'm ${character.name}!`,
          text: shareText,
          url: shareUrl,
        })
        .catch(console.error)
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard
        .writeText(`${shareText}\n${shareUrl}`)
        .then(() => {
          alert("Result copied to clipboard!")
        })
        .catch(() => {
          // Final fallback - open in new window
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            "_blank",
          )
        })
    }
  }

  return (
    <Button
      onClick={handleShare}
      size="lg"
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
    >
      🚀 Share My Result
    </Button>
  )
}
