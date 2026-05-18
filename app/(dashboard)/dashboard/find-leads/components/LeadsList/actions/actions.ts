'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { CreateCompanyProps } from "./CreateCompany.types"

export async function CreateCompany(company: CreateCompanyProps) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const companyDB = await prisma.company.create({
            data: {
                userId,
                placeId: company.placeId,
                name: company.name,
                location: company.location || null,
                phone: company.phone || null,
                email: company.email || null,
                websiteUrl: company.websiteUrl || null
            }
        })

        await prisma.lead.create({
            data: {
                userId,
                companyId: companyDB.id,
                source: 'GOOGLE_PLACES',
                status: 'COLD'
            }
        })

        if (!companyDB) {
            throw new Error('Error guardando lead')
        }

        return companyDB
    } catch (error) {
        console.error("CREATE COMPANY", error)
        throw Error
    }
}