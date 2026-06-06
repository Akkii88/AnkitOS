import { useEffect, useState } from "react";

const AIML_CATS = [
  {
    name: "Core Languages",
    color: "#E8832A",
    skills: [
      { name: "Python", pct: 90 },
      { name: "SQL", pct: 82 },
      { name: "Bash", pct: 72 },
    ],
  },
  {
    name: "ML & Deep Learning",
    color: "#7C3AED",
    skills: [
      { name: "PyTorch", pct: 80 },
      { name: "Scikit-Learn", pct: 88 },
      { name: "HuggingFace", pct: 82 },
      { name: "OpenCV", pct: 70 },
    ],
  },
  {
    name: "LLMs & AI Systems",
    color: "#1565C0",
    skills: [
      { name: "LangChain", pct: 72 },
      { name: "RAG Systems", pct: 80 },
      { name: "Prompt Eng", pct: 85 },
    ],
  },
  {
    name: "Web & DevOps",
    color: "#059669",
    skills: [
      { name: "FastAPI", pct: 85 },
      { name: "Docker", pct: 78 },
      { name: "React", pct: 78 },
      { name: "Next.js", pct: 70 },
    ],
  },
];

const ANALYST_CATS = [
  {
    name: "Query & Data",
    color: "#E8832A",
    skills: [
      { name: "SQL", pct: 92 },
      { name: "Python/Pandas", pct: 88 },
      { name: "Data Cleaning", pct: 90 },
    ],
  },
  {
    name: "Visualisation",
    color: "#2563EB",
    skills: [
      { name: "Power BI", pct: 85 },
      { name: "Tableau", pct: 80 },
      { name: "Excel", pct: 82 },
    ],
  },
  {
    name: "Analytics",
    color: "#7C3AED",
    skills: [
      { name: "EDA", pct: 90 },
      { name: "RFM Analysis", pct: 80 },
      { name: "KPI Reporting", pct: 85 },
    ],
  },
  {
    name: "Soft Skills",
    color: "#059669",
    skills: [
      { name: "Communication", pct: 85 },
      { name: "Stakeholder Mgmt", pct: 80 },
    ],
  },
];

const BLOCKS = 20;

function levelLabel(pct: number) {
  if (pct >= 88) return { label: "MASTER", color: "#FFD700" };
  if (pct >= 78) return { label: "PRO", color: "#E8832A" };
  return { label: "NOVICE", color: "#6B8CBA" };
}

function PixelBar({
  pct,
  color,
  delay,
}: {
  pct: number;
  color: string;
  delay: number;
}) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const t = setTimeout(
      () => setFilled(Math.round((pct / 100) * BLOCKS)),
      delay,
    );
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: BLOCKS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            background: i < filled ? color : "#E8D5B0",
            borderRadius: 1,
            transition: `background 0.05s ease`,
            transitionDelay: `${i * 25 + delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function SkillsWindow({
  profile,
}: {
  profile: "aiml" | "analyst";
}) {
  const cats = profile === "aiml" ? AIML_CATS : ANALYST_CATS;
  const allSkills = cats.flatMap((c) => c.skills);
  const avg = Math.round(
    allSkills.reduce((a, s) => a + s.pct, 0) / allSkills.length,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const _ = mounted;

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
            SKILL MATRIX
          </div>
          <div className="font-display text-[11px] text-white font-semibold">
            {profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"}
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[8px] text-white/70">AVG</div>
          <div className="font-display text-2xl text-white leading-none">
            {avg}
            <span className="text-sm">%</span>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 gap-2">
          {cats.map((cat, ci) => (
            <div
              key={ci}
              className="border-2 border-[#E8D5B0] bg-white rounded-lg overflow-hidden"
            >
              {/* Category Header */}
              <div
                className="flex items-center gap-2 px-3 py-1.5"
                style={{ background: cat.color }}
              >
                <span className="font-display text-[8px] text-white tracking-wide font-medium">
                  {cat.name}
                </span>
              </div>

              {/* Skills */}
              <div className="divide-y divide-[#E8D5B0]">
                {cat.skills.map((s, si) => {
                  const lv = levelLabel(s.pct);
                  const delay = ci * 150 + si * 100 + 80;
                  return (
                    <div key={si} className="px-3 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-[9px] text-[#3D2B1F]">
                          {s.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-display text-[7px] px-1.5 py-0.5 rounded-sm"
                            style={{
                              background: lv.color + "22",
                              color: lv.color,
                              border: `1px solid ${lv.color}44`,
                            }}
                          >
                            {lv.label}
                          </span>
                          <span
                            className="font-display text-[10px] font-bold"
                            style={{ color: cat.color }}
                          >
                            {s.pct}%
                          </span>
                        </div>
                      </div>
                      <PixelBar pct={s.pct} color={cat.color} delay={delay} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-2.5 px-3 py-2 border-2 border-[#E8D5B0] bg-[#FFF8EE] rounded-lg">
          <div className="font-display text-[7px] text-[#8B6F47] mb-1.5 tracking-wider">
            LEGEND
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "★★★ MASTER", color: "#FFD700" },
              { label: "★★☆ PRO", color: "#E8832A" },
              { label: "★☆☆ NOVICE", color: "#6B8CBA" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: l.color }}
                />
                <span
                  className="font-display text-[7px]"
                  style={{ color: l.color }}
                >
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
