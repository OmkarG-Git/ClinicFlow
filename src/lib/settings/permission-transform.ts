import { ACTIONS, RESOURCES } from "@/constants/permissions";

export function transformPermissions(
    permissions: any[]
) {

    const result: Record<string, Record<string, boolean>> = {};

    for (const resource of Object.keys(RESOURCES)) {

        result[resource] = {};

        for (const action of Object.keys(ACTIONS)) {

            result[resource][action] = false;

        }

    }

    for (const permission of permissions) {

        result[permission.resource][permission.action] =
            permission.allowed;

    }

    return result;

}