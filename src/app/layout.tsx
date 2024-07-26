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
  description:
    "Boost your front-end development skills with 100xCoding. Tackle real-world projects and master HTML, CSS, and JavaScript through hands-on challenges designed with professional standards.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title:
      "Master front-end development by building real-world projects. Enhance your HTML, CSS, and JavaScript skills through hands-on challenges crafted with professional designs.",
    description:
      "Boost your front-end development skills with 100xCoding. Tackle real-world projects and master HTML, CSS, and JavaScript through hands-on challenges designed with professional standards.",
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
