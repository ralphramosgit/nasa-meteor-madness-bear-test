import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NASA Asteroid Impact Simulator",
  description: "Interactive 3D visualization of asteroid impacts on Earth with NASA NEO data",
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
