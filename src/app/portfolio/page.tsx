"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  youtubeLink: string;
  imageData?: string;
  thumbnailUrl?: string;
  createdAt: string;
}

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mp_portfolio_items");
      if (stored) setProjects(JSON.parse(stored));
    } catch {
      // localStorage unavailable
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Page Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,215,0,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(76,175,80,0.08)] border border-[rgba(76,175,80,0.15)] mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4CAF50]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Work
                </span>
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our{" "}
                <span className="gradient-text">Portfolio</span>
              </h1>
              <p className="text-[#888] text-lg max-w-xl mx-auto leading-relaxed">
                Explore our finest Minecraft content creations across recreation,
                custom builds, and cinematic animation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-24 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          {projects.length === 0 ? (
            <div className="text-center py-20 text-[#555]">
              <span className="text-5xl block mb-4">🎬</span>
              <p className="text-lg font-medium">No projects yet</p>
              <p className="text-sm mt-1">Portfolio items added from the admin panel will appear here.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {projects.map((project) => {
                  const thumb = project.imageData || getYouTubeThumbnail(project.youtubeLink);
                  const isVideo = !!project.youtubeLink && !project.imageData;
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <motion.div
                        whileHover={{ y: -6 }}
                        className="card-glow bg-[#111] rounded-xl overflow-hidden group cursor-pointer relative border border-[rgba(76,175,80,0.06)] hover:border-[rgba(76,175,80,0.2)] transition-colors duration-500"
                      >
                        {/* Thumbnail */}
                        {isVideo ? (
                          <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer">
                            <div className="h-52 bg-gradient-to-br from-[#151515] via-[#111] to-[#0c0c0c] flex items-center justify-center relative overflow-hidden">
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <>
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.03)_0%,transparent_70%)]" />
                                  <span className="text-7xl relative z-10">🎬</span>
                                </>
                              )}
                              {/* Play overlay on hover */}
                              <div className="absolute inset-0 bg-[rgba(8,8,8,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-[rgba(76,175,80,0.9)] flex items-center justify-center shadow-lg shadow-[rgba(76,175,80,0.3)]">
                                  <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="h-52 bg-gradient-to-br from-[#151515] via-[#111] to-[#0c0c0c] flex items-center justify-center relative overflow-hidden">
                            {thumb ? (
                              <img
                                src={thumb}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.03)_0%,transparent_70%)]" />
                                <span className="text-7xl relative z-10">🖼️</span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                          <h3
                            className="text-lg font-semibold group-hover:text-[#78dc77] transition-colors duration-300"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {project.title}
                          </h3>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* CTA */}
          <ScrollReveal>
            <div className="text-center mt-20">
              <p className="text-[#888] text-sm mb-6">
                Want something custom? Let us build your perfect Minecraft content.
              </p>
              <Link href="/order">
                <button className="btn-primary">Order Custom Project</button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
