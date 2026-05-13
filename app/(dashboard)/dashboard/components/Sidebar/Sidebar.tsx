'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutButton, UserButton } from "@clerk/nextjs"
import { BowArrow, Home, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export function AppSidebar() {
    const router = useRouter()

    return (
        <Sidebar>
            <SidebarHeader>
                <p className="font-clash font-bold px-2 py-1">Main<span className="bg-clip-text text-transparent bg-linear-to-tr from-blue-500 to-blue-600">Lead</span></p>
            </SidebarHeader>
            <Separator />
            <SidebarContent className="text-sm">
                <SidebarGroup className="font-medium">
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarMenu className="space-y-1">
                        <SidebarMenuItem onClick={() => router.push('/dashboard/leads')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer">
                            <Home className="w-4 h-4" />
                            Home
                        </SidebarMenuItem>
                        <SidebarMenuItem onClick={() => router.push('/dashboard/leads')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer">
                            <BowArrow className="w-4 h-4" />
                            Leads
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem onClick={() => router.push('/dashboard/leads')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer">
                            <Settings className="w-4 h-4" />
                            Ajustes
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <Separator />
            <SidebarFooter>
                <div className="flex justify-between p-2 rounded-md">
                    <UserButton />
                    <SignOutButton>
                        <Button variant={'destructive'}>
                            <LogOut />
                            Cerrar sesión
                        </Button>
                    </SignOutButton>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}