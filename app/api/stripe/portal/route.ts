import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe/stripe"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { userId },
            select: { stripeCustomerId: true }
        })

        if (!user?.stripeCustomerId) {
            return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId!,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/plans`
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("PORTAL ERROR", error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}