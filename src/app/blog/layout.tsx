import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Minecraft Content Creator Service",
  description: "Read about the latest trends in Minecraft production, how to succeed on YouTube with custom challenge maps, and tips from professional Minecraft map makers for hire.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
