'use client'

import { EditLeadProps, formSchema } from "./EditLead.types"
import { EditCompany, EditContact, EditPipeline } from "../Sections"
import { Card } from "@/components/ui/card"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function EditLead(props: EditLeadProps) {
    const { lead } = props

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            companyName: lead.company?.name || '',
            companyPhone: lead.company?.phone || '',
            companyEmail: lead.company?.email || '',
            companyWebsite: lead.company?.websiteUrl || '',
            companyLocation: lead.company?.location || '',

            contactName: lead.contact?.name || '',
            contactRole: lead.contact?.role || '',
            contactPhone: lead.contact?.phone || '',
            contactEmail: lead.contact?.email || '',

            title: lead.title || '',
            description: lead.description || '',

            status: lead.status || 'COLD',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            toast.success('Lead actualizado con éxito')
        } catch (error) {
            console.error(error)
            toast.error('Error al actualizar el lead')
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <EditCompany lead={lead} form={form} />
                    <EditContact lead={lead} form={form} />
                    <EditPipeline lead={lead} form={form} />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">
                        Guardar cambios
                    </Button>
                </div>

            </div>
        </form>
    )
}