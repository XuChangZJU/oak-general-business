import { checkFilterContains } from 'oak-domain/lib/store/actionDef';
import {
    Checker, CreateChecker,
} from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';

const checkers: Checker<
    EntityDict,
    'wechatQrCode',
    RuntimeContext<EntityDict>
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatQrCode',
        checker: async ({ operation }, context) => {
            return 0;
        },
    } as CreateChecker<EntityDict, 'wechatQrCode', RuntimeContext<EntityDict>
>,
];

export default checkers;
