import "dotenv/config";

import bcrypt from "bcryptjs";

import { db } from "@/db";

import {
  users,
  clinics,
  clinicSettings,
  clinicNotificationSettings,
  services,
} from "@/db/schema";
import { createDefaultPermissions } from "@/lib/settings/create-default-permissions";
import { createDefaultLayout } from "@/lib/settings/create-default-layout";

async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

async function seed() {
  console.log("🌱 Seeding database...");

  await db.transaction(async (tx) => {
    /*
     * SUPER ADMIN
     */

    let superAdmin = await tx.query.users.findFirst({
      where: (users, { eq }) =>
        eq(users.email, "admin@clinicflow.com"),
    });

    if (!superAdmin) {
      await tx.insert(users).values({
        clinicId: null,
        role: "SUPER_ADMIN",
        firstName: "Super",
        lastName: "Admin",
        email: "admin@clinicflow.com",
        password: await hashPassword("Admin@123"),
        isActive: true,
      });

      console.log("✅ Super Admin created");
    } else {
      console.log("✔ Super Admin already exists");
    }

    /*
     * CLINIC
     */

    let clinic = await tx.query.clinics.findFirst({
      where: (clinics, { eq }) =>
        eq(clinics.email, "nakade@gmail.com"),
    });

    if (!clinic) {
      const inserted = await tx
        .insert(clinics)
        .values({
          name: "Nakade Clinic",
          clinicType: "GENERAL",
          email: "nakade@gmail.com",
          phone: "9467152846",
        })
        .returning();

      clinic = inserted[0];

      console.log("✅ Clinic created");
    } else {
      console.log("✔ Clinic already exists");
    }

    /*
     * OWNER
     */

    let owner = await tx.query.users.findFirst({
      where: (users, { eq }) =>
        eq(users.email, "nakade@gmail.com"),
    });

    if (!owner) {
      await tx.insert(users).values({
        clinicId: clinic.id,
        role: "OWNER",
        firstName: "Nakade",
        lastName: "Owner",
        email: "nakade@gmail.com",
        password: await hashPassword("O1m2k3@r99"),
        isActive: true,
      });

      console.log("✅ Owner created");
    } else {
      console.log("✔ Owner already exists");
    }

    /*
     * CLINIC SETTINGS
     */

    const settings =
      await tx.query.clinicSettings.findFirst({
        where: (table, { eq }) =>
          eq(table.clinicId, clinic.id),
      });

    if (!settings) {
      await tx.insert(clinicSettings).values({
        clinicId: clinic.id,
      });

      console.log("✅ Clinic Settings created");
    }

    const defaultSettings = await createDefaultPermissions(tx ,clinic.id);

    if(!defaultSettings) {
      console.log("❌ Failed to create default permissions");
    }


    const layout =
      await tx.query.roleLayouts.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.clinicId, clinic.id),
            eq(table.role, "OWNER")
          ),
      });

    if (!layout) {
      await createDefaultLayout(tx ,clinic.id);

      console.log("✅ Default Layouts created");
    } else {
      console.log("✔ Default Layouts already exist");
    }

    /*
     * NOTIFICATION SETTINGS
     */

    const notification =
      await tx.query.clinicNotificationSettings.findFirst({
        where: (table, { eq }) =>
          eq(table.clinicId, clinic.id),
      });

    if (!notification) {
      await tx
        .insert(clinicNotificationSettings)
        .values({
          clinicId: clinic.id,
        });

      console.log("✅ Notification Settings created");
    }



    /*
     * DEFAULT SERVICES
     */

    const serviceCount = await tx.query.services.findMany({
      where: (table, { eq }) =>
        eq(table.clinicId, clinic.id),
    });

    if (serviceCount.length === 0) {
      await tx.insert(services).values([
        {
          clinicId: clinic.id,
          serviceCode: "GEN001",
          name: "General Consultation",
          duration: 30,
          price: "500",
        },
        {
          clinicId: clinic.id,
          serviceCode: "FUP001",
          name: "Follow-up Consultation",
          duration: 15,
          price: "300",
        },
        {
          clinicId: clinic.id,
          serviceCode: "EMG001",
          name: "Emergency Consultation",
          duration: 30,
          price: "800",
        },
      ]);

      console.log("✅ Default Services created");
    } else {
      console.log("✔ Services already exist");
    }
  });

  console.log("🎉 Database seeded successfully");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed");
    console.error(err);
    process.exit(1);
  });