'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation"

export const HeroHome = () => {
    const router = useRouter()

    return (
        <div className="h-screen flex flex-col w-full justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-6 dark:bg-zinc-950 bg-black/10 border dark:border-white/20 border-black/20 rounded-lg p-6">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="font-clash font-bold text-5xl text-center">Que no se te escapen <br />más <span className="underline bg-clip-text text-transparent bg-linear-to-tr from-blue-400 to-blue-700">leads</span></h1>
                    <h2 className="text-center text-md dark:text-gray-400">Olvídate para siempre de leads perdidos, <br />toma el control de tú publico</h2>
                </div>
                <Separator className="bg-black/10 dark:bg-white/10"/>
                <div className="flex gap-2 items-center">
                    <Button variant={'outline'}>
                        ¿Cómo funciona?
                    </Button>
                    <Button onClick={() => router.push('/sign-up')}>
                        ¡Empezar ya!
                    </Button>
                </div>
            </div>
        </div>
    )
}