import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle } from "@radix-ui/react-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Goodashboard",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster></Toaster>
        </body>
    </html>
  );
}
