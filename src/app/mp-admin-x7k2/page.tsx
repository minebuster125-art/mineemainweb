"use client";

import React, { useState, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Order {
  id: string;
  channelName: string;
  channelLink: string;
  projectType: string;
  description: string;
  referenceLinks?: string;
  attachedFiles?: string[];
  budget: number;
  deadline: string;
  email: string;
  discord: string;
  submittedAt: string;
}

interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  youtubeLink: string;
  imageData?: string;
  createdAt: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  youtubeLink: string;
  imageData: string;
  createdAt: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Mine@buster@2012";
const STORAGE_KEYS = {
  auth: "mp_admin_auth",
  orders: "mp_orders",
  shop: "mp_shop_items",
  portfolio: "mp_portfolio_items",
};

const TABS = [
  { id: "orders", label: "Orders", icon: "📋" },
  { id: "shop", label: "Shop Manager", icon: "🛒" },
  { id: "portfolio", label: "Portfolio Manager", icon: "🎬" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem(STORAGE_KEYS.auth, "true");
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#111] border border-[rgba(76,175,80,0.15)] mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Admin Panel
          </h1>
          <p className="text-sm text-[#555] mt-1">MineProductions Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.1)] p-6">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[rgba(76,175,80,0.12)] rounded-lg text-white text-sm outline-none focus:border-[#4CAF50] transition-colors placeholder:text-[#444]"
            />
            {error && (
              <p className="text-red-400 text-xs mt-2">
                ✕ Incorrect password. Try again.
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full mt-4 py-3 rounded-lg bg-[#4CAF50] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#43a047] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Orders Tab ──────────────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrders(getFromStorage<Order[]>(STORAGE_KEYS.orders, []));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.orders, updated);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-[#555]">
        <span className="text-5xl block mb-4">📭</span>
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm mt-1">
          Orders submitted via the order form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[#888]">{orders.length} order(s)</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[rgba(76,175,80,0.1)]">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#111] border-b border-[rgba(76,175,80,0.08)]">
              {[
                "Channel",
                "Type",
                "Budget",
                "Deadline",
                "Email",
                "Discord",
                "Date",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs uppercase tracking-wider text-[#4CAF50] font-semibold whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  onClick={() => toggleExpand(order.id)}
                  className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(76,175,80,0.03)] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-white flex items-center gap-2">
                       {expandedOrderId === order.id ? "▼" : "▶"} {order.channelName}
                    </div>
                    <a
                      href={order.channelLink}
                      target="_blank"
                      rel="noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-[#4CAF50] hover:underline block mt-1"
                    >
                      {order.channelLink}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[#ccc] whitespace-nowrap">
                    {order.projectType}
                  </td>
                  <td className="px-4 py-3 text-[#FFD700] font-semibold whitespace-nowrap">
                    ${order.budget}
                  </td>
                  <td className="px-4 py-3 text-[#ccc] whitespace-nowrap">
                    {order.deadline}
                  </td>
                  <td className="px-4 py-3 text-[#ccc]">{order.email}</td>
                  <td className="px-4 py-3 text-[#ccc]">{order.discord}</td>
                  <td className="px-4 py-3 text-[#888] text-xs whitespace-nowrap">
                    {new Date(order.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteOrder(order.id);
                      }}
                      className="text-red-400/60 hover:text-red-400 transition-colors text-xs px-2 py-1 bg-red-400/10 rounded hover:bg-red-400/20"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr className="bg-[rgba(76,175,80,0.02)] border-b border-[rgba(255,255,255,0.03)]">
                    <td colSpan={8} className="px-6 py-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 bg-[#0a0a0a] rounded-xl border border-[rgba(76,175,80,0.1)] shadow-inner">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#888] font-bold mb-3 flex items-center gap-2">
                             <span className="text-[#4CAF50]">📝</span> Project Description
                          </h4>
                          <p className="text-sm text-[#ccc] leading-relaxed whitespace-pre-wrap bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.04)]">
                             {order.description || "No description provided."}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#888] font-bold mb-3 flex items-center gap-2">
                             <span className="text-[#4CAF50]">🔗</span> References & Files
                          </h4>
                          <div className="bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.04)] space-y-4">
                             {order.referenceLinks && (
                               <div>
                                 <span className="text-xs text-[#555] block mb-1 font-semibold uppercase tracking-wider">Links:</span>
                                 <p className="text-sm text-[#4CAF50] break-all whitespace-pre-wrap">{order.referenceLinks}</p>
                               </div>
                             )}
                             
                             {order.attachedFiles && order.attachedFiles.length > 0 && (
                               <div>
                                 <span className="text-xs text-[#555] block mb-2 font-semibold uppercase tracking-wider">Attached Files for Discord:</span>
                                 <ul className="space-y-1">
                                   {order.attachedFiles.map((f, i) => (
                                     <li key={i} className="text-sm text-[#ccc] flex items-center gap-2">
                                        <span className="text-xs text-[#888]">📁</span> {f}
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                             )}

                             {!order.referenceLinks && (!order.attachedFiles || order.attachedFiles.length === 0) && (
                                <p className="text-sm text-[#555] italic">No reference materials provided.</p>
                             )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Shop Manager Tab ────────────────────────────────────────────────────────
function ShopTab() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [mediaMode, setMediaMode] = useState<"link" | "image">("link");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "Minecraft But Mods & Plugins",
    youtubeLink: "",
  });

  useEffect(() => {
    setItems(getFromStorage<ShopItem[]>(STORAGE_KEYS.shop, []));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ShopItem = {
      id: generateId(),
      title: form.title,
      description: form.description,
      price: parseFloat(form.price) || 0,
      type: form.type,
      youtubeLink: mediaMode === "link" ? form.youtubeLink : "",
      imageData: mediaMode === "image" ? imagePreview : "",
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...items];
    setItems(updated);
    saveToStorage(STORAGE_KEYS.shop, updated);
    setForm({ title: "", description: "", price: "", type: "Minecraft But Mods & Plugins", youtubeLink: "" });
    setImagePreview("");
    setMediaMode("link");
    setShowForm(false);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveToStorage(STORAGE_KEYS.shop, updated);
  };

  const previewThumb = getYouTubeThumbnail(form.youtubeLink);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#888]">{items.length} item(s)</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Item"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.12)] p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Title"
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
              required
            />
            <InputField
              label="Price (USD)"
              value={form.price}
              onChange={(v) => setForm({ ...form, price: v })}
              type="number"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2 font-semibold">
                Category
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[rgba(76,175,80,0.12)] rounded-lg text-white text-sm outline-none focus:border-[#4CAF50] transition-colors appearance-none"
              >
                <option value="Minecraft But Mods & Plugins">Minecraft But Mods & Plugins</option>
                <option value="Trending Mods">Trending Mods</option>
                <option value="Best Value Mods">Best Value Mods</option>
                <option value="High Quality Maps">High Quality Maps</option>
                <option value="Trending Models">Trending Models</option>
              </select>
            </div>
            <InputField
              label="Description"
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              required
            />
          </div>

          {/* Media Mode Toggle */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-3 font-semibold">
              Media
            </label>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMediaMode("link")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mediaMode === "link"
                    ? "bg-[#4CAF50] text-white shadow-[0_0_15px_rgba(76,175,80,0.2)]"
                    : "bg-[#0a0a0a] text-[#888] border border-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(76,175,80,0.15)]"
                }`}
              >
                🔗 YouTube Link
              </button>
              <button
                type="button"
                onClick={() => setMediaMode("image")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mediaMode === "image"
                    ? "bg-[#4CAF50] text-white shadow-[0_0_15px_rgba(76,175,80,0.2)]"
                    : "bg-[#0a0a0a] text-[#888] border border-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(76,175,80,0.15)]"
                }`}
              >
                🖼️ Upload Image
              </button>
            </div>

            {mediaMode === "link" ? (
              <>
                <InputField
                  label="YouTube Video Link"
                  value={form.youtubeLink}
                  onChange={(v) => setForm({ ...form, youtubeLink: v })}
                  placeholder="https://youtube.com/watch?v=..."
                />
                {previewThumb && (
                  <div className="flex items-center gap-4 bg-[#0a0a0a] rounded-lg p-3 border border-[rgba(76,175,80,0.08)] mt-3">
                    <img src={previewThumb} alt="Preview" className="w-28 h-16 object-cover rounded" />
                    <span className="text-xs text-[#4CAF50]">✓ Thumbnail auto-detected from YouTube</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="shop-image-upload"
                  />
                  <label
                    htmlFor="shop-image-upload"
                    className="flex flex-col items-center justify-center w-full h-40 bg-[#0a0a0a] border-2 border-dashed border-[rgba(76,175,80,0.15)] rounded-lg cursor-pointer hover:border-[#4CAF50] transition-colors"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <span className="text-3xl mb-2">📁</span>
                        <span className="text-sm text-[#888]">Click to upload image</span>
                        <span className="text-xs text-[#555] mt-1">PNG, JPG, WEBP</span>
                      </>
                    )}
                  </label>
                </div>
                {imagePreview && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#4CAF50]">✓ Image uploaded</span>
                    <button
                      type="button"
                      onClick={() => setImagePreview("")}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={!form.title || (mediaMode === "link" && !form.youtubeLink && !imagePreview) || (mediaMode === "image" && !imagePreview)}
            className="px-6 py-2.5 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Shop Item
          </button>
        </form>
      )}

      {/* Items List */}
      {items.length === 0 && !showForm ? (
        <EmptyState icon="🛒" title="No shop items" subtitle="Add your first product to get started." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const thumb = item.imageData || getYouTubeThumbnail(item.youtubeLink);
            return (
              <div
                key={item.id}
                className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.08)] p-5 hover:border-[rgba(76,175,80,0.2)] transition-colors group flex flex-col"
              >
                {thumb && (
                  <div className="w-full h-32 rounded-lg bg-[#0a0a0a] mb-4 overflow-hidden relative">
                    <img
                      src={thumb}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.type && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(255,215,0,0.9)] text-[#080808]">
                        {item.type}
                      </div>
                    )}
                  </div>
                )}
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-[#888] text-xs mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFD700] font-bold">${item.price}</span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-400/50 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Portfolio Manager Tab ───────────────────────────────────────────────────
function PortfolioTab() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [mediaMode, setMediaMode] = useState<"link" | "image">("link");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    type: "recreation",
    youtubeLink: "",
  });

  useEffect(() => {
    setItems(getFromStorage<PortfolioItem[]>(STORAGE_KEYS.portfolio, []));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioItem = {
      id: generateId(),
      title: form.title,
      type: form.type,
      youtubeLink: mediaMode === "link" ? form.youtubeLink : "",
      imageData: mediaMode === "image" ? imagePreview : "",
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...items];
    setItems(updated);
    saveToStorage(STORAGE_KEYS.portfolio, updated);
    setForm({ title: "", type: "recreation", youtubeLink: "" });
    setImagePreview("");
    setMediaMode("link");
    setShowForm(false);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveToStorage(STORAGE_KEYS.portfolio, updated);
  };

  const typeColors: Record<string, string> = {
    recreation: "#4CAF50",
    custom: "#FFD700",
    animation: "#a855f7",
  };

  const previewThumb = getYouTubeThumbnail(form.youtubeLink);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#888]">{items.length} item(s)</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Project"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.12)] p-6 space-y-4"
        >
          <InputField
            label="Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
            required
          />

          {/* Media Mode Toggle */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-3 font-semibold">
              Media
            </label>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMediaMode("link")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mediaMode === "link"
                    ? "bg-[#4CAF50] text-white shadow-[0_0_15px_rgba(76,175,80,0.2)]"
                    : "bg-[#0a0a0a] text-[#888] border border-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(76,175,80,0.15)]"
                }`}
              >
                🔗 YouTube Link
              </button>
              <button
                type="button"
                onClick={() => setMediaMode("image")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mediaMode === "image"
                    ? "bg-[#4CAF50] text-white shadow-[0_0_15px_rgba(76,175,80,0.2)]"
                    : "bg-[#0a0a0a] text-[#888] border border-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(76,175,80,0.15)]"
                }`}
              >
                🖼️ Upload Image
              </button>
            </div>

            {mediaMode === "link" ? (
              <>
                <InputField
                  label="YouTube Video Link"
                  value={form.youtubeLink}
                  onChange={(v) => setForm({ ...form, youtubeLink: v })}
                  placeholder="https://youtube.com/watch?v=..."
                />
                {previewThumb && (
                  <div className="flex items-center gap-4 bg-[#0a0a0a] rounded-lg p-3 border border-[rgba(76,175,80,0.08)] mt-3">
                    <img src={previewThumb} alt="Preview" className="w-28 h-16 object-cover rounded" />
                    <span className="text-xs text-[#4CAF50]">✓ Thumbnail auto-detected from YouTube</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="portfolio-image-upload"
                  />
                  <label
                    htmlFor="portfolio-image-upload"
                    className="flex flex-col items-center justify-center w-full h-40 bg-[#0a0a0a] border-2 border-dashed border-[rgba(76,175,80,0.15)] rounded-lg cursor-pointer hover:border-[#4CAF50] transition-colors"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <span className="text-3xl mb-2">📁</span>
                        <span className="text-sm text-[#888]">Click to upload image</span>
                        <span className="text-xs text-[#555] mt-1">PNG, JPG, WEBP</span>
                      </>
                    )}
                  </label>
                </div>
                {imagePreview && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#4CAF50]">✓ Image uploaded</span>
                    <button
                      type="button"
                      onClick={() => setImagePreview("")}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={!form.title || (mediaMode === "link" && !form.youtubeLink && !imagePreview) || (mediaMode === "image" && !imagePreview)}
            className="px-6 py-2.5 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Portfolio Item
          </button>
        </form>
      )}

      {/* Items List */}
      {items.length === 0 && !showForm ? (
        <EmptyState icon="🎬" title="No portfolio items" subtitle="Add your first project to showcase." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const thumb = item.imageData || getYouTubeThumbnail(item.youtubeLink);
            return (
              <div
                key={item.id}
                className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.08)] p-5 hover:border-[rgba(76,175,80,0.2)] transition-colors group"
              >
                {thumb && (
                  <div className="w-full h-32 rounded-lg bg-[#0a0a0a] mb-4 overflow-hidden">
                    <img
                      src={thumb}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded" style={{ color: "#4CAF50", backgroundColor: "rgba(76,175,80,0.1)" }}>
                    {item.imageData ? "Image" : "Video"}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-3">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#888] text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-400/50 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Reusable Components ─────────────────────────────────────────────────────
function InputField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2 font-semibold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[rgba(76,175,80,0.12)] rounded-lg text-white text-sm outline-none focus:border-[#4CAF50] transition-colors placeholder:text-[#444]"
      />
    </div>
  );
}

function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center py-20 text-[#555]">
      <span className="text-5xl block mb-4">{icon}</span>
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm mt-1">{subtitle}</p>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>("orders");

  const renderTab = useCallback(() => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;
      case "shop":
        return <ShopTab />;
      case "portfolio":
        return <PortfolioTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[rgba(76,175,80,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center text-white text-sm font-bold">
              M
            </div>
            <div>
              <h1
                className="text-sm font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MineProductions
              </h1>
              <p className="text-[10px] text-[#4CAF50] uppercase tracking-wider">
                Admin Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-1.5 rounded-lg bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] text-[#888] text-xs hover:text-red-400 hover:border-red-400/20 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#4CAF50] text-white shadow-[0_0_20px_rgba(76,175,80,0.2)]"
                  : "bg-[#111] text-[#888] border border-[rgba(255,255,255,0.04)] hover:text-white hover:border-[rgba(76,175,80,0.15)]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{renderTab()}</div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const auth = localStorage.getItem(STORAGE_KEYS.auth);
    if (auth === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.auth);
    setAuthenticated(false);
  };

  // Prevent SSR flash
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#4CAF50] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
