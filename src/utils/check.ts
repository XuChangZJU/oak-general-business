import { Checker } from "oak-domain/lib/types";
import { ROOT_ROLE_ID } from "../constants";
import { RuntimeContext } from "../context/RuntimeContext";
import { EntityDict } from "../general-app-domain";

async function checkIsRoot<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(context: Cxt) {
    return context.isRoot();
}

export function processCheckers<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(checkers: Array<Checker<ED, keyof ED, Cxt>>) {
    // 对user类型的checker，加上root的自动检测
    for (const checker of checkers) {
        const { type, checker: fn } = checker;
        if (type === 'user') {
            Object.assign(checker, {
                checker: async (dummy: any, context: Cxt, option: any) => {
                    if (await checkIsRoot<ED, Cxt>(context)) {
                        return;
                    }
                    await fn(dummy, context, option);
                },
            });
        }
    }
}
