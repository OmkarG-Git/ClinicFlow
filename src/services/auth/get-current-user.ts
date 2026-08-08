import { getSession } from "@/lib/auth/cookies";
import { UserRepository } from "@/repositories/user.repository";
import { unauthorizedResponse, notFoundResponse, successResponse, errorResponse } from "@/lib/response/service-response";

export async function getCurrentUser() {
    try {
        const session = await getSession();

        console.log("SESSION:", session);

        if (!session) {
            return unauthorizedResponse("Unauthorized");
        }

        const user = await UserRepository.findUserById(session.userId);

        console.log("USER:", user);

        if (!user) {
            return notFoundResponse("User not found");
        }

        return successResponse(user, "User found");
    } catch (error) {
        console.error(error);

        return errorResponse("Something went wrong");
    }
}