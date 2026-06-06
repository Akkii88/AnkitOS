import { useEffect, useRef, useState } from "react";

interface LoginScreenProps {
  onSelectProfile: (profile: "aiml" | "analyst") => void;
  visible: boolean;
}

function NeuralNetworkIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nodeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8832A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="20" r="5" fill="url(#nodeGrad2)" />
      <circle cx="24" cy="36" r="5" fill="url(#nodeGrad2)" />
      <circle cx="56" cy="36" r="5" fill="url(#nodeGrad2)" />
      <circle cx="32" cy="56" r="5" fill="url(#nodeGrad2)" />
      <circle cx="48" cy="56" r="5" fill="url(#nodeGrad2)" />
      <circle cx="40" cy="40" r="6" fill="url(#nodeGrad2)" />
      <line x1="40" y1="25" x2="40" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="29" y1="36" x2="35" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="51" y1="36" x2="45" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="34" y1="51" x2="38" y2="46" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="46" y1="51" x2="42" y2="46" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="40" cy="20" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="24" cy="36" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="56" cy="36" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="32" cy="56" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="48" cy="56" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="40" cy="40" r="2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B8CBA" />
          <stop offset="100%" stopColor="#8BA8C9" />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="24" rx="22" ry="10" fill="none" stroke="url(#dbGrad2)" strokeWidth="2.5" />
      <path d="M18 24 L18 56 C18 63 28 66 40 66 C52 66 62 63 62 56 L62 24" fill="none" stroke="url(#dbGrad2)" strokeWidth="2.5" />
      <ellipse cx="40" cy="56" rx="22" ry="10" fill="none" stroke="url(#dbGrad2)" strokeWidth="2.5" />
      <ellipse cx="40" cy="40" rx="22" ry="10" fill="none" stroke="url(#dbGrad2)" strokeWidth="2" opacity="0.7" />
      <rect x="36" y="30" width="8" height="16" rx="1" fill="url(#dbGrad2)" opacity="0.8" />
      <circle cx="40" cy="34" r="1.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="40" cy="42" r="1.5" fill="#FFFFFF" opacity="0.9" />
      <line x1="40" y1="35.5" x2="40" y2="40.5" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export default function LoginScreen({ onSelectProfile, visible }: LoginScreenProps & { visible: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPixels, setShowPixels] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<"aiml" | "analyst" | null>(null);
  const [pixels, setPixels] = useState<Array<{x: number, y: number, tx: number, ty: number, delay: number}>>([]);

  const aimlQuotes = [
    "Building intelligence, one neuron at a time",
    "Transforming data into decisions",
    "AI that learns, adapts, and inspires",
    "Where algorithms meet creativity",
  ];

  const analystQuotes = [
    "Data tells stories worth listening to",
    "Patterns hidden, insights revealed",
    "Numbers don't lie, visualizations speak",
    "From raw data to actionable insights",
  ];

  const [aimlQuoteIndex, setAiMlQuoteIndex] = useState(0);
  const [analystQuoteIndex, setAnalystQuoteIndex] = useState(0);
  const [aimlFade, setAimlFade] = useState("in");
  const [analystFade, setAnalystFade] = useState("in");

  useEffect(() => {
    const aimlTimer = setInterval(
      () => setAiMlQuoteIndex((i) => (i + 1) % aimlQuotes.length),
      30000,
    );
    const analystTimer = setInterval(
      () => setAnalystQuoteIndex((i) => (i + 1) % analystQuotes.length),
      30000,
    );
    return () => {
      clearInterval(aimlTimer);
      clearInterval(analystTimer);
    };
  }, []);

  useEffect(() => {
    setAimlFade("out");
    const t = setTimeout(() => {
      setAimlFade("in");
    }, 400);
    return () => clearTimeout(t);
  }, [aimlQuoteIndex]);

  useEffect(() => {
    setAnalystFade("out");
    const t = setTimeout(() => {
      setAnalystFade("in");
    }, 400);
    return () => clearTimeout(t);
  }, [analystQuoteIndex]);

  const handleProfileSelect = (profile: "aiml" | "analyst") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newPixels = Array.from({ length: 120 }, (_, i) => {
      const row = Math.floor(i / 15);
      const col = i % 15;
      return {
        x: col * 70,
        y: row * 70,
        tx: (Math.random() - 0.5) * 800,
        ty: (Math.random() - 0.5) * 800,
        delay: (row + col) * 8,
      };
    });
    setPixels(newPixels);
    setShowPixels(true);

    setTimeout(() => {
      onSelectProfile(profile);
      setShowPixels(false);
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div
      className={`absolute inset-0 z-40 overflow-hidden transition-opacity duration-700`}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/wallpaper.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12 md:mb-14">
          <h1
            className="font-display text-4xl md:text-5xl leading-tight mb-2"
            style={{
              color: "#FFFFFF",
              letterSpacing: "4px",
              fontWeight: "300",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            Ankit<span style={{ color: "#E8832A", fontWeight: "500" }}>OS</span>
          </h1>
          <div
            className="font-display text-[8px] md:text-[9px] mb-1.5 tracking-[0.25em] uppercase"
            style={{
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            AI Career Operating System
          </div>
          <div
            className="font-display text-[7px] md:text-[8px] tracking-widest"
            style={{
              color: "rgba(232, 213, 176, 0.75)",
            }}
          >
            Select Your Path
          </div>
        </div>

        <div
          className={`flex flex-row gap-5 md:gap-6 lg:gap-8 transition-all duration-300 ${showPixels ? "opacity-0 scale-95" : ""}`}
        >
          <button
            onClick={() => handleProfileSelect("aiml")}
            onMouseEnter={() => setHoveredCard("aiml")}
            onMouseLeave={() => setHoveredCard(null)}
            data-testid="profile-aiml"
            disabled={isAnimating}
            className="group relative transition-all duration-300"
            style={{
              width: "220px",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              borderRadius: "18px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: hoveredCard === "aiml"
                ? "0 8px 32px rgba(232, 131, 42, 0.2), 0 0 0 1px rgba(232, 131, 42, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                : "0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
              transform: hoveredCard === "aiml" ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
            }}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    background: "rgba(232, 131, 42, 0.12)",
                    borderRadius: "14px",
                    border: "1px solid rgba(232, 131, 42, 0.25)",
                    boxShadow: "0 4px 12px rgba(232, 131, 42, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <NeuralNetworkIcon />
                </div>
              </div>
              <div className="mb-2 pb-2" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <h2
                  className="font-display text-sm text-center tracking-widest"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 1px 8px rgba(0,0,0,0.3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  AI / ML ENGINEER
                </h2>
              </div>
              <div
                className="font-display text-[6px] text-center mb-2.5 tracking-wider"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Level 99 • Specialist
              </div>
              <div
                className={`font-display text-[6px] text-center mb-4 h-10 flex items-center justify-center px-3 leading-relaxed transition-opacity duration-400 ${aimlFade === "in" ? "opacity-75" : "opacity-0"}`}
                style={{
                  color: "rgba(232, 213, 176, 0.85)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{aimlQuotes[aimlQuoteIndex]}&rdquo;
              </div>
              <div
                className="w-full py-2 text-center font-display text-[6px] flex items-center justify-center gap-1.5 tracking-widest rounded-full transition-all duration-300"
                style={{
                  color: "rgba(232, 131, 42, 0.9)",
                  background: "rgba(232, 131, 42, 0.08)",
                  border: "1px solid rgba(232, 131, 42, 0.25)",
                }}
              >
                ▶ ENTER
              </div>
            </div>
          </button>

          <button
            onClick={() => handleProfileSelect("analyst")}
            onMouseEnter={() => setHoveredCard("analyst")}
            onMouseLeave={() => setHoveredCard(null)}
            data-testid="profile-analyst"
            disabled={isAnimating}
            className="group relative transition-all duration-300"
            style={{
              width: "220px",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              borderRadius: "18px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: hoveredCard === "analyst"
                ? "0 8px 32px rgba(107, 140, 186, 0.2), 0 0 0 1px rgba(107, 140, 186, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                : "0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
              transform: hoveredCard === "analyst" ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
            }}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    background: "rgba(107, 140, 186, 0.12)",
                    borderRadius: "14px",
                    border: "1px solid rgba(107, 140, 186, 0.25)",
                    boxShadow: "0 4px 12px rgba(107, 140, 186, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <DatabaseIcon />
                </div>
              </div>
              <div className="mb-2 pb-2" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <h2
                  className="font-display text-sm text-center tracking-widest"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 1px 8px rgba(0,0,0,0.3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  DATA ANALYST
                </h2>
              </div>
              <div
                className="font-display text-[6px] text-center mb-2.5 tracking-wider"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Level 92 • Specialist
              </div>
              <div
                className={`font-display text-[6px] text-center mb-4 h-10 flex items-center justify-center px-3 leading-relaxed transition-opacity duration-400 ${analystFade === "in" ? "opacity-75" : "opacity-0"}`}
                style={{
                  color: "rgba(232, 213, 176, 0.85)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{analystQuotes[analystQuoteIndex]}&rdquo;
              </div>
              <div
                className="w-full py-2 text-center font-display text-[6px] flex items-center justify-center gap-1.5 tracking-widest rounded-full transition-all duration-300"
                style={{
                  color: "rgba(107, 140, 186, 0.9)",
                  background: "rgba(107, 140, 186, 0.08)",
                  border: "1px solid rgba(107, 140, 186, 0.25)",
                }}
              >
                ▶ ENTER
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
