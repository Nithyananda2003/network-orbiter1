import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/base/Footer";
import Header from "@/components/navigation/Header";

export const metadata: Metadata = {
  title: "Network Orbiter",
  description: "Carrier-grade wireless communication systems",
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
      <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
