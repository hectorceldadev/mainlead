'use client'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"

export const HeaderHome = () => {
    const router = useRouter()

    return (
        <div className="absolute top-4 flex justify-between items-center mx-auto max-w-sm w-full md:max-w-3xl px-4 lg:px-10 py-2 dark:bg-white/10 bg-black/10 border border-black/20 dark:border-white/20 shadow-lg shadow-black/40 dark:shadow-white/10 rounded-lg">
            <div className="border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 rounded-md py-0.5 px-1.5 font-bold">
                <p>Main<span className="bg-clip-text text-transparent bg-linear-to-tr from-blue-500 to-blue-600">Lead</span></p>
            </div>
            <div className="md:hidden">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>¿Cómo funciona?</DropdownMenuLabel>
                            <DropdownMenuItem>¿Que es?</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Planes</DropdownMenuLabel>
                            <DropdownMenuItem>Precios</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Acceso</DropdownMenuLabel>
                            <DropdownMenuItem>Iniciar sesión</DropdownMenuItem>
                            <DropdownMenuItem>Crear cuenta</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Cómo funciona</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Planes</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Funcionalidades</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="items-center hidden md:block">
                <Button className="mr-2" variant={'outline'} onClick={() => router.push('/sign-in')}>
                    Iniciar sesión
                </Button>
                <Button onClick={() => router.push('/sign-up')}>
                    Empezar
                </Button>
            </div>
        </div>
    )
}