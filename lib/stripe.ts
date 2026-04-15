import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: "2024-04-10" as any,
      typescript: true,
    });
  }
  return _stripe;
}

// Keep named export for convenience
export const stripe = {
  get customers() { return getStripe().customers; },
  get subscriptions() { return getStripe().subscriptions; },
  get checkout() { return getStripe().checkout; },
  get billingPortal() { return getStripe().billingPortal; },
  get webhooks() { return getStripe().webhooks; },
};

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    generations: 5,
    priceId: null,
    features: [
      "5 generations/day",
      "Midjourney & SD prompts",
      "Basic prompt quality",
      "History (last 7 days)",
    ],
  },
  PRO: {
    name: "Pro",
    price: 9,
    generations: 200,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "200 generations/day",
      "All output types",
      "Prompt enhancer",
      "Bulk upload (10 images)",
      "Export TXT/CSV",
      "Full history",
      "No watermark",
    ],
  },
  BUSINESS: {
    name: "Business",
    price: 29,
    generations: -1,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID,
    features: [
      "Unlimited generations",
      "All output types",
      "Bulk upload (50 images)",
      "API access",
      "Priority processing",
      "Public gallery",
      "White-label exports",
      "Priority support",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export async function createOrRetrieveCustomer(
  userId: string,
  email: string
): Promise<string> {
  const { db } = await import("./db");
  const stripeClient = getStripe();
  const sub = await db.subscription.findUnique({ where: { userId } });

  if (sub?.stripeCustomerId) {
    return sub.stripeCustomerId;
  }

  const customer = await stripeClient.customers.create({
    email,
    metadata: { userId },
  });

  await db.subscription.update({
    where: { userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}
