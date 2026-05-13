'use client'

import { ArrowLeft, Home } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export const GoHome = () => {
    const router = useRouter()

    return (
        <div className="absolute top-4 left-4 z-10">
            <Button variant={'outline'} onClick={() => router.push('/')}>
                <ArrowLeft />
                <Home />
            </Button>
        </div>
    )
}