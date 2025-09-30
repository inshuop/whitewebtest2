// app/layout.tsx
"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/LoadingScreen"; 
import { Merriweather } from "next/font/google";
import "./globals.css";
import ToasterContext from "../context/ToastContext";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add favicon here */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-512x512.png" type="image/png" sizes="512x512" />
      </head>
      <body className={`dark:bg-black ${merriweather.className}`}>
        <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
          {loading && <LoadingScreen />}
          {!loading && (
            <>
              <Lines />
              <Header />
            </>
          )}
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
