import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./dashboard/components";
import { auth } from "@clerk/nextjs/server";


export default async function DashboardLayout({children}: {children: React.ReactNode}) {

    const { userId } = await auth()

    if (!userId) {
        return (
            <div className="h-screen flex justify-center items-center">
                <p className="text-xl font-semibold">No estás autenticado</p>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger className="size-12"/>
                {children}
            </main>
        </SidebarProvider>
    )
}