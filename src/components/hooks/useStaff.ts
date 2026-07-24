"use client"

import { useState, useEffect } from "react";
import { getStaffAction, getStaffStatsAction } from "@/actions/owner/getStaff";
import { UserRole } from "@/db/schema";
import type { PaginationMeta } from "@/types/pagination";
import type { Staff, staffState } from "@/components/common/owner/TableFeature/types/StaffType";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notification-store";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { getErrorMessage, isRedirectError, isNetworkError } from "@/lib/utils/error-handler";
import { useDebounce } from "@/components/hooks/useDebounce";

type StaffFilters = {
  page?: number;
  limit?: number;
  role?: UserRole;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export function useStaff() {
  const [loading, setLoading] = useState(true);
  const [stateLoading, setStateLoading] = useState(false);
  const [data, setData] = useState<Staff[]>([]);
  const [stateData, setStateData] = useState<staffState>();

  const router = useRouter();

  const currentUser = useWorkspace();

  const notification = useNotificationStore();

  const [filters, setFilters] = useState<StaffFilters>({
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
    async function fetchStaff() {
      try {
        setLoading(true);

        const response = await getStaffAction(
          {
            ...filters,
            search: debouncedSearch,
          },
          currentUser.role
        );

        if (response.success) {
          setData((response.data?.data as Staff[]) ?? []);
          setPagination(response.data?.pagination);
        } else {
          if (response.message === "Unauthorized") {
            router.push("/unauthorized");
          } else {
            notification.error(response.message);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStaff();
  }, [
    filters.page,
    filters.limit,
    filters.role,
    filters.sortBy,
    filters.sortOrder,
    debouncedSearch,
  ]);


  useEffect(() => {
    const FetchStaffStats = async () => {
      try {
        setStateLoading(true);
        const result = await getStaffStatsAction(currentUser.role);

        if(result.success) {
          setStateData(result.data as staffState)
              console.log("my staff data from 1", result.data);

        }

        console.log("my staff data from 2", result.data);

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

    FetchStaffStats();
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