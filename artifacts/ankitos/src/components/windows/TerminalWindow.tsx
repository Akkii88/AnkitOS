import { useState, useRef, useEffect } from "react";

export default function TerminalWindow() {
  const [history, setHistory] = useState<{ text: string, type: "cmd" | "out" }[]>([
    { text: "AnkitOS Terminal v1.0.0", type: "out" },
    { text: "Type 'help' to see available commands.", type: "out" }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { text: `user@ankitos:~$ ${trimmed}`, type: "cmd" }]);
    
    let output = "";
    switch (trimmed.toLowerCase()) {
      case "help":
        output = "Commands:\n  help\n  whoami\n  ls projects/\n  sudo hire-me\n  cat secret.txt\n  nvidia-smi\n  ping linkedin\n  git log";
        break;
      case "whoami":
        output = "Ankit | AI/ML Engineer | MCA from Chandigarh University | Building intelligent systems that matter";
        break;
      case "ls projects/":
        output = "Fedral.AI\nDiffusion-finetuneLLM\nCognitiveMesh-RAG\nCodeSage.AI\nAML-KYCMonitor\nApplyGenie.AI-JobApplicationAgent\nSahayakAI\neyeBERT\nVigil360-Intelligence";
        break;
      case "sudo hire-me":
        output = "Loading...\n[====================] 100%\nSUCCESS: Ankit deployed to your team!";
        break;
      case "cat secret.txt":
        output = "The real ML trick is knowing when NOT to use ML";
        break;
      case "nvidia-smi":
        output = "+-----------------------------------------------------------------------------+\n| NVIDIA-SMI 535.104.05   Driver Version: 535.104.05   CUDA Version: 12.2     |\n|-------------------------------+----------------------+----------------------+\n| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |\n| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |\n|                               |                      |               MIG M. |\n|===============================+======================+======================|\n|   0  NVIDIA GeForce RTX 4090  | 00000000:01:00.0  On |                  N/A |\n| 30%   45C    P8    25W / 450W |  22045MiB / 24564MiB |     94%      Default |\n+-------------------------------+----------------------+----------------------+";
        break;
      case "ping linkedin":
        output = "PONG 200 OK — linkedin.com/in/ankitxai";
        break;
      case "git log":
        output = "commit 5a2b3c\nAuthor: Ankit\nDate:   Today\n    fix: stop overfitting on life\n\ncommit 9d8e7f\nAuthor: Ankit\nDate:   Yesterday\n    feat: added coffee dependency\n\ncommit 1a2b3c\nAuthor: Ankit\nDate:   Last week\n    refactor: deleted imposter syndrome\n\ncommit 4d5e6f\nAuthor: Ankit\nDate:   Last month\n    docs: updated README to lie less\n\ncommit 7a8b9c\nAuthor: Ankit\nDate:   Long ago\n    chore: cleaned up childhood dreams";
        break;
      default:
        output = `command not found: ${trimmed}`;
    }

    setHistory(prev => [...prev, { text: output, type: "out" }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Retro header (hidden by Window title bar but keeping structure) */}
      <div style={{ height: 0, overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(90deg, #2D1B4E, #1A1040)" }}></div>
      </div>
      
      <div 
        className="bg-black text-[#00FF00] font-mono text-sm flex-1 flex flex-col cursor-text p-4"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex-1 overflow-auto whitespace-pre-wrap break-words" ref={containerRef}>
          {history.map((h, i) => (
            <div key={i} className="mb-1">{h.text}</div>
          ))}
          <div className="flex">
            <span className="mr-2">user@ankitos:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none text-[#00FF00] flex-1 font-mono"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
