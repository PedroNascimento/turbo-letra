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
