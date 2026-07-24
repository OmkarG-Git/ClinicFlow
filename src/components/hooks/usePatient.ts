"use client"

import { useState, useEffect } from "react";
import { UserRole } from "@/db/schema";
import type { PaginationMeta } from "@/types/pagination";
import type { PatientState, Patients } from "@/components/common/owner/TableFeature/types/PatientsType";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notification-store";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { getErrorMessage, isRedirectError, isNetworkError } from "@/lib/utils/error-handler";
import { getPatientsAction, getPatientsStateAction } from "@/actions/owner/patients";
import { useDebounce } from "./useDebounce";

type PatientsFilters = {
  page?: number;
  limit?: number;
  role?: UserRole;
  search?: string;
  sortBy?: string;

  sortOrder?: "asc" | "desc";
};

export function usePatients() {
  const [loading, setLoading] = useState(true);
  const [stateLoading, setStateLoading] = useState(false);
  const [data, setData] = useState<Patients[]>([]);
  const [stateData, setStateData] = useState<PatientState>();

  const router = useRouter();

  const currentUser = useWorkspace();

  const notification = useNotificationStore();

  const [filters, setFilters] = useState<PatientsFilters>({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    role: undefined,
  });

  const debouncedSearch = useDebounce(
    filters.search,
    500
  );

  const [pagination, setPagination] = useState<PaginationMeta | undefined>(undefined);

  useEffect(() => {
    async function fetchPatients() {
      try {
        setLoading(true);

        const response = await getPatientsAction(
          {
            ...filters,
            search: debouncedSearch,
          },
           currentUser.role
          );

        if(response.success) {
          setData((response?.data?.data as Patients[]) ?? []);
          setPagination(response?.data?.pagination ?? undefined);
        }
        
      } catch (error) {

        if(isRedirectError(error)) {
            console.log("redirecting");
            return
        }

        if (isNetworkError(error)) {
            notification.error("Network error. Please check your connection.");
            console.error("Network error:", error);
            return;
        }
          
          const message = getErrorMessage(error);
          notification.error(message);
          console.error("Error:", error);
          
      } finally {
        setLoading(false);
      }

    }

    fetchPatients();
 }, [
      filters.page,
      filters.limit,
      filters.role,
      filters.sortBy,
      filters.sortOrder,
      debouncedSearch,
    ]);


  useEffect(() => {
    const FetchPatientState = async () => {
      try {
        setStateLoading(true);
        const result = await getPatientsStateAction(currentUser.role);

        if(result.success) {
          setStateData(result.data as PatientState)
        }

      } catch(error) {
        if(isRedirectError(error)) {
          console.log("redirecting");
        }

         if (isNetworkError(error)) {
              notification.error("Network error. Please check your connection.");
              console.error("Network error:", error);
              return;
          }

          
          const message = getErrorMessage(error);
          notification.error(message);
          console.error("Error:", error);
          
      } finally {
        setStateLoading(false);
      }
    }

    FetchPatientState();
  }, []);

  return {
    data,
    loading,
    filters,
    setFilters,
    pagination,
    stateData,
    stateLoading
  };
}