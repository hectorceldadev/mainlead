'use client'

import { Button } from "@/components/ui/button"
import { HomeIconHandle } from "@/components/ui/home"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/ui/search"
// import { LeadSource } from "@/lib/generated/prisma/enums"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Trash2Icon } from "@/components/animate-ui/icons/trash-2"

export const SearchLeads = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    // const [source, setSource] = useState<LeadSource | null>(null)
    const searchIconRef = useRef<HomeIconHandle>(null)

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            searchTerm ? params.set('q', searchTerm) : params.delete('q')
            // source ? params.set('source', source) : params.delete('source')
            router.push(`/dashboard/history-leads?${params.toString()}`)
        }, 100)

        return () => {
            clearTimeout(timer)
        }

    }, [searchTerm, {/*source */}])

    return (
        <div className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-2 w-full">
                <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar en el historial..." />
                {/* <Select value={source ?? ''} onValueChange={(value: LeadSource) => setSource(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Fuente" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="GOOGLE_PLACES">Google Maps</SelectItem>
                            <SelectItem value="LINKEDIN">Linkedin</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {source && (
                    <Button className="cursor-pointer" size={'icon'} variant={'destructive'} onClick={() => setSource(null)}> 
                        <Trash2Icon animateOnHover />
                    </Button>
                )} */}
            </div>
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
