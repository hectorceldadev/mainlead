import { getCredits } from "@/lib/actions/GetCredits/actions/actions"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"

export const placesApiSchema = z.object({
    textQuery: z.string(),
    languageCode: z.string(),
    pageSize: z.number()
})

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        
        const body = placesApiSchema.parse(await req.json())

        const { pageSize } = body

        const creditsDB = await getCredits()

        if (creditsDB.credits < pageSize) {
            throw new Error('No tienes creditos suficientes')
        }

        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.PLACES_API!,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.location,places.types'
            }, 
            body: JSON.stringify(body)
        })

        const data = await response.json()

        if (!response.ok) {
            console.error(data)

            return NextResponse.json(
                {
                    status: false,
                    error: data
                },
                { status: response.status }
            )
        }

        await prisma.user.update({
            where: {
                userId,
                credits: { gte: pageSize }
            },
            data: {
                credits: { decrement: pageSize }
            }
        })

        const places = data.places ?? []

        await prisma.historyCompany.createMany({
            data: places.map((place: {
                id: string
                displayName: { text: string }
                formattedAddress?: string
                rating?: number
                userRatingCount?: number
                websiteUri?: string
                nationalPhoneNumber?: string
            }) => ({
                placeId: place.id,
                name: place.displayName.text,
                location: place.formattedAddress,
                phone: place.nationalPhoneNumber,
                websiteUrl: place.websiteUri,
                rating: place.rating,
                userRatingCount: place.userRatingCount,
                source: 'GOOGLE_PLACES',
                userId
            })),
            skipDuplicates: true
        })

        const placesIds = places.map((place: { id: string }) => place.id)

        const historyRecords = await prisma.historyCompany.findMany({
            where: {
                userId,
                placeId: { in: placesIds }
            },
            select: {
                placeId: true,
                savedCompanyId: true
            }
        })

        const historyMap = new Map(historyRecords.map(r => [r.placeId, r]))

        const placesWithStatus = places.map((place: { id: string }) => ({
            ...place,
            alreadySaved: historyMap.get(place.id)?.savedCompanyId != null
        }))

        return NextResponse.json({
            status: true,
            data: { places: placesWithStatus }
        })
    } catch (error) {
        console.error("PLACES API", error)
        return NextResponse.json({
            status: false,
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}