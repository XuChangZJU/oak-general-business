import assert from 'assert';
import { Checker } from 'oak-domain/lib/types';
import { checkAttributesNotNull, checkAttributesScope } from 'oak-domain/lib/utils/validator';
import { EntityDict } from '../oak-app-domain';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'wechatPublicTag', RuntimeCxt>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatPublicTag',
        checker: (data) => {
            assert (! (data instanceof Array));
            checkAttributesNotNull('wechatPublicTag', data, ['applicationId', 'text']);
            checkAttributesScope('wechatPublicTag', data, ['applicationId', 'id', 'text']);
        },
    },
];

export default checkers;