"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import type { HorseFactCharacter } from "@/lib/characters"

interface ShareResultButtonProps {
  character: HorseFactCharacter
}

export function ShareResultButton({ character }: ShareResultButtonProps) {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/s/${character.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`
    const shareText = `I'm ${character.name}! ${character.description} 🐴\n\nDiscover your horse personality:`

    // Try to use native sharing if available
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
      const fullText = `${shareText}\n${shareUrl}`
      navigator.clipboard
        .writeText(fullText)
        .then(() => {
          alert("Copied to clipboard! Share it anywhere you like.")
        })
        .catch(() => {
          // Final fallback - open in new window for manual sharing
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
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Result
    </Button>
  )
}
