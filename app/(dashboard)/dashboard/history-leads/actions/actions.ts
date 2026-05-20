'use server'

// import { LeadSource } from "@/lib/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function getHistoryCompanies(q: string, {/* source: LeadSource */}) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const historyCompanies = await prisma.historyCompany.findMany({
            where: {
                userId,
                // ...(source && { source }),
                ...(q && {
                    OR: [
                        { name: { contains: q, mode: 'insensitive' } },
                        { phone: { contains: q, mode: 'insensitive' } },
                        { location: { contains: q, mode: 'insensitive' } },
                        { websiteUrl: { contains: q, mode: 'insensitive' } },
                        { email: { contains: q, mode: 'insensitive' } }
                    ]
                })
            },
            orderBy: { createdAt: 'desc' }
        })

        return historyCompanies
    } catch (error) {
        console.error("GET HISTORY COMPANIES", error)
        throw error
    }
}