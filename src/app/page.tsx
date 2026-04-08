"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
      </svg>
    ),
    title: "Recreation Videos",
    description:
      "We faithfully recreate trending Minecraft content with stunning cinematography, custom builds, and professional editing for your channel.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Custom Maps",
    description:
      "Purpose-built Minecraft maps designed for your specific content needs — from adventure maps to mini-games and custom worlds.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
      </svg>
    ),
    title: "Challenge Content",
    description:
      "Competitive challenge maps and scenarios designed to create epic moments and viral-worthy gameplay for challenge video creators.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
      </svg>
    ),
    title: "Interactive Videos",
    description:
      "Engaging interactive Minecraft experiences with custom mods, command blocks, and scripted events for unique viewer engagement.",
  },
];


const steps = [
  {
    num: "01",
    title: "Brief Us",
    description: "Share your vision, channel details, and project requirements through our order form.",
  },
  {
    num: "02",
    title: "We Build",
    description: "Our team of builders, modellers, and editors bring your Minecraft vision to life.",
  },
  {
    num: "03",
    title: "You Publish",
    description: "Receive your polished content, ready to upload and wow your audience.",
  },
];

function getYouTubeThumbnail(url: string | undefined): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

const featuredProjects = [
  {
    title: "100+ Custom Models Pack",
    type: "Models",
    thumbnail: "🛒",
    description: "Premium Minecraft models ready for your server.",
  },
  {
    title: "Skyblock Spawn",
    type: "Maps",
    thumbnail: "🛒",
    description: "Highly detailed skyblock spawn.",
  },
  {
    title: "Animated HUD",
    type: "Plugins",
    thumbnail: "🛒",
    description: "Custom animated UI for players.",
  },
];


export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [dynamicProjects, setDynamicProjects] = useState(featuredProjects);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mp_shop_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          const mapped = parsed.slice(0, 3).map((item: any) => {
            const thumb = item.imageData || getYouTubeThumbnail(item.youtubeLink);
            return {
              title: item.title,
              type: item.type,
              thumbnail: thumb ? "" : "🛒",
              image: thumb,
              youtubeLink: item.youtubeLink,
              description: item.description,
            };
          });
          setDynamicProjects(mapped);
        }
      }
    } catch {}
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        id="hero"
      >
        <ParticleBackground />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-[1]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-[2] max-w-5xl mx-auto px-6 text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.2)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span
              className="text-xs font-medium uppercase tracking-[0.15em] text-[#4CAF50]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Premium Minecraft Studio
            </span>
          </motion.div>

          {/* Glitch Heading */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 glitch-text relative z-10"
            style={{ fontFamily: "var(--font-display)" }}
            data-text="We Build Worlds. You Make Videos."
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block"
            >
              We Build Worlds.
            </motion.span>
            <motion.span
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.7, duration: 0.8 }}
               className="gold-text block" style={{WebkitTextFillColor: "unset", background: "linear-gradient(135deg, #FFD700, #e9c400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}
            >
              You Make Videos.
            </motion.span>
            <span className="sr-only">Minecraft production studio and map maker for hire</span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The premium Minecraft content creator service for YouTube creators worldwide.
            Looking to hire a Minecraft builder? We provide video recreation services, custom maps, and cinematic experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/order">
              <button className="btn-primary text-base" id="hero-order-btn">
                Order Custom Project
              </button>
            </Link>
            <Link href="/shop">
              <button className="btn-secondary text-base" id="hero-portfolio-btn">
                Shop
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>



      {/* SERVICES */}
      <section className="py-24 bg-[#080808]" id="services">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4CAF50] mb-4 block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Minecraft Content Creator Service
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What We{" "}
                <span className="gradient-text">Create</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-glow h-full flex flex-col bg-[#111111] rounded-xl p-8 relative overflow-hidden group cursor-pointer"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(76,175,80,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl border border-[rgba(76,175,80,0)] group-hover:border-[rgba(76,175,80,0.2)] transition-colors duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] group-hover:text-[#4CAF50] transition-colors duration-300 mb-5">
                      {service.icon}
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[rgba(76,175,80,0.1)] text-[#4CAF50] text-[10px] font-semibold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Available
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#0c0c0c]" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD700] mb-4 block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Process
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How It{" "}
                <span className="gold-text" style={{WebkitTextFillColor: "unset", background: "linear-gradient(135deg, #FFD700, #e9c400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>Works</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-full h-full bg-gradient-to-r from-[#4CAF50] via-[#78dc77] to-[#FFD700] origin-left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.2}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-[#111] border border-[rgba(76,175,80,0.15)] flex items-center justify-center mb-6 relative">
                      <span
                        className="text-2xl font-bold gradient-text"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.num}
                      </span>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-[#4CAF50] animate-pulse" />
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 bg-[#080808]" id="featured-work">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4CAF50] mb-4 block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Shop
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Featured{" "}
                <span className="gradient-text">Items</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dynamicProjects.map((project: any, i: number) => (
              <ScrollReveal key={project.title + i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="card-glow h-full flex flex-col group bg-[#111] rounded-xl overflow-hidden cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-500 z-10">
                        {project.thumbnail}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50 z-[1]" />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[rgba(76,175,80,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full bg-[rgba(76,175,80,0.1)] text-[#4CAF50] text-[10px] font-semibold uppercase tracking-wider mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.type}
                    </span>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[#888] text-sm mb-4 flex-grow">{project.description}</p>
                    {project.youtubeLink ? (
                      <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#888] hover:text-[#4CAF50] transition-colors group/btn mt-auto">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="group-hover/btn:underline">Watch on YouTube</span>
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-sm text-[#888] hover:text-[#4CAF50] transition-colors group/btn mt-auto">
                        <svg className="w-4 h-4 text-transparent border border-current rounded-full flex items-center justify-center p-[2px]" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                        <span className="group-hover/btn:underline">View Details</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/shop">
                <button className="btn-secondary" id="view-all-projects-btn">
                  View Shop →
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* FINAL CTA */}
      <section className="py-32 bg-[#080808] relative" id="cta">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.05)_0%,transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to{" "}
              <span className="gradient-text">level up</span>
              <br />
              your content?
            </h2>
            <p className="text-[#888] text-lg mb-10 max-w-xl mx-auto">
              Join 80+ YouTube creators who trust MineProductions for their
              Minecraft content needs.
            </p>
            <Link href="/order">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary text-lg px-12 py-5"
                id="cta-order-btn"
              >
                Order Custom Project
              </motion.button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
