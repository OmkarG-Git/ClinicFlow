import { eq, and, count } from "drizzle-orm";

import { db } from "@/db/index";
import { users } from "@/db/schema";


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




}