import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import SecurityProvider from "@/components/SecurityProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mineproductions.net"),
  title: {
    default: "MineProductions | Premium Minecraft Content Studio",
    template: "%s | MineProductions",
  },
  description:
    "We create and recreate premium custom Minecraft videos for YouTube creators worldwide. Offering Minecraft video recreation services, custom challenge maps, and professional map makers for hire.",
  keywords: [
    "Minecraft production studio",
    "Minecraft maps for YouTubers",
    "hire Minecraft builder",
    "custom Minecraft maps commission",
    "Minecraft challenge maps for YouTube",
    "Minecraft video recreation service",
    "Minecraft content creator service",
    "Minecraft map maker for hire",
    "MineProductions",
    "Minecraft studio for YouTubers",
  ],
  authors: [{ name: "MineProductions Team" }],
  creator: "MineProductions Team",
  publisher: "MineProductions",
  openGraph: {
    title: "MineProductions | Premium Minecraft Content Studio",
    description:
      "Premium Minecraft content production for YouTube creators worldwide.",
    url: "https://mineproductions.net",
    siteName: "MineProductions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MineProductions | Premium Minecraft Studio",
    description: "Premium Minecraft content production for YouTube creators worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MineProductions",
    "url": "https://mineproductions.net",
    "description": "Premium Minecraft content production for YouTube creators worldwide. Providing custom Minecraft maps, video recreation services, and challenge maps.",
    "email": "contact@mineproductions.net",
    "sameAs": []
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body 
        className="min-h-screen bg-[#080808] text-[#e5e2e1]"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SecurityProvider>
          <LayoutShell>{children}</LayoutShell>
        </SecurityProvider>
      </body>
    </html>
  );
}
