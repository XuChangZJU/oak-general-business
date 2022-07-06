import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import { OakInputIllegalException, Checker, OakUserUnpermittedException, OakRowInconsistencyException } from "oak-domain/lib/types";
import { EntityDict } from 'general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { ROOT_ROLE_ID } from '../constants';
import { assign } from 'lodash';

const checkers: Checker<EntityDict, 'user', GeneralRuntimeContext<EntityDict>> [] = [
    {
        type: 'data',
        action: 'remove',
        entity: 'user',
        checker: async ({ operation }, context) => {
            const { filter } = operation;
            await checkFilterContains('user', context.rowStore.getSchema(), {
                idState: 'shadow',
            }, context, filter);
            return 0;
        },
    },
    {
        type: 'user',
        action: 'play',
        entity: 'user',
        checker: async () => {
            // 只有root才能play
            throw new OakUserUnpermittedException();
        },
    },    
    {
        type: 'data',
        action: 'play',
        entity: 'user',
        checker: async ({ operation }, context) => {
            const token = await context.getToken();
            const { userId } = token!;
            if (userId === operation.filter!.id) {
                throw new OakRowInconsistencyException();
            }
            return 0;
        },
    }
];

export default checkers;