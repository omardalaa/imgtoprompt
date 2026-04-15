import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/utils";

export async function POST(_req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sub = await db.subscription.findUnique({
      where: { userId: session.user.id },
      select: { stripeCustomerId: true },
    });

    if (!sub?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account found" },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: absoluteUrl("/dashboard"),
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
