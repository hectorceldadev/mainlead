'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formSchema } from "../CreateLead.form"

export async function createLead(values: z.infer<typeof formSchema>) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const lead = await prisma.lead.create({
            data: { ...values, userId }
        })

        revalidatePath('/dashboard/leads')
        return lead
    } catch (error) {
        console.error(error)
        throw new Error('Internal server error')
    }
}

export async function getLeads() {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const leads = await prisma.lead.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return leads
    } catch(error){
        console.error("LEADS GET", error)
        throw new Error('Internal server error')
    }
} 