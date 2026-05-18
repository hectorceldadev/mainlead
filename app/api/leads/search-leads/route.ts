import { formSchema } from "@/app/(dashboard)/dashboard/find-leads/components/SearchLeads/SearchLeads.form"
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

        return NextResponse.json({
            status: true,
            data
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