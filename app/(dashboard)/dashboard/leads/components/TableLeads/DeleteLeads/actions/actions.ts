'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function deleteLead(leadId: string) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw Error
        }

        await prisma.lead.delete({
            where: {
                userId,
                id: leadId
            }
        })

        revalidatePath('/dashboard/leads')
    } catch (error) {
        console.error("DELETE LEAD", error)
        throw Error
    }
} 