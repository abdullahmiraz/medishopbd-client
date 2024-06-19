import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediShopBD",
  description: "Online Medicine Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // className="max-w-screen-2xl mx-auto"
    <html lang="en">
      <body className={`${inter.className}  max-w-screen-2xl mx-auto`}>
        {children}
      </body>
    </html>
  );
}
