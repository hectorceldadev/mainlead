'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function getLead(leadId: string) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const lead = await prisma.lead.findUnique({
            where: {
                userId,
                id: leadId
            },
            include: {
                company: true,
                contact: true
            }
        })

        if (!lead) {
            throw new Error('Lead not found')
        }

        return lead
    } catch (error) {
        console.error("GET LEAD", error)
        throw Error
    }
}