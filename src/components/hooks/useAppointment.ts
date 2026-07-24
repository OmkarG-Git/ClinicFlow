"use client"

import { useState, useEffect } from "react";
import { appointmentStateType, appointmentType } from "../common/owner/TableFeature/types/AppointmentType";
import { PaginationMeta, AppointmentOption } from "@/types/pagination";
import { getAppointments, getAppointmentsStats } from "@/actions/owner/appointments";
import { redirect, useRouter } from "next/navigation";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { useNotificationStore } from "@/store/notification-store";
import { getErrorMessage, isRedirectError, isNetworkError } from "@/lib/utils/error-handler";
import { useDebounce } from "./useDebounce";


export function useAppointment(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<appointmentType[]>([]);
    const [stateData, setStateData] = useState<appointmentStateType>();
    const [stateLoading, setStateLoading] = useState(false);


    const currentUser = useWorkspace();

    const notification = useNotificationStore();

    const router = useRouter();

    const [filters, setFilters] = useState<AppointmentOption>({
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
        role: undefined,
        status: undefined
      });
    
    const debouncedSearch = useDebounce(
      filters.search,
      500
    );

  const [pagination, setPagination] = useState<PaginationMeta | undefined>(undefined);

   useEffect(() => {
      async function fetchAppointments() {
        try {

          setLoading(true);
  
        const response = await getAppointments(
          {
            ...filters,
            search: debouncedSearch
          },
           currentUser.role
          );

          console.log("my data from back", response.data);
    
        if(response.success) {
           if(response?.data) {
            setData(response?.data.data as appointmentType[]);
          }
            setPagination(response?.data?.pagination ?? undefined);
        } else {
          if(response.message === "Unauthorized") {
             router.push("/unauthorized");
          } else {
            notification.error(response.message);
          }
        }
    
          setLoading(false);

        } catch (error: any) {
          console.log("my error", error.message)
        }
      }
  
      fetchAppointments();
    }, [
      filters.page,
      filters.limit,
      filters.role,
      filters.sortBy,
      filters.status,
      filters.sortOrder,
      debouncedSearch,
    ]);


    useEffect(() => {

      const fetchStaffStateData = async () => {
        setStateLoading(true);

        try{

          const response = await getAppointmentsStats(currentUser.role);

          if(response.success) {
            const result = response.data;

            if(result) {
              setStateData(result as appointmentStateType)
              setStateLoading(false);
            }
          } 

        } catch (error: any) {
          if (isNetworkError(error)) {
              notification.error("Network error. Please check your connection.");
              console.error("Network error:", error);
              return;
          }
          
          const message = getErrorMessage(error);
          notification.error(message);
          console.error("Error:", error);
          
        }
      }

      fetchStaffStateData();

    }, [])

    return {
        data,
        loading,
        filters,
        setFilters,
        pagination,
        stateData,
        stateLoading
    }
}