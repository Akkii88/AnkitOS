import { useState, useRef, useCallback, useEffect } from "react";

function isLinkedIn(url: string) {
  return /linkedin\.com/i.test(url);
}

export function shouldOpenInBrowser(url: string) {
  return !isLinkedIn(url);
}

export default function BrowserWindow() {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");
  const [input, setInput] = useState("https://www.google.com");
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const go = useCallback((target: string) => {
    let u = target.trim();
    if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    setUrl(u);
    setInput(u);
    setLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = u;
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ url: string }>;
      if (custom.detail?.url) go(custom.detail.url);
    };
    window.addEventListener("browser-navigate", handler as EventListener);
    return () => window.removeEventListener("browser-navigate", handler as EventListener);
  }, [go]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    go(input);
  };

  const reload = () => {
    if (iframeRef.current && url) {
      setLoading(true);
      iframeRef.current.src = url;
    }
  };

  const goHome = () => go("https://www.google.com/webhp?igu=1");
  const goBack = () => {
    if (iframeRef.current) {
      try { iframeRef.current.contentWindow?.history.back(); } catch {}
    }
  };
  const goForward = () => {
    if (iframeRef.current) {
      try { iframeRef.current.contentWindow?.history.forward(); } catch {}
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Browser Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          background: "rgba(30, 30, 35, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            title="Back"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goForward}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            title="Forward"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button
            onClick={reload}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            title="Reload"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
          </button>
          <button
            onClick={goHome}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            title="Home"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
        </div>

        {/* URL Bar */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3 text-white/40"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search or enter URL..."
              className="w-full pl-8 pr-3 py-1.5 text-[11px] bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 text-[10px] font-semibold text-white bg-[#E8832A] rounded-lg hover:bg-[#d4722a] transition-colors shadow-lg"
          >
            Go
          </button>
        </form>
      </div>

      {/* Loading Bar */}
      {loading && (
        <div
          className="h-0.5 shrink-0"
          style={{
            background: "linear-gradient(90deg, #E8832A, #fbbf24, #E8832A)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}

      {/* Browser Content */}
      <div className="flex-1 bg-white relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-full border-3 border-[#E8832A] border-t-transparent animate-spin"
                style={{ borderWidth: "3px" }}
              />
              <span className="text-[10px] text-[#8B6F47] font-medium">Loading...</span>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
          title="Browser"
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
