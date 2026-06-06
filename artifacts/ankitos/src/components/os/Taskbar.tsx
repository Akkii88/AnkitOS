import { useState, useEffect } from "react";

interface WindowInfo {
  id: string;
  title: string;
  type: string;
}

interface TaskbarProps {
  profile: "aiml" | "analyst";
  onLogout: () => void;
  windows: WindowInfo[];
  onFocusWindow: (id: string) => void;
  onMinimizeAll: () => void;
  music: {
    isPlaying: boolean;
    currentTrack: number | null;
    trackInfo: { title: string; artist: string } | null;
    play: () => void;
    pause: () => void;
    next: () => void;
    prev: () => void;
  };
  onSearch: () => void;
  notifications: Array<{ id: string; text: string; time: string }>;
  onClearNotifications: () => void;
  language: string;
  onToggleLanguage: () => void;
  weather: { temp: string; icon: string; location: string };
  wifi: boolean;
  battery: number;
}

export default function Taskbar({
  profile,
  onLogout,
  windows,
  onFocusWindow,
  onMinimizeAll,
  music,
  onSearch,
  notifications,
  onClearNotifications,
  language,
  onToggleLanguage,
  weather,
  wifi,
  battery,
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [pulse, setPulse] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const p = setInterval(() => setPulse(p => !p), 3000);
    return () => {
      clearInterval(timer);
      clearInterval(p);
    };
  }, []);

  const profileColor = profile === "aiml" ? "#6B8CBA" : "#72A96B";

  const glassBtn =
    "flex items-center justify-center rounded-lg bg-white/10 border border-white/15 backdrop-blur-xl shadow-md shadow-black/5 hover:bg-white/20 hover:border-white/30 active:scale-95 transition-all duration-150";

  const glassPill =
    "flex items-center justify-center rounded-lg bg-white/10 border border-white/15 backdrop-blur-xl shadow-md shadow-black/5 px-2 py-1 hover:bg-white/20 transition-all duration-150";

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50">
      <div
        className="flex items-center h-11 sm:h-12 px-2 sm:px-3 gap-1"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          borderTop: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Left: Profile */}
        <div className="flex items-center gap-1.5">
          <button className={`${glassBtn} w-7 h-7 sm:w-8 sm:h-8`} style={{ transform: pulse ? "scale(1.05)" : "scale(1)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L4 20H8L10 14H14L16 20H20L12 4Z" fill={profileColor} />
            </svg>
          </button>
          <div className={`${glassPill} hidden sm:flex`}>
            <span className="font-display text-[9px] sm:text-[10px] text-white/90 tracking-wide">
              {profile === "aiml" ? "AI/ML Engineer" : "Data Analyst"}
            </span>
          </div>
        </div>

        {/* Center: Time + Date */}
        <div className="flex-1 flex justify-center">
          <div className={`${glassPill} flex flex-row items-center gap-2`}>
            <span className="font-display text-[10px] text-white/90 tabular-nums">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="text-[8px] text-white/40">|</span>
            <span className="font-display text-[8px] text-white/60">
              {time.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Running Apps */}
          <div className="hidden sm:flex items-center gap-1 overflow-x-auto max-w-[35%]">
            {windows.map(w => (
              <button
                key={w.id}
                onClick={() => onFocusWindow(w.id)}
                className={`${glassPill} text-[9px] text-white/80 whitespace-nowrap truncate max-w-[120px] font-display`}
              >
                {w.title}
              </button>
            ))}
          </div>

          {/* Search */}
          <button onClick={onSearch} className={`${glassBtn} w-7 h-7 sm:w-8 sm:h-8`} title="Search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Language */}
          <button onClick={onToggleLanguage} className={`${glassBtn} w-7 h-7 sm:w-8 sm:h-8 font-display text-[9px] text-white font-bold`} title="Toggle Language">
            {language}
          </button>

          {/* Weather */}
          <div className={`${glassPill} hidden md:flex items-center gap-1`}>
            <span className="text-[11px]">{weather.icon}</span>
            <span className="font-display text-[9px] text-white/80">{weather.temp}</span>
          </div>

          {/* System Tray: WiFi */}
          <button className={`${glassBtn} w-7 h-7 hidden lg:flex`} title={wifi ? "WiFi On" : "WiFi Off"}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {wifi ? (
                <>
                  <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
                </>
              ) : (
                <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5.32 11.06A10.94 10.94 0 012 12.55M12 20h.01" />
              )}
            </svg>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setShowNotify(v => !v)} className={`${glassBtn} w-7 h-7 sm:w-8 sm:h-8`} title="Notifications">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E8832A] rounded-full text-[7px] text-white flex items-center justify-center font-bold">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotify && (
              <div className="absolute bottom-10 right-0 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-2 z-50">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-display text-[9px] text-white/70">Notifications</span>
                  <button onClick={onClearNotifications} className="font-display text-[8px] text-[#E8832A] hover:underline">Clear</button>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-2 py-3 text-center text-white/40 text-[10px] font-display">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="px-2 py-1.5 border-b border-white/10 last:border-0">
                        <div className="text-white text-[10px] font-display">{n.text}</div>
                        <div className="text-white/40 text-[8px] font-display">{n.time}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Show Desktop */}
          <button onClick={onMinimizeAll} className={`${glassBtn} w-7 h-7 sm:w-8 sm:h-8`} title="Show Desktop">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="14" rx="2" />
              <path d="M3 14h18" />
            </svg>
          </button>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/ankitxai"
            target="_blank"
            rel="noreferrer"
            className={`${glassBtn} w-7 h-7 sm:w-8 sm:h-8 relative group hidden sm:flex`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
              <rect x="2" y="2" width="20" height="20" rx="3" className="fill-white/90" />
              <path d="M7 19H4V9H7V19ZM5.5 7.6C4.5 7.6 3.8 6.8 3.8 5.8C3.8 4.8 4.5 4 5.5 4C6.5 4 7.2 4.8 7.2 5.8C7.2 6.8 6.5 7.6 5.5 7.6ZM20 19H17V13.8C17 12.5 16.5 11.6 15.3 11.6C14.4 11.6 13.9 12.2 13.7 12.8C13.6 13.1 13.6 13.4 13.6 13.8V19H10.6V9H13.6V10.4C14 9.8 14.8 8.8 16.6 8.8C18.8 8.8 20 10.3 20 13.1V19Z" fill="#0A66C2" />
            </svg>
          </a>

          {/* Switch */}
          <button
            onClick={onLogout}
            className={`${glassBtn} px-2 sm:px-2.5 py-1 sm:py-1.5 gap-1 relative group hidden sm:flex`}
            data-testid="btn-logout"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:rotate-180">
              <path d="M12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C10.12 20 8.4 19.34 7 18.18L3 22L2 21L6 17C4.66 15.6 4 13.88 4 12C4 7.58 7.58 4 12 4ZM12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6ZM12 8V14M8 11H16" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] sm:text-[10px] text-white/90 font-medium">Switch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
