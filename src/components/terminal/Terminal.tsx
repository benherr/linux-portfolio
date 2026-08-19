"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { AppId } from "@/types/os";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface TerminalProps {
  openWindow?: (id: AppId) => void;
  closeWindow?: (id: AppId) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ openWindow, closeWindow }) => {
  const [input, setInput] = useState<string>("");
  const { cwd, outputs, executeCommand, navigateHistory, autocomplete } = useTerminal(
    openWindow,
    closeWindow
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevCmd = navigateHistory("up");
      if (prevCmd) setInput(prevCmd);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextCmd = navigateHistory("down");
      setInput(nextCmd);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completed = autocomplete(input);
      setInput(completed);
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      executeCommand("clear");
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setInput("");
    }
  };

  return (
    <div
      className="h-full bg-[#080c14] text-slate-200 font-mono text-xs sm:text-sm p-3 flex flex-col justify-between overflow-hidden select-text cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable Shell Output Log */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {outputs.map((out) => (
          <div key={out.id} className="whitespace-pre-wrap leading-relaxed">
            {out.type === "error" && <span className="text-rose-400 font-semibold">{out.content}</span>}
            {out.type === "success" && <span className="text-emerald-400">{out.content}</span>}
            {out.type === "warning" && <span className="text-amber-400">{out.content}</span>}
            {out.type === "info" && <span className="text-cyan-400">{out.content}</span>}
            {(out.type === "text" || out.type === "banner" || out.type === "table") && (
              <div>{out.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Line */}
      <div className="pt-2 border-t border-ninja-border/40 flex items-center space-x-2 shrink-0">
        <span className="text-ninja-green font-bold shrink-0">ninja@NinjaOS</span>
        <span className="text-slate-500">:</span>
        <span className="text-ninja-cyan font-semibold shrink-0">{cwd}</span>
        <span className="text-slate-300 font-bold">$</span>
        <div className="flex-1 relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-100 focus:outline-none font-mono caret-ninja-cyan"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
