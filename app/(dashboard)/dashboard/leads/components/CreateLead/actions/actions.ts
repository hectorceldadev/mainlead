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

export async function searchLeads(search?: string, status?: string) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const leads = await prisma.lead.findMany({
            where: {
                userId,
                ...(status && { status }),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                        { businessName: { contains: search, mode: 'insensitive' } },
                        { title: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } }
                    ]
                })
            }
        })

        return leads
    } catch (error) {
        console.error("LEAD SEARCH", error)
        throw new Error('Internal server error')
    }
}