"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomeView from "../components/HomeView/HomeView";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null; // This ensures that nothing is rendered while redirecting
  }

  return (
    <main className="max-w-screen-2xl mx-auto">
      <HomeView />
    </main>
  );
}
