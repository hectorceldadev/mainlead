'use server'

import { z } from "zod"
import { formSchema } from "../EditLead.form";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editLead(leadId: string, values: z.infer<typeof formSchema>) {
    try {
        const { userId } = await auth()

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const lead = await prisma.lead.update({
            where: {
                id: leadId,
                userId
            },
            data: {...values}
        })

        revalidatePath('/dashboard/leads')
        return lead
    } catch (error) {
        console.error("LEAD EDIT", error)
        throw new Error('Internal server error')
    }
}