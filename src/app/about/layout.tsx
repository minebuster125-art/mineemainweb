import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Minecraft Studio for YouTubers",
  description: "MineProductions is a dedicated Minecraft production studio. Built for creators, we are the premier Minecraft studio for YouTubers around the world.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
