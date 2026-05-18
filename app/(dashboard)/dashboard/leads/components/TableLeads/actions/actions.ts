'use server'

import { LeadStatus } from "@/lib/generated/prisma/enums";
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

export async function getLeads(q?: string, status?: LeadStatus) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const leads = await prisma.lead.findMany({
            where: {
                userId,
                ...(status && { status }),
                ...(q && {
                    OR: [
                        {company: { is: {name: {contains: q,mode: 'insensitive'}}}},
                        {company: {is: {phone: {contains: q,mode: 'insensitive'}}}},
                        {company: {is: {email: {contains: q,mode: 'insensitive'}}}},
                        {company: {is: {location: {contains: q,mode: 'insensitive'}}}},

                        {contact: {is: {name: { contains: q, mode: 'insensitive'}}}},
                        {contact: {is: {role: { contains: q, mode: 'insensitive'}}}},
                        {contact: {is: {phone: { contains: q, mode: 'insensitive'}}}},
                        {contact: {is: {email: { contains: q, mode: 'insensitive'}}}},
                    ]
                })
            },
            include: {
                company: true, 
                contact: true
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