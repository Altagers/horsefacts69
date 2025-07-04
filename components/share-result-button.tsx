"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { HorseFactCharacter } from "@/lib/characters"
import { Button } from "@/components/ui/button"
import { Share2, RotateCcw } from "lucide-react"

interface ShareResultButtonProps {
  character: HorseFactCharacter
  onReset: () => void
}

export function ShareResultButton({ character, onReset }: ShareResultButtonProps) {
  const { shareFrame } = useMiniKit()
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    if (!shareFrame) {
      console.error("shareFrame is not available")
      return
    }

    setIsSharing(true)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"
      const shareUrl = `${baseUrl}/s/${encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, "-"))}`

      await shareFrame(shareUrl)
      console.log("Frame shared successfully!")
    } catch (error) {
      console.error("Error sharing frame:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleShare}
        disabled={isSharing}
        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isSharing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sharing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share My Horse Fact!
          </div>
        )}
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full h-12 text-base font-medium border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 rounded-2xl transition-all duration-200 bg-transparent"
      >
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </div>
      </Button>
    </div>
  )
}
