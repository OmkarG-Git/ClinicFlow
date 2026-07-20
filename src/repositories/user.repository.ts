import { eq, and, count } from "drizzle-orm";

import { db } from "@/db/index";
import { users } from "@/db/schema";

import { PaginationOptions } from "@/types/pagination";
import { buildSearch } from "@/lib/database/search";
import { buildSort } from "@/lib/database/sort";
import { 
  getOffsetPagination,
  buildOffsetPaginationMeta
} from "@/lib/database/offset-pagination";
import { errorResponse } from "@/lib/response/service-response";

export class UserRepository {
  static async findByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  static async findById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  static async findUserById(id: string) {
    return db.query.users.findFirst({
      columns: {
        id: true,
        clinicId: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        role: true,
        isActive: true,
        isOnboarded: true,
      },

      with: {
        clinic: {
          columns: {
            id: true,
            name: true,
            logoUrl: true,
            clinicType: true,
          },
        },
      },

      where: eq(users.id, id),
    });
  };


  static async findMany(
    clinicId: string | null,
    options: PaginationOptions = {},
  ) {


    const {
      page,
      limit,
      offset,
    } = getOffsetPagination(options);


    const searchQuery = buildSearch(
      options.search,
      [
        users.firstName,
        users.lastName,
        users.email,
        users.phone,
      ]
    );


    const sortableColumns = {

      firstName: users.firstName,

      lastName: users.lastName,

      email: users.email,

      createdAt: users.createdAt,

    } as const;

    const sortColumn =
      sortableColumns[
        (options.sortBy as keyof typeof sortableColumns) ??
          "createdAt"
      ];

    if(!clinicId) {
      return errorResponse("Something went wrong");
    };


    const conditions = [
        eq(users.clinicId, clinicId),
    ];

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

      orderBy: buildSort(
        sortColumn,
        options.sortOrder
      ),

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

    const pagination =
      buildOffsetPaginationMeta(
        page,
        limit,
        total
      );

    return {

      data,

      pagination,

    };

  }

}