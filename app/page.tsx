"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import BlockEditor from "@/components/BlockEditor";
import SettingsPanel from "@/components/SettingsPanel";
import {
  getBlocks,
  setBlocks as saveBlocks,
  getSettings,
  setSettings as saveSettings,
  Settings,
  defaultSettings,
} from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();
  const [blocks, setBlocksState] = useState<string[]>([]);
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBlocksState(getBlocks());
    const s = getSettings();
    setSettingsState(s);
    document.documentElement.classList.toggle("dark", s.theme === "dark");
    setLoaded(true);
  }, []);

  const handleBlocksChange = useCallback((newBlocks: string[]) => {
    setBlocksState(newBlocks);
    saveBlocks(newBlocks);
  }, []);

  const handleSettingsChange = useCallback((newSettings: Settings) => {
    setSettingsState(newSettings);
    saveSettings(newSettings);
    document.documentElement.classList.toggle(
      "dark",
      newSettings.theme === "dark"
    );
  }, []);

  function handleStart() {
    if (blocks.length === 0) return;
    saveBlocks(blocks);
    saveSettings(settings);
    router.push("/run");
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 py-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="inline-block mr-2">⚡</span>
            <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              Turbo Letra
            </span>
          </h1>
          <p className="text-sm text-muted font-medium">
            Treino de escrita com blocos cronometrados
          </p>
        </header>

        {/* Block Editor Card */}
        <section className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-sm">📝</span>
            Blocos de texto
          </h2>
          <BlockEditor blocks={blocks} onChange={handleBlocksChange} />
        </section>

        {/* Settings Card */}
        <section className="bg-card rounded-2xl border border-card-border p-5 shadow-sm">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-sm">⚙️</span>
            Configurações
          </h2>
          <SettingsPanel settings={settings} onChange={handleSettingsChange} />
        </section>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={blocks.length === 0}
          className="w-full py-4 bg-gradient-to-r from-accent to-purple-600 hover:from-accent-hover hover:to-purple-700 disabled:from-muted-bg disabled:to-muted-bg disabled:text-muted disabled:cursor-not-allowed text-white text-xl font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] disabled:shadow-none"
        >
          {blocks.length === 0
            ? "Adicione blocos para começar"
            : `▶ Iniciar treino · ${blocks.length} bloco${blocks.length > 1 ? "s" : ""}`}
        </button>

        {/* Footer hint */}
        <p className="text-center text-xs text-muted/60">
          Dica: ao iniciar, a tela entrará em modo cheio. Use Esc para sair.
        </p>
      </div>
    </div>
  );
}
