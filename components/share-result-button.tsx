"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import type { Character } from "@/lib/characters"
import sdk from "@farcaster/miniapp-sdk"
import { useEffect, useState } from "react"

interface ShareResultButtonProps {
  character: Character
}

export function ShareResultButton({ character }: ShareResultButtonProps) {
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
      const shareText = `🐴 I'm ${character.name}! ${character.emoji}

${character.personality}

${character.description}

🐎 Horse Fact: ${character.fact}

Discover your horse personality:`

      const result = await sdk.actions.composeCast({
        text: shareText,
        embeds: [`${window.location.origin}/s/${character.id}`],
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
      size="lg"
      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Share2 className="w-5 h-5 mr-2" />
      Share My Result
    </Button>
  )
}
