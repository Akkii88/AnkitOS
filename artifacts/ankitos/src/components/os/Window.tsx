import { ReactNode, useState, useRef, useCallback, useEffect } from "react";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultWidth?: number;
  defaultHeight?: number;
  offsetX?: number;
  offsetY?: number;
}

export default function Window({
  id,
  title,
  children,
  onClose,
  onFocus,
  zIndex,
  defaultWidth = 416,
  defaultHeight = 288,
  offsetX = 0,
  offsetY = 0,
}: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const actionRef = useRef<{
    type: "drag" | "resize";
    direction?: string;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  const toggleMaximize = () => {
    if (isMinimized) setIsMinimized(false);
    setIsMaximized(v => !v);
  };

  const toggleMinimize = () => {
    if (isMaximized) setIsMaximized(false);
    setIsMinimized(v => !v);
  };

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (isMaximized) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const rect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
      actionRef.current = {
        type: "drag",
        startX: e.clientX,
        startY: e.clientY,
        startW: 0,
        startH: 0,
        startLeft: rect?.left ?? 0,
        startTop: rect?.top ?? 0,
      };
    },
    [isMaximized]
  );

  const startResize = useCallback(
    (e: React.PointerEvent, direction: string) => {
      if (isMaximized) return;
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const rect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
      actionRef.current = {
        type: "resize",
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startW: rect?.width ?? size.width,
        startH: rect?.height ?? size.height,
        startLeft: rect?.left ?? 0,
        startTop: rect?.top ?? 0,
      };
    },
    [isMaximized, size]
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!actionRef.current) return;
      const { type, direction, startX, startY, startW, startH, startLeft, startTop } = actionRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (type === "drag") {
        setPos({ x: startLeft + dx, y: startTop + dy });
        return;
      }

      let newW = startW;
      let newH = startH;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction?.includes("e")) newW = Math.max(320, startW + dx);
      if (direction?.includes("w")) {
        newW = Math.max(320, startW - dx);
        newLeft = startLeft + (startW - newW);
      }
      if (direction?.includes("s")) newH = Math.max(200, startH + dy);
      if (direction?.includes("n")) {
        newH = Math.max(200, startH - dy);
        newTop = startTop + (startH - newH);
      }

      setSize({ width: newW, height: newH });
      setPos({ x: newLeft, y: newTop });
    };

    const onUp = () => {
      actionRef.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const winStyle: React.CSSProperties = isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100dvh - 48px)", zIndex, transform: "none" }
    : pos
      ? { top: pos.y, left: pos.x, width: size.width, height: isMinimized ? 40 : size.height, zIndex, transform: "none" }
      : {
          top: `calc(50% + ${offsetY}px)`,
          left: `calc(50% + ${offsetX}px)`,
          transform: "translate(-50%, -50%)",
          width: size.width,
          height: isMinimized ? 40 : size.height,
          zIndex,
          transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        };

  const resizeHandle =
    "absolute z-20 touch-none";
  const resizeHandleSide =
    "bg-transparent hover:bg-[#E8832A]/20 active:bg-[#E8832A]/40";
  const resizeHandleCorner =
    "bg-transparent hover:bg-[#E8832A]/40 active:bg-[#E8832A]/60";

  return (
    <div
      className="absolute flex flex-col bg-[#FFFDF7] border-2 border-[#E8D5B0] shadow-[4px_4px_0px_#C4A882] overflow-hidden rounded-lg"
      style={winStyle}
      onPointerDownCapture={onFocus}
      data-testid={`window-${id}`}
    >
      {/* Resize handles */}
      {!isMaximized && (
        <>
          <div className={`${resizeHandle} ${resizeHandleSide} top-0 left-3 right-3 h-1.5 cursor-ns-resize`} onPointerDown={(e) => startResize(e, "n")} />
          <div className={`${resizeHandle} ${resizeHandleSide} bottom-0 left-3 right-3 h-1.5 cursor-ns-resize`} onPointerDown={(e) => startResize(e, "s")} />
          <div className={`${resizeHandle} ${resizeHandleSide} top-3 bottom-3 left-0 w-1.5 cursor-ew-resize`} onPointerDown={(e) => startResize(e, "w")} />
          <div className={`${resizeHandle} ${resizeHandleSide} top-3 bottom-3 right-0 w-1.5 cursor-ew-resize`} onPointerDown={(e) => startResize(e, "e")} />
          <div className={`${resizeHandle} ${resizeHandleCorner} top-0 left-0 w-3 h-3 cursor-nwse-resize`} onPointerDown={(e) => startResize(e, "nw")} />
          <div className={`${resizeHandle} ${resizeHandleCorner} top-0 right-0 w-3 h-3 cursor-nesw-resize`} onPointerDown={(e) => startResize(e, "ne")} />
          <div className={`${resizeHandle} ${resizeHandleCorner} bottom-0 left-0 w-3 h-3 cursor-nesw-resize`} onPointerDown={(e) => startResize(e, "sw")} />
          <div className={`${resizeHandle} ${resizeHandleCorner} bottom-0 right-0 w-3 h-3 cursor-nwse-resize`} onPointerDown={(e) => startResize(e, "se")} />
        </>
      )}

      {/* Title Bar */}
      <div
        className={`h-10 bg-[#E8832A] flex items-center px-3 select-none touch-none shrink-0 ${isMaximized ? "cursor-default" : "cursor-move"}`}
        onPointerDown={startDrag}
      >
        {/* Traffic lights */}
        <div className="flex gap-2 items-center z-10">
          <button
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-110 flex items-center justify-center group"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            data-testid={`btn-close-${id}`}
            title="Close"
          >
            <span className="hidden group-hover:block text-[8px] text-[#900] font-bold leading-none">✕</span>
          </button>
          <button
            className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-110 flex items-center justify-center group"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); toggleMinimize(); }}
            data-testid={`btn-minimize-${id}`}
            title="Minimize"
          >
            <span className="hidden group-hover:block text-[8px] text-[#7a5100] font-bold leading-none">−</span>
          </button>
          <button
            className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-110 flex items-center justify-center group"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            data-testid={`btn-maximize-${id}`}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <span className="hidden group-hover:block text-[8px] text-[#006400] font-bold leading-none">{isMaximized ? "⊡" : "⊞"}</span>
          </button>
        </div>

        <span className="font-display text-[10px] text-white absolute left-0 right-0 text-center pointer-events-none px-16 truncate">
          {title}
        </span>
      </div>

      {/* Body */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-4 os-scrollbar min-h-0 animate-in fade-in duration-200">
          {children}
        </div>
      )}

      <style>{`
        .os-scrollbar::-webkit-scrollbar { width: 10px; }
        .os-scrollbar::-webkit-scrollbar-track { background: #F5E6C8; }
        .os-scrollbar::-webkit-scrollbar-thumb { background: #E8832A; border: 2px solid #F5E6C8; }
      `}</style>
    </div>
  );
}
