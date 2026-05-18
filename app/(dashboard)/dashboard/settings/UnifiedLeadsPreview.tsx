'use client'

import {
    Building2,
    Globe,
    Mail,
    MapPin,
    Phone,
    Star,
    User,
    Users,
    BadgeCheck,
    Flame,
    Snowflake,
    Clock3,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const leads = [
    {
        id: '1',
        source: 'manual',
        status: 'hot',
        completed: false,

        company: {
            name: 'Newest',
            website: 'https://newest.com',
            phone: '+34 611 22 33 44',
            address: 'Valencia, España',
            rating: null,
            reviews: null,
        },

        contact: {
            name: 'Andrés Jiménez',
            role: 'Founder',
            email: 'andres@newest.com',
            phone: '+34 611 22 33 44',
        },

        lead: {
            title: 'Implementación IA Verifactu',
            description: 'Interesado en automatizar facturación y agentes IA.',
        },
    },

    {
        id: '2',
        source: 'google_places',
        status: 'cold',
        completed: false,

        company: {
            name: 'Clínica Dental Valencia',
            website: 'https://clinicadentalvlc.com',
            phone: '+34 960 12 33 11',
            address: 'Ruzafa, Valencia',
            rating: 4.2,
            reviews: 187,
        },

        contact: null,

        lead: {
            title: null,
            description: null,
        },
    },

    {
        id: '3',
        source: 'google_places',
        status: 'tempered',
        completed: false,

        company: {
            name: 'Restaurante La Terraza',
            website: 'https://laterraza.es',
            phone: '+34 961 44 22 88',
            address: 'Valencia Centro',
            rating: 4.7,
            reviews: 932,
        },

        contact: {
            name: 'Carlos Pérez',
            role: 'Manager',
            email: 'carlos@laterraza.es',
            phone: '+34 622 55 66 77',
        },

        lead: {
            title: 'Software reservas + CRM',
            description: 'Pidió demo para automatización de reservas.',
        },
    },
]

const statusConfig = {
    cold: {
        label: 'Frío',
        icon: Snowflake,
        className:
            'bg-blue-500/10 text-blue-500 border-blue-500/30',
    },

    tempered: {
        label: 'Templado',
        icon: Clock3,
        className:
            'bg-orange-500/10 text-orange-500 border-orange-500/30',
    },

    hot: {
        label: 'Caliente',
        icon: Flame,
        className:
            'bg-red-500/10 text-red-500 border-red-500/30',
    },
}

export default function UnifiedLeadsPreview() {
    return (
        <div className="p-6">
            <Card className="rounded-2xl border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="size-5" />
                        Leads unificados
                    </CardTitle>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline">
                            3 Leads
                        </Badge>

                        <Badge variant="secondary">
                            CRM + Google Places
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader>
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
                                {leads.map((item) => {
                                    const status =
                                        statusConfig[
                                            item.status as keyof typeof statusConfig
                                        ]

                                    const StatusIcon = status.icon

                                    return (
                                        <TableRow key={item.id}>
                                            {/* COMPANY */}
                                            <TableCell className="min-w-[300px]">
                                                <div className="space-y-3">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="size-4" />

                                                            <p className="font-semibold">
                                                                {
                                                                    item.company
                                                                        .name
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                            <MapPin className="size-3" />

                                                            {
                                                                item.company
                                                                    .address
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        {item.company.phone && (
                                                            <Badge
                                                                variant="outline"
                                                                className="gap-1"
                                                            >
                                                                <Phone className="size-3" />
                                                                {
                                                                    item
                                                                        .company
                                                                        .phone
                                                                }
                                                            </Badge>
                                                        )}

                                                        {item.company.website && (
                                                            <Badge
                                                                variant="outline"
                                                                className="gap-1"
                                                            >
                                                                <Globe className="size-3" />
                                                                Web
                                                            </Badge>
                                                        )}

                                                        {item.company.rating && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="gap-1"
                                                            >
                                                                <Star className="size-3 fill-current" />
                                                                {
                                                                    item
                                                                        .company
                                                                        .rating
                                                                }{" "}
                                                                (
                                                                {
                                                                    item
                                                                        .company
                                                                        .reviews
                                                                }
                                                                )
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* CONTACT */}
                                            <TableCell className="min-w-[240px]">
                                                {item.contact ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <User className="size-4" />

                                                            <div>
                                                                <p className="font-medium">
                                                                    {
                                                                        item
                                                                            .contact
                                                                            .name
                                                                    }
                                                                </p>

                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        item
                                                                            .contact
                                                                            .role
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-1 text-sm">
                                                            {item.contact
                                                                .email && (
                                                                <span className="flex items-center gap-2 text-muted-foreground">
                                                                    <Mail className="size-3" />
                                                                    {
                                                                        item
                                                                            .contact
                                                                            .email
                                                                    }
                                                                </span>
                                                            )}

                                                            {item.contact
                                                                .phone && (
                                                                <span className="flex items-center gap-2 text-muted-foreground">
                                                                    <Phone className="size-3" />
                                                                    {
                                                                        item
                                                                            .contact
                                                                            .phone
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-sm text-muted-foreground">
                                                            Sin contacto asignado
                                                        </p>

                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="w-fit"
                                                        >
                                                            Añadir contacto
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>

                                            {/* PIPELINE */}
                                            <TableCell className="min-w-[250px]">
                                                <div className="space-y-3">
                                                    <Badge
                                                        className={`gap-1 border ${status.className}`}
                                                    >
                                                        <StatusIcon className="size-3" />
                                                        {status.label}
                                                    </Badge>

                                                    {item.lead.title ? (
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    item.lead
                                                                        .title
                                                                }
                                                            </p>

                                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                                {
                                                                    item.lead
                                                                        .description
                                                                }
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-muted-foreground">
                                                            Lead importado desde
                                                            Google Places sin
                                                            gestionar todavía.
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>

                                            {/* SOURCE */}
                                            <TableCell>
                                                {item.source ===
                                                'google_places' ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="gap-1"
                                                    >
                                                        <MapPin className="size-3" />
                                                        Google Places
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="gap-1"
                                                    >
                                                        <BadgeCheck className="size-3" />
                                                        Manual
                                                    </Badge>
                                                )}
                                            </TableCell>

                                            {/* ACTIONS */}
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Ver
                                                    </Button>

                                                    <Button size="sm">
                                                        Gestionar
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}