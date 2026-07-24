import { PageContainer } from "../../layout/PageContainer";
import { PageHeader } from "../../layout/PageHeader";
import { AppointmentTable } from "../Tables/AppointmentTable";
import { Users } from "lucide-react";
import { AppointmentActions } from "@/components/common/quickActions/AppointmentPageAction"
import { AppointmentStates } from "../pageState/AppointmentStates";

export function AppointmentPageContainer() {
  return (
        <PageContainer>
            <PageHeader
                title="Appointment Management"
                subtitle="Manage your appointments " 
                badge={
                    <Users />
                }
                action={
                    <AppointmentActions className="flex flex-col gap-2" />
                }
            />

            <AppointmentStates />

            <AppointmentTable/>
        </PageContainer>
    )
}