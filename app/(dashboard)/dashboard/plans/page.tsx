import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { HeaderComponent } from "../components/HeaderComponent"
import { PlansList } from "./components"

export default async function PlansPage() {
    const { userId } = await auth()

    const user = await prisma.user.findUnique({
        where: { userId: userId! },
        include: { subscription: true }
    })

    return (
        <div className="flex flex-col space-y-6">
            <HeaderComponent title="Planes" />
            <div className="flex flex-col px-6">
                <PlansList
                    credits={user?.credits ?? 0}
                    subscription={user?.subscription ?? null}
                />
            </div>
        </div>
    )
}
