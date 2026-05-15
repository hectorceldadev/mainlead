import { HeaderComponent } from "../components/HeaderComponent";
import { SearchLeads } from "../leads/components";


export default function FindLeadsPage() {
    return (
        <div className="flex flex-col justify-center mx-auto w-full space-y-8">
            <HeaderComponent title="Find Leads"/>
            <div className="px-6">
                <SearchLeads />
            </div>
        </div>
    )
}