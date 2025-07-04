"use client"

import { useState } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { Button } from "@/components/ui/button"
import type { HorseFactCharacter } from "@/lib/characters"

interface ShareResultButtonProps {
  character: HorseFactCharacter
  onReset: () => void
}

export function ShareResultButton({ character, onReset }: ShareResultButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-mg.vercel.app"

  const handleShare = async () => {
    setStatus("loading")
    setErrorMessage(null)

    // Construct the URL for the shareable HTML page
    const sharePageUrl = new URL(
      `/s/${encodeURIComponent(character.name.toLowerCase().replace(/\s+/g, "-"))}`,
      appBaseUrl,
    ).toString()

    const castText = `I'm ${character.name}! ${character.emoji} ${character.trait}\n\n${character.description}\n\nDiscover your horse personality:`

    try {
      await sdk.actions.composeCast({
        text: castText,
        embeds: [sharePageUrl], // Embed the URL of the HTML page with OG tags
      })
      setStatus("idle")
    } catch (error) {
      console.error("❌ Failed to share cast:", error)
      setStatus("error")
      setErrorMessage("Failed to open Farcaster composer.")
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Button
        onClick={handleShare}
        disabled={status === "loading"}
        size="lg"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {status === "loading" ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Preparing Share...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            Share My Result!
          </div>
        )}
      </Button>
      {status === "error" && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </div>
  )
}
