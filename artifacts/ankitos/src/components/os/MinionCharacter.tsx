export type MinionType = "LilBot" | "DebugCat" | "CoffeeSprite" | "DataGremlin" | "GhostMinion";
export type MinionEmotion = "neutral" | "happy" | "sad" | "angry" | "laughing" | "excited" | "crying" | "working" | "dancing";

interface MinionCharacterProps {
  type: MinionType;
  x: number;
  y: number;
  direction: 1 | -1;
  emotion: MinionEmotion;
  isWalking: boolean;
  isJumping: boolean;
  message: string | null;
  scale?: number;
}

// Canonical texture paths (extracted from user's Blender zip)
const TEX = {
  overalls:  "/minion-tex/Roupa_Base_Color.png",
  denim:     "/minion-tex/deep-blue-new-denim-jeans-texture.jpg",
  eyeRight:  "/minion-tex/OlhoDireito_Base_Color.png",
  eyeLeft:   "/minion-tex/OlhoEsquerdo_Base_Color.png",
  eyeVein:   "/minion-tex/blue-eye-texture-veins.jpg",
  goggleBand:"/minion-tex/Cintacabeca_Base_Color.png",
  gloves:    "/minion-tex/Luvas_Base_Color.png",
  boots:     "/minion-tex/Botas_Base_Color.png",
};

// Per-character tweaks on top of the shared Minion base
interface MinionConfig {
  numEyes: 1 | 2;
  hairStyle: "tuft" | "tall" | "flat" | "none" | "fringe";
  goggleColor: string;  // goggle rim color
  bodyTallness: number; // scale Y of body ellipse (1 = normal, >1 = taller)
  accessory?: "antenna" | "catEars" | "coffee" | "glasses" | "none";
  isGhost?: boolean;
  baseScale: number;
}

const CONFIGS: Record<MinionType, MinionConfig> = {
  LilBot:      { numEyes: 1, hairStyle: "flat",   goggleColor: "#8B6914", bodyTallness: 1.1, accessory: "antenna", baseScale: 1.0 },
  DebugCat:    { numEyes: 2, hairStyle: "tuft",   goggleColor: "#9C27B0", bodyTallness: 0.9, accessory: "catEars", baseScale: 0.82 },
  CoffeeSprite:{ numEyes: 2, hairStyle: "fringe",  goggleColor: "#5C3D1E", bodyTallness: 1.2, accessory: "coffee",  baseScale: 1.15 },
  DataGremlin: { numEyes: 2, hairStyle: "none",   goggleColor: "#3A5C8A", bodyTallness: 0.75,accessory: "glasses", baseScale: 0.7  },
  GhostMinion: { numEyes: 1, hairStyle: "none",   goggleColor: "#9090C8", bodyTallness: 1.05,accessory: "none",   isGhost: true, baseScale: 1.0 },
};

function Hair({ style }: { style: MinionConfig["hairStyle"] }) {
  if (style === "none") return null;
  if (style === "tuft")
    return (
      <g>
        <path d="M28 4 Q29-6 32-2 Q35-6 36 4" fill="#3D2B1F" strokeWidth="0"/>
        <path d="M24 6 Q24-2 27 2" fill="#3D2B1F"/>
        <path d="M40 6 Q40-2 37 2" fill="#3D2B1F"/>
      </g>
    );
  if (style === "tall")
    return <path d="M27 4 Q31-12 35 4 Q33-6 31-8 Q29-6 27 4Z" fill="#3D2B1F"/>;
  if (style === "flat")
    return (
      <g>
        <path d="M26 4 Q28-3 32-2 Q36-3 38 4" stroke="#3D2B1F" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </g>
    );
  if (style === "fringe")
    return (
      <g>
        {[24,28,32,36,40].map((x, i) => (
          <path key={i} d={`M${x} 5 Q${x+1} ${-2-i%2*3} ${x+3} 5`} fill="#3D2B1F"/>
        ))}
      </g>
    );
  return null;
}

function MinionFace({ emotion, numEyes, eyeTexLeft, eyeTexRight, goggleColor, isGhost }: {
  emotion: MinionEmotion;
  numEyes: 1 | 2;
  eyeTexLeft: string;
  eyeTexRight: string;
  goggleColor: string;
  isGhost?: boolean;
}) {
  const bandY = 27;
  const goggleY = 33;
  const mouthY = 58;
  const bodyColor = isGhost ? "#D0D8F0" : "#F4D03F";

  const mouth = () => {
    switch (emotion) {
      case "happy": case "dancing":
        return <path d={`M18 ${mouthY+2} Q32 ${mouthY+14} 46 ${mouthY+2}`} stroke="#2C1A0E" strokeWidth="2.5" fill="#c85a3c" strokeLinecap="round"/>;
      case "laughing":
        return <>
          <ellipse cx="32" cy={mouthY+7} rx="10" ry="7" fill="#2C1A0E"/>
          <ellipse cx="32" cy={mouthY+5} rx="8" ry="5" fill="#cc4422"/>
          <rect x="26" y={mouthY+1} width="4" height="6" rx="1" fill="white" opacity="0.9"/>
          <rect x="31" y={mouthY+1} width="4" height="6" rx="1" fill="white" opacity="0.9"/>
        </>;
      case "sad": case "crying":
        return <path d={`M18 ${mouthY+10} Q32 ${mouthY+2} 46 ${mouthY+10}`} stroke="#2C1A0E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
      case "angry":
        return <>
          <path d={`M18 ${mouthY+8} Q32 ${mouthY+3} 46 ${mouthY+8}`} stroke="#2C1A0E" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <rect x="24" y={mouthY+1} width="4" height="5" rx="1" fill="white" opacity="0.8"/>
          <rect x="30" y={mouthY+1} width="4" height="5" rx="1" fill="white" opacity="0.8"/>
          <rect x="36" y={mouthY+1} width="4" height="5" rx="1" fill="white" opacity="0.8"/>
        </>;
      case "excited":
        return <>
          <ellipse cx="32" cy={mouthY+6} rx="9" ry="6" fill="#2C1A0E"/>
          <ellipse cx="32" cy={mouthY+5} rx="7" ry="4.5" fill="#cc4422"/>
        </>;
      case "working":
        return <path d={`M24 ${mouthY+4} L40 ${mouthY+4}`} stroke="#2C1A0E" strokeWidth="2" strokeLinecap="round"/>;
      default:
        return <path d={`M22 ${mouthY+5} Q32 ${mouthY+10} 42 ${mouthY+5}`} stroke="#2C1A0E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
    }
  };

  const goggleShadow = "rgba(0,0,0,0.35)";

  if (numEyes === 1) {
    const cx = 32, cy = goggleY, R = 13;
    return (
      <g>
        {/* Goggle band */}
        <clipPath id={`bandClip1_${goggleColor}`}><rect x="0" y={bandY-5} width="64" height="12"/></clipPath>
        <rect x="0" y={bandY-5} width="64" height="12" fill="#888" rx="4"/>
        <image href={TEX.goggleBand} x="0" y={bandY-5} width="64" height="12" clipPath={`url(#bandClip1_${goggleColor})`} preserveAspectRatio="xMidYMid slice" opacity="0.7"/>
        {/* Goggle rim */}
        <circle cx={cx} cy={cy} r={R+4} fill={goggleColor}/>
        <circle cx={cx} cy={cy} r={R+2} fill="#444"/>
        {/* Eye white */}
        <circle cx={cx} cy={cy} r={R} fill="white"/>
        {/* Eye texture */}
        <clipPath id="eyeClip1"><circle cx={cx} cy={cy} r={R}/></clipPath>
        <image href={eyeTexRight} x={cx-R} y={cy-R} width={R*2} height={R*2} clipPath="url(#eyeClip1)" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>
        {/* Iris */}
        <circle cx={cx} cy={cy} r="7" fill="#2288FF" opacity="0.6"/>
        <circle cx={cx} cy={cy} r="4.5" fill="#1A1A2E"/>
        <circle cx={cx-2} cy={cy-2} r="1.8" fill="white" opacity="0.85"/>
        {/* Goggle glass shine */}
        <ellipse cx={cx-4} cy={cy-5} rx="5" ry="3.5" fill="rgba(255,255,255,0.25)" transform="rotate(-20 28 28)"/>
        {/* Emotion brow */}
        {emotion === "angry" && <path d={`M${cx-12} ${cy-17} L${cx+12} ${cy-14}`} stroke="#2C1A0E" strokeWidth="3" strokeLinecap="round"/>}
        {(emotion === "sad"||emotion==="crying") && <path d={`M${cx-12} ${cy-14} L${cx+12} ${cy-17}`} stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round"/>}
        {emotion==="crying" && <ellipse cx={cx-4} cy={cy+14} rx="2.5" ry="5" fill="#87CEEB" opacity="0.75"/>}
        {emotion==="crying" && <ellipse cx={cx+4} cy={cy+16} rx="2.5" ry="5" fill="#87CEEB" opacity="0.75"/>}
        {mouth()}
      </g>
    );
  }

  // Two eyes
  const lx = 20, rx2 = 44, cy2 = goggleY, R2 = 10;
  return (
    <g>
      {/* Goggle band */}
      <clipPath id={`bandClip2_${goggleColor}`}><rect x="0" y={bandY-5} width="64" height="12"/></clipPath>
      <rect x="0" y={bandY-5} width="64" height="12" fill="#888" rx="3"/>
      <image href={TEX.goggleBand} x="0" y={bandY-5} width="64" height="12" clipPath={`url(#bandClip2_${goggleColor})`} preserveAspectRatio="xMidYMid slice" opacity="0.7"/>

      {/* Left goggle */}
      <circle cx={lx} cy={cy2} r={R2+4} fill={goggleColor}/>
      <circle cx={lx} cy={cy2} r={R2+2} fill="#444"/>
      <circle cx={lx} cy={cy2} r={R2} fill="white"/>
      <clipPath id="eyeClipL"><circle cx={lx} cy={cy2} r={R2}/></clipPath>
      <image href={eyeTexLeft} x={lx-R2} y={cy2-R2} width={R2*2} height={R2*2} clipPath="url(#eyeClipL)" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>
      <circle cx={lx} cy={cy2} r="5" fill="#2288FF" opacity="0.6"/>
      <circle cx={lx} cy={cy2} r="3.5" fill="#1A1A2E"/>
      <circle cx={lx-1.5} cy={cy2-1.5} r="1.3" fill="white" opacity="0.85"/>
      <ellipse cx={lx-3} cy={cy2-4} rx="3.5" ry="2.2" fill="rgba(255,255,255,0.22)" transform="rotate(-20)"/>

      {/* Right goggle */}
      <circle cx={rx2} cy={cy2} r={R2+4} fill={goggleColor}/>
      <circle cx={rx2} cy={cy2} r={R2+2} fill="#444"/>
      <circle cx={rx2} cy={cy2} r={R2} fill="white"/>
      <clipPath id="eyeClipR"><circle cx={rx2} cy={cy2} r={R2}/></clipPath>
      <image href={eyeTexRight} x={rx2-R2} y={cy2-R2} width={R2*2} height={R2*2} clipPath="url(#eyeClipR)" preserveAspectRatio="xMidYMid slice" opacity="0.8"/>
      <circle cx={rx2} cy={cy2} r="5" fill="#2288FF" opacity="0.6"/>
      <circle cx={rx2} cy={cy2} r="3.5" fill="#1A1A2E"/>
      <circle cx={rx2-1.5} cy={cy2-1.5} r="1.3" fill="white" opacity="0.85"/>
      <ellipse cx={rx2-3} cy={cy2-4} rx="3.5" ry="2.2" fill="rgba(255,255,255,0.22)" transform="rotate(-20)"/>

      {/* Bridge between goggles */}
      <rect x={lx+R2+2} y={cy2-3} width={rx2-lx-R2*2-4} height="6" rx="3" fill={goggleColor}/>

      {/* Emotion brows */}
      {emotion === "angry" && <>
        <path d={`M${lx-8} ${cy2-16} L${lx+6} ${cy2-12}`} stroke="#2C1A0E" strokeWidth="3" strokeLinecap="round"/>
        <path d={`M${rx2-6} ${cy2-12} L${rx2+8} ${cy2-16}`} stroke="#2C1A0E" strokeWidth="3" strokeLinecap="round"/>
      </>}
      {(emotion==="sad"||emotion==="crying") && <>
        <path d={`M${lx-8} ${cy2-12} L${lx+6} ${cy2-16}`} stroke="#2C1A0E" strokeWidth="2" strokeLinecap="round"/>
        <path d={`M${rx2-6} ${cy2-16} L${rx2+8} ${cy2-12}`} stroke="#2C1A0E" strokeWidth="2" strokeLinecap="round"/>
      </>}
      {emotion==="crying" && <>
        <ellipse cx={lx} cy={cy2+14} rx="2" ry="5" fill="#87CEEB" opacity="0.75"/>
        <ellipse cx={rx2} cy={cy2+16} rx="2" ry="5" fill="#87CEEB" opacity="0.75"/>
      </>}
      {emotion==="excited" && <>
        <path d={`M${lx-7} ${cy2-13} Q${lx} ${cy2-17} ${lx+7} ${cy2-13}`} stroke="#2C1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d={`M${rx2-7} ${cy2-13} Q${rx2} ${cy2-17} ${rx2+7} ${cy2-13}`} stroke="#2C1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </>}
      {mouth()}
    </g>
  );
}

export default function MinionCharacter({
  type, x, y, direction, emotion, isWalking, isJumping, message, scale = 1,
}: MinionCharacterProps) {
  const cfg = CONFIGS[type];
  const finalScale = cfg.baseScale * scale;
  const isGhost = !!cfg.isGhost;

  // Classic Minion yellow — or pale ghost
  const skinColor = isGhost ? "#D4DCF4" : "#F4D03F";
  const skinDark  = isGhost ? "#B0B8D8" : "#D4AC0D";

  const offsetX = -32 * finalScale;
  const jumpShift = isJumping ? -18 : 0;
  const transform = `translate(calc(${x}px + ${offsetX}px), calc(${y}px + ${jumpShift}px)) scaleX(${direction})`;

  // Color tint based on emotion
  const tintFilter = emotion === "angry"
    ? "sepia(0.5) saturate(3) hue-rotate(310deg)"
    : emotion === "sad" || emotion === "crying"
    ? "saturate(0.55) brightness(0.9)"
    : emotion === "excited" || emotion === "dancing"
    ? "saturate(1.3) brightness(1.1)"
    : "none";

  // Body is 64 wide, 110 tall (pill shape: head + body merged)
  // Head occupies top 50, body occupies bottom 60 — seamlessly connected
  const vbH = 120;

  return (
    <div
      className={`absolute pointer-events-none bottom-0 ${isGhost ? "animate-[ghostFloat_3.5s_ease-in-out_infinite]" : ""}`}
      style={{ transform, transformOrigin: "bottom center", transition: "none" }}
    >
      {/* Speech bubble — flip back so text reads left-to-right */}
      {message && (
        <div
          className="absolute font-display text-[7px] bg-white border-2 border-[#E8D5B0] shadow-[2px_2px_0px_#C4A882] px-2 py-1 text-[#3D2B1F] z-50 rounded"
          style={{
            bottom: `calc(${vbH * finalScale}px + 8px)`,
            left: "50%",
            transform: `translateX(-50%) scaleX(${direction})`,
            maxWidth: 130,
            textAlign: "center",
            whiteSpace: "normal",
            lineHeight: 1.4,
          }}
        >
          {message}
          <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#E8D5B0] rotate-45"/>
        </div>
      )}

      <svg
        width={64} height={vbH}
        viewBox={`0 0 64 ${vbH}`}
        overflow="visible"
        style={{ transform: `scale(${finalScale})`, transformOrigin: "bottom center", filter: tintFilter, display: "block" }}
      >
        <defs>
          {/* Skin gradient */}
          <radialGradient id={`skin_${type}`} cx="38%" cy="28%" r="72%">
            <stop offset="0%" stopColor={skinColor}/>
            <stop offset="100%" stopColor={skinDark}/>
          </radialGradient>
          {/* Overalls gradient */}
          <radialGradient id={`ov_${type}`} cx="35%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#5B8DD8"/>
            <stop offset="100%" stopColor="#2A4D8E"/>
          </radialGradient>
          {/* Drop shadow */}
          <filter id={`sh_${type}`} x="-25%" y="-15%" width="150%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="rgba(0,0,0,0.28)"/>
          </filter>

          {/* Clip paths for body sections */}
          <clipPath id={`fullBody_${type}`}>
            <ellipse cx="32" cy="60" rx="28" ry="52"/>
          </clipPath>
          <clipPath id={`overallClip_${type}`}>
            <ellipse cx="32" cy="82" rx="23" ry="36"/>
          </clipPath>

          {/* Ghost wavy bottom clip */}
          {isGhost && (
            <clipPath id="ghostClip">
              <path d="M4 60 L4 115 Q12 108 20 115 Q28 122 36 115 Q44 108 52 115 Q58 108 60 115 L60 60Z"/>
            </clipPath>
          )}
        </defs>

        <g filter={`url(#sh_${type})`}>

          {/* ── ACCESSORIES ABOVE HEAD ── */}
          {cfg.accessory === "antenna" && (
            <g>
              <rect x="30" y="0" width="4" height="2" rx="1" fill="#999"/>
              <rect x="30.5" y="2" width="3" height="10" rx="1.5" fill="#888"/>
              <circle cx="32" cy="1.5" r="4.5" fill="#FF5F56"/>
              <circle cx="31" cy="1" r="1.8" fill="#ffaaaa"/>
            </g>
          )}
          {cfg.accessory === "catEars" && (
            <g>
              <polygon points="14,12 7,-2 22,6" fill="#9C27B0"/>
              <polygon points="15,11 10,0 21,6" fill="#FFB0D0"/>
              <polygon points="50,12 57,-2 42,6" fill="#9C27B0"/>
              <polygon points="49,11 54,0 43,6" fill="#FFB0D0"/>
            </g>
          )}

          {/* ── PILL BODY (skin) ── */}
          <ellipse cx="32" cy="60" rx="28" ry={52 * cfg.bodyTallness} fill={`url(#skin_${type})`}/>

          {/* Ghost wavy tail */}
          {isGhost && (
            <path d="M4 72 Q12 64 20 72 Q28 80 36 72 Q44 64 52 72 Q58 64 60 72 L60 60 Q32 55 4 60Z"
              fill={`url(#skin_${type})`} opacity="0.9"/>
          )}

          {/* ── OVERALLS ── */}
          {/* Use real denim texture + blue gradient overlay */}
          <ellipse cx="32" cy="86" rx="23" ry={34 * cfg.bodyTallness} fill={`url(#ov_${type})`}/>
          <clipPath id={`ovTex_${type}`}><ellipse cx="32" cy="86" rx="23" ry={34 * cfg.bodyTallness}/></clipPath>
          <image href={TEX.denim} x="9" y="52" width="46" height="68"
            clipPath={`url(#ovTex_${type})`} preserveAspectRatio="xMidYMid slice" opacity="0.35"/>

          {/* Bib pocket */}
          <rect x="23" y="62" width="18" height="15" rx="3" fill="#1F3E7A" opacity="0.7"/>
          <rect x="24" y="63" width="16" height="13" rx="2" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          {/* Pocket logo */}
          <circle cx="32" cy="70" r="3.5" fill="#F4D03F" opacity="0.7"/>

          {/* Straps */}
          <rect x="24" y="48" width="5" height="17" rx="2.5" fill="#1F3E7A"/>
          <rect x="35" y="48" width="5" height="17" rx="2.5" fill="#1F3E7A"/>

          {/* ── HAIR ── */}
          <Hair style={cfg.hairStyle}/>

          {/* ── FACE (goggles + eyes + mouth) ── */}
          <MinionFace
            emotion={emotion}
            numEyes={cfg.numEyes}
            eyeTexLeft={TEX.eyeLeft}
            eyeTexRight={TEX.eyeRight}
            goggleColor={cfg.goggleColor}
            isGhost={isGhost}
          />

          {/* DataGremlin glasses (extra) */}
          {cfg.accessory === "glasses" && (
            <g>
              <rect x="13" y="39" width="38" height="2" rx="1" fill="#333"/>
              <rect x="13" y="39" width="17" height="12" rx="4" fill="none" stroke="#333" strokeWidth="2"/>
              <rect x="34" y="39" width="17" height="12" rx="4" fill="none" stroke="#333" strokeWidth="2"/>
              <rect x="30" y="41" width="4" height="2" rx="1" fill="#333"/>
            </g>
          )}

          {/* ── ARMS ── */}
          {/* Left arm */}
          <ellipse cx="6" cy="80" rx="6" ry="10" fill={`url(#skin_${type})`}
            transform={emotion === "happy" || emotion === "dancing" || emotion === "excited"
              ? "rotate(-38 6 80)" : "rotate(-12 6 80)"}/>
          {/* Left glove */}
          <clipPath id={`lgClip_${type}`}><ellipse cx="6" cy="88" rx="7" ry="6"/></clipPath>
          <ellipse cx="6" cy="88" rx="7" ry="6" fill="#555"/>
          <image href={TEX.gloves} x="-1" y="82" width="14" height="12"
            clipPath={`url(#lgClip_${type})`} preserveAspectRatio="xMidYMid slice" opacity="0.6"/>

          {/* Right arm */}
          <ellipse cx="58" cy="80" rx="6" ry="10" fill={`url(#skin_${type})`}
            transform={emotion === "happy" || emotion === "dancing" || emotion === "excited"
              ? "rotate(38 58 80)" : "rotate(12 58 80)"}/>
          {/* Right glove */}
          <clipPath id={`rgClip_${type}`}><ellipse cx="58" cy="88" rx="7" ry="6"/></clipPath>
          <ellipse cx="58" cy="88" rx="7" ry="6" fill="#555"/>
          <image href={TEX.gloves} x="51" y="82" width="14" height="12"
            clipPath={`url(#rgClip_${type})`} preserveAspectRatio="xMidYMid slice" opacity="0.6"/>

          {/* Coffee mug (CoffeeSprite) */}
          {cfg.accessory === "coffee" && (
            <g transform="translate(52, 74)">
              <rect x="0" y="0" width="16" height="13" rx="2.5" fill="#5C3D1E"/>
              <rect x="1" y="1" width="14" height="4" rx="1" fill="rgba(255,255,255,0.2)"/>
              <path d="M16 2.5 Q23 2.5 23 8 Q23 13.5 16 13.5" stroke="#4A2E12" strokeWidth="2.5" fill="none"/>
              {(emotion==="happy"||emotion==="dancing") &&
                <path d="M4 -5 Q8 -10 12 -5" stroke="rgba(200,200,200,0.55)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>}
            </g>
          )}

          {/* ── LEGS ── */}
          <ellipse cx="22" cy="106" rx="9" ry={10 * cfg.bodyTallness} fill={`url(#skin_${type})`}
            style={isWalking ? { animation: "leftLeg 0.42s ease-in-out infinite alternate", transformBox: "fill-box", transformOrigin: "top" } : undefined}/>
          <ellipse cx="42" cy="106" rx="9" ry={10 * cfg.bodyTallness} fill={`url(#skin_${type})`}
            style={isWalking ? { animation: "rightLeg 0.42s ease-in-out infinite alternate", transformBox: "fill-box", transformOrigin: "top" } : undefined}/>

          {/* ── BOOTS ── */}
          <clipPath id={`lb_${type}`}><ellipse cx="20" cy={116} rx="13" ry="6.5"/></clipPath>
          <ellipse cx="20" cy={116} rx="13" ry="6.5" fill="#3D2510"/>
          <image href={TEX.boots} x="7" y={110} width="26" height="13"
            clipPath={`url(#lb_${type})`} preserveAspectRatio="xMidYMid slice" opacity="0.55"/>
          <ellipse cx="17" cy={113} rx="5" ry="2.5" fill="rgba(255,255,255,0.18)"/>

          <clipPath id={`rb_${type}`}><ellipse cx="44" cy={116} rx="13" ry="6.5"/></clipPath>
          <ellipse cx="44" cy={116} rx="13" ry="6.5" fill="#3D2510"/>
          <image href={TEX.boots} x="31" y={110} width="26" height="13"
            clipPath={`url(#rb_${type})`} preserveAspectRatio="xMidYMid slice" opacity="0.55"/>
          <ellipse cx="41" cy={113} rx="5" ry="2.5" fill="rgba(255,255,255,0.18)"/>

          {/* Shine on body */}
          <ellipse cx="20" cy="28" rx="9" ry="6" fill="rgba(255,255,255,0.18)" transform="rotate(-20 20 28)"/>
        </g>
      </svg>

      <style>{`
        @keyframes leftLeg  { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
        @keyframes rightLeg { from { transform: rotate(16deg); } to { transform: rotate(-16deg); } }
        @keyframes ghostFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}
