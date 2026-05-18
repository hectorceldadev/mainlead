'use client'

import { TableLeadsProps } from './TableLeads.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Building2, Clock3, Flame, Globe, Handshake, MapPin, Pencil, PencilRuler, Phone, Snowflake, User, Verified } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from '@/components/animate-ui/icons/users'
import { Badge } from '@/components/ui/badge'
import { LeadStatus } from '@/lib/generated/prisma/enums'
import Link from 'next/link'
import { DeleteLeads } from './DeleteLeads'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const statusConfig: Record<
    LeadStatus,
    {
        label: string,
        className: string,
        icon: React.ReactNode
    }> = {
    COLD: {
        label: 'Frío',
        className:
            'bg-blue-500/10 border-blue-500/70 text-blue-500',
        icon: <Snowflake className='w-4 h-4'/>
    },

    TEMPERED: {
        label: 'Templado',
        className:
            'bg-orange-500/10 border-orange-500/70 text-orange-500',
        icon: 
            <Clock3 className='w-4 h-4'/>
    },

    HOT: {
        label:
            'Caliente',
        className:
            'bg-red-500/10 border-red-500/70 text-red-500',
        icon: 
            <Flame className='w-4 h-4'/>
    },

    CLOSED: {
        label:
            'Cerrado',
        className:
            'bg-emerald-500/10 border-emerald-500/70 text-emerald-500',
        icon: 
            <Handshake className='w-4 h-4'/>
    },
}

const rowBg: Record<
    LeadStatus,
    {
        className: string
    }> = {
        COLD: {
            className: 'bg-blue-500/10'
        },
        TEMPERED: {
            className: 'bg-orange-500/10'
        },
        HOT: {
            className: 'bg-red-500/10'
        },
        CLOSED: {
            className: 'bg-emerald-500/10'
        }
}

export const TableLeads = (props: TableLeadsProps) => {
    const { leads } = props
    
    const router = useRouter()

    return (
        <div className="w-full">
            <Card className="rounded-2xl border shadow-sm">
                {/* HEADER */}
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Users className="size-5" />
                        Leads unificados
                    </CardTitle>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline">
                            {leads.length} Leads
                        </Badge>

                        <Badge variant="secondary">
                            CRM + MainLead
                        </Badge>
                    </div>
                </CardHeader>

                {/* CONTENT */}
                <CardContent>
                    <div className="rounded-xl border overflow-hidden">
                        <div className="max-h-[700px] overflow-y-auto overflow-x-auto">
                            <Table>
                                <TableHeader className="sticky top-0 bg-background z-10">
                                    <TableRow>
                                        <TableHead>
                                            Empresa
                                        </TableHead>

                                        <TableHead>
                                            Contacto
                                        </TableHead>

                                        <TableHead>
                                            Pipeline
                                        </TableHead>

                                        <TableHead>
                                            Fuente
                                        </TableHead>

                                        <TableHead className="text-right">
                                            Acciones
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {leads.map((lead) => {
                                        const status =
                                            statusConfig[
                                                lead.status as keyof typeof statusConfig
                                            ]

                                        const row = 
                                            rowBg[
                                                lead.status as keyof typeof rowBg
                                            ]

                                        return (
                                            <TableRow
                                                key={lead.id}
                                                className={`h-[72px]`}
                                            >
                                                {/* COMPANY */}
                                                <TableCell className="max-w-[200px]">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="size-3.5 text-muted-foreground shrink-0" />
                                                            <p className="font-medium truncate">{lead.company?.name}</p>
                                                        </div>
                                                        {lead.company?.location && (
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <MapPin className="size-3 shrink-0" />
                                                                <p className="truncate">{lead.company.location}</p>
                                                            </div>
                                                        )}
                                                        <div className='flex items-center gap-2 mt-2'>
                                                            {lead.company?.phone && (
                                                                <Badge variant={'outline'}>
                                                                    <Phone />
                                                                    {lead.company.phone}
                                                                </Badge>
                                                            )}
                                                            {lead.company?.websiteUrl ? (
                                                                <Link
                                                                    href={lead.company.websiteUrl}
                                                                >
                                                                    <Badge variant={'outline'}>
                                                                        <Globe />
                                                                        <p>Web</p>
                                                                    </Badge>
                                                                </Link>
                                                            ): (
                                                                <Badge variant={'destructive'}>
                                                                    <Globe />
                                                                    <p>Sin web</p>
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* CONTACT */}
                                                <TableCell className="max-w-[200px]">
                                                    {lead.contact ? (
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <User className="size-3.5 text-muted-foreground shrink-0" />

                                                                <p className="text-sm font-medium truncate">{lead.contact.name}
                                                                </p>
                                                            </div>

                                                            {lead.contact?.email && (
                                                                <p className="text-xs text-muted-foreground truncate">{lead.contact.email}</p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-muted-foreground">
                                                            Sin contacto
                                                        </p>
                                                    )}
                                                </TableCell>

                                                {/* PIPELINE */}
                                                <TableCell className="max-w-[200px]">
                                                    <div className="space-y-1">
                                                        <Badge className={status.className}>
                                                            {status.icon}
                                                            {status.label}
                                                        </Badge>
                                                        <div className='flex flex-col '>
                                                            {lead.title && (
                                                                <p className="text-sm truncate font-medium">{lead.title}</p>
                                                            )}
                                                            {lead.description && (
                                                                <p className="text-xs truncate text-muted-foreground">{lead.description}</p>
                                                            )}

                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* SOURCE */}
                                                <TableCell>
                                                    {lead.source ===
                                                    'GOOGLE_PLACES' ? (
                                                        <Badge variant={'outline'} className="gap-1 text-xs">
                                                            <Verified className="size-3" />
                                                            MainLead
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="gap-1 text-xs"
                                                        >
                                                            <PencilRuler className="size-3" />
                                                            Manual
                                                        </Badge>
                                                    )}
                                                </TableCell>

                                                {/* ACTIONS */}
                                                <TableCell>
                                                    <div className="flex justify-end gap-2">
                                                        <Button 
                                                            variant={'outline'} 
                                                            size={'icon'} 
                                                            className='cursor-pointer' 
                                                            onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                                                        >
                                                            <Pencil />
                                                        </Button>
                                                        <DeleteLeads leadId={lead.id}/>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}