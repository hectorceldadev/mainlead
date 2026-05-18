'use server'

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function checkUser() {
    try {
        const { userId } = await auth()
        const userClerk = await currentUser()

        const username = userClerk?.username

        if (!username || !userId) {
            throw new Error('Unauthorized')
        }

        const userDB = await prisma.user.findUnique({
            where: {
                userId,
                username
            }
        })

        if (userDB) return { authorized: true, status: 200 }

        const newUserDB = await prisma.user.create({
            data: {
                userId,
                username
            }
        })

        if (!newUserDB) return { authorized: false, status: 401 }

        return { authorized: true, status: 200 }
    } catch (error) {
        console.error("CHECK USER", error)
        throw new Error('Internal server error')
    }
}