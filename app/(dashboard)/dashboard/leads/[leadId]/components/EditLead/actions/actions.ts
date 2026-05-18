'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { formSchema } from "../EditLead.types"
import { revalidatePath } from "next/cache"

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

export async function updateLead(leadId: string, values: z.infer<typeof formSchema>) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const lead = await prisma.lead.findUnique({
            where: {
                userId,
                id: leadId
            }
        })

        if (lead?.companyId) {
            await prisma.company.update({
                where: {
                    userId,
                    id: lead?.companyId
                },
                data: {
                    name: values.companyName,
                    location: values.companyLocation,
                    email: values.companyEmail,
                    phone: values.companyPhone,
                    websiteUrl: values.companyWebsite,
                }
            })
        }

        if (lead?.contactId) {
            await prisma.contact.update({
                where: {
                    userId,
                    id: lead?.contactId
                },
                data: {
                    name: values.contactName,
                    email: values.contactEmail,
                    phone: values.contactPhone,
                    role: values.contactRole
                }
            })
        }


        await prisma.lead.update({
            where: {
                userId,
                id: leadId
            },
            data: {
                title: values.title,
                description: values.description,
                status: values.status
            }
        })

        revalidatePath(`/dashboard/leads/${leadId}`)
        revalidatePath(`/dashboard/leads`)
    } catch (error) {
        console.error("UPDATE LEAD", error)
        throw Error
    }
}