import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "Turbo Letra — Treino de Escrita";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  // Read the user-selected icon path strictly
  const iconPath = join(process.cwd(), "app/icon.png");
  const iconData = readFileSync(iconPath);
  const base64Icon = iconData.toString("base64");
  const iconSrc = `data:image/png;base64,${base64Icon}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #f0f9ff, #e0f2fe)", 
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            background: "white",
            width: 500,
            height: 500,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "80px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            marginBottom: 0, // No margin needed
          }}
        >
          {/* Embed the SVG Icon directly */}
          <img
            src={iconSrc}
            width="400" // Increased size since it's alone
            height="400"
            alt="Turbo Letra Icon"
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
