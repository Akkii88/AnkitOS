import { useEffect, useState } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

const RESEARCH_PAPERS = [
  {
    title: "Parameter-Efficient Fine-Tuning of LLMs Using LoRA and Prompt-Tuning Under Low-Resource Conditions",
    status: "Published",
    date: "May 2026",
    publisher: "Zenodo",
    desc: "LoRA achieved 88.7% accuracy with 1.1% of parameters trained",
    link: "https://zenodo.org/records/20437514",
    doi: "10.5281/zenodo.20437514",
    citations: 0,
    color: "#6B8CBA",
  },
  {
    title: "Privacy-Preserving Federated Learning for Biomarker Discovery in ICU Systems",
    status: "Under submission",
    date: "2024",
    publisher: "",
    desc: "Investigating secure multi-institutional model training without raw data sharing.",
    link: "",
    doi: "",
    citations: 0,
    color: "#E8832A",
  },
];

const BLOCKS = 10;

function CitationBar({ count }: { count: number }) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFilled(Math.min(count, BLOCKS)), 200);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="flex items-center gap-1 mt-2">
      <span className="font-display text-[6px] text-[#8B6F47] w-12">Citations:</span>
      <div className="flex gap-[1px] flex-1">
        {Array.from({ length: BLOCKS }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-sm transition-all duration-300"
            style={{
              background: i < filled ? "#FFD700" : "rgba(0,0,0,0.05)",
              boxShadow: i < filled ? "0 0 3px #FFD70088" : "none",
            }}
          />
        ))}
      </div>
      <span className="font-display text-[6px] text-[#FFD700] font-bold">{count}</span>
    </div>
  );
}

export default function ResearchWindow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const publishedCount = RESEARCH_PAPERS.filter(p => p.status === "Published").length;

  return (
    <div className="bg-[#FFFDF7] text-[#3D2B1F] h-full flex flex-col">
      {/* Retro header banner */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-4 border-[#3D2B1F] shrink-0"
        style={{ background: "linear-gradient(90deg, #6B8CBA, #5673A0)" }}
      >
        <div>
          <div className="font-display text-[9px] text-[#FFF3E8] tracking-widest">RESEARCH LAB v2.0</div>
          <div className="font-display text-[11px] text-white mt-0.5">
            ACADEMIC PUBLICATIONS
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[8px] text-[#FFF3E8]">PUBLISHED</div>
          <div className="font-display text-2xl text-white leading-none">{publishedCount}</div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 py-2 border-b border-[#E8D5B0] bg-[#F5E6C8] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-[7px] text-[#3D2B1F]">
            <span className="text-[#72A96B]">●</span> Published: {publishedCount}
          </span>
          <span className="font-display text-[7px] text-[#3D2B1F]">
            <span className="text-[#FFBD2E]">●</span> Total: {RESEARCH_PAPERS.length}
          </span>
        </div>
        <div className="font-display text-[7px] text-[#8B6F47]">
          Last updated: May 2026
        </div>
      </div>

      {/* Scrollable research grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {RESEARCH_PAPERS.map((paper, index) => (
            <div
              key={index}
              className={`border-2 border-[#E8D5B0] bg-white shadow-[4px_4px_0px_#C4A882] hover:shadow-[6px_6px_0px_#6B8CBA] transition-all duration-200 cursor-pointer ${
                mounted ? "animate-in slide-in-from-bottom" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Paper header */}
              <div
                className="flex items-center gap-2 px-3 py-2 border-b border-[#E8D5B0]"
                style={{ background: paper.color + "22" }}
              >
                <div 
                  className="w-6 h-6 border-2 border-white flex items-center justify-center text-[10px]"
                  style={{ background: paper.color }}
                >
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[9px] text-[#3D2B1F] truncate leading-tight">
                    {paper.title}
                  </h3>
                </div>
                <span className={`font-display text-[7px] px-2 py-0.5 rounded ${
                  paper.status === "Published" 
                    ? "bg-[#72A96B] text-white" 
                    : paper.status === "Under submission" 
                    ? "bg-[#FFBD2E] text-[#3D2B1F]" 
                    : "bg-[#9C27B0] text-white"
                }`}>
                  {paper.status}
                </span>
              </div>

              {/* Paper details */}
              <div className="px-3 py-2.5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display text-[8px] text-[#8B6F47]">{paper.date}</span>
                  {paper.publisher && (
                    <span className="font-display text-[8px] text-[#6B8CBA] bg-[#EEF3FA] px-2 py-0.5">
                      {paper.publisher}
                    </span>
                  )}
                </div>
                
                <p className="font-sans text-[10px] text-[#3D2B1F] mb-3 border-l-4 border-[#E8832A] pl-2 py-1 bg-[#FFF8EE]">
                  {paper.desc}
                </p>

                {/* DOI and Citations */}
                <div className="flex justify-between items-center mb-3">
                  {paper.doi && (
                    <span className="font-display text-[7px] text-[#8B6F47]">
                      DOI: <span className="text-[#6B8CBA]">{paper.doi}</span>
                    </span>
                  )}
                  <div className="flex-1">
                    <CitationBar count={paper.citations} />
                  </div>
                </div>

                {/* Links */}
                {paper.link && (
                  <div className="flex gap-2">
                    <InBrowserLink 
                      href={paper.link} 
                      className="inline-block px-2 py-1 font-display text-[8px] text-white border-2 border-white shadow-[2px_2px_0px_#C4A882] hover:-translate-y-0.5 transition-transform"
                      style={{ background: paper.color }}
                    >
                      📖 View Paper
                    </InBrowserLink>
                  </div>
                )}
              </div>
            </div>
          ))}

          {RESEARCH_PAPERS.length === 0 && (
            <div className="flex items-center justify-center h-48">
              <p className="font-display text-[10px] text-[#8B6F47]">No research papers yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}