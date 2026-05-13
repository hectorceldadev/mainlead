import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes"
import ToggleTheme from "./ToggleTheme";
import localFont from "next/font/local"
import { Toaster } from "@/components/ui/sonner";

const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Extralight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/ClashDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash", // Variable para usar en CSS/Tailwind
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MainLead",
  description: "By JCH Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", geist.variable, clashDisplay.variable)}
    >
      <body className="min-h-full flex flex-col font-geist">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: '#2563eb'
            }
          }}
        >
          {children}
          <Toaster />
          <ToggleTheme />
        </ClerkProvider>
      </body>
    </html>
  );
}
