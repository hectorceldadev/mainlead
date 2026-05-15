'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteLead(leadId: string) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }
        
        await prisma.lead.delete({
            where: {
                id: leadId,
                userId
            }
        })

        revalidatePath('/dashboard/leads')
        return { success: true }
    } catch (error) {
        console.error("LEAD DELETE", error)
        throw new Error('Internal server error')
    }
}

export async function completedLead(leadId: string, state: boolean) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const lead = await prisma.lead.update({
            where: {
                id: leadId,
                userId
            },
            data: {
                completed: state
            }
        })

        revalidatePath('/dashboard/leads')
        return lead
    } catch (error) {   
        console.error("LEAD EDIT COMPLETED", error)
        throw new Error('Internal server error')
    }
}

export async function getLeads(q?: string, status?: string) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const isCompleted = status === 'completed'

        const leads = await prisma.lead.findMany({
            where: {
                userId,
                ...(isCompleted
                    ? { completed: true }
                    : { completed: false }
                ),
                ...(!isCompleted && status && { status }),
                ...(q && {
                    OR: [
                        { name: { contains: q, mode: 'insensitive' } },
                        { businessName: { contains: q, mode: 'insensitive' } },
                        { title: { contains: q, mode: 'insensitive' } },
                        { description: { contains: q, mode: 'insensitive' } },
                        { email: { contains: q, mode: 'insensitive' } },
                        { phone: { contains: q, mode: 'insensitive' } },
                    ]
                })
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return leads
    } catch (error) {
        console.error("LEAD GET", error)
        throw new Error('Internal server error')
    }
}