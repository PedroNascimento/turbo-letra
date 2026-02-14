"use client";

import { Settings } from "@/lib/storage";

interface SettingsPanelProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

export default function SettingsPanel({
  settings,
  onChange,
}: SettingsPanelProps) {
  function update(partial: Partial<Settings>) {
    onChange({ ...settings, ...partial });
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {/* Time per block */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary flex justify-between">
          Tempo por bloco
          <span className="text-accent font-bold bg-accent-light px-2 py-0.5 rounded text-xs">
            {Math.floor(settings.timePerBlock / 60)}:
            {(settings.timePerBlock % 60).toString().padStart(2, "0")}
          </span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="5"
            max="600"
            step="5"
            value={settings.timePerBlock}
            onChange={(e) => update({ timePerBlock: Number(e.target.value) })}
            className="flex-1 h-2 bg-muted-bg rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <p className="text-xs text-text-secondary">
          Ajuste entre 5 segundos e 10 minutos.
        </p>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary">
          Tamanho da fonte
        </label>
        <div className="flex bg-muted-bg/50 p-1 rounded-xl">
          {[24, 32, 40, 48].map((size) => (
            <button
              key={size}
              onClick={() => update({ fontSize: size })}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                settings.fontSize === size
                  ? "bg-card text-accent shadow-sm border border-card-border"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {size === 24 ? "P" : size === 32 ? "M" : size === 40 ? "G" : "GG"}
            </button>
          ))}
        </div>
      </div>

      {/* Line Height */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary">
          Espaçamento entre linhas
        </label>
        <div className="flex bg-muted-bg/50 p-1 rounded-xl">
          {[1.2, 1.5, 1.8].map((height) => (
            <button
              key={height}
              onClick={() => update({ lineHeight: height })}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                settings.lineHeight === height
                  ? "bg-card text-accent shadow-sm border border-card-border"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {height === 1.2
                ? "Compacto"
                : height === 1.5
                ? "Normal"
                : "Espaçado"}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-xl border border-card-border hover:border-accent-light transition-colors bg-card">
          <span className="text-sm font-medium text-text-primary">
            Tema Escuro
          </span>
          <button
            onClick={() =>
              update({ theme: settings.theme === "dark" ? "light" : "dark" })
            }
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              settings.theme === "dark" ? "bg-text-primary" : "bg-muted-bg"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                settings.theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl border border-card-border hover:border-accent-light transition-colors bg-card">
          <span className="text-sm font-medium text-text-primary">
            Som ao finalizar (Beep)
          </span>
          <button
            onClick={() => update({ beepEnabled: !settings.beepEnabled })}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              settings.beepEnabled ? "bg-accent" : "bg-muted-bg"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                settings.beepEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
