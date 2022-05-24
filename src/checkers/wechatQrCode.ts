import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import {
    Checker,
} from 'oak-domain/lib/types';
import { EntityDict } from 'oak-app-domain';
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
    },
];

export default checkers;
