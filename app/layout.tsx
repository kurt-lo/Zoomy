import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZOOMY",
  description: "A website that let you and your friends to see each other online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} bg-primary text-secondary`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
