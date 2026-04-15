import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export const runtime = "nodejs";

const relevantEvents = new Set([
  "checkout.session.completed",
  "invoice.payment_succeeded",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (!relevantEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          await syncSubscription(subscription);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string | null };
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          await syncSubscription(subscription);
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscription(subscription);
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const dbSub = await db.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!dbSub) {
    console.error("No subscription found for customer:", customerId);
    return;
  }

  const priceId = subscription.items.data[0]?.price.id;
  const plan = getPlanFromPriceId(priceId);

  const statusMap: Record<string, string> = {
    active: "ACTIVE",
    canceled: "CANCELED",
    past_due: "PAST_DUE",
    incomplete: "INCOMPLETE",
    incomplete_expired: "CANCELED",
    trialing: "ACTIVE",
    unpaid: "PAST_DUE",
    paused: "CANCELED",
  };

  await db.subscription.update({
    where: { stripeCustomerId: customerId },
    data: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      stripeCurrentPeriodEnd: new Date(
        ((subscription as any).current_period_end ?? 0) * 1000
      ),
      plan: plan as any,
      status: (statusMap[subscription.status] ?? "ACTIVE") as any,
    },
  });
}

function getPlanFromPriceId(priceId?: string): string {
  if (!priceId) return "FREE";
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "PRO";
  if (priceId === process.env.STRIPE_BUSINESS_PRICE_ID) return "BUSINESS";
  return "FREE";
}
