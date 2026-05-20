'use client'

import { Button } from "@/components/ui/button"
import { SearchIcon } from "@/components/ui/search"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { HomeIconHandle } from "@/components/ui/home"
import { Factory, LoaderCircle, MapPin, Users } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./SearchLeads.form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useLeads } from "../../context/Leads.context"

export const SearchLeads = () => {
    const searchIconRef = useRef<HomeIconHandle>(null)

    const { setLeads, isLoading, setIsLoading } = useLeads()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: '',
            niche: '',
            numresults: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/leads/search-leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    textQuery: `${values.niche} en ${values.location}`,
                    languageCode: 'es',
                    pageSize: Number(values.numresults)
                })
            })

            
            const data = await response.json()

            if (data.status === false) {
                toast.error('Error obteniendo leads')
                return console.error('Error obteniendo leads')
            } else {
                toast.success('Leads obtenidos correctamente')
                setLeads(data.data.places)
                console.log(data.data.places)
            }

        } catch (error) {
            console.error(error)
            toast.error('Error buscando leads')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* 1. Añadimos w-full y un gap para separar los elementos */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:flex w-full items-center gap-6">
                
                {/* 2. Añadimos flex-1 para que el FieldSet ocupe todo el espacio restante */}
                <FieldSet className="flex-1">
                    
                    <FieldGroup className="gap-2 md:flex-row md:gap-4">
                        <Field className="">
                            <FieldLabel htmlFor="location"><MapPin className="w-4 h-4"/>Localización</FieldLabel>
                            <Input {...form.register('location')} id="location" placeholder="Barrio de Salamanca, Madrid..." />
                            
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="nicho"><Factory className="w-4 h-4"/>Nicho</FieldLabel>
                            <Input {...form.register('niche')} id="nicho" placeholder="Clínica dental, peluquería..."/>
                            
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="numresults"><Users className="w-4 h-4"/>N.º de resultados</FieldLabel>
                            <Controller 
                                control={form.control}
                                name="numresults"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="1">1 Resultados - 1 Créditos</SelectItem>
                                                <SelectItem value="5">5 Resultados - 5 Créditos</SelectItem>
                                                <SelectItem value="10">10 Resultados - 10 Créditos</SelectItem>
                                                <SelectItem value="20">20 Resultados - 20 Créditos</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>
                    </FieldGroup>
                </FieldSet>

                {/* 3. shrink-0 evita que el botón se deforme si la pantalla se achica */}
                    {isLoading ? (
                        <Button disabled className="flex items-center mt-auto">
                            Buscando
                            <LoaderCircle className="w-3.5 h-3.5 animate-spin"/>
                        </Button>
                    ): (
                        <Button 
                            type="submit"
                            className="shrink-0 mt-auto cursor-pointer"
                            onMouseEnter={() => searchIconRef.current?.startAnimation()}
                            onMouseLeave={() => searchIconRef.current?.stopAnimation()}
                        >
                            Buscar
                            <SearchIcon ref={searchIconRef} size={10}/>
                        </Button>
                    )}

            </form>
        </div>
    )
}