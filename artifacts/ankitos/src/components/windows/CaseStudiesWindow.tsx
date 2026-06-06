import { useState } from "react";

interface CaseStudiesWindowProps {
  profile: "aiml" | "analyst";
}

const aiCaseStudies = [
  {
    title: "Customer Churn Prediction",
    challenge: "Identify at-risk customers before they leave",
    solution: "Built XGBoost model with 94% precision using behavioral data and transaction patterns",
    impact: "Reduced churn by 35%, saved $2.3M annually",
    tech: ["Python", "XGBoost", "MLflow", "Docker"],
    duration: "3 months",
    color: "#E8832A",
  },
  {
    title: "Recommendation Engine",
    challenge: "Personalize user experience across product catalog",
    solution: "Hybrid collaborative filtering with deep learning embeddings, deployed via Flask API",
    impact: "Increased engagement by 28%, CTR up 42%",
    tech: ["PyTorch", "Redis", "FastAPI", "Kubernetes"],
    duration: "4 months",
    color: "#6B8CBA",
  },
  {
    title: "NLP Sentiment Analysis",
    challenge: "Multi-domain sentiment classification at scale",
    solution: "Fine-tuned BERT with custom preprocessing pipeline, achieved SOTA on benchmark",
    impact: "94% accuracy, processing 100k reviews/day",
    tech: ["Transformers", "BERT", "LangChain", "Airflow"],
    duration: "2 months",
    color: "#8B5CF6",
  },
];

const analystCaseStudies = [
  {
    title: "Sales Performance Dashboard",
    challenge: "Automate weekly sales reporting for 200+ stakeholders",
    solution: "Built Tableau dashboard with automated ETL pipeline in Python, real-time KPIs",
    impact: "Reduced reporting time by 70%, 15% faster decisions",
    tech: ["SQL", "Tableau", "Python", "AWS"],
    duration: "2 months",
    color: "#6B8CBA",
  },
  {
    title: "Customer Segmentation",
    challenge: "Improve marketing campaign targeting",
    solution: "RFM analysis + K-means clustering, identified 5 actionable segments",
    impact: "Identified 5 new segments, 22% lift in conversion",
    tech: ["Python", "Pandas", "Scikit-learn", "BigQuery"],
    duration: "3 months",
    color: "#22C55E",
  },
  {
    title: "Forecasting Model",
    challenge: "Inventory optimization with 95% accuracy target",
    solution: "Hybrid ARIMA-Prophet model with ensemble weighting, automated retraining",
    impact: "Improved forecast accuracy by 42%, reduced waste by 18%",
    tech: ["Prophet", "ARIMA", "Python", "GCP"],
    duration: "3 months",
    color: "#F59E0B",
  },
];

export default function CaseStudiesWindow({ profile }: CaseStudiesWindowProps) {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const studies = profile === "aiml" ? aiCaseStudies : analystCaseStudies;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 shrink-0 bg-white/5">
        <div className="font-display text-[9px] text-[#E8832A] tracking-widest mb-1">CASE STUDIES</div>
        <h2 className="font-display text-lg text-white">Real-World Impact</h2>
      </div>

      {/* Studies List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 os-scrollbar">
        {studies.map((study, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedStudy(selectedStudy === study.title ? null : study.title)}
            className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
              selectedStudy === study.title
                ? "border-white/30 bg-white/10"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
            }`}
            style={{
              boxShadow: selectedStudy === study.title
                ? `0 8px 32px ${study.color}30`
                : "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Compact row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: study.color,
                      boxShadow: `0 0 8px ${study.color}60`,
                    }}
                  />
                  <h3 className="font-display text-xs text-white font-semibold">{study.title}</h3>
                </div>
                <p className="font-display text-[8px] text-white/60 leading-relaxed line-clamp-1">
                  {study.challenge}
                </p>
              </div>
              <span
                className="font-display text-[7px] px-2 py-1 rounded-full shrink-0"
                style={{
                  background: `${study.color}20`,
                  color: study.color,
                  border: `1px solid ${study.color}40`,
                }}
              >
                {study.duration}
              </span>
            </div>

            {/* Expanded details */}
            {selectedStudy === study.title && (
              <div className="mt-4 space-y-3 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div>
                    <span className="font-display text-[8px] text-[#E8832A] uppercase tracking-wider">Challenge</span>
                    <p className="font-display text-[10px] text-white/80 mt-1">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="font-display text-[8px] text-[#6B8CBA] uppercase tracking-wider">Solution</span>
                    <p className="font-display text-[10px] text-white/80 mt-1">{study.solution}</p>
                  </div>
                  <div>
                    <span className="font-display text-[8px] text-[#22C55E] uppercase tracking-wider">Impact</span>
                    <p className="font-display text-[10px] text-white font-semibold mt-1">{study.impact}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {study.tech.map((t, i) => (
                    <span
                      key={i}
                      className="font-display text-[7px] px-2 py-1 rounded-md bg-white/10 text-white/70 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
