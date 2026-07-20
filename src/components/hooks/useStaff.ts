"use client"

import { useState, useEffect } from "react";
import { getStaffAction } from "@/actions/owner/getStaff";
import { UserRole } from "@/db/schema";
import type { PaginationMeta } from "@/types/pagination";
import type { Staff } from "@/components/common/owner/TableFeature/types/StaffType";

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
  const [data, setData] = useState<Staff[]>([]);

  const [filters, setFilters] = useState<StaffFilters>({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    role: undefined,
  });

  const [pagination, setPagination] = useState<PaginationMeta | undefined>(undefined);

  useEffect(() => {
    async function fetchStaff() {
      setLoading(true);

      const response = await getStaffAction(filters);

      setData((response?.data as Staff[]) ?? []);
      setPagination(response?.pagination ?? undefined);

      setLoading(false);
    }

    fetchStaff();
  }, [filters]);

  return {
    data,
    loading,
    filters,
    setFilters,
    pagination,
  };
}