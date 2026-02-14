"use client";

import { useState } from "react";
import { ClipboardPaste, List, ChevronUp, ChevronDown, Trash2, Wand2 } from "lucide-react";

interface BlockEditorProps {
  blocks: string[];
  onChange: (blocks: string[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"paste" | "list">("paste");

  function handlePaste() {
    if (!text.trim()) return;
    const newBlocks = text
      .split(/\n\n+/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    onChange([...blocks, ...newBlocks]);
    setText("");
    setMode("list");
  }

  function removeBlock(index: number) {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onChange(newBlocks);
  }

  function moveBlock(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    )
      return;

    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];
    onChange(newBlocks);
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex bg-muted-bg/50 p-1 rounded-xl">
        <button
          onClick={() => setMode("paste")}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            mode === "paste"
              ? "bg-card text-accent shadow-sm border border-card-border"
              : "text-muted hover:text-foreground"
          }`}
        >
          <ClipboardPaste className="w-4 h-4" />
          Adicionar Texto
        </button>
        <button
          onClick={() => setMode("list")}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            mode === "list"
              ? "bg-card text-accent shadow-sm border border-card-border"
              : "text-muted hover:text-foreground"
          }`}
        >
          <List className="w-4 h-4" />
          Editar Blocos ({blocks.length})
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {mode === "paste" ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole seu texto aqui...&#10;&#10;Separe os blocos com uma linha em branco (Enter 2x)."
              className="w-full h-64 p-5 rounded-xl border border-card-border bg-surface2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none shadow-sm"
            />
            <button
              onClick={handlePaste}
              disabled={!text.trim()}
              className="w-full py-3 bg-accent hover:bg-accent-hover disabled:bg-muted-bg disabled:text-muted disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Gerar Blocos
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {blocks.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-text-secondary opacity-60 border-2 border-dashed border-card-border rounded-xl">
                <p>Nenhum bloco cadastrado ainda.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {blocks.map((block, index) => (
                  <div
                    key={index}
                    className="group bg-card border border-card-border p-4 rounded-xl flex gap-4 items-start shadow-sm hover:border-accent-light transition-colors"
                  >
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-accent-light text-accent text-sm font-bold rounded-lg mt-0.5">
                      {index + 1}
                    </span>
                    <p className="flex-1 text-sm text-text-primary leading-relaxed whitespace-pre-wrap line-clamp-3">
                      {block}
                    </p>
                      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveBlock(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 text-muted hover:text-accent hover:bg-accent-light rounded-lg disabled:opacity-30 transition-colors"
                        title="Mover para cima"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveBlock(index, "down")}
                        disabled={index === blocks.length - 1}
                        className="p-1.5 text-muted hover:text-accent hover:bg-accent-light rounded-lg disabled:opacity-30 transition-colors"
                        title="Mover para baixo"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeBlock(index)}
                        className="p-1.5 text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors mt-2"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {blocks.length > 0 && (
              <button
                onClick={() => onChange([])}
                className="w-full py-3 text-sm text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-4 border border-transparent hover:border-red-100 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Limpar todos os blocos
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
