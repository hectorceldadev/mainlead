// import { LeadSource } from "@/lib/generated/prisma/enums";
import { HeaderComponent } from "../components/HeaderComponent";
import { getHistoryCompanies } from "./actions/actions";
import { HistoryList, SearchLeads } from "./components";

export default async function HistoryLeadsPage({searchParams}: {searchParams: Promise<{ q: string }>}) {
    const { q } = await searchParams

    const historyCompanies = await getHistoryCompanies(q, { /*source */})

    console.log(historyCompanies)
    return (
        <div className="flex flex-col justify-center mx-auto w-full space-y-6">
            <HeaderComponent title="History leads"/>
            <div className="flex flex-col gap-6 px-6 mb-10">
                <SearchLeads />
                <HistoryList historyList={historyCompanies}/>
            </div>
        </div>
    )
}