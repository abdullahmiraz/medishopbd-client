import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Footer from "../components/Shared/Footer/Footer";
import SearchBarTop from "../components/Shared/Navbar/SearchBarTop/SearchBarTop";
import OptionBar from "../components/Shared/Navbar/OptionBar/OptionBar";

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
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
