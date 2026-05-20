'use client'

import { HistoryCompany } from "@/lib/generated/prisma/client"
import { HistoryListProps } from "./HistoryList.types"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Phone, Globe, Star } from "lucide-react"
import { toast } from "sonner"
import { CreateCompany } from "../../../find-leads/components/LeadsList/actions/actions"
import { CreateCompanyProps } from "../../../find-leads/components/LeadsList/actions/CreateCompany.types"
import { Users } from "@/components/animate-ui/icons/users"

export const HistoryList = (props: HistoryListProps) => {
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
                        Los historyList aparecerán aquí cuando hagas una búsqueda
                    </p>
                </div>
            </div>
        )
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users animateOnHover className="size-5" />
                    Historial no guardado ({historyList.length})
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
                                <TableHead className="text-right">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {historyList.map((lead: HistoryCompany) => (
                                <TableRow key={lead.id}>
                                    {/* NEGOCIO */}
                                    <TableCell className="min-w-[250px]">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-medium">
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
                                                {lead.rating || 0} reviews
                                            </p>
                                        </div>
                                    </TableCell>

                                    {/* ACCIONES */}
                                    <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            {lead.websiteUrl && (
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

                                            )}
                                            
                                                <Button
                                                    className="cursor-pointer"
                                                    onClick={async () => {
                                                        try {
                                                            const company: CreateCompanyProps = {
                                                                placeId: lead.id,
                                                                name: lead.name,
                                                                location: lead.location || null,
                                                                phone: lead.phone || null,
                                                                websiteUrl: lead.websiteUrl || null,
                                                            }

                                                            const companyDB = await CreateCompany(company)

                                                            console.log(companyDB)
                                                            toast.success('Lead guardado correctamente')
                                                        } catch (error) {
                                                            console.error("CREATE COMPANY", error)
                                                            toast.error('Error creando lead')
                                                        }
                                                    }}
                                                    size="sm"
                                                >
                                                    Guardar
                                                </Button>
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