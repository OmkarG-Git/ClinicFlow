import { PageContainer } from "../../layout/PageContainer";
import { PageHeader } from "../../layout/PageHeader";
import { Users } from "lucide-react";
import { PatientTable } from "../Tables/PatientTable";
import { PatientActions } from "../../quickActions/PatientPageAction";
import { PatientsStates } from "../pageState/PatientStates";


export function PatientPageContainer() {
  return (
        <PageContainer>
            <PageHeader
                title="Patient Management"
                subtitle="Manage your Patients " 
                badge={
                    <Users />
                }
                action={
                    <PatientActions className="flex flex-col gap-2" />
                }
            />

            <PatientsStates />

            <PatientTable/>
        </PageContainer>
    )
}