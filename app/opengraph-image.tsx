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
  // Read the SVG icon file
  // The user's SVG wraps a PNG. We extract the raw PNG to ensure Satori renders it correctly
  // and to avoid any SVG filter issues (like white-on-white).
  const iconPath = join(process.cwd(), "app/icon.svg");
  const iconData = readFileSync(iconPath, "utf-8");
  
  // Extract the base64 PNG data from the xlink:href attribute
  const match = iconData.match(/xlink:href="(data:image\/png;base64,[^"]+)"/);
  const iconSrc = match ? match[1] : `data:image/svg+xml;base64,${Buffer.from(iconData).toString("base64")}`;

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
            width: 250,
            height: 250,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            marginBottom: 40,
          }}
        >
          {/* Embed the SVG Icon directly */}
          <img
            src={iconSrc}
            width="180"
            height="180"
            alt="Turbo Letra Icon"
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 800,
            color: "#0f172a", // Slate-900
            letterSpacing: -2,
            marginBottom: 10,
          }}
        >
          Turbo Letra
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#334155", // Slate-700
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Treine sua escrita copiando textos com tempo marcado!
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
