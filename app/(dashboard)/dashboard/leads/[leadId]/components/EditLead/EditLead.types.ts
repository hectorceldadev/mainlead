import { Prisma } from "@/lib/generated/prisma/client"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

export const formSchema = z.object({
    // COMPANY
    companyName: z.string().min(1),
    companyPhone: z.string().optional(),
    companyEmail: z.string().optional(),
    companyWebsite: z.string().optional(),
    companyLocation: z.string().optional(),

    // CONTACT
    contactName: z.string().min(1),
    contactRole: z.string().optional(),
    contactPhone: z.string().optional(),
    contactEmail: z.string().optional(),

    // LEAD
    title: z.string().optional(),
    description: z.string().optional(),

    status: z.enum([
        'COLD',
        'TEMPERED',
        'HOT',
        'CLOSED',
    ]),
})

export type LeadWithRelations = Prisma.LeadGetPayload<{
    include: {
        company: true,
        contact: true
    }
}>

export type EditLeadProps = {
    lead: LeadWithRelations
    form: UseFormReturn<z.infer<typeof formSchema>>
}