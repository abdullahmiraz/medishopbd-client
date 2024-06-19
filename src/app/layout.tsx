import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SessionProvider } from "./SessionProvider";
import Login from "../components/Login/Login";
import HomeView from "../components/HomeView/HomeView";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediShopBD",
  description: "Online Medicine Shop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    // className="max-w-screen-2xl mx-auto"
    <html lang="en">
      <body className={`${inter.className}  max-w-screen-2xl mx-auto`}>
        <SessionProvider session={session}>
          (!session? (<Login />
          ): (<HomeView />
          ))
        </SessionProvider>
        {children}
      </body>
    </html>
  );
}
