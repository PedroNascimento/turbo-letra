"use client";

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
  const btnBase =
    "flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all duration-200 active:scale-95 text-base";
  const btnSecondary =
    "bg-card border border-card-border text-foreground hover:border-accent/40 shadow-sm hover:shadow-md";

  return (
    <div className="flex items-center justify-center gap-2.5 flex-wrap">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`${btnBase} ${btnSecondary} disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-sm`}
        title="Anterior (←)"
      >
        ◀ <span className="hidden sm:inline">Anterior</span>
      </button>

      <button
        onClick={onTogglePause}
        className={`${btnBase} text-white shadow-lg hover:shadow-xl ${
          isPaused
            ? "bg-success hover:brightness-110"
            : "bg-warning hover:brightness-110"
        }`}
        title="Pausar/Continuar (Espaço)"
      >
        {isPaused ? "▶ Continuar" : "⏸ Pausar"}
      </button>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`${btnBase} ${btnSecondary} disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-sm`}
        title="Próximo (→)"
      >
        <span className="hidden sm:inline">Próximo</span> ▶
      </button>

      <button
        onClick={onRestart}
        className={`${btnBase} ${btnSecondary}`}
        title="Reiniciar bloco (R)"
      >
        🔁 <span className="hidden sm:inline">Reiniciar</span>
      </button>

      <button
        onClick={onExit}
        className={`${btnBase} bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 shadow-sm`}
        title="Sair (Esc)"
      >
        ✕ <span className="hidden sm:inline">Sair</span>
      </button>
    </div>
  );
}
