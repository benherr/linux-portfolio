"use client";

import React, { useState, useRef } from "react";
import { WindowState, ThemeMode, AccentColor } from "@/types/os";
import { Minus, Square, Copy, X } from "lucide-react";
import { motion } from "framer-motion";
import { ACCENT_MAP } from "@/utils/theme";

interface WindowFrameProps {
  windowState: WindowState;
  themeMode?: ThemeMode;
  accentColor?: AccentColor;
  glassOpacity?: number;
  onClose: (id: WindowState["id"]) => void;
  onFocus: (id: WindowState["id"]) => void;
  onMinimize: (id: WindowState["id"]) => void;
  onMaximize: (id: WindowState["id"]) => void;
  onPositionChange: (id: WindowState["id"], pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  themeMode = "dark",
  accentColor = "match",
  glassOpacity = 65,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onPositionChange,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasUserDragged, setHasUserDragged] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const accent = ACCENT_MAP[accentColor] || ACCENT_MAP.match;
  const isLight = themeMode === "light";

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!windowState.isOpen) {
      setHasUserDragged(false);
    }
  }, [windowState.isOpen]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  // Calculate live window glass opacity & blur filter values
  const opacityFraction = (glassOpacity / 100).toFixed(2);
  const blurPx = Math.round(glassOpacity / 4);

  const containerBg = isLight
    ? `rgba(248, 250, 252, ${opacityFraction})`
    : `rgba(18, 14, 36, ${opacityFraction})`;

  const headerBg = isLight
    ? `rgba(226, 232, 240, ${Math.min(1, parseFloat(opacityFraction) + 0.15)})`
    : `rgba(24, 18, 48, ${Math.min(1, parseFloat(opacityFraction) + 0.15)})`;

  const windowWidthPx = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.95, 680) : 680;
  const mobileCenterX = typeof window !== "undefined" ? Math.max(4, Math.round((window.innerWidth - windowWidthPx) / 2)) : 4;

  const currentX = windowState.isMaximized
    ? 0
    : isMobile && !hasUserDragged
    ? mobileCenterX
    : windowState.position.x;

  const currentY = windowState.isMaximized
    ? 0
    : isMobile && !hasUserDragged
    ? 0
    : windowState.position.y;

  return (
    <motion.div
      ref={dragRef}
      initial={false}
      animate={{
        x: currentX,
        y: currentY,
        width: windowState.isMaximized
          ? "100vw"
          : isMobile
          ? "min(95vw, 680px)"
          : windowState.size.width,
        height: windowState.isMaximized
          ? "calc(100vh - 36px)"
          : isMobile
          ? "calc(100vh - 120px)"
          : windowState.size.height,
      }}
      transition={{ duration: isDragging ? 0 : 0.15, ease: "easeOut" }}
      style={{
        zIndex: windowState.zIndex,
        backgroundColor: containerBg,
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
      }}
      onClick={() => onFocus(windowState.id)}
      className={`fixed top-9 left-0 sm:left-auto flex flex-col rounded-xl overflow-hidden shadow-2xl border transition-colors duration-200 ${
        windowState.isMaximized ? "rounded-none top-9" : ""
      } ${
        isLight
          ? "border-slate-300 text-slate-900 shadow-slate-400/30"
          : "border-[#2b2c52] text-slate-100 shadow-black/50"
      }`}
    >
      {/* Window Title Bar Header */}
      <div
        style={{ backgroundColor: headerBg, touchAction: "none" }}
        className={`h-9 px-3.5 flex items-center justify-between select-none cursor-grab active:cursor-grabbing border-b transition-colors touch-none ${
          isLight ? "border-slate-300 text-slate-800" : "border-white/10 text-slate-200"
        }`}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) {
            return;
          }
          onFocus(windowState.id);
          setIsDragging(true);
          const initialX = isMobile && !hasUserDragged ? mobileCenterX : windowState.position.x;
          const initialY = isMobile && !hasUserDragged ? 0 : windowState.position.y;
          const startX = e.clientX - initialX;
          const startY = e.clientY - initialY;

          const onPointerMove = (moveEvent: PointerEvent) => {
            if (!windowState.isMaximized) {
              setHasUserDragged(true);
              const newX = Math.max(-50, Math.min(window.innerWidth - 80, moveEvent.clientX - startX));
              const newY = Math.max(-10, Math.min(window.innerHeight - 80, moveEvent.clientY - startY));
              onPositionChange(windowState.id, { x: newX, y: newY });
            }
          };

          const onPointerUp = () => {
            setIsDragging(false);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
          };

          window.addEventListener("pointermove", onPointerMove);
          window.addEventListener("pointerup", onPointerUp);
        }}
      >
        {/* Left: Window Title & Accent Dot */}
        <div className="flex items-center space-x-2 truncate">
          <span style={{ color: accent.hex }} className="text-xs">●</span>
          <span className="text-xs font-mono font-bold tracking-wide truncate">
            {windowState.title}
          </span>
        </div>

        {/* Right: Window Controls (Standard Cursor - No Pointer Change on Hover) */}
        <div className="flex items-center space-x-2.5 shrink-0 text-slate-400 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="hover:text-white p-0.5 rounded transition cursor-default"
            title="Minimize Window"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="hover:text-white p-0.5 rounded transition cursor-default"
            title={windowState.isMaximized ? "Restore Window" : "Maximize Window"}
          >
            {windowState.isMaximized ? (
              <Copy className="w-3 h-3" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(windowState.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="hover:text-white hover:bg-rose-600/80 p-0.5 rounded transition cursor-default"
            title="Close Window"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-auto scrollbar-thin relative font-sans">
        {children}
      </div>
    </motion.div>
  );
};
