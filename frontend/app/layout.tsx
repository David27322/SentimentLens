import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SentimentLens",
  description: "Social media sentiment analysis powered by ML",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geist.className} bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
     </ClerkProvider>
  );
}