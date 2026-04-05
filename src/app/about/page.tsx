"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const teamRoles = [
  {
    title: "Creative Director",
    description: "Oversees the artistic vision and ensures every project meets our premium quality standards.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Production Manager",
    description: "Coordinates timelines, resources, and delivery to keep every project on track.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Builders",
    description: "Expert Minecraft builders who craft stunning worlds, structures, and environments.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.4a.75.75 0 01-.17-1.05l3.4-5.1a.75.75 0 011.05-.17l5.1 3.4a.75.75 0 01.17 1.05l-3.4 5.1a.75.75 0 01-1.05.17zM17.25 18.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
  },
  {
    title: "Modellers",
    description: "3D modelling specialists who create custom assets, characters, and objects.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "Mod Makers",
    description: "Custom mod developers who create unique gameplay mechanics and features.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Testers",
    description: "Quality assurance team ensuring every deliverable is polished and bug-free.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0112 3.75a3.75 3.75 0 013.317 1.998m-6.634 0H12m0 0h3.317M9.753 18.69a23.85 23.85 0 006.49-7.94m-6.49 7.94l.261-.007M15.168 7.942l-1.176-.588M6.03 18.943l-3.168 1.41a.375.375 0 01-.51-.285c-.04-.5-.09-.99-.15-1.47m3.828 2.345A23.901 23.901 0 012.028 13.2M17.97 18.944l3.167 1.41a.375.375 0 00.511-.284c.04-.502.09-.993.15-1.472m-3.828 2.346A23.906 23.906 0 0021.972 13.2" />
      </svg>
    ),
  },
];

const values = [
  { title: "Quality", description: "Every pixel, every block — crafted to perfection.", icon: "💎" },
  { title: "Speed", description: "Fast turnarounds without compromising excellence.", icon: "⚡" },
  { title: "Creativity", description: "Unique, innovative solutions for every creator.", icon: "🎨" },
  { title: "Communication", description: "Transparent updates and responsive collaboration.", icon: "💬" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#080808]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4CAF50] mb-4 block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Story
            </span>
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              About <span className="gradient-text">MineProductions</span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Crafting Digital Worlds
                <br />
                <span className="text-[#4CAF50]">Since Day One</span>
              </h2>
              <div className="space-y-4 text-[#888] leading-relaxed text-sm">
                <p>
                  MineProductions was born from a passion for Minecraft and a
                  vision to help YouTube creators produce stunning content that
                  captivates audiences worldwide.
                </p>
                <p>
                  We specialize in creating and recreating custom Minecraft
                  videos for YouTube creators — from kids content to challenge
                  maps and interactive experiences. Our team of dedicated
                  builders, modellers, and developers work together to deliver
                  premium content that stands out.
                </p>
                <p>
                  Today, we serve international YouTube creators with 1,000 to
                  1,000,000+ subscribers, helping them produce content that
                  drives views, engagement, and channel growth.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#111] to-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.08)_0%,transparent_70%)]" />

                <div className="grid grid-cols-3 gap-3 p-12 relative z-10">
                  {["🏰", "⚔️", "🌊", "💎", "🎬", "⛏️", "🔧", "🗺️", "💥"].map(
                    (emoji, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-16 h-16 rounded-xl bg-[rgba(76,175,80,0.05)] border border-[rgba(76,175,80,0.1)] flex items-center justify-center text-2xl hover:border-[rgba(76,175,80,0.3)] transition-colors"
                      >
                        {emoji}
                      </motion.div>
                    )
                  )}
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#4CAF50] opacity-30 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FFD700] opacity-30 rounded-br-lg" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Team Roles */}
        <div className="mb-32">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD700] mb-4 block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Team
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our{" "}
                <span className="gold-text" style={{WebkitTextFillColor: "unset", background: "linear-gradient(135deg, #FFD700, #e9c400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>Team</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamRoles.map((role, i) => (
              <ScrollReveal key={role.title} delay={i * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-glow bg-[#111] rounded-xl p-7 group cursor-pointer relative overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute inset-0 rounded-xl border border-[rgba(76,175,80,0)] group-hover:border-[rgba(76,175,80,0.15)] transition-colors duration-500 pointer-events-none" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-14 h-14 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] group-hover:text-[#4CAF50] transition-colors duration-300 mb-5 flex-shrink-0">
                      {role.icon}
                    </div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {role.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed flex-1">
                      {role.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Vision */}
        <ScrollReveal>
          <div className="text-center mb-32 py-20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)]" />
            <svg className="w-12 h-12 mx-auto text-[#FFD700] mb-6 opacity-40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69c-.28 1.002-.346 2.045-.2 3.13.38 2.637 2.36 4.323 4.35 4.323 1.2 0 2.07-.462 2.58-1.087.51-.626.69-1.37.5-2.898zM20.56 15.757c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L18.74 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1.01-.34 2.053-.197 3.13.38 2.637 2.355 4.323 4.343 4.323 1.2 0 2.07-.462 2.58-1.087.497-.626.68-1.37.49-2.898z" />
            </svg>
            <h2
              className="text-3xl md:text-4xl font-bold leading-snug max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="gold-text" style={{WebkitTextFillColor: "unset", background: "linear-gradient(135deg, #FFD700, #e9c400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>
                &ldquo;To become the number one Minecraft content production studio
                for YouTube creators worldwide.&rdquo;
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Values */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4CAF50] mb-4 block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What Drives Us
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our <span className="gradient-text">Values</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-glow bg-[#111] rounded-xl p-6 text-center group"
                >
                  <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </span>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-[#888] text-xs leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
