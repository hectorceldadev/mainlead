import { z } from "zod"

export const formSchema = z.object({
    location: z.string().min(2).max(200),
    niche: z.string().min(2).max(200),
    numresults: z.string()
})

