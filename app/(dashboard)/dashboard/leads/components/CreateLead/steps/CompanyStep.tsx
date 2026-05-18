import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Building2, Phone, Mail, Globe, MapPin } from 'lucide-react'
import { StepsProps } from './Steps.types'

const CompanyStep = (props: StepsProps) => {

    const { setStep, form } = props

    const handleNextStep = async () => {
        const isValid = await form.trigger([
            'companyName'
        ])

        if (isValid) {
            setStep('contact')
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center text-muted-foreground gap-2">
                <Building2 className="size-4" />
                <h3 className="font-semibold">Empresa</h3>
            </div>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>
                        <Building2 className="size-4" />
                        Nombre
                    </FieldLabel>
                    <Input placeholder="Newest S.L"{...form.register('companyName')}/>
                    {form.formState.errors.companyName && (
                        <p className='text-red-500 text-xs'>{form.formState.errors.companyName.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel>
                        <Phone className="size-4" />
                        Teléfono
                    </FieldLabel>

                    <Input placeholder="+34 600 000 000" {...form.register('companyPhone')} />
                </Field>

                <Field>
                    <FieldLabel>
                        <Mail className="size-4" />
                        Email 
                    </FieldLabel>

                    <Input placeholder="info@empresa.com" {...form.register('companyEmail')} />
                </Field>

                <Field>
                    <FieldLabel>
                        <Globe className="size-4" />
                        Web
                    </FieldLabel>

                    <Input placeholder="https://empresa.com" {...form.register('companyWebsite')} />
                </Field>

                <Field className="md:col-span-2">
                    <FieldLabel>
                        <MapPin className="size-4" />
                        Dirección
                    </FieldLabel>

                    <Input placeholder="Valencia, España" {...form.register('companyLocation')} />
                </Field>
            </FieldGroup>
            <div className='flex items-center justify-end mt-4 gap-4'>
                <Button onClick={handleNextStep}>   
                    Continuar
                </Button>
            </div>
        </div>
    )
}

export default CompanyStep
