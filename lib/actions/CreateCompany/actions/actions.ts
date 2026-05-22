'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { CreateCompanyProps } from "./CreateCompany.types"
import { revalidatePath } from "next/cache"

export async function CreateCompany(company: CreateCompanyProps) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const companyDB = await prisma.company.upsert({
            where: {
                placeId: company.placeId
            },
            update: {
                name: company.name,
                phone: company.phone,
                websiteUrl: company.websiteUrl,
                location: company.location
            }, 
            create: {
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
            throw Error        
        }
        
        if (company.placeId) {
            await prisma.historyCompany.updateMany({
                where: {
                    userId,
                    placeId: company.placeId
                },
                data: {
                    savedCompanyId: companyDB.id
                }
            })
        }

        revalidatePath(`/dashboard/history-leads`)
        revalidatePath(`/dashboard/leads`)

        return companyDB
    } catch (error) {
        console.error("CREATE COMPANY", error)
        throw Error
    }
}