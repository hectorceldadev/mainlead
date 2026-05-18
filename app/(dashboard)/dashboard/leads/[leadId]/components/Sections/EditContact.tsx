import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { FieldSet, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Phone, Mail, User } from "lucide-react"
import { EditLeadProps } from "../EditLead/EditLead.types"

export const EditContact = (props: EditLeadProps) => {
    const { lead, form } = props

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 font-semibold text-lg">
                Contacto
            </CardHeader>
            <CardContent>
                <FieldSet className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>
                            <User className="w-4 h-4" />
                            Nombre
                        </FieldLabel>
                        <Input placeholder={lead.contact?.name} {...form.register('contactName')}/>
                    </Field>
                    <Field>
                        <FieldLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Rol
                        </FieldLabel>
                        <Input placeholder={lead.contact?.phone || 'CEO'} {...form.register('contactRole')}/>
                    </Field>
                    <Field>
                        <FieldLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                        </FieldLabel>
                        <Input placeholder={lead.contact?.email || 'andresrodriguez@newest.com'} {...form.register('contactEmail')}/>
                    </Field>
                    <Field>
                        <FieldLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Teléfono
                        </FieldLabel>
                        <Input placeholder={lead.contact?.phone || '+34 624 18 25 71'} {...form.register('contactPhone')}/>
                    </Field>
                </FieldSet>
            </CardContent>
        </Card>
    )
}