import { HeaderComponent } from "../components/HeaderComponent";
import { CreateLead, TableLeads } from "./components";
import { getLeads } from "./components/CreateLead/actions/actions";

export default async function LeadsPage() {

    const leads = await getLeads()

    return (
        <div className="flex flex-col justify-center mx-auto w-full space-y-8">
            <HeaderComponent title="Leads" />
            <CreateLead />
            <div className="mx-6">
                <TableLeads leads={leads}/>
            </div>
        </div>
    )
}