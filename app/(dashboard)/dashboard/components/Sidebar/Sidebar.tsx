'use client'

import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Users } from "@/components/animate-ui/icons/users"
import { Button } from "@/components/ui/button"
import { HistoryIcon } from "@/components/ui/history"
import { HomeIcon, HomeIconHandle } from "@/components/ui/home"
import { LogoutIcon } from "@/components/ui/logout"
import { SearchIcon } from "@/components/ui/search"
import { Separator } from "@/components/ui/separator"
import { SettingsIcon } from "@/components/ui/settings"
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
import { BowArrow,  LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export function AppSidebar() {
    const router = useRouter()
    const homeIconRef = useRef<HomeIconHandle>(null)
    const settingsIconRef = useRef<HomeIconHandle>(null)
    const logoutIconRef = useRef<HomeIconHandle>(null)
    const searchIconRef = useRef<HomeIconHandle>(null)
    const historyIconRef = useRef<HomeIconHandle>(null)

    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <p className="font-bold font-clash text-md bg-clip-text text-transparent bg-linear-to-t dark:from-white from-gray-600 to-black dark:to-gray-400">MainLead</p>
            </SidebarHeader>
            <Separator />
            <SidebarContent className="text-sm">
                <SidebarGroup className="font-medium">
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarMenu className="space-y-1">
                        <SidebarMenuItem 
                            onClick={() => router.push('/dashboard')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer group"
                            onMouseEnter={() => homeIconRef.current?.startAnimation()}
                            onMouseLeave={() => homeIconRef.current?.stopAnimation()}
                        >
                            <HomeIcon ref={homeIconRef} size={16} />
                            Home
                        </SidebarMenuItem>

                        <AnimateIcon animateOnHover>
                            <SidebarMenuItem onClick={() => router.push('/dashboard/leads')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer">
                                <Users size={16} />
                                Leads
                            </SidebarMenuItem>
                        </AnimateIcon>

                        <SidebarMenuItem 
                            onClick={() => router.push('/dashboard/find-leads')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer group"
                            onMouseEnter={() => searchIconRef.current?.startAnimation()}
                            onMouseLeave={() => searchIconRef.current?.stopAnimation()}
                        >
                            <SearchIcon ref={searchIconRef} size={16} />
                            Find leads
                        </SidebarMenuItem>

                        <SidebarMenuItem 
                            onClick={() => router.push('/dashboard/history-leads')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer group"
                            onMouseEnter={() => historyIconRef.current?.startAnimation()}
                            onMouseLeave={() => historyIconRef.current?.stopAnimation()}
                        >
                            <HistoryIcon ref={historyIconRef} size={16} />
                            History leads
                        </SidebarMenuItem>
                    </SidebarMenu>
                    
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem 
                            onClick={() => router.push('/dashboard/settings')} className="flex gap-2 items-center dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-md cursor-pointer group"
                            onMouseEnter={() => settingsIconRef.current?.startAnimation()}
                            onMouseLeave={() => settingsIconRef.current?.stopAnimation()}
                        >
                            <SettingsIcon ref={settingsIconRef} size={16} />
                            Settings
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
                        <Button 
                            variant={'destructive'}
                            onMouseEnter={() => logoutIconRef.current?.startAnimation()}
                            onMouseLeave={() => logoutIconRef.current?.stopAnimation()}
                        >
                            <LogoutIcon ref={logoutIconRef}/>
                            Cerrar sesión
                        </Button>
                    </SignOutButton>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}