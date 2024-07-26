import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import NextAuthProvider from "../components/providers/nextauth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

import { Plus_Jakarta_Sans } from "next/font/google";
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "100xCoding.com",
    template: "%s - 100xCoding",
  },
  keywords: [
    "Front-End Development",
    "Web Development Challenges",
    "Coding Projects",
    "Developer Learning Platform",
    "Real-World Coding Challenges",
    "Enhance Coding Skills",
    "Programming Challenges",
    "Interactive Coding Exercises",
  ],
  description:
    "Boost your front-end development skills with 100xCoding. Tackle real-world projects and master HTML, CSS, and JavaScript through hands-on challenges designed with professional standards.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title:
      "Accelerate Your Coding Journey with 100xCoding Developer Challenges",
    description:
      "Elevate Your Development Skills with 100xCoding. Tackle Real-World Projects and Enhance Your Coding Expertise through Professional-Standard Challenges Designed for Developers of All Levels.",
    images: ["/opengraph-image.png"],
  },
  metadataBase: new URL(Env.NEXT_PUBLIC_URL),
};
import { Toaster } from "sonner";
import SWRProvider from "@/components/providers/swr-provider";
import Env from "@/lib/env";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Toaster position="top-right" closeButton richColors />
          <NextAuthProvider>
            <SWRProvider>{children}</SWRProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={Env.GTM_ID} />
    </html>
  );
}
