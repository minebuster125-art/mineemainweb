"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    channelName: "",
    channelLink: "",
    projectType: "",
    description: "",
    referenceLinks: "",
    budget: 25,
    deadline: "",
    email: "",
    discord: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to localStorage for admin panel
    try {
      const existingOrders = JSON.parse(localStorage.getItem("mp_orders") || "[]");
      const newOrder = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        ...formData,
        attachedFiles: files.map(f => f.name),
        submittedAt: new Date().toISOString(),
      };
      existingOrders.unshift(newOrder);
      localStorage.setItem("mp_orders", JSON.stringify(existingOrders));
    } catch {
      // localStorage may not be available
    }

    // Discord Webhook Integration via Secure Backend API
    try {
      let descriptionStr = formData.description;
      if (formData.referenceLinks) {
         descriptionStr += `\n\n**Reference Links:**\n${formData.referenceLinks}`;
      }

      const discordPayload = {
        embeds: [
          {
            title: "🚀 New Custom Order Received!",
            color: 0x4caf50, // Green color to match website theme
            fields: [
              { name: "Channel Name", value: formData.channelName || "N/A", inline: true },
              { name: "Email", value: formData.email || "N/A", inline: true },
              { name: "Budget", value: `$${formData.budget}`, inline: true },
              { name: "Project Type", value: formData.projectType || "N/A", inline: true },
              { name: "Discord Username", value: formData.discord || "N/A", inline: true },
              { name: "Deadline", value: formData.deadline || "N/A", inline: true },
              { name: "Channel Link", value: formData.channelLink || "N/A", inline: false },
              { name: "Project Description", value: descriptionStr || "N/A", inline: false },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const submitData = new FormData();
      submitData.append("payload_json", JSON.stringify(discordPayload));
      
      // Attach honeypot field
      const hpField = document.getElementById("websiteUrl_hp") as HTMLInputElement;
      if (hpField && hpField.value) {
        submitData.append("websiteUrl_hp", hpField.value);
      }
      
      files.forEach((file, index) => {
        submitData.append(`files[${index}]`, file);
      });

      const res = await fetch("/api/order", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) {
        console.error("Order submission failed");
      }
    } catch (error) {
      console.error("Failed to send webhook:", error);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Page Hero */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-10 right-[20%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,215,0,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(76,175,80,0.08)] border border-[rgba(76,175,80,0.15)] mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4CAF50]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Get Started
                </span>
              </span>
              <h1
                className="text-5xl md:text-6xl font-bold mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order{" "}
                <span className="gradient-text">Custom Project</span>
              </h1>
              <p className="text-[#888] text-lg max-w-lg mx-auto leading-relaxed">
                Tell us about your dream Minecraft content. We&apos;ll bring it to life
                within 3-14 days.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#111] rounded-2xl p-12 border border-[rgba(76,175,80,0.2)] text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.05)_0%,transparent_70%)]" />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#78dc77] to-[#2d7a30] flex items-center justify-center mb-8 shadow-lg shadow-[rgba(76,175,80,0.3)]"
                    >
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h2
                      className="text-3xl font-bold mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Order <span className="gradient-text">Received!</span>
                    </h2>
                    <p className="text-[#888] mb-8 text-lg">
                      Your order has been received! We will contact you within 24
                      hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            channelName: "",
                            channelLink: "",
                            projectType: "",
                            description: "",
                            referenceLinks: "",
                            budget: 25,
                            deadline: "",
                            email: "",
                            discord: "",
                          });
                          setFiles([]);
                        }}
                        className="btn-secondary"
                        id="submit-another-btn"
                      >
                        Submit Another Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="bg-[#111] rounded-2xl p-8 md:p-10 border border-[rgba(76,175,80,0.1)] space-y-6 relative overflow-hidden"
                >
                  {/* Ambient inner glow */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(76,175,80,0.04)_0%,transparent_70%)] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,215,0,0.03)_0%,transparent_70%)] pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    {/* Honeypot field (hidden from real users) */}
                    <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                      <label htmlFor="websiteUrl_hp">Website URL</label>
                      <input type="text" id="websiteUrl_hp" name="websiteUrl_hp" tabIndex={-1} autoComplete="off" />
                    </div>

                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(76,175,80,0.1)] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4CAF50]" style={{ fontFamily: "var(--font-display)" }}>
                        Your Channel
                      </span>
                    </div>

                    {/* Channel Name & Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          YouTube Channel Name
                        </label>
                        <input
                          type="text"
                          name="channelName"
                          value={formData.channelName}
                          onChange={handleChange}
                          required
                          placeholder="Your channel name"
                          className="form-input"
                          id="input-channel-name"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Channel Link
                        </label>
                        <input
                          type="url"
                          name="channelLink"
                          value={formData.channelLink}
                          onChange={handleChange}
                          required
                          placeholder="https://youtube.com/@yourchannel"
                          className="form-input"
                          id="input-channel-link"
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(76,175,80,0.1)] to-transparent" />

                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(255,215,0,0.08)] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.4a.75.75 0 01-.17-1.05l3.4-5.1a.75.75 0 011.05-.17l5.1 3.4a.75.75 0 01.17 1.05l-3.4 5.1a.75.75 0 01-1.05.17zM17.25 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700]" style={{ fontFamily: "var(--font-display)" }}>
                        Project Details
                      </span>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="form-input appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "20px",
                        }}
                        id="input-project-type"
                      >
                        <option value="">Select project type</option>
                        <option value="Map/Build">Map/Build</option>
                        <option value="Mod">Mod</option>
                        <option value="Plugin">Plugin</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Project Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe your project in detail..."
                        className="form-input resize-none"
                        id="input-description"
                      />
                    </div>

                    {/* Reference Links & Uploads */}
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Reference Links & Files
                      </label>
                      <div className="space-y-3">
                        <textarea
                          name="referenceLinks"
                          value={formData.referenceLinks}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Paste any inspiration links (YouTube videos, Google Drive folders, Imgur, etc.)"
                          className="form-input resize-none"
                          id="input-reference-links"
                        />
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[rgba(76,175,80,0.3)] rounded-xl cursor-pointer bg-[rgba(20,20,20,0.3)] hover:bg-[rgba(76,175,80,0.05)] hover:border-[rgba(76,175,80,0.5)] transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-3 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="mb-2 text-sm text-[#888]"><span className="font-semibold text-[#4CAF50]">Click to upload</span> images/files</p>
                              <p className="text-xs text-[#555]">PNG, JPG, ZIP (Max 25MB total for Discord)</p>
                            </div>
                            <input 
                              type="file" 
                              className="hidden" 
                              multiple 
                              onChange={(e) => {
                                if (e.target.files) {
                                  setFiles(Array.from(e.target.files));
                                }
                              }}
                            />
                          </label>
                        </div>
                        {files.length > 0 && (
                          <div className="text-xs text-[#4CAF50] px-2 bg-[rgba(76,175,80,0.1)] py-2 rounded-lg break-all border border-[rgba(76,175,80,0.2)]">
                            <span className="font-semibold">{files.length} file(s) attached:</span> {files.map(f => f.name).join(", ")}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-3"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Budget (USD):{" "}
                        <span className="text-[#4CAF50] text-base font-bold">${formData.budget}</span>
                        {Number(formData.budget) >= 500 && "+"}
                      </label>
                      <input
                        type="range"
                        name="budget"
                        min="25"
                        max="500"
                        step="25"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full"
                        id="input-budget"
                      />
                      <div className="flex justify-between text-[10px] text-[#555] mt-2 px-1"
                        style={{ fontFamily: "var(--font-display)" }}>
                        <span>$25</span>
                        <span>$150</span>
                        <span>$300</span>
                        <span>$500+</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,215,0,0.08)] to-transparent" />

                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(76,175,80,0.1)] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4CAF50]" style={{ fontFamily: "var(--font-display)" }}>
                        Contact & Delivery
                      </span>
                    </div>

                    {/* Deadline & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Deadline
                        </label>
                        <input
                          type="date"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          required
                          className="form-input"
                          id="input-deadline"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Contact Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="form-input"
                          id="input-email"
                        />
                      </div>
                    </div>

                    {/* Discord */}
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#777] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Discord Username
                      </label>
                      <input
                        type="text"
                        name="discord"
                        value={formData.discord}
                        onChange={handleChange}
                        required
                        placeholder="username"
                        className="form-input"
                        id="input-discord"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="btn-primary w-full py-4 text-base flex items-center justify-center gap-3 disabled:opacity-60 mt-4"
                      id="submit-order-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                          Submit Order
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-[#555] mt-2">
                      We&apos;ll respond within 24 hours · 2 free revisions included · $25-$500+ range
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
