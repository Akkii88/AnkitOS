import { useEffect, useState } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

const BLOG_POSTS = [
  {
    title: "Who Am I? And Why This Blog? (My AI/ML Journey)",
    date: "May 26, 2026",
    readingTime: "3 min",
    tags: ["AI/ML", "Fresher", "Personal"],
    excerpt: "Let me be honest with you from the very first line. I'm Ankit, an AI/ML fresher from Gurugram. I just finished my MCA in AI/ML from Chandigarh University, and right now I'm doing what most freshers in tech are doing applying for jobs, building projects, and trying to figure out what comes next.",
    link: "https://ankitxai.blogspot.com/2026/05/who-am-i-and-why-this-blog-my-aiml.html"
  },
  {
    title: "Why I Got Into AI/ML — The Real Reason",
    date: "May 27, 2026",
    readingTime: "4 min",
    tags: ["AI/ML Career", "LLMs", "NLP"],
    excerpt: "If you ask most people in AI why they chose the field, you get some version of passion. That's a LinkedIn answer. That's not a real answer. I started with Python tutorials I barely understood. The moment I built something small and it worked that's what hooked me.",
    link: "https://ankitxai.blogspot.com/2026/05/why-i-got-into-aiml-real-reason.html"
  },
  {
    title: "How It Actually Began — MCA AI/ML at Chandigarh University",
    date: "May 26, 2026",
    readingTime: "5 min",
    tags: ["MCA", "Education", "Projects"],
    excerpt: "Two years. An MCA in AI/ML from Chandigarh University. Dozens of projects. Countless late nights. Let me tell you what the curriculum said I'd learn — and what I actually ended up learning. The gap between trained models and working systems is enormous.",
    link: "https://ankitxai.blogspot.com/2026/05/mca-aiml-at-chandigarh-university.html"
  },
  {
    title: "I Published My First Research Paper",
    date: "May 29, 2026",
    readingTime: "2 min",
    tags: ["Research", "LLM", "Fine-tuning"],
    excerpt: "Parameter-Efficient Fine-Tuning of LLMs Using LoRA and Prompt-Tuning Under Low-Resource Conditions. LoRA achieved 88.7% accuracy with 1.1% of parameters trained. Published on Zenodo.",
    link: "https://ankitxai.blogspot.com/2026/05/i-published-my-first-research-paper.html"
  }
];

export default function BlogWindow({ profile }: { profile: "aiml" | "analyst" }) {
  const [mounted, setMounted] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const headerColor = profile === "aiml" ? "#1565C0" : "#72A96B";

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)));
  const filteredPosts = selectedTag 
    ? BLOG_POSTS.filter(p => p.tags.includes(selectedTag))
    : BLOG_POSTS;

  const toggleBookmark = (index: number) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="bg-[#FFFDF7] text-[#3D2B1F] h-full flex flex-col">
      {/* Retro header banner */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-4 border-[#3D2B1F] shrink-0"
        style={{ background: profile === "aiml" ? "linear-gradient(90deg, #1565C0, #0D47A1)" : "linear-gradient(90deg, #72A96B, #5C8A56)" }}
      >
        <div>
          <div className="font-display text-[9px] text-white tracking-widest">ANKIT FILES v2.0</div>
          <div className="font-display text-[11px] text-white mt-0.5">
            {profile === "aiml" ? "AI/ML ENGINEER" : "DATA ANALYST"}
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[8px] text-white">BLOG</div>
          <div className="font-display text-sm text-white">{BLOG_POSTS.length} posts</div>
        </div>
      </div>

      {/* Tag filter bar */}
      <div className="px-3 py-2 border-b border-[#E8D5B0] shrink-0">
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="font-display text-[7px] text-[#8B6F47]">FILTER:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`font-display text-[7px] px-2 py-0.5 border ${
              selectedTag === null 
                ? "bg-[#E8832A] text-white border-[#E8832A]" 
                : "bg-white text-[#3D2B1F] border-[#E8D5B0]"
            }`}
          >
            ALL
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`font-display text-[7px] px-1.5 py-0.5 border ${
                selectedTag === tag 
                  ? "bg-[#E8832A] text-white border-[#E8832A]" 
                  : "bg-white text-[#3D2B1F] border-[#E8D5B0]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable posts grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="rounded-none overflow-hidden transition-transform hover:-translate-y-1"
              style={{
                border: `3px solid ${headerColor}`,
                boxShadow: `4px 4px 0 ${headerColor}55`,
              }}
            >
              <div className="divide-y divide-[#E8D5B0]">
                <div className="px-3 py-2.5">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-display text-[10px] text-[#3D2B1F] leading-tight flex-1 pr-2">{post.title}</h3>
                    <button
                      onClick={() => toggleBookmark(index)}
                      className="text-[10px] hover:scale-110 transition-transform"
                      title={bookmarked.has(index) ? "Unbookmark" : "Bookmark"}
                    >
                      {bookmarked.has(index) ? "★" : "☆"}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display text-[7px] text-[#8B6F47]">{post.date}</span>
                    <span className="font-display text-[7px] text-[#6B8CBA] bg-[#EEF3FA] px-1.5 py-0.5 rounded">
                      {post.readingTime}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="font-display text-[6px] px-1 py-0.5" style={{ 
                        color: headerColor, 
                        borderColor: headerColor + "44", 
                        background: headerColor + "15",
                        border: `1px solid ${headerColor}44`
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="font-sans text-[10px] text-[#3D2B1F] mb-3 border-l-4 pl-2 py-1 bg-[#FFF8EE]" style={{ borderColor: headerColor }} >
                    {post.excerpt}
                  </p>

                  <InBrowserLink 
                    href={post.link} 
                    className="inline-block px-3 py-1 font-display text-[9px] text-white border-2 border-white shadow-[2px_2px_0px_#C4A882] hover:-translate-y-1 transition-transform"
                    style={{ background: headerColor }}
                  >
                    Read on Blog →
                  </InBrowserLink>
                </div>
              </div>
            </div>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <p className="font-display text-[10px] text-[#8B6F47]">No posts found for this tag</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}