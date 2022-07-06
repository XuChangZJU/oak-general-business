import { EntityDict } from "general-app-domain";
import { assign } from "lodash";
import { Checker } from "oak-domain/lib/types";
import { ROOT_ROLE_ID } from "../constants";
import { GeneralRuntimeContext } from "../RuntimeContext";


async function checkIsRoot<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(context: Cxt) {
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
    } as any, context);
    if (count === 0) {
        // 只有root允许扮演其他用户身份
        return false;
    }
    return true;
}

export function processCheckers<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(checkers: Array<Checker<ED, keyof ED, Cxt>>) {
    // 对user类型的checker，加上root的自动检测
    for (const checker of checkers) {
        const { type, checker: fn } = checker;
        if (type === 'user') {
            assign(checker, {
                checker: async (dummy: any, context: Cxt) => {
                    if (await checkIsRoot(context)) {
                        return;
                    }
                    await fn(dummy, context);
                },
            });
        }
    }
}
