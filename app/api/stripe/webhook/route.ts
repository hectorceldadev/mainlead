import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe/stripe"
import { getPlanById, plans } from "@/lib/stripe/stripe-plans"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session

                const userId = session.metadata?.userId
                const priceId = session.mode === "subscription"
                    ? session.metadata?.priceId
                    : undefined

                if (!userId || !priceId) break

                const plan = getPlanById(
                    session.metadata?.planId as "BASIC" | "PROFESSIONAL" | "AGENCY"
                )
                if (!plan) break

                if (session.customer) {
                    await prisma.user.update({
                        where: { userId },
                        data: { stripeCustomerId: session.customer as string }
                    })
                }

                await prisma.user.update({
                    where: { userId },
                    data: { credits: { increment: plan.credits } }
                })

                break
            }

            case "invoice.paid": {
                const invoice = event.data.object as Stripe.Invoice

                if (invoice.billing_reason !== "subscription_cycle") break

                const subscriptionId = (invoice as any).subscription as string
                const subscription = await stripe.subscriptions.retrieve(subscriptionId)
                const priceId = subscription.items.data[0]?.price.id
                const plan = plans.find(p => p.stripePriceId === priceId)
                if (!plan) break

                const dbSub = await prisma.subscription.findUnique({
                    where: { stripeSubscriptionId: subscriptionId }
                })
                if (!dbSub) break

                await prisma.user.update({
                    where: { userId: dbSub.userId },
                    data: { credits: { increment: plan.credits } } 
                })

                await prisma.subscription.update({
                    where: { id: dbSub.id },
                    data: { creditsGranted: { increment: plan.credits } }
                })

                break
            }

            case "customer.subscription.updated": {
                const sub = event.data.object as Stripe.Subscription
                
                const status = sub.status
                const cancelAtPeriodEnd = sub.cancel_at_period_end

                await prisma.subscription.update({
                    where: { stripeSubscriptionId: sub.id },
                    data: {
                        status,
                        cancelAtPeriodEnd,
                        currentPeriodStart: new Date((sub as any).current_period_start * 1000),
                        currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
                        stripePriceId: sub.items.data[0]?.price?.id ?? ""
                    }
                })

                break
            }

            case "customer.subscription.deleted": {
                const sub = event.data.object as Stripe.Subscription

                await prisma.subscription.update({
                    where: { stripeSubscriptionId: sub.id },
                    data: { status: "canceled" }
                })

                break
            }

            return NextResponse.json({ recieved: true })
        }
    } catch  (error) {
        console.error("WEBHOOK ERROR", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}