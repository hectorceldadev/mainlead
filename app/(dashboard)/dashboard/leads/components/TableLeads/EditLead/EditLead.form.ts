import { z } from "zod"

export const formSchema = z.object({
    title: z.string().min(2).max(200),
    description: z.string().min(2).max(500).optional(),
    name: z.string().min(2).max(200),
    businessName: z.string().min(2).max(200),
    phone: z.string().min(2).max(140).optional(),
    email: z.string().min(2).max(200).optional(),
    status: z.string().min(2).max(20) 
})