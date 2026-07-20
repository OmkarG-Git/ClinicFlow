import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema/users";

async function seed() {
    console.log(process.env.LOCAL_DATABASE_URL);
  const existing = await db.query.users.findFirst({
    where: (users, { eq }) =>
      eq(users.email, "admin@clinicflow.com"),
  });
  
  if (existing) {
    console.log("✅ Super Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  await db.insert(users).values({
    clinicId: null,
    role: "SUPER_ADMIN",
    firstName: "Super",
    lastName: "Admin",
    email: "admin@clinicflow.com",
    password: hashedPassword,
    phone: null,
    avatarUrl: null,
    isActive: true,
  });

  console.log("🎉 Super Admin Created Successfully");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });