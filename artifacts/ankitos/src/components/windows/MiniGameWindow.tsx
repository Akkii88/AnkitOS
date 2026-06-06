import { useState, useEffect, useRef } from "react";

// 100 Python coding questions from simple to hard
const CODING_QUESTIONS = [
  { difficulty: "simple", question: "Print 'Hello, World!'", code: "print('Hello, World!')" },
  { difficulty: "simple", question: "Print your name", code: 'print("Ankit")' },
  { difficulty: "simple", question: "Add two numbers", code: "print(5 + 3)" },
  { difficulty: "simple", question: "Subtract two numbers", code: "print(10 - 4)" },
  { difficulty: "simple", question: "Multiply two numbers", code: "print(6 * 7)" },
  { difficulty: "simple", question: "Divide two numbers", code: "print(15 / 3)" },
  { difficulty: "simple", question: "Find remainder", code: "print(10 % 3)" },
  { difficulty: "simple", question: "Square of a number", code: "print(5 ** 2)" },
  { difficulty: "simple", question: "Check if even", code: "print(8 % 2 == 0)" },
  { difficulty: "simple", question: "Get user input", code: 'name = input("Enter name: ")' },
  { difficulty: "med", question: "If else condition", code: 'if x > 0:\n    print("positive")\nelse:\n    print("non-positive")' },
  { difficulty: "med", question: "For loop range", code: "for i in range(5):\n    print(i)" },
  { difficulty: "med", question: "While loop", code: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1" },
  { difficulty: "med", question: "Function definition", code: "def add(a, b):\n    return a + b" },
  { difficulty: "med", question: "Lambda function", code: "square = lambda x: x * x" },
  { difficulty: "med", question: "List comprehension", code: "squares = [x**2 for x in range(5)]" },
  { difficulty: "hard", question: "Nested list comp", code: "matrix = [[1,2],[3,4]]\nflat = [x for row in matrix for x in row]" },
  { difficulty: "hard", question: "Property decorator", code: '@property\ndef value(self):\n    return self._v' },
  { difficulty: "hard", question: "Dict comprehension", code: "squares = {x: x**2 for x in range(5)}" },
  { difficulty: "hard", question: "LRU Cache", code: "from functools import lru_cache\n@lru_cache\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)" },
];

type GameType = "neural" | "typing";

export default function MiniGameWindow() {
  const [selectedGame, setSelectedGame] = useState<GameType>("neural");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  
  // Typing game state
  const [typingIdx, setTypingIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  // Neural game state
  const [lives, setLives] = useState(3);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [nodePulse, setNodePulse] = useState<{[key: number]: number}>({});
  const timeoutRefs = useRef<{[key: number]: NodeJS.Timeout}>({});

  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameStarted || selectedGame !== "typing" || isFinished) return;
    
    timerRef.current = window.setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 100);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, selectedGame, isFinished]);

  useEffect(() => {
    const saved = localStorage.getItem("ankit_score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const resetTypingGame = () => {
    setTypingIdx(0);
    setUserInput("");
    setTime(0);
    setIsFinished(false);
    setShowResult(false);
    setGameStarted(false);
  };

  const resetNeuralGame = () => {
    setScore(0);
    setLives(3);
    setActiveNodes([]);
    setCombo(0);
    setNodePulse({});
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
  };

  const startGame = () => {
    if (selectedGame === "typing") {
      resetTypingGame();
    } else {
      resetNeuralGame();
    }
    setGameStarted(true);
  };

  // Neural game node spawning with increasing difficulty
  useEffect(() => {
    if (!gameStarted || selectedGame !== "neural") return;
    
    let spawnRate = 800;
    let maxNodes = 1;
    
    const spawnNode = () => {
      const nodesToSpawn = Math.min(maxNodes, 9 - activeNodes.length);
      for (let n = 0; n < nodesToSpawn; n++) {
        const nodeIndex = Math.floor(Math.random() * 9);
        if (!activeNodes.includes(nodeIndex)) {
          setActiveNodes(prev => [...prev, nodeIndex]);
          setNodePulse(prev => ({ ...prev, [nodeIndex]: Date.now() }));
          
          timeoutRefs.current[nodeIndex] = setTimeout(() => {
            setActiveNodes(prev => prev.filter(node => node !== nodeIndex));
            delete nodePulse[nodeIndex];
            setLives(prev => {
              const next = prev - 1;
              if (next <= 0) {
                setGameStarted(false);
                if (score > highScore) {
                  setHighScore(score);
                  localStorage.setItem("ankit_score", score.toString());
                }
              }
              return next;
            });
            setCombo(0);
          }, 1500 - Math.min(1000, score * 20));
        }
      }
    };
    
    intervalRef.current = setInterval(() => {
      spawnNode();
      maxNodes = Math.min(4, Math.floor(score / 5) + 1);
    }, spawnRate - Math.min(600, score * 10));
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameStarted, selectedGame, activeNodes, score, highScore]);

  const handleNodeClick = (index: number) => {
    if (!gameStarted || selectedGame !== "neural") return;
    if (activeNodes.includes(index)) {
      clearTimeout(timeoutRefs.current[index]);
      setActiveNodes(prev => prev.filter(n => n !== index));
      delete nodePulse[index];
      setScore(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > maxCombo) setMaxCombo(newCombo);
        return newCombo;
      });
    }
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!gameStarted) setGameStarted(true);
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!gameStarted && e.key.length === 1) setGameStarted(true);
  };

  const nodePositions = [
    { x: 50, y: 50 }, { x: 50, y: 150 }, { x: 50, y: 250 },
    { x: 200, y: 30 }, { x: 200, y: 110 }, { x: 200, y: 190 }, { x: 200, y: 270 },
    { x: 350, y: 100 }, { x: 350, y: 200 }
  ];

  const currentQuestion = CODING_QUESTIONS[typingIdx];

  return (
    <div className="flex flex-col h-full font-sans">
      {/* Game selector */}
      <div className="flex gap-2 mb-4 px-2">
        <button
          onClick={() => setSelectedGame("neural")}
          className={`px-3 py-1 font-display text-[10px] border-2 ${
            selectedGame === "neural" ? "bg-[#E8832A] text-white" : "bg-white text-[#3D2B1F]"
          }`}
        >
          Neural Debug
        </button>
        <button
          onClick={() => setSelectedGame("typing")}
          className={`px-3 py-1 font-display text-[10px] border-2 ${
            selectedGame === "typing" ? "bg-[#E8832A] text-white" : "bg-white text-[#3D2B1F]"
          }`}
        >
          Code Type
        </button>
      </div>

      {selectedGame === "neural" && (
        <div className="flex flex-col h-full items-center">
          {/* Game stats bar */}
          <div className="w-full flex justify-between items-center mb-4 px-4 py-2 bg-gradient-to-r from-[#EEF3FA] to-[#F5E6C8] border-2 border-[#6B8CBA]">
            <div className="flex items-center gap-3">
              <div className="font-display text-[10px] bg-white px-2 py-1 border border-[#E8D5B0]">
                SCORE: <span className="text-[#6B8CBA] font-bold">{score}</span>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`relative w-5 h-5 ${i < lives ? "" : "opacity-30"}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={i < lives ? "#FF4444" : "none"} stroke="#FF4444" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {i < lives && <span className="absolute inset-0 flex items-center justify-center text-[6px] text-white font-bold">❤</span>}
                  </div>
                ))}
              </div>
              <div className="font-display text-[10px] bg-white px-2 py-1 border border-[#E8D5B0]">
                HIGH: <span className="text-[#FFD700] font-bold">{highScore}</span>
              </div>
              <div className="font-display text-[10px] bg-white px-2 py-1 border border-[#E8D5B0]">
                COMBO: <span className="text-[#72A96B] font-bold">{combo}x</span>
              </div>
            </div>
            <div className="font-display text-[9px] text-[#8B6F47] bg-white px-2 py-1 border border-[#E8D5B0]">
              NODES ACTIVE: <span className="text-[#E8832A]">{activeNodes.length}</span>
            </div>
          </div>

          {/* Neural network visualization */}
          <div className="relative w-[400px] h-[300px] bg-gradient-to-br from-[#EEF3FA] via-[#FFF8EE] to-[#F5E6C8] border-2 border-[#6B8CBA] mx-auto overflow-hidden">
            {!gameStarted && (
              <div className="absolute inset-0 bg-black/70 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="w-20 h-20 border-4 border-[#6B8CBA] rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <span className="text-3xl text-white">🧠</span>
                </div>
                <h2 className="font-display text-white text-xl mb-2">Neural Debug</h2>
                <p className="font-display text-[#8B6F47] mb-6 text-center max-w-48">Click red error nodes before they crash the system!</p>
                {lives <= 0 && (<p className="text-[#FF4444] font-display text-[12px] mb-4 bg-black/50 px-3 py-1">✖ SYSTEM FAILURE ✖</p>)}
                <button onClick={startGame} className="bg-[#E8832A] text-white font-display text-[11px] py-2 px-6 border-2 border-white shadow-[4px_4px_0px_#C4A882] hover:-translate-y-1 hover:shadow-[4px_6px_0px_#C4A882] transition-all">
                  {lives <= 0 ? "RESTART MISSION" : "BEGIN DEBUG"}
                </button>
              </div>
            )}

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B8CBA" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {nodePositions.slice(0, 3).map((n1, i1) => nodePositions.slice(3, 7).map((n2, i2) => (
                <line key={`e1-${i1}-${i2}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="url(#connection-gradient)" strokeWidth="2" className="animate-pulse" />
              )))}
              {nodePositions.slice(3, 7).map((n1, i1) => nodePositions.slice(7, 9).map((n2, i2) => (
                <line key={`e2-${i1}-${i2}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="url(#connection-gradient)" strokeWidth="2" className="animate-pulse" />
              )))}
            </svg>

            {nodePositions.map((pos, i) => {
              const isActive = activeNodes.includes(i);
              return (
                <div key={i} className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border-2 cursor-pointer transition-all duration-150 flex items-center justify-center ${
                  isActive ? "bg-gradient-to-br from-[#FF4444] to-[#FF0000] border-white z-10 scale-125 shadow-[0_0_20px_#FF4444] animate-bounce" : "bg-gradient-to-br from-white to-[#EEF3FA] border-[#6B8CBA] z-0 hover:from-[#6B8CBA] hover:to-[#5673A0]"
                }`} style={{ left: pos.x, top: pos.y }} onPointerDown={() => handleNodeClick(i)}>
                  {isActive && <span className="text-white text-[8px] font-bold">⚠</span>}
                  {!isActive && <span className="text-[#6B8CBA] text-[8px]">●</span>}
                </div>
              );
            })}

            {score > 0 && gameStarted && (<div className="absolute top-2 right-2 text-[#FFD700] font-display text-sm animate-bounce">+1</div>)}
          </div>
          
          <div className="mt-4 flex gap-4 items-center">
            <button onClick={startGame} className={`px-4 py-2 font-display text-[10px] border-2 border-white shadow-[3px_3px_0px_#C4A882] hover:-translate-y-0.5 transition-transform ${gameStarted ? "bg-white text-[#3D2B1F]" : "bg-[#6B8CBA] text-white"}`}>
              {gameStarted ? "RESET" : "START"}
            </button>
            <p className="font-display text-[9px] text-[#8B6F47] max-w-sm text-center">🖱 Click red error nodes to debug them!</p>
          </div>
        </div>
      )}

      {selectedGame === "typing" && (
        <div className="flex flex-col h-full items-center justify-center">
          {!gameStarted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="font-display text-lg mb-4">Code Typing Challenge</h2>
              <p className="text-sm text-[#8B6F47] mb-4 text-center">Type 100 Python code snippets! Timer starts on first keystroke.</p>
              <button onClick={startGame} className="bg-[#E8832A] text-white font-display text-[10px] py-2 px-6 border-2 border-white shadow-[4px_4px_0px_#C4A882] hover:-translate-y-1 transition-transform">Start Challenge</button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              {showResult ? (
                <div className="flex flex-col items-center justify-center h-full animate-in zoom-in">
                  <h2 className="font-display text-2xl text-[#E8832A] mb-4">Completed!</h2>
                  <p className="text-lg font-sans mb-2">Time: {time.toFixed(1)}s</p>
                  <button onClick={resetTypingGame} className="mt-4 px-4 py-2 bg-[#E8832A] text-white font-display text-[10px] shadow-[4px_4px_0px_#C4A882] hover:-translate-y-1">Play Again</button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-2 px-2">
                    <span className="font-display text-[10px] text-[#8B6F47]">Question {typingIdx + 1}/{CODING_QUESTIONS.length}</span>
                    <span className="font-display text-[10px] text-[#3D2B1F]">Time: {time.toFixed(1)}s</span>
                  </div>
                  <div className="mb-3 p-3 border-2 border-[#E8D5B0] bg-[#F5E6C8]">
                    <p className="font-sans text-[10px] mb-1 text-[#3D2B1F]"><strong>Task:</strong> {currentQuestion.question}</p>
                    <pre className="font-mono text-[11px] text-[#3D2B1F] bg-white p-2 border border-[#E8D5B0]">{currentQuestion.code}</pre>
                  </div>
                  <textarea value={userInput} onChange={handleTypingChange} onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (userInput === currentQuestion.code) {
                        setTypingIdx(prev => prev + 1);
                        setUserInput("");
                        if (typingIdx + 1 >= CODING_QUESTIONS.length) {
                          setIsFinished(true);
                          setShowResult(true);
                        }
                      }
                    }
                  }} className="w-full flex-1 p-2 font-mono text-[11px] border-2 border-[#E8D5B0] bg-white focus:outline-none focus:border-[#E8832A] resize-none mb-2" placeholder="Type the code above..." autoFocus />
                  <button onClick={() => {
                    if (userInput === currentQuestion.code) {
                      setTypingIdx(prev => prev + 1);
                      setUserInput("");
                      if (typingIdx + 1 >= CODING_QUESTIONS.length) {
                        setIsFinished(true);
                        setShowResult(true);
                      }
                    }
                  }} className="w-full py-2 bg-[#E8832A] text-white font-display text-[10px] shadow-[4px_4px_0px_#C4A882] hover:-translate-y-1 disabled:opacity-50" disabled={userInput !== currentQuestion.code}>Submit</button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}