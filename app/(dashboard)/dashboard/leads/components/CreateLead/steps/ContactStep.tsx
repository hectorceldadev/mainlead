import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { User, UserRoundCog, Mail, Phone, ArrowLeft } from "lucide-react"
import { StepsProps } from "./Steps.types"
import { Button } from "@/components/ui/button"

const ContactStep = (props: StepsProps) => {

    const { setStep, form } = props

    const handleNextStep = async () => {
        const isValid = await form.trigger([
            'contactName'
        ])

        if (isValid) {
            setStep('lead')
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center text-muted-foreground  gap-2">
                <User className="size-4" />
                <h3 className="font-semibold">Contacto</h3>
            </div>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>
                        <User className="size-4" />
                        Nombre 
                    </FieldLabel>

                    <Input placeholder="Jose García" {...form.register('contactName')} />
                    {form.formState.errors.contactName && (
                        <p className="text-red-500 text-xs">{form.formState.errors.contactName.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel>
                        <UserRoundCog className="size-4" />
                        Cargo
                    </FieldLabel>

                    <Input placeholder="CEO" {...form.register('contactRole')}/>
                </Field>

                <Field>
                    <FieldLabel>
                        <Mail className="size-4" />
                        Email 
                    </FieldLabel>

                    <Input
                        placeholder="jose@empresa.com"
                        {...form.register('contactEmail')}
                    />
                </Field>

                <Field>
                    <FieldLabel>
                        <Phone className="size-4" />
                        Teléfono 
                    </FieldLabel>

                    <Input
                        placeholder="+34 600 000 000"
                        {...form.register('contactPhone')}
                    />
                </Field>
            </FieldGroup>
            <div className='flex items-center justify-end mt-4 gap-2'>
                <Button variant={'outline'} onClick={() => setStep('company')}>   
                    <ArrowLeft className='w-2 h-2'/>
                    Empresa
                </Button>
                <Button onClick={handleNextStep}>   
                    Continuar
                </Button>
            </div>
        </div>
    )
}

export default ContactStep
