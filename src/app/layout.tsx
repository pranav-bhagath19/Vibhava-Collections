import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import ToastContainer from "@/components/ui/ToastContainer";
import MiniCart from "@/components/layout/MiniCart";
import TransitionProvider from "@/components/layout/TransitionProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import SizeGuide from "@/components/ui/SizeGuide";
import AuthModal from "@/components/ui/AuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibhava Collections | Premium Sarees & Dress Materials",
  description: "Discover the finest collection of luxury sarees, designer silk, and elegant dress materials at Vibhava Collections. Traditional elegance meet modern fashion.",
  keywords: "sarees, silk sarees, designer sarees, dress materials, Indian fashion, luxury sarees, Vibhava Collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <AppProvider>
            <ScrollProgress />
            <CustomCursor />
            <TransitionProvider>
              {children}
            </TransitionProvider>
            <MiniCart />
            <SizeGuide />
            <AuthModal />
            <ToastContainer />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
