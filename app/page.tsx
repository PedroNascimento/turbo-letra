"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import BlockEditor from "@/components/BlockEditor";
import SettingsPanel from "@/components/SettingsPanel";
import { Pencil, ScrollText, Settings as SettingsIcon } from "lucide-react";
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
    // Wrap in setTimeout to avoid "setState synchronously in effect" warning
    setTimeout(() => {
      setBlocksState(getBlocks());
      const s = getSettings();
      setSettingsState(s);
      document.documentElement.classList.toggle("dark", s.theme === "dark");
      setLoaded(true);
    }, 0);
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <h1 className="text-6xl sm:text-7xl font-rounded font-bold tracking-tight text-foreground flex items-center justify-center gap-4">
            <span>Turbo</span>
            <span className="text-accent">Letra</span>
            <Pencil className="w-12 h-12 sm:w-14 sm:h-14 text-accent rotate-12 transform hover:scale-110 transition-transform cursor-pointer" strokeWidth={2.5} />
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            Treine sua escrita copiando textos com tempo marcado!
          </p>
        </header>

        {/* Block Editor Card - Soft White Surface */}
        <section className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-3 text-text-primary">
            <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-accent">
              <ScrollText className="w-6 h-6" />
            </div>
            Blocos de texto
          </h2>
          <BlockEditor blocks={blocks} onChange={handleBlocksChange} />
        </section>

        {/* Settings Card */}
        <section className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-3 text-text-primary">
            <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-accent">
              <SettingsIcon className="w-6 h-6" />
            </div>
            Configurações
          </h2>
          <SettingsPanel settings={settings} onChange={handleSettingsChange} />
        </section>

        {/* Start button - Solid Mint */}
        <button
          onClick={handleStart}
          disabled={blocks.length === 0}
          className="w-full py-4 bg-accent hover:bg-accent-hover disabled:bg-muted-bg disabled:text-muted disabled:cursor-not-allowed text-white text-xl font-semibold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.99]"
        >
          {blocks.length === 0
            ? "Adicione blocos para começar"
            : <span className="flex items-center justify-center gap-2">Iniciar treino <Pencil className="w-5 h-5" /></span>}
        </button>

        {/* Footer hint */}
        <p className="text-center text-sm text-text-secondary opacity-70">
          Modo tela cheia automático ao iniciar.
        </p>
      </div>
    </div>
  );
}
