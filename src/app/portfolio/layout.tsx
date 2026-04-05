import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minecraft Video Recreation Service & Portfolio",
  description: "Explore our Minecraft video recreation service and portfolio of custom Minecraft maps commissioned by YouTubers.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
