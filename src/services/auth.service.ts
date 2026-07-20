import { verifyPassword } from "@/lib/auth/hash";
import { createSession } from "@/lib/auth/cookies";

import { UserRepository } from "@/repositories/user.repository";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const valid = await verifyPassword(
      password,
      user.password
    );

    if (!valid) {
      throw new Error("Invalid email or password.");
    }

    if (!user.isActive) {
      throw new Error("Your account has been disabled.");
    }

    await createSession({
      userId: user.id,
      clinicId: user.clinicId,
      role: user.role,
    });


    return {
      role: user.role,
      clinicId: user.clinicId,
    };
  }
}