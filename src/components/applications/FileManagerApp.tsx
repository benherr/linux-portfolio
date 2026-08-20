"use client";

import React, { useState } from "react";
import { FSNode } from "@/types/portfolio";
import { getFSNodeByPath, virtualFileSystem } from "@/data/filesystem";
import { Folder, FileText, ChevronRight, Home, HardDrive, ArrowLeft, Eye, X } from "lucide-react";

export const FileManagerApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("/home/benher");
  const [selectedFile, setSelectedFile] = useState<FSNode | null>(null);

  const currentNode = getFSNodeByPath(currentPath) || virtualFileSystem;

  const navigateTo = (path: string) => {
    const node = getFSNodeByPath(path);
    if (node && node.type === "directory") {
      setCurrentPath(node.path);
      setSelectedFile(null);
    }
  };

  const handleBack = () => {
    if (currentPath === "/") return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    const parentPath = "/" + parts.join("/");
    navigateTo(parentPath || "/");
  };

  const handleNodeClick = (node: FSNode) => {
    if (node.type === "directory") {
      navigateTo(node.path);
    } else {
      setSelectedFile(node);
    }
  };

  const breadcrumbParts = currentPath.split("/").filter(Boolean);

  return (
    <div className="h-full flex flex-col bg-[#0d0f22] text-slate-200 font-sans text-xs select-none">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="h-10 border-b border-[#282d54] px-3 flex items-center justify-between bg-[#131630]/70">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pr-2">
          <button
            onClick={handleBack}
            disabled={currentPath === "/"}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
          </button>

          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1 font-mono text-xs text-slate-400">
            <button
              onClick={() => navigateTo("/")}
              className="hover:text-ninja-gold transition cursor-pointer"
            >
              /
            </button>
            {breadcrumbParts.map((part, idx) => {
              const fullPath = "/" + breadcrumbParts.slice(0, idx + 1).join("/");
              const isLast = idx === breadcrumbParts.length - 1;
              return (
                <React.Fragment key={fullPath}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <button
                    onClick={() => navigateTo(fullPath)}
                    className={`hover:text-ninja-gold transition cursor-pointer truncate ${
                      isLast ? "text-ninja-gold font-bold" : ""
                    }`}
                  >
                    {part}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          {currentNode.children ? `${currentNode.children.length} items` : "0 items"}
        </div>
      </div>

      {/* Main Body: Sidebar + File List */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 border-r border-[#282d54] bg-[#131630]/40 p-3 space-y-3 shrink-0 hidden sm:block">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            Locations
          </div>
          <div className="space-y-1">
            {[
              { label: "Home", path: "/home/benher", icon: Home },
              { label: "Projects", path: "/home/benher/projects", icon: Folder },
              { label: "Skills", path: "/home/benher/skills", icon: Folder },
              { label: "Security", path: "/home/benher/cybersecurity", icon: Folder },
              { label: "Root (/)", path: "/", icon: HardDrive },
            ].map((loc) => {
              const Icon = loc.icon;
              const isActive = currentPath === loc.path;
              return (
                <button
                  key={loc.path}
                  onClick={() => navigateTo(loc.path)}
                  className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded transition text-left cursor-pointer ${
                    isActive
                      ? "bg-[#1d1e42] text-ninja-gold border border-ninja-gold/40 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{loc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Items Content Grid (Single Click to Open Folder or Read File) */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-thin space-y-4">
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {currentNode.children?.map((child) => (
              <button
                key={child.path}
                onClick={() => handleNodeClick(child)}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-2 text-center transition group cursor-pointer ${
                  selectedFile?.path === child.path
                    ? "bg-[#1d1e42] border-ninja-gold shadow-glow-gold"
                    : "bg-[#13142e]/60 border-[#2b2c52] hover:border-ninja-gold/50 hover:bg-[#181a3d]"
                }`}
              >
                {child.type === "directory" ? (
                  <Folder className="w-9 h-9 text-ninja-gold group-hover:scale-105 transition" />
                ) : (
                  <FileText className="w-9 h-9 text-ninja-[#10b981] group-hover:scale-105 transition text-emerald-400" />
                )}
                <div className="w-full">
                  <div className="text-xs font-medium text-slate-200 truncate group-hover:text-white">
                    {child.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {child.type === "directory" ? "Folder" : child.size || "File"}
                  </div>
                </div>
              </button>
            ))}
            {(!currentNode.children || currentNode.children.length === 0) && (
              <div className="col-span-full text-center text-slate-500 py-10 font-mono">
                This directory is empty.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Content Previewer Modal Overlay */}
      {selectedFile && (
        <div className="absolute inset-0 bg-[#090a18]/95 backdrop-blur-md p-4 z-[10] flex flex-col space-y-3 font-mono">
          <div className="flex justify-between items-center border-b border-[#282d54] pb-2">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-200 text-xs">{selectedFile.name}</span>
              <span className="text-[10px] text-slate-500">({selectedFile.size || "Text File"})</span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 bg-[#05060d] p-3 rounded border border-[#282d54] overflow-y-auto text-xs text-slate-200 leading-relaxed whitespace-pre-wrap scrollbar-thin">
            {selectedFile.content || "No text content available for this node."}
          </div>
        </div>
      )}
    </div>
  );
};
