'use client'

import { HistoryCompany } from "@/lib/generated/prisma/client"
import { HistoryListProps } from "./HistoryList.types"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Phone, Globe, Star, MapPin, Verified, LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import { Users } from "@/components/animate-ui/icons/users"
import { Badge } from "@/components/ui/badge"
import { HistoryIcon } from "@/components/ui/history"
import { CreateCompanyProps } from "@/lib/actions/CreateCompany/actions/CreateCompany.types"
import { CreateCompany } from "@/lib/actions/CreateCompany/actions/actions"
import { useState } from "react"
import { Trash2 } from "@/components/animate-ui/icons/trash-2"
import { deleteHistoryCompany } from "../../actions/actions"

export const HistoryList = (props: HistoryListProps) => {
    const [savingId, setSavingId] = useState<string | null>(null)
    const [savedLocally, setSavedLocally] = useState<Set<string>>(new Set())
    const [deletedLocally, setDeletedLocally] = useState<Set<string>>(new Set())

    const { historyList } = props

    if (historyList.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center mt-20 gap-3">
                <Users animateOnHover className="size-14 text-muted-foreground" />

                <div className="text-center">
                    <p className="text-xl font-semibold">
                        Aún no hay ningún lead
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Los historiales aparecerán aquí cuando hagas una búsqueda
                    </p>
                </div>
            </div>
        )
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-1">
                    <HistoryIcon size={20} />
                    Historial ({historyList.length})
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="rounded-xl border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Negocio</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Reviews</TableHead>
                                <TableHead>Fuente</TableHead>
                                <TableHead className="text-right">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {historyList
                                .filter(lead => !deletedLocally.has(lead.id))
                                .map((lead: HistoryCompany) => (
                                <TableRow key={lead.id}>
                                    {/* NEGOCIO */}
                                    <TableCell className="max-w-[300px]">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-medium truncate">
                                                {lead.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {lead.location}
                                            </p>
                                        </div>
                                    </TableCell>


                                    {/* CONTACTO */}
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            {lead.phone && (
                                                <a
                                                    href={`tel:${lead.phone}`}
                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                >
                                                    <Phone className="size-4" />
                                                    {lead.phone}
                                                </a>
                                            )}

                                            {lead.websiteUrl && (
                                                <a
                                                    href={lead.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm hover:underline text-blue-500"
                                                >
                                                    <Globe className="size-4" />
                                                    Web
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* REVIEWS */}
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 font-medium">
                                                <Star className="size-4 fill-current" />
                                                {lead.rating || 'N/A'}
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                {lead.userRatingCount || 0} reviews
                                            </p>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {lead.source === 'GOOGLE_PLACES' ? (
                                            <Badge variant={'outline'}>
                                                <MapPin className="w-4 h-4" />
                                                Google Maps
                                            </Badge>
                                        ) : (
                                            <Badge variant={'outline'}>
                                                <MapPin className="w-4 h-4" />
                                                LinkedIn
                                            </Badge>
                                        )}
                                    </TableCell>

                                    {/* ACCIONES */}
                                    <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            {lead.websiteUrl ? (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <a
                                                        href={lead.websiteUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Web
                                                    </a>
                                                </Button>

                                            ) : (
                                                <Badge variant={'destructive'}>
                                                    Sin web
                                                </Badge>
                                            )}

                                            {lead.savedCompanyId || savedLocally.has(lead.id) ? (
                                                <div className="flex items-center gap-2">
                                                    <Badge className="badge-saved inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full">
                                                        <Verified />
                                                        Guardado
                                                    </Badge>
                                                    <Button 
                                                        className="cursor-pointer"
                                                        variant={'destructive'} 
                                                        size={'icon'} 
                                                        onClick={async () => {
                                                            try {
                                                                const status = await deleteHistoryCompany(lead.id)

                                                                if (!status.delete) {
                                                                    toast.error('Error eliminando del historial')
                                                                } else {
                                                                    setDeletedLocally(prev => new Set(prev).add(lead.id))
                                                                    toast.success('Eliminado del historial')
                                                                }
                                                            } catch (error) {
                                                                console.error(error)
                                                                toast.error('Error al eliminar el lead')
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 animateOnHover/>
                                                    </Button>
                                                </div>
                                            ) : savingId === lead.id ? (
                                                <Button variant={'outline'} disabled className="text-sm">
                                                    Guardando
                                                    <LoaderCircle className="w-3 h-3 animate-spin" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="cursor-pointer"
                                                    onClick={async () => {
                                                        setSavingId(lead.id)
                                                        try {
                                                            const company: CreateCompanyProps = {
                                                                placeId: lead.placeId!,
                                                                name: lead.name,
                                                                location: lead.location || null,
                                                                phone: lead.phone || null,
                                                                websiteUrl: lead.websiteUrl || null,
                                                            }

                                                            await CreateCompany(company)

                                                            setSavedLocally(prev => new Set(prev).add(lead.id))
                                                            toast.success('Lead guardado correctamente')
                                                        } catch (error) {
                                                            console.error("CREATE COMPANY", error)
                                                            toast.error('Error creando lead')
                                                        } finally {
                                                            setSavingId(null)
                                                        }
                                                    }}
                                                    size="sm"
                                                >
                                                    Guardar
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}