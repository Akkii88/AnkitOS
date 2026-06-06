import { useState } from "react";

interface PersonalizeWindowProps {
  profile: "aiml" | "analyst";
  onLogout: () => void;
}

export default function PersonalizeWindow({ profile, onLogout }: PersonalizeWindowProps) {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState(profile === "aiml" ? "#E8832A" : "#6B8CBA");
  const [fontSize, setFontSize] = useState("medium");
  const [cursorStyle, setCursorStyle] = useState("default");

  const themes = [
    { id: "dark", label: "Dark", color: "#1a1a1a" },
    { id: "light", label: "Light", color: "#f5f5f5" },
    { id: "midnight", label: "Midnight", color: "#0f172a" },
    { id: "forest", label: "Forest", color: "#14532d" },
    { id: "sunset", label: "Sunset", color: "#7c2d12" },
  ];

  const accentColors = [
    { id: "orange", value: "#E8832A", label: "Orange" },
    { id: "blue", value: "#6B8CBA", label: "Blue" },
    { id: "green", value: "#4ade80", label: "Green" },
    { id: "purple", value: "#a855f7", label: "Purple" },
    { id: "red", value: "#ef4444", label: "Red" },
  ];

  return (
    <div className="p-6 h-full overflow-auto">
      <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
        Personalize
      </h2>

      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Theme
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTheme === theme.id ? "border-white/60 scale-105" : "border-white/20 hover:border-white/40"
                }`}
                style={{ backgroundColor: theme.color }}
              >
                <span className="text-xs font-medium" style={{ 
                  fontFamily: "system-ui, sans-serif",
                  color: theme.id === "light" ? "#1a1a1a" : "#ffffff"
                }}>
                  {theme.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Accent Color
          </h3>
          <div className="flex gap-2">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setAccentColor(color.value)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  accentColor === color.value ? "border-white scale-110" : "border-white/20 hover:border-white/40"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Font Size
          </h3>
          <div className="flex gap-2">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  fontSize === size ? "border-white/60 bg-white/10" : "border-white/20 hover:border-white/40"
                }`}
              >
                <span className="text-xs capitalize" style={{ fontFamily: "system-ui, sans-serif" }}>{size}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Cursor Style
          </h3>
          <div className="flex gap-2">
            {["default", "large", "inverted"].map((style) => (
              <button
                key={style}
                onClick={() => setCursorStyle(style)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  cursorStyle === style ? "border-white/60 bg-white/10" : "border-white/20 hover:border-white/40"
                }`}
              >
                <span className="text-xs capitalize" style={{ fontFamily: "system-ui, sans-serif" }}>{style}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white/90 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Active Profile
          </h3>
          <div className="text-xs text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>
            Current: <span className="text-white capitalize">{profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"}</span>
          </div>
          <button
            onClick={onLogout}
            className="mt-3 w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded text-xs transition-colors"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
