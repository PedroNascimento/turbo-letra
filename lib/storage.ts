export interface Settings {
  timePerBlock: number;
  fontSize: number;
  lineHeight: number;
  theme: "light" | "dark";
  beepEnabled: boolean;
}

const BLOCKS_KEY = "turbo-letra-blocks";
const SETTINGS_KEY = "turbo-letra-settings";

export const defaultSettings: Settings = {
  timePerBlock: 45,
  fontSize: 32,
  lineHeight: 1.5,
  theme: "light",
  beepEnabled: true,
};

export function getBlocks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BLOCKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((b) => typeof b === "string")) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

export function setBlocks(blocks: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BLOCKS_KEY, JSON.stringify(blocks));
}

export function getSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return {
      timePerBlock:
        typeof parsed.timePerBlock === "number" &&
        parsed.timePerBlock >= 5 &&
        parsed.timePerBlock <= 600
          ? parsed.timePerBlock
          : defaultSettings.timePerBlock,
      fontSize: [24, 32, 40, 48].includes(parsed.fontSize)
        ? parsed.fontSize
        : defaultSettings.fontSize,
      lineHeight: [1.2, 1.5, 1.8].includes(parsed.lineHeight)
        ? parsed.lineHeight
        : defaultSettings.lineHeight,
      theme: parsed.theme === "dark" ? "dark" : "light",
      beepEnabled:
        typeof parsed.beepEnabled === "boolean"
          ? parsed.beepEnabled
          : defaultSettings.beepEnabled,
    };
  } catch {
    return defaultSettings;
  }
}

export function setSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export const EXPORT_VERSION = 1;

interface ExportData {
  version: number;
  exportedAt: string;
  data: {
    blocks: string[];
    settings: Settings;
  };
}

export function exportState(blocks: string[], settings: Settings): string {
  const exportData: ExportData = {
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      blocks,
      settings,
    },
  };
  return JSON.stringify(exportData, null, 2);
}

export function validateImport(jsonString: string):
  | { success: true; blocks: string[]; settings: Settings }
  | { success: false; error: string } {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== "object") {
      return { success: false, error: "Arquivo inválido ou corrompido." };
    }

    const data = parsed.data;
    if (!data || typeof data !== "object") {
      return { success: false, error: "Estrutura de dados ausente." };
    }

    const { blocks, settings } = data;

    if (!Array.isArray(blocks) || !blocks.every((b: unknown) => typeof b === "string")) {
      return { success: false, error: "Formato de blocos inválido." };
    }

    if (!settings || typeof settings !== "object") {
      return { success: false, error: "Configurações inválidas." };
    }

    const sanitizedSettings: Settings = {
      ...defaultSettings,
      ...settings,
    };

    return {
      success: true,
      blocks,
      settings: sanitizedSettings,
    };
  } catch {
    return { success: false, error: "Erro ao ler o arquivo JSON." };
  }
}
