"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { PlatformProvider } from "@/context/platforms";
import { AuthProvider } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <AuthProvider>
          <SessionProvider>
            <PlatformProvider>
              <Navbar />
              {children}
            </PlatformProvider>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
