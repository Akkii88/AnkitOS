import { useState, useEffect, useRef } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  action: () => void;
}

const ALL_ITEMS: SearchResult[] = [
  { id: "projects", title: "AI/ML Projects", type: "Projects", action: () => {} },
  { id: "skills", title: "Skills Matrix", type: "Skills", action: () => {} },
  { id: "terminal", title: "Terminal", type: "App", action: () => {} },
  { id: "certs", title: "Certifications", type: "Certifications", action: () => {} },
  { id: "resume", title: "Resume", type: "Resume", action: () => {} },
  { id: "research", title: "Research Papers", type: "Research", action: () => {} },
  { id: "contact", title: "Contact", type: "Contact", action: () => {} },
  { id: "github", title: "GitHub Activity", type: "GitHub", action: () => {} },
  { id: "blog", title: "Technical Blog", type: "Blog", action: () => {} },
  { id: "dashboard", title: "Analytics Dashboard", type: "Dashboard", action: () => {} },
  { id: "cases", title: "Case Studies", type: "Cases", action: () => {} },
  { id: "browser", title: "Web Browser", type: "Browser", action: () => {} },
];

export default function SearchOverlay({ onClose, onOpen }: { onClose: () => void; onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = query.trim()
    ? ALL_ITEMS.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="w-full max-w-lg bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search apps, files, docs…"
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none font-display"
          />
          <kbd className="text-[9px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-center text-white/40 text-xs font-display">No results found</div>
          ) : (
            filtered.map(item => (
              <button
                key={item.id}
                onClick={() => { onOpen(item.id); onClose(); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <div>
                  <div className="text-white text-sm font-display">{item.title}</div>
                  <div className="text-white/40 text-[10px] font-display">{item.type}</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
