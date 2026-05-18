'use client'

import { TableLeadsProps } from './TableLeads.types'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    BadgeCheck,
    Building2,
    Clock3,
    Eye,
    Flame,
    Handshake,
    MapPin,
    Pencil,
    Snowflake,
    User,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { Users } from '@/components/animate-ui/icons/users'

import { Badge } from '@/components/ui/badge'

const statusConfig = {
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

export const TableLeads = ({
    leads,
}: TableLeadsProps) => {
    return (
        <div className="w-full">
            <Card className="rounded-2xl border shadow-sm">
                {/* HEADER */}
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="size-5" />
                        Leads unificados
                    </CardTitle>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline">
                            {leads.length} Leads
                        </Badge>

                        <Badge variant="secondary">
                            CRM + Google Places
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

                                        return (
                                            <TableRow
                                                key={lead.id}
                                                className="h-[72px]"
                                            >
                                                {/* COMPANY */}
                                                <TableCell className="max-w-[240px]">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="size-3.5 text-muted-foreground shrink-0" />

                                                            <p className="font-medium truncate">
                                                                {
                                                                    lead.company
                                                                        ?.name
                                                                }
                                                            </p>
                                                        </div>

                                                        {lead
                                                            .company
                                                            ?.location && (
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <MapPin className="size-3 shrink-0" />

                                                                <p className="truncate">
                                                                    {
                                                                        lead
                                                                            .company
                                                                            .location
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>

                                                {/* CONTACT */}
                                                <TableCell className="max-w-[220px]">
                                                    {lead.contact ? (
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <User className="size-3.5 text-muted-foreground shrink-0" />

                                                                <p className="text-sm font-medium truncate">
                                                                    {
                                                                        lead
                                                                            .contact
                                                                            .name
                                                                    }
                                                                </p>
                                                            </div>

                                                            {lead
                                                                .contact
                                                                ?.email && (
                                                                <p className="text-xs text-muted-foreground truncate">
                                                                    {
                                                                        lead
                                                                            .contact
                                                                            .email
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-muted-foreground">
                                                            Sin contacto
                                                        </p>
                                                    )}
                                                </TableCell>

                                                {/* PIPELINE */}
                                                <TableCell className="max-w-[220px]">
                                                    <div className="space-y-2">
                                                        <Badge
                                                            className={`border w-fit ${status.className}`}
                                                        >
                                                            {status.icon}
                                                            {status.label}
                                                        </Badge>

                                                        {lead.title ? (
                                                            <p className="text-sm truncate">
                                                                {
                                                                    lead.title
                                                                }
                                                            </p>
                                                        ) : (
                                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                                Lead importado desde
                                                                Google Places
                                                            </p>
                                                        )}
                                                    </div>
                                                </TableCell>

                                                {/* SOURCE */}
                                                <TableCell>
                                                    {lead.source ===
                                                    'GOOGLE_PLACES' ? (
                                                        <Badge
                                                            variant="secondary"
                                                            className="gap-1 text-xs"
                                                        >
                                                            <MapPin className="size-3" />
                                                            Google
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="gap-1 text-xs"
                                                        >
                                                            <BadgeCheck className="size-3" />
                                                            Manual
                                                        </Badge>
                                                    )}
                                                </TableCell>

                                                {/* ACTIONS */}
                                                <TableCell>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="size-8"
                                                        >
                                                            <Eye className="size-4" />
                                                        </Button>

                                                        <Button
                                                            size="icon"
                                                            className="size-8"
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Button>
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