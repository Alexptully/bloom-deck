import type { Metadata } from "next";
import "./globals.css";
import { config } from "@/content/config";

export const metadata: Metadata = {
  title: `${config.projectName}: a Terra Labs pitch`,
  description: "A bracelet that blooms when two people truly meet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
