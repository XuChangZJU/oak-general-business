import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import {
    Checker, CreateChecker,
} from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';

const checkers: Checker<
    EntityDict,
    'wechatQrCode',
    GeneralRuntimeContext<EntityDict>
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatQrCode',
        checker: async ({ operation }, context) => {
            return 0;
        },
    } as CreateChecker<EntityDict, 'wechatQrCode', GeneralRuntimeContext<EntityDict>
>,
];

export default checkers;
