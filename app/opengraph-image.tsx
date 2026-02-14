import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Turbo Letra — Treino de Escrita";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(to bottom right, #4f46e5, #9333ea)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          ⚡
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            background: "linear-gradient(to right, #ffffff, #e0e7ff)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -2,
          }}
        >
          Turbo Letra
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 20,
            color: "#e0e7ff",
            fontWeight: 600,
          }}
        >
          Treino de escrita com blocos cronometrados
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
