'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formSchema } from "../steps/Steps.types"

export async function createLead(values: z.infer<typeof formSchema>) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const company = await prisma.company.create({
            data: {
                userId,
                name: values.companyName,
                location: values.companyLocation,
                phone: values.companyPhone,
                email: values.companyEmail,
                websiteUrl: values.companyWebsite
            }
        })

        const contact = await prisma.contact.create({
            data: {
                userId,
                name: values.contactName,
                role: values.contactRole,
                email: values.contactEmail,
                phone: values.contactPhone,
                companyId: company.id
            }
        })

        const lead = await prisma.lead.create({
            data: {
                userId,
                status: values.status,
                title: values.title,
                description: values.description,
                source: 'MANUAL',
                companyId: company.id,
                contactId: contact.id
            }
        })

        revalidatePath('/dashboard/leads')
        return lead
    } catch (error) {
        console.error(error)
        throw new Error('Internal server error')
    }
}