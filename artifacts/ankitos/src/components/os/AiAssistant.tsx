import { useState, useEffect, useRef } from "react";

interface AiAssistantProps {
  profile: "aiml" | "analyst" | null;
}

export default function AiAssistant({ profile }: AiAssistantProps) {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (profile !== "aiml") return;
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [profile]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (profile !== "aiml") return null;

  return (
    <div
      className="fixed z-[200] overflow-hidden"
      style={{
        width: "130px",
        height: "223px",
        borderRadius: "18px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.96)",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        right: "16px",
        top: "16px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        preload="auto"
        className="w-full h-full"
        style={{
          objectFit: "cover",
          borderRadius: "18px",
          display: "block",
        }}
        onLoadedData={() => {
          console.log("Video loaded");
        }}
        onError={(e) => console.error("Video error:", e)}
      >
        <source src="/ai-avatar.mp4" type="video/mp4" />
      </video>

      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
        style={{ background: "rgba(0,0,0,0.15)" }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "32px",
            height: "32px",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            {isPlaying ? (
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </div>
      </button>
    </div>
  );
}