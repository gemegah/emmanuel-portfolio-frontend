import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://emmanuelgemegah.online"),
  title: {
    default: "Emmanuel Gemegah | Product Designer Portfolio",
    template: "%s | Emmanuel Gemegah"
  },
  description:
    "Product designer portfolio for Emmanuel Gemegah, focused on practical product strategy, UX, interface design, and implementation-ready digital experiences.",
  openGraph: {
    title: "Emmanuel Gemegah | Product Designer Portfolio",
    description:
      "Product designer portfolio focused on UX, interface design, and implementation-ready digital experiences.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
