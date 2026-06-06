import { useState } from "react";

interface AnalyticsDashboardWindowProps {
  profile: "aiml" | "analyst";
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-display text-[8px] text-white/70 w-16 truncate">{name}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
      <span className="font-display text-[7px] text-white/90 w-8 text-right">{level}%</span>
    </div>
  );
}

function MetricCard({ label, value, color, subtitle }: { label: string; value: string; color: string; subtitle?: string }) {
  return (
    <div
      className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
      style={{
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="text-center">
        <div
          className="font-display text-2xl font-bold mb-1"
          style={{
            color,
            textShadow: `0 0 20px ${color}40`,
          }}
        >
          {value}
        </div>
        <div className="font-display text-[8px] text-white/60 uppercase tracking-wider">{label}</div>
        {subtitle && <div className="font-display text-[7px] text-white/40 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}

function TimelineItem({ year, event, color }: { year: string; event: string; color: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{
            background: color,
            borderColor: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
        <div className="w-0.5 h-full bg-white/10 mt-1" />
      </div>
      <div className="flex-1 pb-4">
        <div className="font-display text-[8px] mb-1" style={{ color }}>{year}</div>
        <div className="font-display text-[10px] text-white/80 group-hover:text-white transition-colors">{event}</div>
      </div>
    </div>
  );
}

export default function AnalyticsDashboardWindow({ profile }: AnalyticsDashboardWindowProps) {
  const [activeView, setActiveView] = useState<"skills" | "progress" | "insights">("skills");

  const aimlSkills = [
    { name: "Python", level: 95, color: "#E8832A" },
    { name: "TensorFlow", level: 90, color: "#FF6B6B" },
    { name: "PyTorch", level: 88, color: "#F59E0B" },
    { name: "NLP", level: 85, color: "#8B5CF6" },
    { name: "Computer Vision", level: 82, color: "#06B6D4" },
    { name: "SQL", level: 88, color: "#4ADE80" },
  ];

  const analystSkills = [
    { name: "Python", level: 88, color: "#E8832A" },
    { name: "SQL", level: 95, color: "#6B8CBA" },
    { name: "Excel", level: 96, color: "#22C55E" },
    { name: "Tableau", level: 90, color: "#FF6B6B" },
    { name: "Power BI", level: 87, color: "#C084FC" },
    { name: "Statistics", level: 91, color: "#06B6D4" },
  ];

  const aimlTimeline = [
    { year: "2020", event: "Started ML journey with Python", color: "#E8832A" },
    { year: "2021", event: "First AI project deployed to production", color: "#FF6B6B" },
    { year: "2022", event: "Specialized in Deep Learning & NLP", color: "#F59E0B" },
    { year: "2023", event: "LLM research & fine-tuning work", color: "#8B5CF6" },
    { year: "2024", event: "Built AnkitOS portfolio system", color: "#06B6D4" },
  ];

  const analystTimeline = [
    { year: "2019", event: "Started data analytics career", color: "#6B8CBA" },
    { year: "2020", event: "SQL expert certified", color: "#E8832A" },
    { year: "2021", event: "Led visualization dashboard team", color: "#22C55E" },
    { year: "2023", event: "Predictive modeling specialist", color: "#8B5CF6" },
    { year: "2024", event: "Cloud analytics & Big Data", color: "#06B6D4" },
  ];

  const aimlMetrics = [
    { label: "Models Built", value: "24", color: "#E8832A", subtitle: "Production ready" },
    { label: "Accuracy", value: "94%", color: "#22C55E", subtitle: "Average model" },
    { label: "Papers Read", value: "156", color: "#8B5CF6", subtitle: "Research papers" },
    { label: "Deployments", value: "12", color: "#06B6D4", subtitle: "Live systems" },
  ];

  const analystMetrics = [
    { label: "Reports Built", value: "89", color: "#6B8CBA", subtitle: "Automated" },
    { label: "Dashboards", value: "32", color: "#E8832A", subtitle: "Interactive" },
    { label: "Insights", value: "142", color: "#22C55E", subtitle: "Actionable" },
    { label: "Accuracy", value: "96%", color: "#8B5CF6", subtitle: "Forecast model" },
  ];

  const skills = profile === "aiml" ? aimlSkills : analystSkills;
  const timeline = profile === "aiml" ? aimlTimeline : analystTimeline;
  const metrics = profile === "aiml" ? aimlMetrics : analystMetrics;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 shrink-0 bg-white/5">
        <div className="font-display text-[9px] text-[#E8832A] tracking-widest mb-2">ANALYTICS DASHBOARD</div>
        <div className="flex gap-2">
          {(["skills", "progress", "insights"] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 py-1.5 font-display text-[9px] rounded-lg border transition-all duration-200 ${
                activeView === view
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {view.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 os-scrollbar">
        {activeView === "skills" && (
          <div className="space-y-1">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <SkillBar name={skill.name} level={skill.level} color={skill.color} />
              </div>
            ))}
          </div>
        )}

        {activeView === "progress" && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="font-display text-[10px] text-white/70 mb-4 uppercase tracking-wider">Career Timeline</div>
            <div className="space-y-0">
              {timeline.map((item, idx) => (
                <TimelineItem key={idx} {...item} />
              ))}
            </div>
          </div>
        )}

        {activeView === "insights" && (
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m, idx) => (
              <MetricCard key={idx} {...m} />
            ))}
            {/* Additional insight cards */}
            <div className="col-span-2 p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="font-display text-[10px] text-white/70 mb-3 uppercase tracking-wider">Profile Overview</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[8px] text-white/50 mb-1">Current Role</div>
                  <div className="text-xs text-white font-semibold">{profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"}</div>
                </div>
                <div>
                  <div className="text-[8px] text-white/50 mb-1">Experience</div>
                  <div className="text-xs text-white font-semibold">2+ Years</div>
                </div>
                <div>
                  <div className="text-[8px] text-white/50 mb-1">Projects</div>
                  <div className="text-xs text-white font-semibold">{profile === "aiml" ? "24 ML Projects" : "18 Analytics Projects"}</div>
                </div>
                <div>
                  <div className="text-[8px] text-white/50 mb-1">Certifications</div>
                  <div className="text-xs text-white font-semibold">8 Verified</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
