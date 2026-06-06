import { useState } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

export default function AboutWindow({ profile }: { profile: "aiml" | "analyst" }) {
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "timeline">("about");

  const aimlSkills = [
    { name: "Python / ML", level: 95 },
    { name: "TensorFlow / PyTorch", level: 90 },
    { name: "NLP / LLMs", level: 85 },
    { name: "Computer Vision", level: 82 },
    { name: "SQL / Databases", level: 88 },
    { name: "Cloud (AWS/GCP)", level: 78 },
  ];

  const analystSkills = [
    { name: "SQL / BigQuery", level: 95 },
    { name: "Tableau / Power BI", level: 90 },
    { name: "Python / Pandas", level: 88 },
    { name: "Statistics / R", level: 85 },
    { name: "Excel / Sheets", level: 96 },
    { name: "Cloud Analytics", level: 80 },
  ];

  const timeline = [
    { year: "2019", event: "Started programming journey", side: "left" },
    { year: "2020", event: "Learned Python & Data Structures", side: "right" },
    { year: "2021", event: "First ML project - Image Classifier", side: "left" },
    { year: "2022", event: "Coursera & IBM certifications", side: "right" },
    { year: "2023", event: "Internship at CSIR-NPL", side: "left" },
    { year: "2024", event: "MCA AI/ML at Chandigarh Uni", side: "right" },
    { year: "2025", event: "Built AnkitOS Portfolio", side: "left" },
  ];

  const skills = profile === "aiml" ? aimlSkills : analystSkills;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 shrink-0 bg-white/5">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, #E8832A, #F59E0B)",
              boxShadow: "0 4px 16px rgba(232, 131, 42, 0.3)",
            }}
          >
            AD
          </div>
          <div className="flex-1">
            <div className="font-display text-[9px] text-[#E8832A] tracking-widest mb-1">ABOUT v2.0</div>
            <h2 className="font-display text-xl text-white font-semibold">Ankit Dabur</h2>
            <p className="font-display text-[10px] text-white/60 mt-0.5">
              {profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"} • Gurugram, India
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {(["about", "skills", "timeline"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 font-display text-[9px] rounded-lg border transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 os-scrollbar">
        {activeTab === "about" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-display text-xs text-white font-semibold mb-2">About Me</h3>
              <p className="font-display text-[10px] text-white/70 leading-relaxed">
                Passionate {profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"} with expertise in
                building intelligent systems and deriving actionable insights from complex datasets.
                Currently pursuing MCA in AI/ML at Chandigarh University.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[8px] text-white/50 mb-1">Education</div>
                <div className="text-[10px] text-white font-semibold">MCA AI/ML</div>
                <div className="text-[8px] text-white/60">Chandigarh University</div>
                <div className="text-[8px] text-white/40">2024 – 2026</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[8px] text-white/50 mb-1">Current Role</div>
                <div className="text-[10px] text-white font-semibold">Software Engineering Intern</div>
                <div className="text-[8px] text-white/60">CSIR-NPL</div>
                <div className="text-[8px] text-white/40">Built secure ID system for 200+ staff</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-display text-xs text-white font-semibold mb-3">Links</h3>
              <div className="space-y-2">
                {[
                  { name: "GitHub", url: "https://github.com/Akkii88", desc: "48 repositories" },
                  { name: "LinkedIn", url: "https://linkedin.com/in/ankitxai", desc: "Professional network" },
                  { name: "Blog", url: "https://ankitxai.blogspot.com", desc: "Technical articles" },
                ].map((link, idx) => (
                  <InBrowserLink
                    key={idx}
                    href={link.url}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
                  >
                    <div>
                      <div className="font-display text-[10px] text-white group-hover:text-[#E8832A] transition-colors">{link.name}</div>
                      <div className="font-display text-[7px] text-white/40">{link.desc}</div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/30 group-hover:text-white/60 transition-colors">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                     </InBrowserLink>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-1">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-[10px] text-white">{skill.name}</span>
                  <span className="font-display text-[8px] text-white/60">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      background: "linear-gradient(90deg, #E8832A, #F59E0B)",
                      boxShadow: "0 0 8px rgba(232, 131, 42, 0.4)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="space-y-0">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        background: "#E8832A",
                        borderColor: "#E8832A",
                        boxShadow: "0 0 8px rgba(232, 131, 42, 0.6)",
                      }}
                    />
                    {idx < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-white/10 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="font-display text-[8px] text-[#E8832A] mb-1">{item.year}</div>
                    <div className="font-display text-[10px] text-white/80">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
