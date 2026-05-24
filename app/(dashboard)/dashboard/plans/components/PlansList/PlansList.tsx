'use client'

import { useState } from "react"
import { plans, type Plan, type PlanId } from "@/lib/stripe/stripe-plans"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Coins, Crown, LoaderCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type SubscriptionData = {
    planId: string
    status: string
    cancelAtPeriodEnd: boolean
} | null

type PlansListProps = {
    credits: number
    subscription: SubscriptionData
}

export const PlansList = ({ credits, subscription }: PlansListProps) => {
    const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null)

    const currentPlanId = subscription?.planId as PlanId | undefined
    const isSubscribed = subscription?.status === "active"
    const isCanceled = subscription?.status === "canceled"

    const router = useRouter()

    async function handleSubscribe(plan: Plan) {
        setLoadingPlan(plan.id)
        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId: plan.id }),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.error || "Error al procesar la solicitud")
                return
            }

            if (data.url) {
                router.push(data.url)
            }
        } catch {
            toast.error("Error de conexión")
        } finally {
            setLoadingPlan(null)
        }
    }

    async function handleManage() {
        try {
            const res = await fetch("/api/stripe/portal", { method: "POST" })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.error || "Error al abrir el portal")
                return
            }

            if (data.url) {
                window.location.href = data.url
            }
        } catch {
            toast.error("Error de conexión")
        }
    }

    return (
        <div className="space-y-8">
            {credits > 0 && credits <= 20 && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                    <Coins className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                        Te quedan <span className="font-bold">{credits} créditos</span>.{" "}
                        {isSubscribed
                            ? "Tus créditos se renovarán automáticamente el próximo período."
                            : "Hazte con un plan para seguir buscando leads sin interrupciones."}
                    </p>
                </div>
            )}

            {isSubscribed && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                    <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                                Plan {plans.find(p => p.id === currentPlanId)?.name ?? "activo"}
                                {subscription?.cancelAtPeriodEnd && (
                                    <span className="ml-2 text-amber-500 font-normal">
                                        (se cancelará al final del período)
                                    </span>
                                )}
                            </p>
                            <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                                Tienes {credits} créditos disponibles
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleManage}>
                        Gestionar suscripción
                    </Button>
                </div>
            )}

            {isCanceled && !isSubscribed && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <Sparkles className="w-5 h-5 text-gray-400 shrink-0" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tu suscripción anterior ha finalizado. Elige un plan para reactivarla.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                    const isCurrentPlan = currentPlanId === plan.id && isSubscribed
                    const isLoading = loadingPlan === plan.id

                    return (
                        <Card
                            key={plan.id}
                            size="sm"
                            className={cn(
                                "relative flex flex-col transition-all duration-200 overflow-visible",
                                plan.popular && "ring-2 ring-primary/30 shadow-lg",
                                isCurrentPlan && "ring-2 ring-emerald-400/50",
                            )}
                        >
                            {plan.popular && (
                                <Badge className="absolute -top-2 z-20 left-1/2 -translate-x-1/2 badge-saved inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full">
                                    Más popular
                                </Badge>
                            )}

                            {isCurrentPlan && (
                                <Badge
                                    variant="secondary"
                                    className="absolute -top-2.5 right-3 bg-emerald-500 text-white px-3 py-0.5 text-xs font-semibold"
                                >
                                    Plan actual
                                </Badge>
                            )}

                            <CardHeader>
                                <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 space-y-6">
                                <div>
                                    <span className="text-3xl font-bold">{plan.price}€</span>
                                    <span className="text-sm text-muted-foreground ml-1">/mes</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <Coins className="w-4 h-4 text-amber-500" />
                                    <span>{plan.credits} créditos / mes</span>
                                </div>

                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <Check
                                                className={cn(
                                                    "w-4 h-4 mt-0.5 shrink-0",
                                                    feature.included
                                                        ? "text-emerald-500"
                                                        : "text-muted-foreground/30"
                                                )}
                                            />
                                            <span
                                                className={
                                                    feature.included
                                                        ? "text-foreground"
                                                        : "text-muted-foreground/50 line-through"
                                                }
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                {isCurrentPlan ? (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleManage}
                                    >
                                        Gestionar plan
                                    </Button>
                                ) : (
                                    <Button
                                        variant={plan.popular ? "default" : "outline"}
                                        className="w-full cursor-pointer"
                                        onClick={() => handleSubscribe(plan)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                                Procesando...
                                            </>
                                        ) : isSubscribed ? (
                                            "Cambiar a este plan"
                                        ) : (
                                            "Suscribirse"
                                        )}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
