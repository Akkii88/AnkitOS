import { ReactNode, useState, useRef } from "react";

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onDoubleClick: () => void;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  testId?: string;
  defaultX?: number;
  defaultY?: number;
  iconSize?: number;
}

export default function DesktopIcon({
  label,
  icon,
  onDoubleClick,
  selected,
  onClick,
  testId,
  defaultX = 16,
  defaultY = 16,
  iconSize = 48,
}: DesktopIconProps & { iconSize?: number }) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCount = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    dragRef.current = { startX: e.clientX, startY: e.clientY, initX: pos.x, initY: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) setHasMoved(true);
    setPos({ x: Math.max(0, dragRef.current.initX + dx), y: Math.max(0, dragRef.current.initY + dy) });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (hasMoved) return;

    clickCount.current += 1;
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
        onClick?.(e as unknown as React.MouseEvent);
      }, 250);
    } else if (clickCount.current === 2) {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickCount.current = 0;
      onDoubleClick();
    }
  };

  return (
    <div
      className={`absolute flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded transition-all select-none touch-none ${
        selected ? "bg-white/40 ring-2 ring-dashed ring-white/70" : "hover:bg-white/20"
      } ${isDragging ? "opacity-80 scale-105 drop-shadow-lg" : ""}`}
      style={{ left: pos.x, top: pos.y, zIndex: isDragging ? 999 : selected ? 11 : 10 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      data-testid={testId}
    >
      <div
        className="flex items-center justify-center transition-transform duration-150"
        style={{
          filter: selected ? "drop-shadow(0 0 8px rgba(232,131,42,0.7))" : "drop-shadow(1px 1px 0px rgba(0,0,0,0.1))",
          width: iconSize,
          height: iconSize,
        }}
      >
        {icon}
      </div>
      <span
        className="font-display text-[6px] font-normal leading-tight text-center px-0.5 truncate block tracking-tight"
        style={{
          color: "#ffffff",
          textShadow: "0 1px 2px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)",
          maxWidth: iconSize + 16,
        }}
        title={label}
      >
        {label}
      </span>
    </div>
  );
}
