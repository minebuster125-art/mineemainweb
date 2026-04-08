"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText("mineproductions");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@mineproductions.net");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-[rgba(76,175,80,0.08)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="MineProductions Logo"
                width={40}
                height={40}
                className="rounded-sm"
              />
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Mine<span className="text-[#FFD700]">Productions</span>
              </span>
            </div>
            <p className="text-[#888] text-sm leading-relaxed max-w-md">
              Premium Minecraft content production studio for YouTube creators
              worldwide. We build worlds so you can make videos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4CAF50] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {["Home", "Shop", "Order", "About"].map((name) => (
                <Link
                  key={name}
                  href={name === "Home" ? "/" : `/${name.toLowerCase()}`}
                  className="text-sm text-[#888] hover:text-[#78dc77] transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4CAF50] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3 text-sm text-[#888]">
              {/* Discord — Click to Copy */}
              <button
                onClick={handleCopyDiscord}
                className="group relative flex items-center gap-2 text-left text-sm text-[#888] hover:text-[#5865F2] transition-all duration-300 cursor-pointer w-fit"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#5865F2] flex-shrink-0">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561 19.9312 19.9312 0 0 0 5.9932 3.0294.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057 13.1073 13.1073 0 0 1-1.872-.892.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286 19.8975 19.8975 0 0 0 6.0023-3.0294.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286z" />
                </svg>
                <span>mineproductions</span>

                {/* Copy icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>

                {/* Copied tooltip */}
                <span
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 pointer-events-none ${
                    copied
                      ? "opacity-100 translate-y-0 bg-[#4CAF50] text-white shadow-[0_0_15px_rgba(76,175,80,0.4)]"
                      : "opacity-0 translate-y-1 bg-[#222] text-[#888]"
                  }`}
                >
                  ✓ Copied to clipboard!
                </span>
              </button>

              {/* Email — Click to Copy & Open */}
              <a
                href="mailto:contact@mineproductions.net"
                onClick={handleCopyEmail}
                className="group relative flex items-center gap-2 text-left text-sm text-[#888] hover:text-[#4CAF50] transition-all duration-300 cursor-pointer w-fit mt-2"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#4CAF50] flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>contact@mineproductions.net</span>

                {/* Copy icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>

                {/* Copied tooltip */}
                <span
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 pointer-events-none ${
                    copiedEmail
                      ? "opacity-100 translate-y-0 bg-[#4CAF50] text-white shadow-[0_0_15px_rgba(76,175,80,0.4)]"
                      : "opacity-0 translate-y-1 bg-[#222] text-[#888]"
                  }`}
                >
                  ✓ Copied to clipboard!
                </span>
              </a>

              <Link
                href="/order"
                className="hover:text-[#FFD700] transition-colors"
              >
                Order Form →
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {/* YTJobs */}
              <a
                href="https://ytjobs.co/@MineProductions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YTJobs"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#FF4444] hover:bg-[#222] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/>
                </svg>
              </a>

              {/* Discord */}
              <button
                onClick={handleCopyDiscord}
                aria-label="Discord"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#5865F2] hover:bg-[#222] transition-all duration-300 relative"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561 19.9312 19.9312 0 0 0 5.9932 3.0294.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057 13.1073 13.1073 0 0 1-1.872-.892.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286 19.8975 19.8975 0 0 0 6.0023-3.0294.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286z" />
                </svg>
              </button>

              {/* Email */}
              <a
                href="mailto:contact@mineproductions.net"
                onClick={handleCopyEmail}
                aria-label="Email"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#4CAF50] hover:bg-[#222] transition-all duration-300 relative group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {/* Tooltip */}
                <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#4CAF50] text-[#080808] font-semibold text-[10px] whitespace-nowrap transition-all duration-300 pointer-events-none ${copiedEmail ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
                  Copied!
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(76,175,80,0.2)] to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#555]">
            © 2026 MineProductions. All rights reserved.
          </p>
          <p className="text-xs text-[#555]">
            Premium Minecraft Content Production
          </p>
        </div>
      </div>
    </footer>
  );
}
