import { PaginationOptions } from "@/types/pagination";
import { buildSearch } from "@/lib/database/search";
import { buildSort } from "@/lib/database/sort";
import { users } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { db } from "@/db";
import {
  getOffsetPagination,
  buildOffsetPaginationMeta,
} from "@/lib/database/offset-pagination";
import { errorResponse } from "@/lib/response/service-response";

export class Staff {
  static async findMany(
    clinicId: string | null,
    options: PaginationOptions = {},
  ) {
    const { page, limit, offset } = getOffsetPagination(options);

    const searchQuery = buildSearch(options.search, [
      users.firstName,
      users.lastName,
      users.email,
      users.phone,
    ]);

    const sortableColumns = {
      firstName: users.firstName,

      lastName: users.lastName,

      email: users.email,

      createdAt: users.createdAt,
    } as const;

    const sortColumn =
      sortableColumns[
        (options.sortBy as keyof typeof sortableColumns) ?? "createdAt"
      ];

    if (!clinicId) {
      return errorResponse("Something went wrong");
    }

    const conditions = [eq(users.clinicId, clinicId)];

    if (options.role) {
      conditions.push(eq(users.role, options.role));
    }

    if (searchQuery) {
      conditions.push(searchQuery);
    }

    const where = and(...conditions);

    const [{ total }] = await db
      .select({
        total: count(),
      })
      .from(users)
      .where(where);

    const data = await db.query.users.findMany({
      where,

      orderBy: buildSort(sortColumn, options.sortOrder),

      limit,

      offset,

      columns: {
        id: true,

        firstName: true,

        lastName: true,

        email: true,

        phone: true,

        avatarUrl: true,

        gender: true,

        isActive: true,

        createdAt: true,

        role: true,
      },
    });

    const pagination = buildOffsetPaginationMeta(page, limit, total);

    return {
      data,

      pagination,
    };
  }

  static async getStaffStats(clinicId: string | null) {
    if (!clinicId) {
      return errorResponse("Clinic not found.");
    }

    const clinicWhere = eq(users.clinicId, clinicId);

   try {
     const [
      [{ totalStaff }],
      [{ totalDoctors }],
      [{ totalReceptionists }],
      [{ activeStaff }],
      [{ inactiveStaff }],
    ] = await Promise.all([
      db
        .select({
          totalStaff: count(),
        })
        .from(users)
        .where(clinicWhere),

      db
        .select({
          totalDoctors: count(),
        })
        .from(users)
        .where(and(clinicWhere, eq(users.role, "DOCTOR"))),

      db
        .select({
          totalReceptionists: count(),
        })
        .from(users)
        .where(and(clinicWhere, eq(users.role, "RECEPTIONIST"))),

      db
        .select({
          activeStaff: count(),
        })
        .from(users)
        .where(and(clinicWhere, eq(users.isActive, true))),

      db
        .select({
          inactiveStaff: count(),
        })
        .from(users)
        .where(and(clinicWhere, eq(users.isActive, false))),
    ]);

    return {
      totalStaff,
      totalDoctors,
      totalReceptionists,
      activeStaff,
      inactiveStaff,
    };
   } catch(error) {
      console.error(JSON.stringify(error, null, 2));
   }
  }
}
