import { HeaderComponent } from "../../components/HeaderComponent"
import { EditLead } from "./components"
import { getLead } from "./components/EditLead/actions/actions"

export default async function LeadPage({params}: {params: Promise<{leadId: string}>}) {
    const { leadId } = await params
    
    const lead = await getLead(leadId)

    return (
        <div>
            <HeaderComponent title="Edit lead"/>
            <div className="p-6">
                <EditLead lead={lead}/>
            </div>
        </div>
    )
}
