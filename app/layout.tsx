import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sector 9 - Cybersecurity Platform",
  description: "Autonomous cybersecurity mesh for decentralized infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}





