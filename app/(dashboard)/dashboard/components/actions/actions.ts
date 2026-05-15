'use server'

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function createUser() {
    try {
        const { userId } = await auth()
        const user = await currentUser()

        if (!user || !userId) {
            throw new Error('Unauthorized')
        }

        const username = user.username

        const userBD = await prisma 

    } catch (error) {
        console.error("CREATE USER", error)
    }
}