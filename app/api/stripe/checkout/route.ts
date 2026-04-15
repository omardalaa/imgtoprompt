import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { stripe, PLANS, createOrRetrieveCustomer } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  plan: z.enum(["PRO", "BUSINESS"]),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { plan } = schema.parse(body);
    const planData = PLANS[plan];

    if (!planData.priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const customerId = await createOrRetrieveCustomer(
      session.user.id,
      session.user.email!
    );

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: planData.priceId, quantity: 1 }],
      success_url: `${absoluteUrl("/dashboard")}?success=true&plan=${plan.toLowerCase()}`,
      cancel_url: `${absoluteUrl("/pricing")}?canceled=true`,
      metadata: { userId: session.user.id, plan },
      subscription_data: {
        metadata: { userId: session.user.id, plan },
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
