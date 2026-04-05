"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Shop", href: "/shop" },
  { name: "Order", href: "/order" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand Name — Left */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <Image
            src="/logo.png"
            alt="MineProductions Logo"
            width={42}
            height={42}
            className="rounded-sm"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Mine
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFD700]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Productions
            </span>
          </div>
        </Link>

        {/* Desktop Nav — Center */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-[#78dc77]"
              style={{
                fontFamily: "var(--font-display)",
                color: pathname === link.href ? "#78dc77" : "#888",
              }}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4CAF50] to-[#FFD700]"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Contact Icons — Right */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* Discord */}
          <div className="relative flex items-center justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText("mineproductions");
                setCopiedDiscord(true);
                setTimeout(() => setCopiedDiscord(false), 2000);
              }}
              title="Discord: mineproductions"
              className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888] hover:text-[#5865F2] hover:border-[rgba(88,101,242,0.3)] hover:bg-[rgba(88,101,242,0.08)] transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
            </a>
            <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#4CAF50] text-[#080808] font-semibold text-[10px] whitespace-nowrap transition-all duration-300 pointer-events-none ${copiedDiscord ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              Copied!
            </span>
          </div>

          {/* YTJobs */}
          <a
            href="https://ytjobs.co/@MineProductions"
            target="_blank"
            rel="noopener noreferrer"
            title="YTJobs Profile"
            className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888] hover:text-[#ff0000] hover:border-[rgba(255,0,0,0.3)] hover:bg-[rgba(255,0,0,0.08)] transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* Email */}
          <div className="relative flex items-center justify-center">
            <a
              href="mailto:minebuster125@gmail.com"
              onClick={() => {
                navigator.clipboard.writeText("minebuster125@gmail.com");
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              title="minebuster125@gmail.com"
              className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888] hover:text-[#4CAF50] hover:border-[rgba(76,175,80,0.3)] hover:bg-[rgba(76,175,80,0.08)] transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#4CAF50] text-[#080808] font-semibold text-[10px] whitespace-nowrap transition-all duration-300 pointer-events-none ${copiedEmail ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              Copied!
            </span>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <motion.div
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#e5e2e1]"
          />
          <motion.div
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#e5e2e1]"
          />
          <motion.div
            animate={
              mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-[#e5e2e1]"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 w-3/4 h-screen bg-[#111111] border-l border-[rgba(76,175,80,0.15)] z-40 flex flex-col pt-24 px-8 gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold tracking-wide uppercase block py-3 transition-colors hover:text-[#78dc77]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: pathname === link.href ? "#78dc77" : "#888",
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Contact Icons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              <div className="relative">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("mineproductions");
                    setCopiedDiscord(true);
                    setTimeout(() => setCopiedDiscord(false), 2000);
                  }}
                  className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                  </svg>
                </a>
                <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#4CAF50] text-[#080808] font-semibold text-[10px] whitespace-nowrap transition-all duration-300 pointer-events-none ${copiedDiscord ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
                  Copied!
                </span>
              </div>
              <a
                href="https://ytjobs.co/@MineProductions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <div className="relative">
                <a
                  href="mailto:minebuster125@gmail.com"
                  onClick={() => {
                    navigator.clipboard.writeText("minebuster125@gmail.com");
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#4CAF50] text-[#080808] font-semibold text-[10px] whitespace-nowrap transition-all duration-300 pointer-events-none ${copiedEmail ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
                  Copied!
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
