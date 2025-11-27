import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { BottomNav } from "@/components/shared/BottomNav";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedhAsha - Village Minds, Nation’s Hope",
  description: "Empowering rural elders with brain health tools and AI companionship.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
