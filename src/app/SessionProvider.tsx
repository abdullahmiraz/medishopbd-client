"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider, useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};
export const SessionProvider = ({ children, session }: Props) => {
  const { data: session, status } = useSession();
  return <Provider session={session}>{children}</Provider>;
};
