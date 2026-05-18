'use client'

import { createContext, Dispatch, SetStateAction, ReactNode, useState, useContext } from "react"
import { LeadPlacesAPIProps } from "../components/LeadsList/LeadsList.types"

type LeadsContextProps = {
    leads: LeadPlacesAPIProps[]
    setLeads: Dispatch<SetStateAction<LeadPlacesAPIProps[]>>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const LeadsContext = createContext<LeadsContextProps | null>(null)

export const LeadsProvider = ({children}: {children: ReactNode}) => {
    const [leads, setLeads] = useState<LeadPlacesAPIProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <LeadsContext.Provider value={{
            leads,
            setLeads,
            isLoading, 
            setIsLoading
        }}>{children}</LeadsContext.Provider>
    )
}

export const useLeads = () => {
    const context = useContext(LeadsContext)

    if (!context) {
        throw new Error('useLeads debe estar dento del LeadsProvider')
    }

    return context
}