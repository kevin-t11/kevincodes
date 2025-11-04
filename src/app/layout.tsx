import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Oxanium, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { ViewTransitions } from "next-view-transitions";
import dynamic from "next/dynamic";
import { PHProvider } from "./Providers";
import ProgressProvider from "./ProgressProvider";
import { Toaster } from "sonner";
import QueryProvider from "./QueryProvider";

// const oxanium = Oxanium({
//   subsets: ["latin"],
//   variable: "--font-oxanium ",
//   display: "swap",
// });

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono ",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kevincodes.vercel.app"),
  title: "Kevin's Portfolio",
  description: "Explore more about Kevin's portfolio",
  openGraph: {
    title: "Kevin's Portfolio",
    description: "Explore more about Kevin's portfolio",
    url: "https://kevincodes.vercel.app",
    siteName: "Kevin's Portfolio",
    images: [{ url: "/profile_pic.png", width: 1200, height: 630 }],
    type: "article",
  },
};

const PostHogPageView = dynamic(() => import("@/app/PostHogPageView"), {
  ssr: false,
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={ubuntuMono.className} suppressHydrationWarning>
        <PHProvider>
          <body className="max-w-[712px] mx-auto scroll-smooth w-full px-4 min-h-screen">
            <QueryProvider>
              <PostHogPageView />
              <ProgressProvider>
                <Providers>
                  <Navbar />
                  <main>{children}</main>
                  <Footer />
                </Providers>
              </ProgressProvider>
              <Toaster position="top-center" />
            </QueryProvider>
          </body>
        </PHProvider>
      </html>
    </ViewTransitions>
  );
}
