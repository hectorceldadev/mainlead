'use client'

import { usePathname, useRouter } from "next/navigation"
import { HeaderComponentProps } from "./HeaderComponent.types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const HeaderComponent = (props: HeaderComponentProps) => {
    const { title } = props
    
    const router = useRouter()
    const path = usePathname()
    return (
        <div className="flex justify-between w-full items-center px-6">
            <p className="font-bold text-2xl bg-clip-text text-transparent bg-linear-to-t dark:from-white from-gray-600 to-black dark:to-gray-400">{title}</p>
            {path !== '/dashboard' && (
                <Button variant={'outline'} onClick={() => router.back()}>
                    <ArrowLeft />
                    Volver
                </Button>
            )}
        </div>  
    )
}