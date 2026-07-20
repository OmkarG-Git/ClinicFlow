import { PageContainer } from "../layout/PageContainer";
import { PageHeader } from "../layout/PageHeader";
import { StaffTable } from "./TableFeature/StaffTable";

export function TablePageContainer() {

    return (
        <PageContainer>
            <PageHeader
                title="Staff"
                subtitle="d" 
            />
            <StaffTable/>
        </PageContainer>
    )
}