"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const posts = [
  {
    slug: "how-to-find-best-minecraft-map-maker-for-youtube",
    title: "How to find the best Minecraft map maker for your YouTube channel",
    description: "Learn exactly what to look for when you hire a Minecraft builder or map maker for your next viral video.",
    date: "May 2, 2025",
  },
  {
    slug: "why-custom-minecraft-challenge-maps-get-more-views",
    title: "Why custom Minecraft challenge maps get more views on YouTube",
    description: "The data behind custom Minecraft maps commissioned for YouTube and why viewers love them.",
    date: "April 15, 2025",
  },
  {
    slug: "top-5-minecraft-video-ideas-for-youtubers-2025",
    title: "Top 5 Minecraft video ideas for YouTubers in 2025",
    description: "Stand out with a creative Minecraft video recreation service or unique production studio concepts.",
    date: "March 28, 2025",
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-4">
              <h1
                className="text-5xl md:text-7xl font-bold mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Creator <span className="gradient-text">Insights</span>
              </h1>
              <p className="text-[#888] text-lg max-w-xl mx-auto leading-relaxed">
                Expert tips, industry trends, and deep dives into maximizing views with a professional Minecraft production studio.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="card-glow bg-[#111] rounded-xl p-8 relative overflow-hidden group cursor-pointer border border-[rgba(76,175,80,0.06)] hover:border-[rgba(76,175,80,0.2)] transition-colors duration-500"
                  >
                    <div className="relative z-10">
                      <span className="text-[#4CAF50] text-sm font-semibold tracking-wider uppercase mb-2 block">{post.date}</span>
                      <h2
                        className="text-2xl font-bold mb-3 group-hover:text-[#78dc77] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-[#888] text-base leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
