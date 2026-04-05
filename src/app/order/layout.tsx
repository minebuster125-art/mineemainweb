import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Minecraft Builder | Custom Minecraft Maps Commission",
  description: "Hire a professional Minecraft builder. We provide custom Minecraft maps commissioned for YouTube creators, including Minecraft challenge maps.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
