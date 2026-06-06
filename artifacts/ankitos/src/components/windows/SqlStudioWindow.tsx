import { useState, useRef, useEffect } from "react";

export default function SqlStudioWindow() {
  const [history, setHistory] = useState<{ text: string, type: "cmd" | "out" }[]>([
    { text: "AnkitOS SQL Studio v1.0.0", type: "out" },
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

    setHistory(prev => [...prev, { text: `sql> ${trimmed}`, type: "cmd" }]);
    
    let output = "";
    const lowerCmd = trimmed.toLowerCase();
    
    if (lowerCmd === "help") {
      output = "Commands:\n  SELECT * FROM ankit;\n  SELECT * FROM projects ORDER BY impact DESC;\n  SHOW CERTIFICATIONS;\n  HIRE ankit WHERE fit = 'good';\n  SELECT secret FROM easter_eggs;\n  EXPLAIN ANALYZE career;";
    } else if (lowerCmd.includes("select * from ankit")) {
      output = "+-------+--------------+----------------+---------------------------------+\n| name  | role         | location       | skills                          |\n+-------+--------------+----------------+---------------------------------+\n| Ankit | Data Analyst | Gurugram India | SQL/PowerBI/Python/Tableau      |\n+-------+--------------+----------------+---------------------------------+";
    } else if (lowerCmd.includes("select * from projects")) {
      output = "1. CustomerLens\n2. Zeptalytix\n3. StockVista\n4. Secure180\n5. BitcoinSentimentTrader";
    } else if (lowerCmd.includes("show certifications")) {
      output = "1. Cisco — Data Analytics Essentials\n2. Simplilearn/Microsoft — Data Analyst 101\n3. Coursera — Mastering Advanced SQL Queries\n4. IBM — Big Data 101\n5. Samatrix — Data Analysis Using Python\n6. Samatrix — Data Science & Data Analysis\n7. Amazon — Full Stack Development\n8. Postman Academy — API Fundamentals Student Expert";
    } else if (lowerCmd.includes("hire ankit")) {
      output = "1 row affected. Welcome to the team!";
    } else if (lowerCmd.includes("select secret from easter_eggs")) {
      output = "Best dashboard = one the stakeholder actually opens";
    } else if (lowerCmd.includes("explain analyze career")) {
      output = "Nested Loop Join (cost=0.00..100.00 rows=1)\n  -> Seq Scan on learning_phase (cost=0.00..50.00 rows=1000)\n       Filter: (coffee > 0)\n  -> Index Scan using impact_idx on execution_phase (cost=0.00..50.00 rows=1)\n       Index Cond: (skills = 'sharp')\nExecution Time: 0.042 ms";
    } else {
      output = `ERROR: syntax error at or near "${trimmed}"`;
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
      {/* Retro header (hidden by Window title bar) */}
      <div style={{ height: 0, overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(90deg, #6B8CBA, #4A6B9E)" }}></div>
      </div>
      
      <div 
        className="font-mono text-sm flex-1 flex flex-col cursor-text p-4"
        style={{ backgroundColor: "#FFFDF7", color: "#3D2B1F" }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex-1 overflow-auto whitespace-pre-wrap break-words" ref={containerRef}>
          {history.map((h, i) => (
            <div key={i} className="mb-1">{h.text}</div>
          ))}
          <div className="flex text-[#E8832A]">
            <span className="mr-2">sql&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none text-[#3D2B1F] flex-1 font-mono"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
