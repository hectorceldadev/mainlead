'use client'

import React, { useEffect, useState } from 'react'
import { TableLeadsProps } from './TableLeads.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BriefcaseBusiness, Mail, Pencil, Phone, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { completedLead, deleteLead } from './actions/actions'
import { toast } from 'sonner'
import { EditLead } from './EditLead'

const statusConfig = {
    cold: { label: 'Frío', classname: 'bg-blue-500/10 border-blue-500/70 text-blue-500' },
    tempered: { label: 'Templado', classname: 'bg-orange-500/10 border-orange-500/70 text-orange-500' },
    hot: { label: 'Caliente', classname: 'bg-red-500/10 border-red-500/70 text-red-500' },
}

const rowBgConfig = {
    cold: 'bg-blue-400/10',
    tempered: 'bg-orange-400/10',
    hot: 'bg-red-500/10',
}

export const TableLeads = (props: TableLeadsProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    
    const { leads } = props

    return (
        <div className='w-full rounded-md border dark:border-zinc-800'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-bold'>Lead</TableHead>
                        <TableHead className='font-bold'>Información</TableHead>
                        <TableHead className='font-bold'>Estado</TableHead>
                        <TableHead className='font-bold'>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => {
                        const status = statusConfig[lead.status as keyof typeof statusConfig]
                        const rowBg = lead.completed 
                            ? 'bg-emerald-600/20'
                            : rowBgConfig[lead.status as keyof typeof rowBgConfig] ?? ''
                        
                            return (
                                <TableRow key={lead.id} className={rowBg}>
                                    <TableCell>
                                        <p className='font-semibold'>{lead.name}</p>
                                        <div className='flex flex-col gap-1 mt-1'>
                                            <span className='flex items-center gap-2'>
                                                <Mail className='w-3 h-3'/>{lead.email}
                                            </span>
                                            <span className='flex items-center gap-2'>
                                                <Phone className='w-3 h-3'/>{lead.phone}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className='font-semibold'>{lead.title}</p>
                                        <p className='text-sm text-muted-foreground line-clamp-2'>{lead.description}</p>
                                        <span className='flex items-center gap-2'>
                                            <BriefcaseBusiness className='w-3 h-3'/>{lead.businessName}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-sm px-2 py-1 rounded-md border ${status.classname}`}>
                                            {status.label}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex gap-2 items-center'>
                                            <EditLead lead={lead}/>
                                            <Button variant={'destructive'} size={'icon'} onClick={async() => {
                                                try {
                                                    await deleteLead(lead.id)
                                                    toast.success('Lead eliminado con éxito')
                                                } catch (error) {
                                                    console.error(error)
                                                    toast.error('Error eliminando el lead')
                                                }
                                            }}>
                                                <Trash className='w-3 h-3'/>
                                            </Button>
                                            <Checkbox checked={lead.completed} onCheckedChange={async () => {
                                                try {
                                                    const checked = !isChecked
                                                    setIsChecked(!isChecked)
                                                    await completedLead(lead.id, checked)
                                                    toast.success(checked ? '¡Enhorabuena por cerrar ese lead!' : 'Lead desmarcado correctamente')
                                                } catch (error) {
                                                    console.error(error)
                                                    toast.error('Error marcando lead completado')
                                                }
                                            }} className='size-5' />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}