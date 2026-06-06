import { useState } from "react";

export default function RecycleBinWindow({ profile }: { profile: "aiml" | "analyst" }) {
  const [deletedFiles, setDeletedFiles] = useState<
    { name: string; type: string; deleted: string; color: string }[]
  >(
    profile === "aiml"
      ? [
          { name: "bad_model_v47.pkl", type: "model", deleted: "2 days ago", color: "#9C27B0" },
          { name: "my_sleep.txt", type: "data", deleted: "1 week ago", color: "#6B8CBA" },
          { name: "overfit_weights.pth", type: "model", deleted: "3 days ago", color: "#9C27B0" },
          { name: "work_life_balance.exe", type: "app", deleted: "5 days ago", color: "#E8832A" },
          { name: "patience.dll", type: "library", deleted: "2 weeks ago", color: "#FFD700" },
          { name: "training_logs.csv", type: "data", deleted: "4 days ago", color: "#6B8CBA" },
          { name: "gpu_fan_noise.mp3", type: "audio", deleted: "3 weeks ago", color: "#20B2AA" },
          { name: "debug_notes.txt", type: "data", deleted: "6 days ago", color: "#6B8CBA" },
        ]
      : [
          { name: "pivot_FINAL_v12.xlsx", type: "spreadsheet", deleted: "3 days ago", color: "#72A96B" },
          { name: "manual_report_old.pdf", type: "document", deleted: "2 weeks ago", color: "#808080" },
          { name: "coffee_stain.png", type: "image", deleted: "1 month ago", color: "#FF69B4" },
          { name: "client_feedback.txt", type: "data", deleted: "4 days ago", color: "#6B8CBA" },
          { name: "sanity.exe", type: "app", deleted: "5 days ago", color: "#E8832A" },
          { name: "kpi_dashboard_v3.xlsx", type: "spreadsheet", deleted: "1 week ago", color: "#72A96B" },
          { name: "meeting_notes.docx", type: "document", deleted: "2 days ago", color: "#808080" },
          { name: "chart_final_final.png", type: "image", deleted: "6 days ago", color: "#FF69B4" },
        ]
  );

  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const toggleFile = (idx: number) => {
    setSelectedFiles(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const restoreFile = (idx: number) => {
    setDeletedFiles(prev => prev.filter((_, i) => i !== idx));
    setSelectedFiles(prev => prev.filter(i => i !== idx));
  };

  const emptyBin = () => {
    setDeletedFiles([]);
    setSelectedFiles([]);
  };

  const restoreSelected = () => {
    setDeletedFiles(prev => prev.filter((_, i) => !selectedFiles.includes(i)));
    setSelectedFiles([]);
  };

  const getFileIcon = (type: string) => {
    const icons: Record<string, string> = {
      model: "🧠",
      data: "📄",
      app: "⚙️",
      library: "📚",
      spreadsheet: "📊",
      document: "📝",
      image: "🖼️",
      audio: "🎵",
    };
    return icons[type] || "📁";
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 shrink-0 bg-white/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-[9px] text-[#E8832A] tracking-widest mb-1">RECYCLE BIN v2.0</div>
            <h2 className="font-display text-lg text-white">Deleted Files</h2>
          </div>
          <div className="flex gap-2">
            {selectedFiles.length > 0 && (
              <>
                <button
                  onClick={restoreSelected}
                  className="px-3 py-1.5 font-display text-[9px] rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all"
                >
                  Restore ({selectedFiles.length})
                </button>
                <button
                  onClick={() => {
                    setDeletedFiles(prev => prev.filter((_, i) => !selectedFiles.includes(i)));
                    setSelectedFiles([]);
                  }}
                  className="px-3 py-1.5 font-display text-[9px] rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  Delete Permanently
                </button>
              </>
            )}
            {deletedFiles.length > 0 && (
              <button
                onClick={emptyBin}
                className="px-3 py-1.5 font-display text-[9px] rounded-lg bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
              >
                Empty Bin
              </button>
            )}
          </div>
        </div>
        {deletedFiles.length > 0 && (
          <div className="mt-2 font-display text-[8px] text-white/50">
            {deletedFiles.length} item{deletedFiles.length !== 1 ? "s" : ""} • Click to select • Double-click to restore
          </div>
        )}
      </div>

      {/* Files Grid */}
      <div className="flex-1 overflow-y-auto p-4 os-scrollbar">
        {deletedFiles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4 opacity-50">🗑️</div>
            <div className="font-display text-sm text-white/50 mb-1">Recycle Bin is Empty</div>
            <div className="font-display text-[8px] text-white/30">
              Deleted files will appear here
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {deletedFiles.map((file, idx) => {
              const isSelected = selectedFiles.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleFile(idx)}
                  onDoubleClick={() => restoreFile(idx)}
                  className={`group p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-[#E8832A] bg-[#E8832A]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                      style={{
                        background: `${file.color}15`,
                        border: `1px solid ${file.color}30`,
                      }}
                    >
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[10px] text-white font-medium truncate group-hover:text-[#E8832A] transition-colors">
                        {file.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="font-display text-[7px] px-1.5 py-0.5 rounded"
                          style={{
                            background: `${file.color}15`,
                            color: file.color,
                          }}
                        >
                          {file.type}
                        </span>
                        <span className="font-display text-[7px] text-white/40">
                          {file.deleted}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#E8832A] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
