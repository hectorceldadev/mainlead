'use client'

import { useState } from 'react'

import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import CompanyStep from './steps/CompanyStep'
import ContactStep from './steps/ContactStep'
import PipelineStep from './steps/PipelineStep'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { createLead } from './actions/actions'
import { formSchema } from './CreateLead.form'

export const CreateLead = () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<'company' | 'contact' | 'lead'>('company')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            companyName: '',
            companyPhone: '',
            companyEmail: '',
            companyWebsite: '',
            companyLocation: '',

            contactName: '',
            contactRole: '',
            contactPhone: '',
            contactEmail: '',

            title: '',
            description: '',

            status: 'COLD',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            const lead = await createLead(values)

            toast.success('Lead creado con éxito')
            console.log(lead)
            setOpen(false)
            setStep('company')
            form.reset()
        } catch (error) {
            console.error(error)
            toast.error('Error creando el lead')
        }
        finally {
            setIsLoading(false)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="size-4" />
                    Añadir lead
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className='font-semibold'>
                        Crear nuevo lead
                    </DialogTitle>
                <Separator />
                </DialogHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {step === 'company' ? (
                        <CompanyStep setStep={setStep} form={form}/>
                    ) : step === 'contact' ? (
                        <ContactStep setStep={setStep} form={form}/>
                    ): step === 'lead' && (
                        <PipelineStep setStep={setStep} form={form} isLoading={isLoading} setIsLoading={setIsLoading}/>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}