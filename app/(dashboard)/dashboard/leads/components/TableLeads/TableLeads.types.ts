import { Prisma } from "@/lib/generated/prisma/client"

export type LeadWithRelations = Prisma.LeadGetPayload<{
    include: {
        company: true,
        contact: true
    }
}>

export type TableLeadsProps = {
    leads: LeadWithRelations[]
}