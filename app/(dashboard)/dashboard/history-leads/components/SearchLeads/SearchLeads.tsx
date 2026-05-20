'use client'

import { Button } from "@/components/ui/button"
import { HomeIconHandle } from "@/components/ui/home"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/ui/search"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export const SearchLeads = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')    
    const searchIconRef = useRef<HomeIconHandle>(null)
    
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            searchTerm ? params.set('q', searchTerm) : params.delete('q')
            router.push(`/dashboard/history-leads?${params.toString()}`)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm])

    return (
        <div className="flex justify-between items-center gap-4">
            <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar en el historial..." />
            <Button 
                className="cursor-pointer"
                onClick={() => router.push('/dashboard/find-leads')}
                onMouseEnter={() => searchIconRef.current?.startAnimation()}
                onMouseLeave={() => searchIconRef.current?.stopAnimation()}
            >
                Buscar leads 
                <SearchIcon ref={searchIconRef} size={16} />
            </Button>
        </div>
    )
}

export default SearchLeads
