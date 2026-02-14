"use client";

import { Settings } from "@/lib/storage";

interface SettingsPanelProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

export default function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  function update(partial: Partial<Settings>) {
    onChange({ ...settings, ...partial });
  }

  const formatTimeLabel = (s: number) => {
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    return r > 0 ? `${m}min ${r}s` : `${m}min`;
  };

  return (
    <div className="space-y-6">
      {/* Time per block */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            ⏱️ Tempo por bloco
          </label>
          <span className="text-sm font-bold text-accent">
            {formatTimeLabel(settings.timePerBlock)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={5}
            max={300}
            step={5}
            value={settings.timePerBlock}
            onChange={(e) => update({ timePerBlock: Number(e.target.value) })}
            className="flex-1 h-2 rounded-full appearance-none bg-muted-bg accent-accent cursor-pointer"
          />
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={5}
              max={600}
              value={settings.timePerBlock}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= 5 && v <= 600) update({ timePerBlock: v });
              }}
              className="w-16 text-center py-2 rounded-xl border-2 border-card-border bg-card text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            <span className="text-xs text-muted font-medium">seg</span>
          </div>
        </div>
      </div>

      {/* Font size */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          🔤 Tamanho da fonte
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[24, 32, 40, 48].map((size) => (
            <button
              key={size}
              onClick={() => update({ fontSize: size })}
              className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                settings.fontSize === size
                  ? "bg-accent text-white shadow-md shadow-accent/25 scale-105"
                  : "bg-card border border-card-border text-foreground/70 hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>

      {/* Line height */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          📏 Espaçamento de linha
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 1.2, label: "Compacto" },
            { value: 1.5, label: "Normal" },
            { value: 1.8, label: "Espaçado" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => update({ lineHeight: value })}
              className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                settings.lineHeight === value
                  ? "bg-accent text-white shadow-md shadow-accent/25 scale-105"
                  : "bg-card border border-card-border text-foreground/70 hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {/* Theme */}
        <div className="flex items-center justify-between p-3 bg-card rounded-xl border border-card-border">
          <div className="flex items-center gap-2">
            <span className="text-base">{settings.theme === "dark" ? "🌙" : "☀️"}</span>
            <label className="text-sm font-semibold text-foreground">
              Tema {settings.theme === "dark" ? "escuro" : "claro"}
            </label>
          </div>
          <button
            onClick={() =>
              update({ theme: settings.theme === "dark" ? "light" : "dark" })
            }
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
              settings.theme === "dark" ? "bg-accent" : "bg-muted-bg"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm flex items-center justify-center text-xs ${
                settings.theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {settings.theme === "dark" ? "🌙" : "☀️"}
            </span>
          </button>
        </div>

        {/* Beep */}
        <div className="flex items-center justify-between p-3 bg-card rounded-xl border border-card-border">
          <div className="flex items-center gap-2">
            <span className="text-base">{settings.beepEnabled ? "🔔" : "🔕"}</span>
            <label className="text-sm font-semibold text-foreground">
              Beep ao finalizar
            </label>
          </div>
          <button
            onClick={() => update({ beepEnabled: !settings.beepEnabled })}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
              settings.beepEnabled ? "bg-accent" : "bg-muted-bg"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                settings.beepEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
