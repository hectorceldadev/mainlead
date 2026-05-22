export type PlanId = "BASIC" | "PROFESSIONAL" | "AGENCY"
export type PlanFeature = {
    text: string
    included: boolean
}
export type Plan = {
    id: PlanId
    name: string
    description: string
    price: number      // en euros
    credits: number
    stripePriceId: string
    popular: boolean
    features: PlanFeature[]
}
export const plans: Plan[] = [
    {
        id: "BASIC",
        name: "Basic",
        description: "Para empezar a generar leads",
        price: 14,
        credits: 100,
        stripePriceId: process.env.STRIPE_BASIC_PRICE_ID!,
        popular: false,
        features: [
            { text: "100 créditos/mes", included: true },
            { text: "Búsqueda Google Places", included: true },
            { text: "CRM básico", included: true },
            { text: "Exportar leads", included: false },
            { text: "Soporte prioritario", included: false },
        ],
    },
    {
        id: "PROFESSIONAL",
        name: "Profesional",
        description: "El más elegido por freelancers",
        price: 29,
        credits: 1000,
        stripePriceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
        popular: true,
        features: [
            { text: "1000 créditos/mes", included: true },
            { text: "Búsqueda Google Places", included: true },
            { text: "CRM completo", included: true },
            { text: "Exportar leads", included: true },
            { text: "Soporte prioritario", included: false },
        ],
    },
    {
        id: "AGENCY",
        name: "Agency",
        description: "Para agencias y equipos",
        price: 79,
        credits: 3000,
        stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID!,
        popular: false,
        features: [
            { text: "3000 créditos/mes", included: true },
            { text: "Búsqueda Google Places", included: true },
            { text: "CRM completo", included: true },
            { text: "Exportar leads", included: true },
            { text: "Soporte prioritario", included: true },
        ],
    },
]
export function getPlanById(id: PlanId) {
    return plans.find((p) => p.id === id)
}