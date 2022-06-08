import { EntityDict } from "general-app-domain";
import { ROOT_ROLE_ID } from "../constants";
import { GeneralRuntimeContext } from "../RuntimeContext";


export async function checkIsRoot(context: GeneralRuntimeContext<EntityDict>) {
    const token = await context.getToken();
    if (!token) {
        return false;
    }
    const { playerId } = token!;
    const count = await context.rowStore.count('userRole', {
        filter: {
            userId: playerId!,
            roleId: ROOT_ROLE_ID,
        },
    }, context);
    if (count === 0) {
        // 只有root允许扮演其他用户身份
        return false;
    }
    return true;
}
