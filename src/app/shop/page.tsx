"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  youtubeLink: string;
  buyAction?: string;
  thumbnailUrl?: string;
  imageData?: string;
  createdAt: string;
}

const categories = [
  "All",
  "Minecraft But Mods & Plugins",
  "Trending Mods",
  "Best Value Mods",
  "High Quality Maps",
  "Trending Models"
];

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function ShopPage() {
  const [active, setActive] = useState("All");
  const [products, setProducts] = useState<ShopItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleBuyClick = (product: ShopItem) => {
    if (!product.buyAction) return;

    if (product.buyAction.startsWith("http://") || product.buyAction.startsWith("https://")) {
      window.open(product.buyAction, "_blank");
    } else {
      navigator.clipboard.writeText(product.buyAction);
      setCopiedId(product.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  useEffect(() => {
    // Fetch shop items from database via API
    const fetchShopItems = async () => {
      try {
        const response = await fetch("/api/shop");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch shop items");
        }
      } catch (error) {
        console.error("Error fetching shop items:", error);
      }
    };
    
    fetchShopItems();
  }, []);

  const filtered =
    active === "All"
      ? products
      : products.filter(
          (p) => (p.type || "Minecraft But Mods & Plugins").toLowerCase() === active.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Page Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(76,175,80,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.15)] mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFD700]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Marketplace
                </span>
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="gold-text" style={{WebkitTextFillColor: "unset", background: "linear-gradient(135deg, #FFD700, #e9c400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>Shop</span>
              </h1>
              <p className="text-[#888] text-lg max-w-xl mx-auto leading-relaxed">
                Ready-made premium Minecraft content packs. Download and use instantly
                on your channel.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filter Bar */}
          <ScrollReveal>
            <div className="flex justify-center gap-3 mb-14 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border"
                  style={{
                    color: active === cat ? "#080808" : "#888",
                    background: active === cat
                      ? "linear-gradient(135deg, #FFD700, #e9c400)"
                      : "rgba(17,17,17,0.8)",
                    borderColor: active === cat
                      ? "transparent"
                      : "rgba(255,215,0,0.1)",
                    boxShadow: active === cat
                      ? "0 0 30px rgba(255,215,0,0.3)"
                      : "none",
                  }}
                  id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#555]">
              <span className="text-5xl block mb-4">🛒</span>
              <p className="text-lg font-medium">No products match</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => {
                  const thumb = product.imageData || getYouTubeThumbnail(product.youtubeLink);
                  const isVideo = !!product.youtubeLink && !product.imageData;
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      key={product.id}
                    >
                      <motion.div
                        whileHover={{ y: -6 }}
                        className="card-glow bg-[#111] rounded-xl overflow-hidden group cursor-pointer relative border border-[rgba(76,175,80,0.06)] hover:border-[rgba(76,175,80,0.2)] transition-colors duration-500 h-full flex flex-col"
                      >
                        {/* Thumbnail */}
                        {isVideo ? (
                          <a href={product.youtubeLink} target="_blank" rel="noopener noreferrer" className="block">
                            <div className="h-52 bg-gradient-to-br from-[#151515] via-[#111] to-[#0c0c0c] flex items-center justify-center relative overflow-hidden">
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt={product.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <>
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02)_0%,transparent_70%)]" />
                                  <span className="text-7xl relative z-10">🛒</span>
                                </>
                              )}

                              {/* Play overlay on hover */}
                              <div className="absolute inset-0 bg-[rgba(8,8,8,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-[rgba(255,215,0,0.9)] flex items-center justify-center shadow-lg shadow-[rgba(255,215,0,0.3)]">
                                  <svg className="w-7 h-7 text-[#080808] ml-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>

                              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50" />
                            </div>
                          </a>
                        ) : (
                          <div className="h-52 bg-gradient-to-br from-[#151515] via-[#111] to-[#0c0c0c] flex items-center justify-center relative overflow-hidden">
                            {thumb ? (
                              <img
                                src={thumb}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02)_0%,transparent_70%)]" />
                                <span className="text-7xl relative z-10">🛒</span>
                              </>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <h3
                            className="text-lg font-semibold mb-2 group-hover:text-[#78dc77] transition-colors"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {product.title}
                          </h3>
                          <p className="text-[#777] text-sm leading-relaxed mb-5 flex-1">
                            {product.description}
                          </p>

                          {/* Price */}
                          <div className="flex items-baseline gap-3 mb-5">
                            <span
                              className="text-3xl font-bold"
                              style={{
                                fontFamily: "var(--font-display)",
                                background: "linear-gradient(135deg, #78dc77, #4CAF50)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              ${product.price}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <button 
                              className="btn-primary flex-1 py-3 text-xs" 
                              id={`buy-${product.id}`}
                              onClick={() => handleBuyClick(product)}
                            >
                              {copiedId === product.id ? "Copied!" : "Buy Now"}
                            </button>
                            {product.youtubeLink && (
                              <a
                                href={product.youtubeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-lg bg-[#1a1a1a] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-[#666] hover:text-[#ff0000] hover:bg-[#222] hover:border-[rgba(255,0,0,0.2)] transition-all duration-300 flex-shrink-0"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* CTA */}
          <ScrollReveal>
            <div className="text-center mt-20 py-16 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Need something{" "}
                  <span className="gold-text" style={{WebkitTextFillColor: "unset", background: "linear-gradient(135deg, #FFD700, #e9c400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>custom</span>?
                </h3>
                <p className="text-[#888] text-sm mb-8 max-w-md mx-auto">
                  We build bespoke Minecraft content tailored to your channel. Get a custom quote.
                </p>
                <Link href="/order">
                  <button className="btn-secondary">Request Custom Project →</button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
