import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dominic Aung - Portfolio",
  description: "Full-Stack Developer & AI Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
