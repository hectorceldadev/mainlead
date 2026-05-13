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