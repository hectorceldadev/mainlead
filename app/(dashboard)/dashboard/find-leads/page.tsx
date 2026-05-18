import { Separator } from "@/components/ui/separator";
import { HeaderComponent } from "../components/HeaderComponent";
import { LeadsList, SearchLeads } from "./components";
import { LeadsProvider } from "./context/Leads.context";


export default function FindLeadsPage() {
    return (
        <div className="flex flex-col justify-center mx-auto w-full space-y-8">
            <HeaderComponent title="Find Leads"/>
            <LeadsProvider>
                <div className="flex flex-col space-y-6 px-6">
                    <SearchLeads />
                    <Separator />
                    <LeadsList />
                </div>
            </LeadsProvider>
        </div>
    )
}