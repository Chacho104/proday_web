import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { ToasterProvider } from "@/providers/toastProvider";
import { ModalProvider } from "@/providers/modalProvider";
import Modal from "./components/modals/modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nooro To Do App",
  description:
    "A To Do App built as a solution to Nooro's Full-stack Developer Take Home Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-layout-bg`}>
        <ToasterProvider />
        <ModalProvider>
          <Navbar />
          {children}
          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
