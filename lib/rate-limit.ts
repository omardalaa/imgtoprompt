import { db } from "./db";
import { Plan } from "@prisma/client";

const DAILY_LIMITS: Record<Plan, number> = {
  FREE: 5,
  PRO: 200,
  BUSINESS: Infinity,
};

export async function checkRateLimit(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: Date;
}> {
  const sub = await db.subscription.findUnique({
    where: { userId },
    select: { plan: true },
  });

  const plan = sub?.plan ?? Plan.FREE;
  const limit = DAILY_LIMITS[plan];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const count = await db.generation.count({
    where: {
      userId,
      createdAt: { gte: today, lt: tomorrow },
    },
  });

  const remaining = limit === Infinity ? 999999 : Math.max(0, limit - count);
  const allowed = limit === Infinity || count < limit;

  return { allowed, remaining, limit: limit === Infinity ? -1 : limit, resetAt: tomorrow };
}

// Simple in-memory IP rate limiter for API protection
const ipRequests = new Map<string, { count: number; resetAt: number }>();

export function ipRateLimit(
  ip: string,
  maxRequests = 20,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count++;
  return true;
}
