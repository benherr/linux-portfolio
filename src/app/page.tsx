"use client";

import React, { useState } from "react";
import { useBootSequence } from "@/hooks/useBootSequence";
import { useWindowManager } from "@/hooks/useWindowManager";
import { BootScreen } from "@/components/boot/BootScreen";
import { Desktop } from "@/components/desktop/Desktop";

export default function Home() {
  const { bootStage, logs, progress, completeBoot, skipBoot } = useBootSequence();
  const windowManager = useWindowManager();
  const [userEntered, setUserEntered] = useState<boolean>(false);

  const handleEnterWorkspace = () => {
    setUserEntered(true);
    completeBoot();
  };

  const handleSkipBoot = () => {
    setUserEntered(true);
    skipBoot();
  };

  const isBootActive = bootStage !== "complete" && !userEntered;

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#070814]">
      {/* Boot Screen & BENHER User Login Screen */}
      {isBootActive && (
        <BootScreen
          bootStage={bootStage}
          logs={logs}
          progress={progress}
          onCompleteLogin={handleEnterWorkspace}
          onSkip={handleSkipBoot}
        />
      )}

      {/* Main OS Desktop Canvas */}
      <Desktop
        windows={windowManager.windows}
        activeAppId={windowManager.activeAppId}
        openedApps={windowManager.openedApps}
        openWindow={windowManager.openWindow}
        closeWindow={windowManager.closeWindow}
        focusWindow={windowManager.focusWindow}
        toggleMinimize={windowManager.toggleMinimize}
        toggleMaximize={windowManager.toggleMaximize}
        updatePosition={windowManager.updatePosition}
      />
    </main>
  );
}
