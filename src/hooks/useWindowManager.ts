"use client";

import { useState, useCallback } from "react";
import { AppId, WindowState } from "@/types/os";

export const INITIAL_WINDOWS: WindowState[] = [
  {
    id: "terminal",
    title: "Ninja Terminal",
    iconName: "Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 80, y: 50 },
    size: { width: 720, height: 460 },
  },
  {
    id: "about",
    title: "Memory (About)",
    iconName: "User",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 120, y: 70 },
    size: { width: 680, height: 480 },
  },
  {
    id: "projects",
    title: "Experiments (Projects)",
    iconName: "Briefcase",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 80 },
    size: { width: 840, height: 520 },
  },
  {
    id: "security",
    title: "Cybersecurity Lab",
    iconName: "ShieldCheck",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 180, y: 60 },
    size: { width: 820, height: 540 },
  },
  {
    id: "files",
    title: "Archives (Files)",
    iconName: "Folder",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 90 },
    size: { width: 760, height: 480 },
  },
  {
    id: "skills",
    title: "Skills Matrix",
    iconName: "Cpu",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 220, y: 70 },
    size: { width: 720, height: 500 },
  },
  {
    id: "certifications",
    title: "Credentials",
    iconName: "Award",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 240, y: 100 },
    size: { width: 680, height: 460 },
  },
  {
    id: "resume",
    title: "Ideas & Resume",
    iconName: "FileText",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 260, y: 50 },
    size: { width: 700, height: 560 },
  },
  {
    id: "contact",
    title: "Network & Contact",
    iconName: "Mail",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 280, y: 120 },
    size: { width: 620, height: 440 },
  },
  {
    id: "sysmon",
    title: "Garage (Dev Tools)",
    iconName: "Activity",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 140, y: 110 },
    size: { width: 660, height: 460 },
  },
  {
    id: "settings",
    title: "System Settings",
    iconName: "Settings",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 160, y: 80 },
    size: { width: 680, height: 480 },
  },
  {
    id: "radio",
    title: "NinjaOS Lofi Radio",
    iconName: "Radio",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 210, y: 90 },
    size: { width: 580, height: 500 },
  },
  {
    id: "github",
    title: "BENHER GitHub Profile - NinjaOS Browser",
    iconName: "Github",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 130, y: 65 },
    size: { width: 800, height: 540 },
  },
  {
    id: "linkedin",
    title: "BENHER LinkedIn Network - NinjaOS Browser",
    iconName: "Linkedin",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 170, y: 85 },
    size: { width: 800, height: 540 },
  },
];

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [highestZIndex, setHighestZIndex] = useState<number>(10);
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [openedApps, setOpenedApps] = useState<Set<AppId>>(new Set());

  const focusWindow = useCallback(
    (id: AppId) => {
      setHighestZIndex((prev) => {
        const newZ = prev + 1;
        setWindows((prevWindows) =>
          prevWindows.map((w) =>
            w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
          )
        );
        return newZ;
      });
      setActiveAppId(id);
    },
    []
  );

  const openWindow = useCallback(
    (id: AppId) => {
      setOpenedApps((prev) => new Set(prev).add(id));
      setHighestZIndex((prev) => {
        const newZ = prev + 1;
        setWindows((prevWindows) =>
          prevWindows.map((w) =>
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ }
              : w
          )
        );
        return newZ;
      });
      setActiveAppId(id);
    },
    []
  );

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    setActiveAppId(null);
  }, []);

  const toggleMinimize = useCallback(
    (id: AppId) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id === id) {
            const nextMinimized = !w.isMinimized;
            if (!nextMinimized) {
              focusWindow(id);
            }
            return { ...w, isMinimized: nextMinimized };
          }
          return w;
        })
      );
    },
    [focusWindow]
  );

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const updatePosition = useCallback((id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos } : w))
    );
  }, []);

  return {
    windows,
    activeAppId,
    openedApps,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimize,
    toggleMaximize,
    updatePosition,
  };
}
