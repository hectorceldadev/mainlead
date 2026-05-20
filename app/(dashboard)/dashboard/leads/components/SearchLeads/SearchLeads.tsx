'use client'

import { Trash2 } from "@/components/animate-ui/icons/trash-2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export const SearchLeads = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [ searchTerm, setSearchTerm ] = useState<string>('')
    const [ status, setStatus ] = useState<string>('')
    
    useEffect(() => {
        const timerId = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString()) 
            searchTerm ? params.set('q', searchTerm) : params.delete('q')
            status ? params.set('status', status) : params.delete('status')
            router.push(`/dashboard/leads?${params.toString()}`)
        }, 200)

        return () => {
            clearTimeout(timerId)
        }
    }, [searchTerm, status])
    
    return (
        <div className="grid grid-cols-3 gap-2 items-center w-full">
            <Input 
                type="text"
                className="col-span-2"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar lead..."
            />
            <div className="flex items-center gap-1">
                <Select value={status} onValueChange={(value) => setStatus(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrar"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem className="text-blue-500" value="COLD">Frío</SelectItem>
                            <SelectItem className="text-orange-500" value="TEMPERED">Templado</SelectItem>
                            <SelectItem className="text-red-500" value="HOT">Caliente</SelectItem>
                            <SelectItem className="text-emerald-500" value="CLOSED">Cerrados</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                    {status !== '' && (
                        <Button variant={'destructive'} size={'icon'} onClick={() => setStatus('')}>
                            <Trash2 size={16} animateOnHover />
                        </Button>
                    )}
            </div>
        </div>
    )
}