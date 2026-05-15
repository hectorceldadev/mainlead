'use client'

import { Input } from "@/components/ui/input"
import { BookOpenText, Building, ChartSpline, Mail, NotepadText, Phone, PlusCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./CreateLead.form"
import { createLead, searchLeads } from "./actions/actions"
import { toast } from "sonner"
import { useEffect, useState } from "react"

export const CreateLead = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            name: "",
            businessName: "",
            status: "",
            email: "",
            phone: "",
            title: "",
            description: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await createLead(values)
            toast.success('Lead creado con éxito')
            setIsOpen(false)
            form.reset()
        } catch (error) {
            console.error(error)
            toast.error('Error al crear el lead')
        }
    }

    return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <p className="hidden md:block">Añadir lead</p>
                        <PlusCircle className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="md:min-w-150 p-6">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="grid md:grid-cols-2 grid-cols-1">
                            <Field>
                                <FieldLabel htmlFor="nombre"><User className="w-4 h-4" />Nombre del lead</FieldLabel>
                                <Input id="nombre" {...form.register('name')} placeholder="Jose García" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="businessName"><Building className="w-4 h-4" />Empresa</FieldLabel>
                                <Input id="businessName" {...form.register('businessName')} placeholder="Newest S.L" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="title"><NotepadText className="w-4 h-4" />Asunto</FieldLabel>
                                <Input id="title" {...form.register('title')} placeholder="Venta software" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="title"><ChartSpline className="w-4 h-4" />Estado del lead</FieldLabel>
                                <Controller
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-45">
                                                <SelectValue placeholder="Estado del lead" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem className="text-blue-400" value="cold">Frío</SelectItem>
                                                    <SelectItem className="text-orange-500" value="tempered">Templado</SelectItem>
                                                    <SelectItem className="text-red-400" value="hot">Caliente</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email"><Mail className="w-4 h-4" />Email del lead</FieldLabel>
                                <Input id="email" {...form.register('email')} placeholder="josegarcia@newest.com" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone"><Phone className="w-4 h-4" />Teléfono del lead</FieldLabel>
                                <Input id="phone" {...form.register('phone')} placeholder="+34 629 48 25 14" />
                            </Field>
                            <Field className="md:col-span-2 col-span-1">
                                <FieldLabel htmlFor="description"><BookOpenText className="w-4 h-4" />Descripción</FieldLabel>
                                <Textarea id="description" {...form.register('description')} placeholder="Presentación del software Verifactu e implementación de demo gratuita." />
                            </Field>
                        </FieldGroup>
                        <Button type="submit" className="mt-6 w-full">
                            Crear
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
    )
}