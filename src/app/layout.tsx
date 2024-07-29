import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../redux/features/user/userSlice";
import ReduxProvider from "../context/ReduxProvider";
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
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
