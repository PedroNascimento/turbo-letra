import type { Metadata } from "next";
import { Geist, Fredoka } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Turbo Letra — Treino de Escrita",
  description:
    "Aplicação para treino de escrita rápida e profunda (Deep Work) com blocos cronometrados. Ideal para foco e caligrafia.",
  keywords: ["escrita", "caligrafia", "foco", "deep work", "tdah", "treino"],
  authors: [{ name: "Turbo Letra Team" }],
  metadataBase: new URL("https://turboletra.vercel.app"),
  openGraph: {
    title: "Turbo Letra — Treino de Escrita",
    description:
      "Melhore sua escrita e foco com blocos de texto cronometrados. Design calmo e sem distrações.",
    url: "https://turboletra.vercel.app",
    siteName: "Turbo Letra",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turbo Letra — Treino de Escrita",
    description:
      "Treino de escrita focado e calmo. Experimente agora.",
    creator: "@turboletra",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${fredoka.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
