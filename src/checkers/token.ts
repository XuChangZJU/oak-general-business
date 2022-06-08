import { Checker, OakUserUnpermittedException } from "oak-domain/lib/types";
import { EntityDict } from 'general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { OakUnloggedInException } from "../types/Exceptions";
import { assign } from "lodash";
import { addFilterSegment, combineFilters } from "oak-domain/lib/store/filter";
import { checkIsRoot } from "../utils/check";

const checkers: Checker<EntityDict, 'token', GeneralRuntimeContext<EntityDict>> [] = [
    {
        type: 'user',
        action: 'select',
        entity: 'token',
        checker: async ({ operation }, context) => {
            const scene = context.getScene();
            const { filter } = operation;
            if (scene === 'token:me') {
                if (!filter || !filter.id) {
                    const token = await context.getToken();
                    if (!token) {
                        throw new OakUnloggedInException();
                    }
                    const { id } = token;
                    assign(operation, {
                        filter: combineFilters([filter, { id }]),
                    });
                    return 1;
                }
                return 0;
            }
            if (['app:onLaunch', 'token:me', 'token:login'].includes(scene)) {
                return 0;
            }
            // 对获取token的权限进行精细化控制，除了root
            if (filter && filter.id === await context.getTokenValue()) {
                return 0;
            }
            const isRoot = await checkIsRoot(context);
            if (!isRoot) {
                // 不是root只能访问自己的token
                if (!filter) {
                    throw new OakUserUnpermittedException();
                }
                assign(operation, {
                    filter: addFilterSegment(filter, {
                        id: await context.getTokenValue(),
                    })
                });
            }
            return 0;
        },
    }
];

export default checkers;