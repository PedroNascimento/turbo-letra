"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import RunControls from "@/components/RunControls";
import { getBlocks, getSettings, Settings, defaultSettings } from "@/lib/storage";
import { formatTime } from "@/lib/timer";
import { playBeep } from "@/lib/audio";

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

    setBlocks(b);
    setSettings(s);
    setTimeLeft(s.timePerBlock);
    setState("running");
    setLoaded(true);

    document.documentElement.classList.toggle("dark", s.theme === "dark");

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

  // Timer tick
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
        if (prev <= 1) return 0;
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

  // Handle time reaching zero
  useEffect(() => {
    if (timeLeft !== 0 || state !== "running") return;

    if (settings.beepEnabled) {
      playBeep();
    }

    if (currentBlock < blocks.length - 1) {
      setCurrentBlock((prev) => prev + 1);
      setTimeLeft(settings.timePerBlock);
    } else {
      setState("finished");
    }
  }, [timeLeft, state, currentBlock, blocks.length, settings]);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-8 p-6">
        <div className="text-center space-y-5">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <span className="text-5xl">✅</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold">Concluído!</h1>
            <p className="text-lg text-muted">
              Todos os <span className="font-bold text-foreground">{blocks.length}</span> blocos
              foram finalizados.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="px-8 py-4 bg-gradient-to-r from-accent to-purple-600 text-white text-lg font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl active:scale-95"
          >
            🔁 Recomeçar
          </button>
          <button
            onClick={handleExit}
            className="px-8 py-4 bg-card border border-card-border text-foreground text-lg font-bold rounded-2xl hover:border-accent/40 transition-all duration-200 shadow-sm active:scale-95"
          >
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-background text-foreground transition-all duration-300 ${
        isWarning ? "warning-ring" : ""
      }`}
    >
      {/* Top bar */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-start justify-between">
          {/* Block info */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-muted">Bloco</p>
            <p className="text-2xl font-extrabold">
              <span className="text-accent">{currentBlock + 1}</span>
              <span className="text-muted mx-1">/</span>
              <span className="text-muted">{blocks.length}</span>
            </p>
          </div>

          {/* Timer */}
          <div className="text-right space-y-1">
            <p className="text-sm font-semibold text-muted">
              {state === "paused" ? "⏸ Pausado" : "Tempo restante"}
            </p>
            <p
              className={`text-5xl font-mono font-black tracking-tight tabular-nums ${
                isWarning
                  ? "text-timer-warning timer-warning"
                  : "text-timer"
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
            className="text-center whitespace-pre-wrap text-foreground"
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
      <div className="px-6 py-5 bg-card/50 backdrop-blur-sm border-t border-card-border">
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
        <p className="text-center text-xs text-muted/50 mt-3 hidden sm:block">
          Espaço (pausar) · ← → (navegar) · R (reiniciar) · Esc (sair)
        </p>
      </div>
    </div>
  );
}
