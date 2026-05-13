'use client'

import { useRouter } from "next/navigation"
import { HeaderComponentProps } from "./HeaderComponent.types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const HeaderComponent = (props: HeaderComponentProps) => {
    const { title } = props
    
    const router = useRouter()

    return (
        <div className="flex justify-between w-full items-center px-6">
            <p className="font-bold text-2xl">{title}</p>
            <Button variant={'outline'} onClick={() => router.back()}>
                <ArrowLeft />
                Volver
            </Button>
        </div>  
    )
}