import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./providers";
import { getCurrentUser } from "@/lib/utils/currentUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaz Store",
  description: "Zaz Store - Sleek and premium modern ecommerce clothing and shoes store.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}>
        <ToastContainer />
        <Toaster />
        <ReduxProvider user={user}>
          <Navbar />
          <main className="min-h-[80vh]">{children}</main>
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
