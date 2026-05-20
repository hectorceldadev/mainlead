'use client'

import { Globe, Phone, Star, Verified } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { LeadPlacesAPIProps } from "./LeadsList.types"
import { useLeads } from "../../context/Leads.context"
import { Users } from "@/components/animate-ui/icons/users"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { CreateCompany } from "@/lib/CreateCompany/actions/actions"
import { CreateCompanyProps } from "@/lib/CreateCompany/actions/CreateCompany.types"


export const LeadsList = () => {
    const { leads } = useLeads()

    if (leads.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center mt-20 gap-3">
                <Users animateOnHover className="size-14 text-muted-foreground" />

                <div className="text-center">
                    <p className="text-xl font-semibold">
                        Aún no hay ningún lead
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Los leads aparecerán aquí cuando hagas una búsqueda
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
                    Leads encontrados ({leads.length})
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
                            {leads.map((lead: LeadPlacesAPIProps) => (
                                <TableRow key={lead.id}>
                                    {/* NEGOCIO */}
                                    <TableCell className="min-w-[250px]">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-medium">
                                                {lead.displayName.text}
                                            </p>

                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {lead.formattedAddress}
                                            </p>
                                        </div>
                                    </TableCell>

                                    {/* CONTACTO */}
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            {lead.nationalPhoneNumber && (
                                                <a
                                                    href={`tel:${lead.nationalPhoneNumber}`}
                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                >
                                                    <Phone className="size-4" />
                                                    {lead.nationalPhoneNumber}
                                                </a>
                                            )}

                                            {lead.websiteUri && (
                                                <a
                                                    href={lead.websiteUri}
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

                                    {/* ACCIONES */}
                                    <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            {lead.websiteUri && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <a
                                                        href={lead.websiteUri}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Web
                                                    </a>
                                                </Button>

                                            )}
                                            {lead?.alreadySaved ? (
                                                <Badge className="badge-saved inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full">
                                                    <Verified className="size-3" />
                                                    Guardado
                                                </Badge>
                                            ) : (
                                                <Button
                                                    onClick={async () => {
                                                        try {
                                                            const company: CreateCompanyProps = {
                                                                placeId: lead.id,
                                                                name: lead.displayName.text,
                                                                location: lead.formattedAddress || null,
                                                                phone: lead.nationalPhoneNumber || null,
                                                                websiteUrl: lead.websiteUri || null,
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