import { useState, useEffect, useCallback } from "react";
import MinionCharacter, { MinionType, MinionEmotion } from "./MinionCharacter";

interface MinionState {
  id: string;
  type: MinionType;
  x: number;
  y: number;
  direction: 1 | -1;
  speed: number;
  scale: number;
  emotion: MinionEmotion;
  emotionTimer: number;
  behavior: "walking" | "idle" | "jumping" | "interacting";
  behaviorTimer: number;
  message: string | null;
  messageTimer: number;
  interactingWith: string | null;
}

// Speech content per emotion + profile
const SPEECH: Record<"aiml" | "analyst", Record<MinionType, Record<string, string[]>>> = {
  aiml: {
    LilBot: {
      neutral: ["Training...", "GPU go brrr", "epoch 47 done!"],
      happy: ["accuracy 99%!!", "model deployed!", "loss = 0.001 !!"],
      sad: ["overfit again...", "my weights..."],
      angry: ["NaN loss!!", "CUDA out of memory!"],
      laughing: ["haha baseline beats us", "lol random forest won"],
      excited: ["AGI incoming!!!", "ChatGPT? I'm local!"],
      working: ["...training...", "batch 512...", "computing grads"],
      crying: ["epoch 200... still...", "validation loss 📈"],
      dancing: ["97% AUC!!!", "ship it!!!"],
    },
    DebugCat: {
      neutral: ["found a bug!", "meow.exe", "null pointer??"],
      happy: ["fixed it!! meow!", "tests pass :3"],
      sad: ["3am debug session", "still broken..."],
      angry: ["WHO PUSHED THIS", "segfault again?!"],
      laughing: ["haha 'works on my machine'", "lol console.log fix"],
      excited: ["new bug found!! yay!", "stack trace party!"],
      working: ["checking logs...", "diffing files..."],
      crying: ["200 failing tests", "git blame... me"],
      dancing: ["bug free!!! meow!", "merge approved!!"],
    },
    CoffeeSprite: {
      neutral: ["need more caffeine", "fueling the model", "coffee = hyperparameter"],
      happy: ["coffee + GPU = magic", "best brew yet!"],
      sad: ["out of coffee...", "decaf? really?"],
      angry: ["meeting at 9am?!?", "standup again??"],
      laughing: ["we estimated 1 day haha", "sprint planning lol"],
      excited: ["triple espresso!!", "new coffee machine!!"],
      working: ["sipping... coding...", "fueling neurons..."],
      crying: ["spilled my coffee", "deadline + no coffee"],
      dancing: ["coffee dance!!", "wired and hired!"],
    },
    DataGremlin: {
      neutral: ["outlier spotted!", "normalize this", "correlation ≠ causation"],
      happy: ["clean dataset!!!", "R² = 0.99 !!!"],
      sad: ["missing values...", "dirty data again"],
      angry: ["SOMEONE JOINED THE TABLES WRONG", "no PRIMARY KEY?!"],
      laughing: ["haha data quality lol", "your schema 💀"],
      excited: ["1M rows!! feast!!", "new datasource!"],
      working: ["cleaning data...", "EDA in progress"],
      crying: ["52% null values", "csv with 40 dtypes"],
      dancing: ["ETL complete!!!", "dashboard live!"],
    },
    GhostMinion: {
      neutral: ["deprecated fn", "git blame → me", "haunting this repo"],
      happy: ["legacy code lives!", "still deployed :)"],
      sad: ["no one reads me", "forgotten function"],
      angry: ["why is this in prod", "no tests?! ever?!"],
      laughing: ["tech debt party haha", "todo: fix tomorrow lol"],
      excited: ["found a TODO from 2019!", "code comment found!"],
      working: ["haunting codebase...", "reading old PRs..."],
      crying: ["nobody refactored me", "still on Node 12"],
      dancing: ["npm update worked!!", "0 vulnerabilities!"],
    },
  },
  analyst: {
    LilBot: {
      neutral: ["refresh dashboard!", "KPI updated", "SQL query done"],
      happy: ["metrics look great!", "stakeholder happy!"],
      sad: ["KPI dropped...", "data delayed again"],
      angry: ["THE PIVOT IS WRONG", "Excel crashed AGAIN"],
      laughing: ["haha 'just a quick report'", "vlookup lol"],
      excited: ["new dashboard live!!", "real-time data!!"],
      working: ["running query...", "calculating KPIs..."],
      crying: ["source changed again", "broken dashboard"],
      dancing: ["report approved!!!", "insights delivered!"],
    },
    DebugCat: {
      neutral: ["data looks clean", "null values!!", "pivot this"],
      happy: ["zero nulls!! meow!", "schema matches!!"],
      sad: ["data not refreshed", "wrong date filter"],
      angry: ["DUPLICATE ROWS AGAIN", "WHO DELETED THE INDEX"],
      laughing: ["haha 'the data speaks' lol", "P-value 0.049 lmao"],
      excited: ["anomaly detected!!", "new pattern found!"],
      working: ["profiling data...", "joining tables..."],
      crying: ["30% missing rows", "wrong timezone data"],
      dancing: ["clean data!!! meow!", "analysis done!!"],
    },
    CoffeeSprite: {
      neutral: ["report time!", "stakeholder meeting", "excel crashed again"],
      happy: ["presentation nailed!", "client loves it!"],
      sad: ["scope creep again", "another revision..."],
      angry: ["they want it TONIGHT", "add one more metric??"],
      laughing: ["'quick look at data' haha", "stakeholder wants raw csv lol"],
      excited: ["new BI tool!!", "no more Excel!"],
      working: ["building report...", "formatting slides..."],
      crying: ["500 slide deck", "font changed again"],
      dancing: ["report shipped!!!", "quarterly done!"],
    },
    DataGremlin: {
      neutral: ["your data is dirty", "filter by date!", "missing values..."],
      happy: ["perfect join!!!", "no duplicates!!"],
      sad: ["stale data...", "model drift detected"],
      angry: ["INCONSISTENT NAMING", "camelCase vs snake??"],
      laughing: ["haha 'data driven' lol", "excel pivot lmaooo"],
      excited: ["new datasource!!", "API connected!"],
      working: ["transforming data...", "writing SQL..."],
      crying: ["30 column csv...", "no data dictionary"],
      dancing: ["warehouse updated!!!", "ETL complete!"],
    },
    GhostMinion: {
      neutral: ["old pivot table", "deprecated report", "still in the query"],
      happy: ["old report still works!", "legacy lives on :)"],
      sad: ["nobody reads me", "report from 2021..."],
      angry: ["HARDCODED DATES?!", "no version control??"],
      laughing: ["haha manual report lol", "copy paste analysis"],
      excited: ["found old dashboard!", "vintage data!!"],
      working: ["haunting old reports...", "reading stale data..."],
      crying: ["report retired...", "deprecated API"],
      dancing: ["migrated to BI!!", "automated at last!"],
    },
  },
};

// Interaction types when two minions meet
type InteractionType = "fight" | "laugh" | "talk" | "excited" | "sad" | "dance";

function pickInteraction(): InteractionType {
  const r = Math.random();
  if (r < 0.12) return "fight";
  if (r < 0.28) return "laugh";
  if (r < 0.45) return "dance";
  if (r < 0.65) return "excited";
  if (r < 0.75) return "sad";
  return "talk";
}

function interactionToEmotion(interaction: InteractionType): MinionEmotion {
  switch (interaction) {
    case "fight": return "angry";
    case "laugh": return "laughing";
    case "dance": return "dancing";
    case "excited": return "excited";
    case "sad": return "sad";
    default: return "happy";
  }
}

function getRandomMessage(profile: "aiml" | "analyst", type: MinionType, emotion: MinionEmotion): string {
  const bag = SPEECH[profile][type][emotion] ?? SPEECH[profile][type]["neutral"];
  return bag[Math.floor(Math.random() * bag.length)];
}

const INITIAL_MINIONS: Omit<MinionState, "emotion" | "emotionTimer" | "message" | "messageTimer" | "interactingWith" | "behavior" | "behaviorTimer">[] = [
  { id: "1", type: "LilBot",       x: 100, y: 0, direction: 1,  speed: 0.9, scale: 0.44 },
  { id: "2", type: "DebugCat",     x: 300, y: 0, direction: -1, speed: 1.2, scale: 0.40 },
  { id: "3", type: "CoffeeSprite", x: 500, y: 0, direction: 1,  speed: 0.7, scale: 0.38 },
  { id: "4", type: "DataGremlin",  x: 700, y: 0, direction: -1, speed: 1.5, scale: 0.48 },
  { id: "5", type: "GhostMinion",  x: 900, y: 0, direction: 1,  speed: 0.6, scale: 0.42 },
];

export default function MinionLayer({ profile }: { profile: "aiml" | "analyst" }) {
  const [minions, setMinions] = useState<MinionState[]>(
    INITIAL_MINIONS.map(m => ({
      ...m,
      emotion: "neutral" as MinionEmotion,
      emotionTimer: 200 + Math.random() * 400,
      behavior: "walking" as const,
      behaviorTimer: 100 + Math.random() * 300,
      message: null,
      messageTimer: 0,
      interactingWith: null,
    }))
  );

  useEffect(() => {
    let lastTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / (1000 / 30), 3);
      lastTime = now;
      const W = window.innerWidth;
      const H = 110; // height of the strip above taskbar

      setMinions(prev => {
        const next = prev.map(m => ({ ...m }));

        // ── 1. Proximity interactions ──────────────────────────────
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const dist = Math.abs(next[i].x - next[j].x);
            if (dist < 50 && next[i].behavior !== "interacting" && next[j].behavior !== "interacting") {
              const interaction = pickInteraction();
              const emotion = interactionToEmotion(interaction);
              const duration = emotion === "angry" ? 90 : emotion === "dancing" ? 120 : 75;

              next[i].behavior = "interacting";
              next[j].behavior = "interacting";
              next[i].behaviorTimer = duration;
              next[j].behaviorTimer = duration;
              next[i].emotion = emotion;
              next[j].emotion = emotion;
              next[i].emotionTimer = duration;
              next[j].emotionTimer = duration;
              next[i].interactingWith = next[j].id;
              next[j].interactingWith = next[i].id;
              next[i].message = getRandomMessage(profile, next[i].type, emotion);
              next[j].message = getRandomMessage(profile, next[j].type, emotion);
              next[i].messageTimer = duration;
              next[j].messageTimer = duration;
              // Face each other
              if (next[i].x < next[j].x) { next[i].direction = 1; next[j].direction = -1; }
              else { next[i].direction = -1; next[j].direction = 1; }
            }
          }
        }

        // ── 2. Update each minion ──────────────────────────────────
        return next.map(m => {
          let { x, y, direction, speed, emotion, emotionTimer, behavior, behaviorTimer, message, messageTimer, interactingWith } = m;

          // Timers
          behaviorTimer -= dt;
          emotionTimer -= dt;
          if (messageTimer > 0) {
            messageTimer -= dt;
            if (messageTimer <= 0) message = null;
          }

          // Emotion change
          if (emotionTimer <= 0) {
            const emotions: MinionEmotion[] = ["neutral", "happy", "working", "neutral", "excited", "neutral", "sad", "happy", "laughing"];
            emotion = emotions[Math.floor(Math.random() * emotions.length)];
            emotionTimer = 200 + Math.random() * 500;
            // Occasionally emit a solo message
            if (Math.random() < 0.35) {
              message = getRandomMessage(profile, m.type, emotion);
              messageTimer = 70;
            }
          }

          // Behavior change
          if (behaviorTimer <= 0) {
            interactingWith = null;
            const r = Math.random();
            if (r < 0.08) {
              behavior = "jumping"; behaviorTimer = 12;
            } else if (r < 0.25) {
              behavior = "idle"; behaviorTimer = 40 + Math.random() * 80;
              emotion = Math.random() < 0.5 ? "working" : "neutral";
              emotionTimer = behaviorTimer;
            } else {
              behavior = "walking"; behaviorTimer = 120 + Math.random() * 280;
              speed = 0.5 + Math.random() * 1.3;
              if (Math.random() < 0.4) direction = direction === 1 ? -1 : 1;
            }
          }

          // Movement
          if (behavior === "walking") {
            x += speed * direction * dt;
            // slight Y drift for more natural movement (GhostMinion floats, others bounce along ground)
            if (m.type === "GhostMinion") {
              y = Math.sin(Date.now() / 800) * 8;
            }
            if (x < 30) { x = 30; direction = 1; }
            else if (x > W - 70) { x = W - 70; direction = -1; }
          } else if (behavior === "interacting") {
            // slight sway in place during interaction
            x += Math.sin(Date.now() / 200) * 0.3;
          }

          return { ...m, x, y, direction, speed, emotion, emotionTimer, behavior, behaviorTimer, message, messageTimer, interactingWith };
        });
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [profile]);

  return (
    <div className="absolute bottom-12 left-0 right-0 pointer-events-none z-30" style={{ height: 120 }}>
      {minions.map(m => (
        <MinionCharacter
          key={m.id}
          type={m.type}
          x={m.x}
          y={m.y}
          direction={m.direction}
          emotion={m.emotion}
          isWalking={m.behavior === "walking"}
          isJumping={m.behavior === "jumping"}
          message={m.message}
          scale={m.scale}
        />
      ))}
    </div>
  );
}
