import { useState, useEffect } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

const AIML_PROJECTS = [
  {
    title: "Fedral.AI",
    category: "Healthcare AI",
    tech: ["PyTorch", "FastAPI", "React", "Docker", "Federated Learning"],
    desc: "Privacy-preserving federated learning for ICU biomarker discovery without sharing patient data. 0.93 AUC across multiple hospitals.",
    link: "https://github.com/Akkii88/Fedral.AI",
    metrics: { auc: "0.93", patients: "2000+", hospitals: "3" },
    color: "#1565C0",
  },
  {
    title: "Diffusion Fine-Tuning Platform",
    category: "MLOps",
    tech: ["PyTorch", "HuggingFace", "LoRA", "Next.js"],
    desc: "LoRA fine-tuning for Stable Diffusion with parameter-efficient training. Just 0.5–2% trainable params, runs on 8GB GPU.",
    link: "https://github.com/Akkii88/Diffusion-finetuneLLM",
    metrics: { params: "<2%", gpu: "8GB", speed: "2x" },
    color: "#7C3AED",
  },
  {
    title: "CognitiveMesh RAG",
    category: "LLM Systems",
    tech: ["FAISS", "LangGraph", "Python"],
    desc: "RAG routing system with adversarial prompt injection protection. Intelligent query routing and contextual retrieval.",
    link: "https://github.com/Akkii88/CognitiveMesh-RAG",
    metrics: { queries: "100+", accuracy: "94%" },
    color: "#2563EB",
  },
  {
    title: "CodeSage.AI",
    category: "DevTools",
    tech: ["Python", "Gemini LLM", "AST"],
    desc: "AI-powered code review agent detecting security vulnerabilities and code smells automatically before production.",
    link: "https://github.com/Akkii88/CodeSage.AI",
    metrics: { detections: "15+", languages: "3" },
    color: "#059669",
  },
  {
    title: "ApplyGenie.AI",
    category: "Career AI",
    tech: ["React", "Vite", "Gemini 1.5 Flash"],
    desc: "AI job application agent with resume-job description matching and tailored response generation.",
    link: "https://github.com/Akkii88/ApplyGenie.AI-JobApplicationAgent",
    metrics: { matches: "85%", applications: "50+" },
    color: "#E8832A",
  },
  {
    title: "Vigil360",
    category: "Security",
    tech: ["Python", "Streaming"],
    desc: "Real-time financial crime intelligence and compliance monitoring platform for banks.",
    link: "https://github.com/Akkii88/Vigil360-Intelligence",
    metrics: { latency: "~2s", detections: "real-time" },
    color: "#DC2626",
  },
];

const ANALYST_PROJECTS = [
  {
    title: "CustomerLens",
    category: "Retail Analytics",
    tech: ["Python", "SQL", "Power BI"],
    desc: "Retail customer RFM segmentation and churn analysis. 5 segments, 12+ metrics tracked.",
    link: "https://github.com/Akkii88/CustomerLens-RetailCustomerInsights",
    metrics: { segments: "5", metrics: "12+", insights: "actionable" },
    color: "#2563EB",
  },
  {
    title: "Zeptalytix",
    category: "E-commerce",
    tech: ["SQL", "PostgreSQL", "Excel"],
    desc: "20+ business SQL queries on Zepto e-commerce inventory data. Supply chain optimization.",
    link: "https://github.com/Akkii88/Zeptalytix-ZeptoSqlAnalyticsPipeline",
    metrics: { queries: "20+", tables: "15+" },
    color: "#059669",
  },
  {
    title: "StockVista",
    category: "Finance",
    tech: ["Python", "Pandas", "Tableau"],
    desc: "Stock analysis for 6 tech companies with MA50/MA200 moving average indicators.",
    link: "https://github.com/Akkii88/StockVista-MultiAssetMarketInsights",
    metrics: { stocks: "6", indicators: "MA50/MA200" },
    color: "#E8832A",
  },
  {
    title: "Secure180",
    category: "Security",
    tech: ["Python", "ML", "PostgreSQL"],
    desc: "Real-time fraud detection with ~2s inference latency and live Tableau dashboard.",
    link: "https://github.com/Akkii88/Secure180",
    metrics: { latency: "~2s", accuracy: "96%" },
    color: "#DC2626",
  },
  {
    title: "BitcoinSentimentTrader",
    category: "Crypto",
    tech: ["Python", "Data Analysis"],
    desc: "Bitcoin Fear & Greed sentiment analysis correlated with trader behavior patterns.",
    link: "https://github.com/Akkii88/BitcoinSentimentTraderAnalysis",
    metrics: { data: "3 years", correlation: "0.78" },
    color: "#7C3AED",
  },
];

export default function ProjectsWindow({
  profile,
}: {
  profile: "aiml" | "analyst";
}) {
  const projects = profile === "aiml" ? AIML_PROJECTS : ANALYST_PROJECTS;

  return (
    <div className="bg-[#FFFDF7] text-[#3D2B1F] h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[#3D2B1F] shrink-0"
        style={{
          background:
            profile === "aiml"
              ? "linear-gradient(90deg, #1565C0, #0D47A1)"
              : "linear-gradient(90deg, #E8832A, #D4700F)",
        }}
      >
        <div>
          <div className="font-display text-[8px] text-white/70 tracking-wider">
            PROJECTS
          </div>
          <div className="font-display text-[11px] text-white font-semibold">
            {profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"}
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[8px] text-white/70">TOTAL</div>
          <div className="font-display text-2xl text-white leading-none">
            {projects.length}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 gap-2">
          {projects.map((p, i) => (
            <div
              key={i}
              className="border-2 border-[#E8D5B0] bg-white rounded-lg overflow-hidden hover:border-[#E8832A]/40 transition-all duration-200"
            >
              {/* Card Header */}
              <div className="px-3 py-2 border-b border-[#E8D5B0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: p.color }}
                  />
                  <span className="font-display text-[8px] text-[#8B6F47]">
                    {p.category}
                  </span>
                </div>
                <span className="font-display text-[9px] font-semibold text-[#3D2B1F]">
                  {p.title}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-3">
                <p className="font-sans text-[10px] text-[#6B5B3D] leading-relaxed mb-2.5">
                  {p.desc}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {p.tech.map((t, j) => (
                    <span
                      key={j}
                      className="font-display text-[7px] px-1.5 py-0.5 rounded bg-[#F5E6C8] text-[#6B5B3D] border border-[#E8D5B0]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex gap-3 mb-2.5">
                  {Object.entries(p.metrics)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="font-display text-[7px] text-[#8B6F47] uppercase tracking-wide">
                          {key}
                        </span>
                        <span
                          className="font-display text-[10px] font-bold"
                          style={{ color: p.color }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Link */}
                <InBrowserLink
                  href={p.link}
                  className="inline-flex items-center gap-1 font-display text-[8px] font-semibold text-white px-2.5 py-1 rounded-md transition-colors"
                  style={{ background: p.color }}
                >
                  View →
                </InBrowserLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
