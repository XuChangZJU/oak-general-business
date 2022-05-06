import { Checker, OakUserUnpermittedException } from "oak-domain/lib/types";
import { EntityDict } from 'oak-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { OakUnloggedInException } from "../types/Exceptions";
import { assign } from "lodash";
import { combineFilters } from "oak-domain/lib/store/filter";

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
            throw new OakUserUnpermittedException();
        },
    }
];

export default checkers;