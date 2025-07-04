function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return !!value
    }),
  )
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || "https://horsefacts-pics.vercel.app"

  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: "1",
      name: "Horse Facts & Pics",
      subtitle: "Discover your horse personality",
      description: "Find out which amazing horse fact matches your personality based on your Farcaster posts!",
      screenshotUrls: [`${URL}/banner.png`],
      iconUrl: `${URL}/logo.png`,
      splashImageUrl: `${URL}/splash.png`,
      splashBackgroundColor: "#FEF3C7",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "entertainment",
      tags: ["personality", "horses", "facts", "fun"],
      heroImageUrl: `${URL}/banner.png`,
      tagline: "Which horse fact are you?",
      ogTitle: "Horse Facts & Pics",
      ogDescription: "Discover which amazing horse fact matches your personality!",
      ogImageUrl: `${URL}/banner.png`,
    }),
  })
}
