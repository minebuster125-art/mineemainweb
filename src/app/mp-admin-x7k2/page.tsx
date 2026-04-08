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
  buyAction?: string;
  imageData?: string;
  createdAt: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Mine@buster@2012";

const TABS = [
  { id: "orders", label: "Orders", icon: "📋" },
  { id: "shop", label: "Shop Manager", icon: "🛒" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── API Helpers ─────────────────────────────────────────────────────────────
async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": ADMIN_PASSWORD,
      ...(options?.headers || {}),
    },
  });
  return res.json();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
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
        localStorage.setItem("mp_admin_auth", "true");
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#111] border border-[rgba(76,175,80,0.15)] mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Admin Panel
          </h1>
          <p className="text-sm text-[#555] mt-1">MineProductions Dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.1)] p-6">
            <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[rgba(76,175,80,0.12)] rounded-lg text-white text-sm outline-none focus:border-[#4CAF50] transition-colors placeholder:text-[#444]"
            />
            {error && <p className="text-red-400 text-xs mt-2">Incorrect password. Try again.</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full mt-4 py-3 rounded-lg bg-[#4CAF50] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#43a047] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/admin/data?type=orders").then((data) => {
      if (Array.isArray(data)) {
        const parsed = data.map((o: any) => ({
          ...o,
          attachedFiles: typeof o.attachedFiles === "string" ? JSON.parse(o.attachedFiles) : o.attachedFiles,
        }));
        setOrders(parsed);
      }
      setLoading(false);
    });
  }, []);

  const toggleExpand = (id: string) => setExpandedOrderId(expandedOrderId === id ? null : id);

  const deleteOrder = async (id: string) => {
    await apiFetch("/api/admin/data", {
      method: "DELETE",
      body: JSON.stringify({ type: "order", id }),
    });
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  if (loading) return <div className="text-center py-20 text-[#555]"><span className="text-2xl">Loading...</span></div>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-[#555]">
        <span className="text-5xl block mb-4">📭</span>
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm mt-1">Orders submitted via the order form will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#888]">{orders.length} order(s)</p>
      <div className="overflow-x-auto rounded-xl border border-[rgba(76,175,80,0.1)]">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#111] border-b border-[rgba(76,175,80,0.08)]">
              {["Channel", "Type", "Budget", "Deadline", "Email", "Discord", "Date", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-xs uppercase tracking-wider text-[#4CAF50] font-semibold whitespace-nowrap">{h}</th>
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
                    <a href={order.channelLink} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-xs text-[#4CAF50] hover:underline block mt-1">
                      {order.channelLink}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[#ccc] whitespace-nowrap">{order.projectType}</td>
                  <td className="px-4 py-3 text-[#FFD700] font-semibold whitespace-nowrap">${order.budget}</td>
                  <td className="px-4 py-3 text-[#ccc] whitespace-nowrap">{order.deadline}</td>
                  <td className="px-4 py-3 text-[#ccc]">{order.email}</td>
                  <td className="px-4 py-3 text-[#ccc]">{order.discord}</td>
                  <td className="px-4 py-3 text-[#888] text-xs whitespace-nowrap">{new Date(order.submittedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteOrder(order.id); }}
                      className="text-red-400/60 hover:text-red-400 transition-colors text-xs px-2 py-1 bg-red-400/10 rounded hover:bg-red-400/20"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr className="bg-[rgba(76,175,80,0.02)] border-b border-[rgba(255,255,255,0.03)]">
                    <td colSpan={8} className="px-6 py-5">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 bg-[#0a0a0a] rounded-xl border border-[rgba(76,175,80,0.1)]">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#888] font-bold mb-3">📝 Project Description</h4>
                          <p className="text-sm text-[#ccc] leading-relaxed whitespace-pre-wrap bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.04)]">
                            {order.description || "No description provided."}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#888] font-bold mb-3">🔗 References & Files</h4>
                          <div className="bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.04)] space-y-4">
                            {order.referenceLinks && (
                              <div>
                                <span className="text-xs text-[#555] block mb-1 font-semibold uppercase tracking-wider">Links:</span>
                                <p className="text-sm text-[#4CAF50] break-all whitespace-pre-wrap">{order.referenceLinks}</p>
                              </div>
                            )}
                            {order.attachedFiles && order.attachedFiles.length > 0 && (
                              <div>
                                <span className="text-xs text-[#555] block mb-2 font-semibold uppercase tracking-wider">Attached Files:</span>
                                <ul className="space-y-1">
                                  {order.attachedFiles.map((f, i) => (
                                    <li key={i} className="text-sm text-[#ccc] flex items-center gap-2">📁 {f}</li>
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
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mediaMode, setMediaMode] = useState<"link" | "image">("link");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [form, setForm] = useState({
    title: "", description: "", price: "",
    type: "Minecraft But Mods & Plugins",
    youtubeLink: "", buyAction: "",
  });

  useEffect(() => {
    apiFetch("/api/admin/data?type=shop").then((data) => {
      if (Array.isArray(data)) setItems(data);
      setLoading(false);
    });
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ShopItem = {
      id: generateId(),
      title: form.title,
      description: form.description,
      price: parseFloat(form.price) || 0,
      type: form.type,
      youtubeLink: mediaMode === "link" ? form.youtubeLink : "",
      buyAction: form.buyAction,
      imageData: mediaMode === "image" ? imagePreview : "",
      createdAt: new Date().toISOString(),
    };
    await apiFetch("/api/admin/data", {
      method: "POST",
      body: JSON.stringify({ action: "add_shop_item", item: newItem }),
    });
    setItems((prev) => [newItem, ...prev]);
    setForm({ title: "", description: "", price: "", type: "Minecraft But Mods & Plugins", youtubeLink: "", buyAction: "" });
    setImagePreview("");
    setMediaMode("link");
    setShowForm(false);
  };

  const deleteItem = async (id: string) => {
    await apiFetch("/api/admin/data", {
      method: "DELETE",
      body: JSON.stringify({ type: "shop_item", id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const moveItem = async (index: number, dir: "up" | "down") => {
    const updated = [...items];
    const swapIdx = dir === "up" ? index - 1 : index + 1;
    [updated[index], updated[swapIdx]] = [updated[swapIdx], updated[index]];
    setItems(updated);
    await apiFetch("/api/admin/data", {
      method: "PATCH",
      body: JSON.stringify({ items: updated }),
    });
  };

  const previewThumb = getYouTubeThumbnail(form.youtubeLink);

  if (loading) return <div className="text-center py-20 text-[#555]"><span className="text-2xl">Loading...</span></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#888]">{items.length} item(s)</p>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors">
          {showForm ? "Cancel" : "+ Add Item"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.12)] p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <InputField label="Price (USD)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" required />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2 font-semibold">Category</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 bg-[#0a0a0a] border border-[rgba(76,175,80,0.12)] rounded-lg text-white text-sm outline-none focus:border-[#4CAF50] transition-colors appearance-none">
              <option>Minecraft But Mods & Plugins</option>
              <option>Trending Mods</option>
              <option>Best Value Mods</option>
              <option>High Quality Maps</option>
              <option>Trending Models</option>
            </select>
          </div>
          <InputField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-3 font-semibold">Media</label>
            <div className="flex gap-2 mb-4">
              {["link", "image"].map((mode) => (
                <button key={mode} type="button" onClick={() => setMediaMode(mode as "link" | "image")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${mediaMode === mode ? "bg-[#4CAF50] text-white" : "bg-[#0a0a0a] text-[#888] border border-[rgba(255,255,255,0.06)] hover:text-white"}`}>
                  {mode === "link" ? "🔗 YouTube Link" : "🖼️ Upload Image"}
                </button>
              ))}
            </div>

            {mediaMode === "link" ? (
              <>
                <InputField label="YouTube Video Link" value={form.youtubeLink} onChange={(v) => setForm({ ...form, youtubeLink: v })} placeholder="https://youtube.com/watch?v=..." />
                <div className="mt-3">
                  <InputField label="Buy Action" value={form.buyAction} onChange={(v) => setForm({ ...form, buyAction: v })} placeholder="https://domain.com/buy OR Discord: myname" />
                </div>
                {previewThumb && (
                  <div className="flex items-center gap-4 bg-[#0a0a0a] rounded-lg p-3 border border-[rgba(76,175,80,0.08)] mt-3">
                    <img src={previewThumb} alt="Preview" className="w-28 h-16 object-cover rounded" />
                    <span className="text-xs text-[#4CAF50]">Thumbnail auto-detected from YouTube</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="shop-image-upload" />
                <label htmlFor="shop-image-upload" className="flex flex-col items-center justify-center w-full h-40 bg-[#0a0a0a] border-2 border-dashed border-[rgba(76,175,80,0.15)] rounded-lg cursor-pointer hover:border-[#4CAF50] transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <>
                      <span className="text-3xl mb-2">📁</span>
                      <span className="text-sm text-[#888]">Click to upload image</span>
                    </>
                  )}
                </label>
                {imagePreview && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#4CAF50]">Image uploaded</span>
                    <button type="button" onClick={() => setImagePreview("")} className="text-xs text-red-400/60 hover:text-red-400">Remove</button>
                  </div>
                )}
                <div className="mt-3">
                  <InputField label="Buy Action" value={form.buyAction} onChange={(v) => setForm({ ...form, buyAction: v })} placeholder="https://domain.com/buy OR Discord: myname" />
                </div>
              </>
            )}
          </div>

          <button type="submit" disabled={!form.title} className="px-6 py-2.5 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors disabled:opacity-40">
            Add Shop Item
          </button>
        </form>
      )}

      {items.length === 0 && !showForm ? (
        <div className="text-center py-20 text-[#555]">
          <span className="text-5xl block mb-4">🛒</span>
          <p className="text-lg font-medium">No shop items</p>
          <p className="text-sm mt-1">Add your first product to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const thumb = item.imageData || getYouTubeThumbnail(item.youtubeLink || "");
            return (
              <div key={item.id} className="bg-[#111] rounded-xl border border-[rgba(76,175,80,0.08)] p-5 hover:border-[rgba(76,175,80,0.2)] transition-colors group flex flex-col">
                {thumb && (
                  <div className="w-full h-32 rounded-lg bg-[#0a0a0a] mb-4 overflow-hidden relative">
                    <img src={thumb} alt={item.title} className="w-full h-full object-cover" />
                    {item.type && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(255,215,0,0.9)] text-[#080808]">{item.type}</div>
                    )}
                  </div>
                )}
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-[#888] text-xs mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#FFD700] font-bold">${item.price}</span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => moveItem(index, "up")} disabled={index === 0} className="text-[#888] hover:text-white p-1 disabled:opacity-30">↑</button>
                    <button onClick={() => moveItem(index, "down")} disabled={index === items.length - 1} className="text-[#888] hover:text-white p-1 disabled:opacity-30">↓</button>
                    <button onClick={() => deleteItem(item.id)} className="text-red-400/50 hover:text-red-400 text-xs ml-2">Delete</button>
                  </div>
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
function InputField({ label, value, onChange, type = "text", required = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2 font-semibold">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[rgba(76,175,80,0.12)] rounded-lg text-white text-sm outline-none focus:border-[#4CAF50] transition-colors placeholder:text-[#444]" />
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>("orders");

  const renderTab = useCallback(() => {
    switch (activeTab) {
      case "orders": return <OrdersTab />;
      case "shop": return <ShopTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#080808]">
      <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[rgba(76,175,80,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center text-white text-sm font-bold">M</div>
            <div>
              <h1 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>MineProductions</h1>
              <p className="text-[10px] text-[#4CAF50] uppercase tracking-wider">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={onLogout} className="px-4 py-1.5 rounded-lg bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] text-[#888] text-xs hover:text-red-400 hover:border-red-400/20 transition-all">
            Logout
          </button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === tab.id ? "bg-[#4CAF50] text-white shadow-[0_0_20px_rgba(76,175,80,0.2)]" : "bg-[#111] text-[#888] border border-[rgba(255,255,255,0.04)] hover:text-white hover:border-[rgba(76,175,80,0.15)]"}`}
              style={{ fontFamily: "var(--font-display)" }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
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
    if (localStorage.getItem("mp_admin_auth") === "true") setAuthenticated(true);
  }, []);

  if (!hydrated) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#4CAF50] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  return <Dashboard onLogout={() => { localStorage.removeItem("mp_admin_auth"); setAuthenticated(false); }} />;
}
