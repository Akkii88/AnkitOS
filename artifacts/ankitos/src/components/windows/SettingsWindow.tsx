import { useState } from "react";

interface SettingsWindowProps {
  profile: "aiml" | "analyst";
  onLogout: () => void;
}

export default function SettingsWindow({ profile, onLogout }: SettingsWindowProps) {
  const [displayMode, setDisplayMode] = useState<"fullscreen" | "windowed">("fullscreen");
  const [wallpaperOpacity, setWallpaperOpacity] = useState(65);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showTaskbar, setShowTaskbar] = useState(true);

  return (
    <div className="p-6 h-full overflow-auto">
      <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
        Settings
      </h2>

      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Display
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>
                Display Mode
              </label>
              <select
                value={displayMode}
                onChange={(e) => setDisplayMode(e.target.value as "fullscreen" | "windowed")}
                className="bg-white/10 border border-white/20 rounded px-3 py-1.5 text-xs text-white"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <option value="fullscreen">Fullscreen</option>
                <option value="windowed">Windowed</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>
                Wallpaper Opacity
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wallpaperOpacity}
                  onChange={(e) => setWallpaperOpacity(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-xs text-white/90 w-8">{wallpaperOpacity}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>
                Animations
              </label>
              <button
                onClick={() => setAnimationsEnabled(!animationsEnabled)}
                className={`px-3 py-1 rounded text-xs ${animationsEnabled ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {animationsEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Interface
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>
                Taskbar
              </label>
              <button
                onClick={() => setShowTaskbar(!showTaskbar)}
                className={`px-3 py-1 rounded text-xs ${showTaskbar ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {showTaskbar ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Session
          </h3>
          <div className="space-y-2">
            <div className="text-xs text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>
              Profile: <span className="text-white capitalize">{profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"}</span>
            </div>
            <button
              onClick={onLogout}
              className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded text-xs transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
