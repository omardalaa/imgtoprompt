import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "./db";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const sub = await db.subscription.findUnique({
          where: { userId: user.id },
          select: { plan: true, status: true },
        });
        session.user.plan = sub?.plan ?? "FREE";
        session.user.subscriptionStatus = sub?.status ?? "ACTIVE";
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      await db.subscription.create({
        data: { userId: user.id!, plan: "FREE", status: "ACTIVE" },
      });
      await db.user.update({
        where: { id: user.id! },
        data: { referralCode: user.id!.slice(0, 8) },
      });
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: { strategy: "database" },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
