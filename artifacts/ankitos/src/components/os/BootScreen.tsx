import { useEffect, useMemo, useState } from "react";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Loading warm pixels...");
  const [showLogo, setShowLogo] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const messages = [
    "Loading warm pixels...",
    "Booting Ankit...",
    "Initializing portfolio...",
    "Rendering career...",
    "Almost there...",
  ];

  const stars = useMemo(
    () =>
      [...Array(30)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
      })),
    []
  );

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 300);
    let startTime = Date.now();
    const duration = 3500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(percent);

      const msgIndex = Math.min(4, Math.floor(percent / 20));
      setMessage(messages[msgIndex]);

      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 500);
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center font-mono z-50 text-white animate-in fade-in duration-500 overflow-hidden transition-all duration-500 ${isComplete ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
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

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 opacity-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-[#E8832A]"
            style={{
              left: star.left,
              top: star.top,
              animation: star.animation,
            }}
          />
        ))}
      </div>

      <div
        className={`transition-all duration-1000 relative z-10 ${showLogo ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
      >
        <h1 className="text-center font-display text-3xl md:text-4xl text-[#E8832A] tracking-[0.3em] mb-12 drop-shadow-lg">
          ANKITOS
        </h1>
      </div>

      <div className="w-80 h-5 border-2 border-[#E8832A] p-1 rounded-sm relative z-10 shadow-lg shadow-[#E8832A]/30 bg-black/70 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-[#E8832A] via-[#F59E0B] to-[#FB923C] transition-all duration-75 rounded-[1px]"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute -bottom-8 left-0 right-0 text-center font-mono text-xs text-[#8B6F47]">
          {progress}%
        </div>
      </div>

      <p className="mt-16 text-sm text-[#E8832A] uppercase tracking-[0.2em] font-mono relative z-10">
        {message}
      </p>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
