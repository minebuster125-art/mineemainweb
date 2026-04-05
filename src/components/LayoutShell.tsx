"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import Chatbot from "@/components/Chatbot";
import PageTransition from "@/components/PageTransition";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/mp-admin-x7k2");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CursorGlow />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <Chatbot />
    </>
  );
}
