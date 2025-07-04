import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MiniKitContextProvider } from "@/provider/minikit-provider"

const baseUrl = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"

export const metadata: Metadata = {
  title: "Horse Facts & Pics",
  description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
  generator: "v0.dev",
  metadataBase: new URL(baseUrl),
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
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Horse Facts & Pics",
    description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
    images: [`${baseUrl}/banner.png`],
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
