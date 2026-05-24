import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Factory, Phone, Mail, Globe, MapPin } from "lucide-react"
import { EditLeadProps } from "../EditLead/EditLead.types"

export const EditCompany = (props: EditLeadProps) => {
    const { lead, form } = props

    if (!form) return

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 font-semibold text-lg">
                Empresa
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>
                            <Factory className="w-4 h-4" />
                            Nombre
                        </FieldLabel>
                        <Input placeholder={lead.company?.name} {...form.register('companyName')}/>
                        {form.formState.errors.companyName && (
                            <p className="text-red-500 text-xs">{form.formState.errors.companyName.message}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel>
                            <Phone className="w-4 h-4" />
                            Teléfono
                        </FieldLabel>
                        <Input placeholder={lead.company?.phone || '+34 692 48 30 53'} {...form.register('companyPhone')}/>
                    </Field>
                    <Field>
                        <FieldLabel>
                            <Mail className="w-4 h-4" />
                            Email
                        </FieldLabel>
                        <Input placeholder={lead.company?.email || 'contacto@newest.com'} {...form.register('companyEmail')}/>
                    </Field>
                    <Field>
                        <FieldLabel>
                            <Globe className="w-4 h-4" />
                            Website
                        </FieldLabel>
                        <Input placeholder={lead.company?.websiteUrl || 'https://newest.com'} {...form.register('companyWebsite')}/>
                    </Field>
                    <Field className="md:col-span-2">
                        <FieldLabel>
                            <MapPin className="w-4 h-4" />
                            Dirección
                        </FieldLabel>
                        <Input placeholder={lead.company?.location || 'Av/Joaquín Sorolla 24, 1 Valencia'} {...form.register('companyLocation')}/>
                    </Field>
                </div>
            </CardContent>
        </Card>
    )
}