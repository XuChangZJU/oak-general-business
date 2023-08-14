import {
    Checker,
} from 'oak-domain/lib/types';
import { EntityDict } from '../oak-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<
    EntityDict,
    'wechatQrCode',
    RuntimeCxt
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatQrCode',
        checker: (data) => {
        },
    }
];

export default checkers;
