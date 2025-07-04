import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MiniKitContextProvider } from "@/provider/minikit-provider"

export const metadata: Metadata = {
  title: "Horse Facts & Pics",
  description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
  generator: "v0.dev",
  openGraph: {
    title: "Horse Facts & Pics",
    description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Horse Facts & Pics",
      },
    ],
    type: "website",
    siteName: "Horse Facts & Pics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horse Facts & Pics",
    description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
    images: ["/banner.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"}/banner.png`,
      button: {
        title: "Discover Your Horse Personality",
        action: {
          type: "launch_frame",
          name: "Horse Facts & Pics",
          url: process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app",
          splashImageUrl: `${process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"}/splash.png`,
          splashBackgroundColor: "#FEF3C7",
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  )
}
