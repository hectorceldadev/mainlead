import { HeaderComponent } from "../components/HeaderComponent";
import { CreateLead, SearchLeads, TableLeads } from "./components";
import { getLeads } from "./components/TableLeads/actions/actions";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{q?: string, status: string}> }) {
    const { q, status } = await searchParams
    
    const leads = await getLeads(q, status)

    return (
        <div className="flex flex-col justify-center mx-auto w-full space-y-8">
            <HeaderComponent title="Leads" />
            <div className="flex justify-end gap-6 px-6">
                <SearchLeads />
                <CreateLead />
            </div>
            <div className="mx-6">
                <TableLeads leads={leads}/>
            </div>
        </div>
    )
}