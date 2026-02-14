import { ImageResponse } from "next/og";

// export const runtime = "edge";

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
          background: "linear-gradient(to bottom right, #4A90E2, #1E5FD8)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 100,
            marginBottom: 20,
            background: "white",
            width: 160,
            height: 160,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            letterSpacing: -2,
            marginBottom: 10,
          }}
        >
          Turbo Letra
        </div>
        <div
          style={{
             display: "flex",
             fontSize: 32,
             color: "#E7F1FF",
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
