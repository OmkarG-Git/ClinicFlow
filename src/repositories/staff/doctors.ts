import { and, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export class Doctors {

    static async findByQuery(
        query: string,
        clinicId: string | null
    ) {

        const search = query.trim();

        if(!clinicId) {
            throw new Error("Something went wrong");
        }


        return db.query.users.findMany({

            where: and(

                eq(users.clinicId, clinicId),

                or(
                    ilike(users.firstName, `${search}%`),
                    ilike(users.lastName, `${search}%`),
                    ilike(users.phone, `${search}%`),
                    ilike(users.email, `${search}%`)
                )

            ),

            columns: {

                id: true,

                firstName: true,

                lastName: true,
            },

            limit: 10,

        });

    }

}