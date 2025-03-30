
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TaskNest",
  description: "Task management application that helps your child stay  productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>{children}
          <Toaster position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
