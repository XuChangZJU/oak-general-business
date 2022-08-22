import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import { OakInputIllegalException, Checker, OakUserUnpermittedException, OakRowInconsistencyException, RemoveChecker, UpdateChecker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';

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
    } as RemoveChecker<EntityDict, 'user', GeneralRuntimeContext<EntityDict>>,
    {
        type: 'user',
        action: 'play',
        entity: 'user',
        checker: async () => {
            // 只有root才能play
            throw new OakUserUnpermittedException();
        },
    } as UpdateChecker<EntityDict, 'user', GeneralRuntimeContext<EntityDict>> ,    
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
    } as UpdateChecker<EntityDict, 'user', GeneralRuntimeContext<EntityDict>> ,
    {
        type: 'data',
        action: 'grant',
        entity: 'user',
        checker: async({ operation }) => {
            const { data } = operation;
            if (Object.keys(data).filter(ele => !ele.includes('$')).length > 0) {
                throw new OakInputIllegalException(Object.keys(data), '授权不允许传入其它属性');
            }
            return 0;
        }
    } as UpdateChecker<EntityDict, 'user', GeneralRuntimeContext<EntityDict>> 
];

export default checkers;