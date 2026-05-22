'use server'

// import { LeadSource } from "@/lib/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

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

export async function deleteHistoryCompany(companyHistoryId: string) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const deleteCompany = await prisma.historyCompany.delete({
            where: {
                userId,
                id: companyHistoryId
            }
        })

        if (!deleteCompany) {
            return { delete: false }
        }

        return { delete: true }
    } catch (error) {
        console.error("DELETE COMPANY HISTORY", error)
        throw error
    }
}