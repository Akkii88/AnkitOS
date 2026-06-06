import { useState } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

const CONTACT_METHODS = [
  {
    icon: "📧",
    label: "Email",
    value: "ankitdabur08@gmail.com",
    link: "mailto:ankitdabur08@gmail.com",
    color: "#E8832A"
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "/in/ankitxai",
    link: "https://linkedin.com/in/ankitxai",
    color: "#1565C0"
  },
  {
    icon: "💻",
    label: "GitHub",
    value: "Akkii88",
    link: "https://github.com/Akkii88",
    color: "#3D2B1F"
  },
  {
    icon: "📍",
    label: "Location",
    value: "Gurugram, India",
    link: null,
    color: "#72A96B"
  }
];

export default function ContactWindow() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#FFFDF7] text-[#3D2B1F] h-full flex flex-col">
        {/* Retro header banner */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b-4 border-[#3D2B1F] shrink-0"
          style={{ background: "linear-gradient(90deg, #72A96B, #5C8A56)" }}
        >
          <div>
            <div className="font-display text-[9px] text-[#FFF3E8] tracking-widest">CONTACT LOG v2.0</div>
            <div className="font-display text-[11px] text-white mt-0.5">
              MESSAGE STATUS
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-[8px] text-[#FFF3E8]">STATUS</div>
            <div className="font-display text-2xl text-white leading-none">✓</div>
          </div>
        </div>

        {/* Success content */}
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 text-center animate-in zoom-in max-w-sm">
            <div className="relative">
              <div className="w-20 h-20 bg-[#72A96B] flex items-center justify-center rounded-full shadow-[4px_4px_0px_#C4A882] mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12L10 18L20 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
                <span className="text-[10px]">✓</span>
              </div>
            </div>
            <h2 className="font-display text-xl text-[#72A96B]">Message Sent!</h2>
            <p className="text-sm text-[#8B6F47] px-4">Thanks for reaching out. I'll respond as soon as possible.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-2 px-4 py-2 bg-[#E8832A] text-white font-display text-[10px] shadow-[3px_3px_0px_#C4A882] hover:-translate-y-0.5 hover:shadow-[3px_4px_0px_#C4A882] active:translate-y-0 active:shadow-[1px_1px_0px_#C4A882] transition-all"
            >
              Send Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF7] text-[#3D2B1F] h-full flex flex-col">
      {/* Retro header banner */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-4 border-[#3D2B1F] shrink-0"
        style={{ background: "linear-gradient(90deg, #E8832A, #D4700F)" }}
      >
        <div>
          <div className="font-display text-[9px] text-[#FFF3E8] tracking-widest">CONTACT MODULE v2.0</div>
          <div className="font-display text-[11px] text-white mt-0.5">
            GET IN TOUCH
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[8px] text-[#FFF3E8]">WAYS TO REACH</div>
          <div className="font-display text-xl text-white leading-none">{CONTACT_METHODS.length}</div>
        </div>
      </div>

      {/* Contact methods grid */}
      <div className="p-3 border-b border-[#E8D5B0]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {CONTACT_METHODS.map((method, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 p-2 border-2 border-[#E8D5B0] bg-white shadow-[2px_2px_0px_#C4A882] hover:shadow-[4px_4px_0px_#C4A882] transition-shadow"
            >
              <span className="text-lg">{method.icon}</span>
              <span className="font-display text-[7px] text-[#8B6F47]">{method.label}</span>
              {method.link ? (
                <InBrowserLink href={method.link} className="font-display text-[8px] text-center truncate w-full" style={{ color: method.color }}>
                  {method.value}
                </InBrowserLink>
              ) : (
                <span className="font-display text-[8px] text-center truncate w-full" style={{ color: method.color }}>
                  {method.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="flex flex-col h-full font-sans gap-3">
          <div className="space-y-1">
            <label className="font-display text-[10px] text-[#3D2B1F] flex items-center gap-1">
              <span className="text-[#E8832A]">▶</span> Name
            </label>
            <input 
              required
              name="name"
              placeholder="Your name..."
              className="w-full border-2 border-[#E8D5B0] p-2 bg-white focus:outline-none focus:border-[#E8832A] font-sans text-[11px] placeholder:text-[#C4A882]"
            />
          </div>
          
          <div className="space-y-1">
            <label className="font-display text-[10px] text-[#3D2B1F] flex items-center gap-1">
              <span className="text-[#E8832A]">▶</span> Email
            </label>
            <input 
              required
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full border-2 border-[#E8D5B0] p-2 bg-white focus:outline-none focus:border-[#E8832A] font-sans text-[11px] placeholder:text-[#C4A882]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-display text-[10px] text-[#3D2B1F] flex items-center gap-1">
              <span className="text-[#E8832A]">▶</span> Subject
            </label>
            <input 
              required
              name="subject"
              placeholder="What's this about?"
              className="w-full border-2 border-[#E8D5B0] p-2 bg-white focus:outline-none focus:border-[#E8832A] font-sans text-[11px] placeholder:text-[#C4A882]"
            />
          </div>

          <div className="space-y-1 flex-1 flex flex-col">
            <label className="font-display text-[10px] text-[#3D2B1F] flex items-center gap-1">
              <span className="text-[#E8832A]">▶</span> Message
            </label>
            <textarea 
              required
              name="message"
              placeholder="Your message here..."
              className="w-full flex-1 border-2 border-[#E8D5B0] p-2 bg-white focus:outline-none focus:border-[#E8832A] resize-none font-sans text-[11px] placeholder:text-[#C4A882]"
            />
          </div>

          {status === "error" && (
            <div className="p-2 bg-[#FF5F56] bg-opacity-10 border-2 border-[#FF5F56] flex items-center gap-2">
              <span className="text-[#FF5F56]">⚠</span>
              <p className="text-[#FF5F56] text-[10px] font-sans">Something went wrong. Please try again.</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 bg-[#E8832A] text-white font-display text-[10px] tracking-wider shadow-[4px_4px_0px_#C4A882] hover:-translate-y-1 hover:shadow-[4px_6px_0px_#C4A882] active:translate-y-0 active:shadow-[2px_2px_0px_#C4A882] disabled:opacity-50 disabled:transform-none disabled:shadow-[4px_4px_0px_#C4A882] transition-all"
          >
            {status === "submitting" ? "● Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </div>
  );
}