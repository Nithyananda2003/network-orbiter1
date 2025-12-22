import type { Metadata } from "next";
import "./globals.css";
import { FaWhatsapp } from "react-icons/fa";

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
        <a
          href="https://wa.me/9810325021" // Replace with your WhatsApp number
          className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={28} />
        </a>
      </body>
    </html>
  );
}
