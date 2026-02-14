"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  exportState,
  validateImport,
} from "@/lib/storage";
import { useAutosave } from "@/hooks/useAutosave";
import { Download, Upload, Check, Save } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [blocks, setBlocksState] = useState<string[]>([]);
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);
  
  // Autosave
  const saveStatus = useAutosave({ blocks, settings });

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
    // saveBlocks handled by hook
  }, []);

  const handleSettingsChange = useCallback((newSettings: Settings) => {
    setSettingsState(newSettings);
    // saveSettings handled by hook
    document.documentElement.classList.toggle(
      "dark",
      newSettings.theme === "dark"
    );
  }, []);

  function handleStart() {
    if (blocks.length === 0) return;
    router.push("/run");
  }

  const handleExport = () => {
    const jsonString = exportState(blocks, settings);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `turbo-letra-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = validateImport(content);

      if (result.success) {
        setBlocksState(result.blocks);
        setSettingsState(result.settings);
        document.documentElement.classList.toggle("dark", result.settings.theme === "dark");
        // Force immediate save to storage to sync
        saveBlocks(result.blocks);
        saveSettings(result.settings);
        alert("Backup importado com sucesso! ✓");
      } else {
        alert(`Erro na importação: ${result.error}`);
      }
    };
    reader.readAsText(file);
    
    // Reset input
    e.target.value = "";
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-5">
        {/* Header */}
        <header className="text-center space-y-1 py-2 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[550px] hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.svg"
              alt="Turbo Letra Logo"
              width={600}
              height={200}
              className="w-full h-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
          <p className="text-base sm:text-lg text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed px-2">
            Treine sua escrita copiando textos com tempo marcado!
          </p>
        </header>
        {/* Persistence Toolbar */}
        <div className="flex justify-between items-center px-1 animate-in fade-in duration-700 delay-150">
          <div className="flex items-center gap-2 text-sm font-medium transition-colors">
            {saveStatus === 'saved' && (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 opacity-100 transition-opacity">
                <Check className="w-4 h-4" /> Salvo
              </span>
            )}
            {saveStatus === 'saving' && (
               <span className="text-text-secondary flex items-center gap-1.5 opacity-80">
                <Save className="w-3.5 h-3.5 animate-pulse" /> Salvando...
               </span>
            )}
          </div>

          <div className="flex items-center gap-3">
             <label className="cursor-pointer text-xs font-medium text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-muted-bg">
                <Upload className="w-3.5 h-3.5" />
                Importar
                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleImport}
                />
             </label>
             <button
               onClick={handleExport}
               className="text-xs font-medium text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-muted-bg"
             >
                <Download className="w-3.5 h-3.5" />
                Exportar
             </button>
          </div>
        </div>

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
