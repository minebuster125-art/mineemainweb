import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop & Assets | Minecraft Maps for YouTubers",
  description: "Browse our shop for high-quality Minecraft challenge maps for YouTube. Download premium setups built by experts.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
