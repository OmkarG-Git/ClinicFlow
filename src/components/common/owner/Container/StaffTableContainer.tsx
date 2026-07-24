import { PageContainer } from "../../layout/PageContainer"
import { PageHeader } from "../../layout/PageHeader"
import { Users } from "lucide-react"
import { StaffAction } from "../../quickActions/StaffPageActions"
import { StaffTable } from "../Tables/StaffTable"
import { StaffState } from "../pageState/StaffState"

export function StaffPageContainer() {

    
    return (
        <PageContainer>
            <PageHeader
                title="Staff Management"
                subtitle="Manage your clinic staff" 
                badge={
                    <Users />
                }
                action={
                    <StaffAction className="flex flex-col" />
                }
            />

            <StaffState />

            <StaffTable/>
        </PageContainer>
    )
}