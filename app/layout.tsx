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
    "Aplicação para treino de escrita rápida com blocos de texto cronometrados.",
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
