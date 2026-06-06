import { useMemo } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

type Profile = "aiml" | "analyst";

type ResumeData = {
  name: string;
  role: string;
  accent: string;
  accentSoft: string;
  accentDeep: string;
};

const RESUME_DATA: Record<Profile, ResumeData> = {
  aiml: {
    name: "Ankit",
    role: "AI/ML Engineer",
    accent: "#9C27B0",
    accentSoft: "#F4E8FA",
    accentDeep: "#5B1A86",
  },
  analyst: {
    name: "Ankit",
    role: "Data Analyst",
    accent: "#72A96B",
    accentSoft: "#EAF7E6",
    accentDeep: "#2E5D31",
  },
};

export default function ResumeWindow({ profile }: { profile: Profile }) {
  const data = RESUME_DATA[profile];
  const resumeUrl = profile === "aiml" ? "/resumes/aiml.pdf" : "/resumes/analyst.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = `Ankit_${profile === "aiml" ? "Resume_AIML" : "Data_Analyst_Resume"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#FFFDF7] text-[#3D2B1F] h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-4 border-[#3D2B1F] shrink-0"
        style={{
          background:
            profile === "aiml"
              ? "linear-gradient(90deg, #1565C0, #0D47A1)"
              : "linear-gradient(90deg, #E8832A, #D4700F)",
        }}
      >
        <div>
          <div className="font-display text-[9px] text-white/70 tracking-widest">RESUME</div>
          <div className="font-display text-[11px] text-white font-semibold mt-0.5">
            {data.role}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 border-2 border-white bg-white/10 backdrop-blur-sm text-white font-display text-[9px] hover:bg-white/20 transition-colors"
          >
            Download PDF
          </button>
          <InBrowserLink
            href="https://github.com/Akkii88"
            className="px-3 py-1.5 border-2 border-white bg-white/10 backdrop-blur-sm text-white font-display text-[9px] hover:bg-white/20 transition-colors"
          >
            GitHub →
          </InBrowserLink>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-[#2a2a2a] p-3">
        <div className="w-full h-full rounded-lg overflow-hidden border-4 border-[#3D2B1F] shadow-[4px_4px_0px_#C4A882]">
          <iframe
            src={resumeUrl}
            className="w-full h-full"
            title={`${data.role} Resume`}
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>
    </div>
  );
}
