'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { FieldSet, Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { User, NotepadText, Flame, Clock3, Snowflake, BookmarkCheck } from "lucide-react"
import { EditLeadProps } from "../EditLead/EditLead.types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"

export const EditPipeline = (props: EditLeadProps) => {
    const { lead, form } = props

    return (
        <Card className="md:col-span-2">
            <CardHeader className="flex items-center gap-2 font-semibold text-lg">
                Pipeline
            </CardHeader>
            <CardContent>
                <FieldSet className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>
                            <NotepadText className="w-4 h-4" />
                            Título
                        </FieldLabel>
                        <Input placeholder={lead.contact?.name} {...form.register('title')}/>
                    </Field>
                    <Field>
                        <FieldLabel>
                            <BookmarkCheck className="w-4 h-4" />
                            Estado
                        </FieldLabel>
                        <Controller 
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>   
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Estado"/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            <SelectItem value="COLD">
                                                <div className="flex items-center gap-2 text-blue-500">
                                                    <Snowflake /> 
                                                    Frío
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="TEMPERED">
                                                <div className="flex items-center gap-2 text-orange-500">
                                                    <Clock3 /> 
                                                    Templado
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="HOT">
                                                <div className="flex items-center gap-2 text-red-500">
                                                    <Flame /> 
                                                    Caliente
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="CLOSED">
                                                <div className="flex items-center gap-2 text-emerald-500">
                                                    <Snowflake /> 
                                                    Cerrado
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                    <Field className="md:col-span-2">
                        <FieldLabel className="flex items-center gap-2">
                            <NotepadText className="w-4 h-4" />
                            Descripción
                        </FieldLabel>
                        <Textarea placeholder={lead.description || '+34 692 48 30 53'} {...form.register('description')}/>
                    </Field>
                </FieldSet>
            </CardContent>
        </Card>
    )
}