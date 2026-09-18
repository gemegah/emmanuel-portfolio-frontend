import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Ticker } from "@/components/layout/Ticker";
import "./globals.css";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://emmanuelgemegah.online"),
  title: {
    default: "Emmanuel Gemegah | AI Automation Engineer",
    template: "%s | Emmanuel Gemegah"
  },
  description:
    "Emmanuel Gemegah builds secure agentic workflows, retrieval systems, evaluation loops, and cloud automation for real business operations.",
  openGraph: {
    title: "Emmanuel Gemegah | AI Automation Engineer",
    description:
      "Secure applied AI, grounded retrieval, measurable evaluation, and practical automation by Emmanuel Gemegah.",
    url: "https://emmanuelgemegah.online",
    siteName: "Emmanuel Gemegah Portfolio",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body><div className="site-shell"><Ticker /><Header />{children}<Footer /></div></body>
    </html>
  );
}
