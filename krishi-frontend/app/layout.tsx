import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoModeProvider } from "@/components/providers/DemoModeProvider";
import ToastContainer from "@/components/ui/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krishi — Intelligence for Every Field",
  description: "AI-powered agricultural intelligence combining satellite data, soil health, weather forecasting and crop diagnostics.",
  keywords: ["agriculture", "AI", "farming", "India", "crop intelligence"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoModeProvider>
          <ToastContainer />
          {children}
        </DemoModeProvider>
      </body>
    </html>
  );
}
