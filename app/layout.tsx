import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MiniKitContextProvider } from "@/provider/minikit-provider"

export const metadata: Metadata = {
  title: "Horse Facts & Pics",
  description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
  openGraph: {
    title: "Horse Facts & Pics",
    description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
    images: ["/banner.png"],
    type: "website",
    siteName: "Horse Facts & Pics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horse Facts & Pics",
    description: "Discover which amazing horse fact matches your personality based on your Farcaster posts!",
    images: ["/banner.png"],
  },
    generator: 'v0.dev'
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
