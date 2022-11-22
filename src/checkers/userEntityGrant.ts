import {
    Checker, OakInputIllegalException,
} from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from './RuntimeCxt';

const checkers: Checker<
    EntityDict,
    'userEntityGrant',
    RuntimeCxt
>[] = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: (data) => {
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        checkAttributesNotNull('userEntityGrant', ele, ['type', 'entity', 'entityId', 'relation']);
                        if (ele.type === 'grant') {
                            checkAttributesNotNull('userEntityGrant', ele, ['number']);
                            if (ele.number <= 0 ) {
                                throw new OakInputIllegalException('userEntityGrant', ['number', '分享的权限数量必须大于0']);
                            }
                        }
                        Object.assign(ele, {
                            confirmed: 0,
                        });
                    }
                );
            }
            else {
                checkAttributesNotNull('userEntityGrant', data, ['type', 'entity', 'entityId', 'relation']);
                if (data.type === 'grant') {
                    checkAttributesNotNull('userEntityGrant', data, ['number']);
                    if (data.number! <= 0 ) {
                        throw new OakInputIllegalException('userEntityGrant', ['number', '分享的权限数量必须大于0']);
                    }
                }
                Object.assign(data, {
                    confirmed: 0,
                });
            }
        },
    }
];

export default checkers;
