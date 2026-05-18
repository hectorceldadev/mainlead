'use client'

import { Button } from "@/components/ui/button"
import { DeleteLeadsProps } from "./DeleteLeads.types"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { deleteLead } from "./actions/actions"

export const DeleteLeads = (props: DeleteLeadsProps) => {
    const { leadId } = props 

    const removeLead = async () => {
        try {
            await deleteLead(leadId)
            toast.success('Lead eliminado con éxito')
        } catch (error) {
            console.error(error)
            toast.error('Error eliminando el lead')
        }
    }

    return (
        <Button
            onClick={removeLead}
            variant={'destructive'}
            size={'icon'}
            className="cursor-pointer"
        >
            <Trash/>
        </Button>
    )
}