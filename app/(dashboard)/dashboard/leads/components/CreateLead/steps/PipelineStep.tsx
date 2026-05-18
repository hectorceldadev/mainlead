import { Button } from '@/components/ui/button'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Snowflake, Clock3, Flame, Handshake, ArrowLeft, LoaderCircle } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { StepsProps } from './Steps.types'

const PipelineStep = (props: StepsProps) => {

    const { setStep, form, isLoading, setIsLoading } = props

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground" />

                <h3 className="font-semibold">Pipeline</h3>
            </div>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>Título</FieldLabel>

                    <Input
                        placeholder="Venta software"
                        {...form.register('title')}
                    />
                </Field>

                <Field>
                    <FieldLabel>Estado</FieldLabel>

                    <Controller
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="COLD">
                                        <div className="flex items-center text-blue-500 gap-2">
                                            <Snowflake className="size-4" />
                                            Frío
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="TEMPERED">
                                        <div className="flex items-center text-orange-500 gap-2">
                                            <Clock3 className="size-4" />
                                            Templado
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="HOT">
                                        <div className="flex items-center text-red-500 gap-2">
                                            <Flame className="size-4" />
                                            Caliente
                                        </div>
                                    </SelectItem>

                                    <SelectItem value="CLOSED">
                                        <div className="flex items-center text-emerald-500 gap-2">
                                            <Handshake className="size-4" />
                                            Cerrado
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </Field>

                <Field className="md:col-span-2">
                    <FieldLabel>
                        Descripción
                    </FieldLabel>

                    <Textarea
                        rows={5}
                        placeholder="Información sobre el lead..."
                        {...form.register('description')}
                    />
                </Field>
            </FieldGroup>
            <div className="flex justify-end gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('contact')}
                >
                    <ArrowLeft className='w-2 h-2'/>
                    Contacto
                </Button>
                {isLoading ? (
                    <Button disabled>
                        Creando 
                        <LoaderCircle className='animate-spin'/>
                    </Button>
                ) : (
                    <Button type="submit">
                        Crear lead
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PipelineStep
