import { stripe } from "@/lib/stripe/stripe";
import { PlanId, plans } from "@/lib/stripe/stripe-plans";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { planId } = await req.json() as { planId: PlanId }

        const plan = plans.find(p => p.id === planId)
        if (!plan) {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: plan.stripePriceId, quantity: 1 }],
            metadata: {
                userId,
                planId: plan.id,
                priceId: plan.stripePriceId
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/plans?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/plans?canceled=true`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("CHECKOUT ERROR", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}