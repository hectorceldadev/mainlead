'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function getCredits() {
    try {
        const { userId } = await auth()
        
        if (!userId) {
            throw new Error('Unauthorized')
        }

        const credits = await prisma.user.findUnique({
            where: {
                userId
            },
            select: {
                credits: true
            }
        })

        if (!credits) {
            throw Error
        }

        return credits
    } catch (error) {
        console.error("GET CREDITS", error)
        throw error
    }
}