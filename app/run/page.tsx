"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import RunControls from "@/components/RunControls";
import { getBlocks, getSettings, Settings, defaultSettings } from "@/lib/storage";
import { formatTime } from "@/lib/timer";
import { playBeep } from "@/lib/audio";
import { Sparkles, RotateCcw, ArrowLeft, Timer, Layers } from "lucide-react";

type RunState = "running" | "paused" | "finished";

export default function RunPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [state, setState] = useState<RunState>("paused");
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load data and enter fullscreen
  useEffect(() => {
    const b = getBlocks();
    const s = getSettings();

    if (b.length === 0) {
      router.replace("/");
      return;
    }

    // Wrap in setTimeout to avoid "setState synchronously in effect" warning
    setTimeout(() => {
      setBlocks(b);
      setSettings(s);
      setTimeLeft(s.timePerBlock);
      setState("running");
      setLoaded(true);
      document.documentElement.classList.toggle("dark", s.theme === "dark");
    }, 0);

    try {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } catch {
      // Fullscreen not available
    }

    return () => {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        }
      } catch {
        // ignore
      }
    };
  }, [router]);

  // Refs for interval access
  const stateRef = useRef(state);
  const blocksRef = useRef(blocks);
  const currentBlockRef = useRef(currentBlock);
  const settingsRef = useRef(settings);

  useEffect(() => {
    stateRef.current = state;
    blocksRef.current = blocks;
    currentBlockRef.current = currentBlock;
    settingsRef.current = settings;
  }, [state, blocks, currentBlock, settings]);

  // Timer tick & Logic
  useEffect(() => {
    if (state !== "running") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time is up - Logic moved inside interval
          const s = settingsRef.current;
          const b = blocksRef.current;
          const cb = currentBlockRef.current;

          if (s.beepEnabled) {
             playBeep();
          }

          if (cb < b.length - 1) {
            setCurrentBlock(cb + 1);
            return s.timePerBlock;
          } else {
            setState("finished");
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state]);

  // Handle time reaching zero - REMOVED (logic integrated above)

  const goToBlock = useCallback(
    (index: number) => {
      if (index < 0 || index >= blocks.length) return;
      setCurrentBlock(index);
      setTimeLeft(settings.timePerBlock);
      if (state === "finished") setState("running");
    },
    [blocks.length, settings.timePerBlock, state]
  );

  const togglePause = useCallback(() => {
    if (state === "finished") return;
    setState((prev) => (prev === "running" ? "paused" : "running"));
  }, [state]);

  const restartBlock = useCallback(() => {
    setTimeLeft(settings.timePerBlock);
    if (state !== "running") setState("running");
  }, [settings.timePerBlock, state]);

  const handleExit = useCallback(() => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
    } catch {
      // ignore
    }
    router.push("/");
  }, [router]);

  const handleRestart = useCallback(() => {
    setCurrentBlock(0);
    setTimeLeft(settings.timePerBlock);
    setState("running");
  }, [settings.timePerBlock]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePause();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (currentBlock < blocks.length - 1) goToBlock(currentBlock + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (currentBlock > 0) goToBlock(currentBlock - 1);
          break;
        case "KeyR":
          e.preventDefault();
          restartBlock();
          break;
        case "Escape":
          e.preventDefault();
          handleExit();
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [togglePause, goToBlock, restartBlock, handleExit, currentBlock, blocks.length]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isWarning = state === "running" && timeLeft <= 5 && timeLeft > 0;

  // Finished screen
  if (state === "finished") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-8 p-6 transition-colors duration-500">
        <div className="text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-12 h-12 text-accent" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-text-primary">Muito bem!</h1>
            <p className="text-lg text-text-secondary max-w-md mx-auto">
              Você completou todos os <span className="font-semibold text-accent">{blocks.length}</span> blocos com tranquilidade.
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleRestart}
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white text-lg font-medium rounded-xl transition-all duration-200 shadow-sm active:scale-[0.98] flex items-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />
            Recomeçar
          </button>
          <button
            onClick={handleExit}
            className="px-8 py-4 bg-white border border-card-border hover:border-accent-light text-text-secondary text-lg font-medium rounded-xl transition-all duration-200 shadow-sm active:scale-[0.98] flex items-center gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
      {/* Top bar */}
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-start justify-between">
          {/* Block info */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
              <Layers className="w-4 h-4 opacity-70" />
              Bloco
            </p>
            <p className="text-2xl font-bold text-text-primary">
              <span className="text-accent">{currentBlock + 1}</span>
              <span className="text-muted mx-2">/</span>
              <span className="text-text-secondary">{blocks.length}</span>
            </p>
          </div>

          {/* Timer */}
          <div className="text-right space-y-1">
            <p className="text-sm font-medium text-text-secondary flex items-center justify-end gap-1.5">
              {state === "paused" ? "Pausado" : "Tempo"}
              <Timer className="w-4 h-4 opacity-70" />
            </p>
            <p
              className={`text-5xl font-mono font-bold tracking-tight tabular-nums transition-colors duration-1000 ${
                isWarning
                  ? "text-timer-warning font-black" // Visual warning: color shift + weight bump (subtle)
                  : "text-text-primary"
              }`}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </div>

      {/* Block text */}
      <div className="flex-1 flex items-center justify-center px-8 py-6">
        <div className="max-w-4xl w-full">
          <p
            className="text-center whitespace-pre-wrap text-text-primary transition-all duration-300"
            style={{
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight,
            }}
          >
            {blocks[currentBlock]}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 border-t border-card-border/50 bg-white/50 backdrop-blur-sm">
        <RunControls
          isPaused={state === "paused"}
          onTogglePause={togglePause}
          onPrevious={() => goToBlock(currentBlock - 1)}
          onNext={() => goToBlock(currentBlock + 1)}
          onRestart={restartBlock}
          onExit={handleExit}
          hasPrevious={currentBlock > 0}
          hasNext={currentBlock < blocks.length - 1}
        />
        <p className="text-center text-sm text-text-secondary/40 mt-4 hidden sm:block font-medium">
          Espaço para pausar · Setas para navegar
        </p>
      </div>
    </div>
  );
}
