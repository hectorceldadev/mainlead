import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "../CreateLead.form"

export type StepsProps = {
    setStep: Dispatch<SetStateAction<'company' | 'contact' | 'lead'>>
    form: UseFormReturn<z.infer<typeof formSchema>>
    setIsLoading?: Dispatch<SetStateAction<boolean>>
    isLoading?: boolean
}