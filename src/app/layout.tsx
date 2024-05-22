import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/app.providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smol App",
  description: "Generate smol URLs with smol.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dots bg-opacity-20`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
