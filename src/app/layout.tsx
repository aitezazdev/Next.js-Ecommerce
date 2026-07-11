import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./providers";
import { getCurrentUser } from "@/lib/utils/currentUser";

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
        className="antialiased bg-zinc-950 text-white">
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
