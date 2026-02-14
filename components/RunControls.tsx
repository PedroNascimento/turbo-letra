"use client";

import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";

interface RunControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRestart: () => void;
  onExit: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default function RunControls({
  isPaused,
  onTogglePause,
  onPrevious,
  onNext,
  onRestart,
  onExit,
  hasPrevious,
  hasNext,
}: RunControlsProps) {
  // Soft, calm button base style
  const btnBase =
    "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-[0.98] text-sm sm:text-base shadow-sm hover:shadow-md";
  
  // Secondary buttons (Navigation, Restart) - White surface, soft border
  const btnSecondary =
    "bg-card text-foreground border border-card-border hover:bg-muted-bg hover:border-accent";

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`${btnBase} ${btnSecondary} disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-card`}
        title="Anterior (←)"
      >
        <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Anterior</span>
      </button>

      <button
        onClick={onTogglePause}
        className={`${btnBase} text-white min-w-[140px] justify-center ${
          isPaused
            ? "bg-accent hover:bg-accent-hover"  // "Continuar"
            : "bg-accent-hover hover:bg-accent"  // "Pausar"
        }`}
        title="Pausar/Continuar (Espaço)"
      >
        {isPaused ? <><Play className="w-5 h-5 fill-current" /> Continuar</> : <><Pause className="w-5 h-5 fill-current" /> Pausar</>}
      </button>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`${btnBase} ${btnSecondary} disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-card`}
        title="Próximo (→)"
      >
        <span className="hidden sm:inline">Próximo</span> <ChevronRight className="w-5 h-5" />
      </button>

      <button
        onClick={onRestart}
        className={`${btnBase} ${btnSecondary}`}
        title="Reiniciar bloco (R)"
      >
        <RotateCcw className="w-5 h-5" /> <span className="hidden sm:inline">Reiniciar</span>
      </button>

      <button
        onClick={onExit}
        className={`${btnBase} bg-card border border-card-border text-muted hover:bg-danger/10 hover:text-danger hover:border-danger/30 shadow-sm`}
        title="Sair (Esc)"
      >
        <X className="w-5 h-5" /> <span className="hidden sm:inline">Sair</span>
      </button>
    </div>
  );
}
