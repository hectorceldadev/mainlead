import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./dashboard/components";
import { auth } from "@clerk/nextjs/server";
import { checkUser } from "./actions/actions";


export default async function DashboardLayout({children}: {children: React.ReactNode}) {

    const { userId } = await auth()

    const response = await checkUser()
    
    if (!userId || response.authorized === false) {
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