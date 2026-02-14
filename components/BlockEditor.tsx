"use client";

import { useState } from "react";

interface BlockEditorProps {
  blocks: string[];
  onChange: (blocks: string[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [mode, setMode] = useState<"paste" | "list">(
    blocks.length > 0 ? "list" : "paste"
  );
  const [rawText, setRawText] = useState("");

  function handleGenerate() {
    if (!rawText.trim()) return;
    const newBlocks = rawText
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    onChange([...blocks, ...newBlocks]);
    setRawText("");
    setMode("list");
  }

  function handleRemove(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function handleClearAll() {
    onChange([]);
    setMode("paste");
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex bg-muted-bg rounded-xl p-1 gap-1">
        <button
          onClick={() => setMode("paste")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
            mode === "paste"
              ? "bg-card text-foreground shadow-md"
              : "text-muted hover:text-foreground"
          }`}
        >
          ✏️ Colar texto
        </button>
        <button
          onClick={() => setMode("list")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
            mode === "list"
              ? "bg-card text-foreground shadow-md"
              : "text-muted hover:text-foreground"
          }`}
        >
          📋 Blocos {blocks.length > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-accent text-white">
              {blocks.length}
            </span>
          )}
        </button>
      </div>

      {/* Paste mode */}
      {mode === "paste" && (
        <div className="space-y-3">
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Cole o texto aqui...&#10;&#10;Parágrafos separados por linha em branco viram blocos diferentes."
            rows={8}
            className="w-full rounded-xl border-2 border-card-border bg-card text-foreground p-4 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent placeholder:text-muted transition-all duration-200"
          />
          <button
            onClick={handleGenerate}
            disabled={!rawText.trim()}
            className="w-full py-3 px-4 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Gerar blocos
          </button>
        </div>
      )}

      {/* List mode */}
      {mode === "list" && (
        <div className="space-y-2">
          {blocks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-4xl">📝</p>
              <p className="text-muted text-sm">
                Nenhum bloco adicionado ainda.
              </p>
              <button
                onClick={() => setMode("paste")}
                className="text-accent hover:text-accent-hover text-sm font-semibold transition-colors"
              >
                Colar texto →
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {blocks.map((block, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 p-3 bg-card rounded-xl border border-card-border hover:border-accent/30 transition-all duration-200"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-sm text-foreground/80 truncate leading-relaxed">
                      {block}
                    </p>
                    <div className="flex gap-0.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleMove(i, -1)}
                        disabled={i === 0}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-muted-bg disabled:opacity-20 disabled:cursor-not-allowed transition-all text-xs"
                        title="Mover para cima"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMove(i, 1)}
                        disabled={i === blocks.length - 1}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-muted-bg disabled:opacity-20 disabled:cursor-not-allowed transition-all text-xs"
                        title="Mover para baixo"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleRemove(i)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-all text-xs"
                        title="Remover"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleClearAll}
                className="w-full py-2.5 text-sm text-danger/70 hover:text-danger font-medium transition-colors rounded-xl hover:bg-danger/5"
              >
                Limpar todos os blocos
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
