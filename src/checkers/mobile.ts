import assert from 'assert';
import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException, Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'mobile', RuntimeCxt> [] = [
    {
        type: 'data',
        action: 'create',
        entity: 'mobile',
        checker: (data) => {
            assert(!(data instanceof Array));
            checkAttributesNotNull('mobile', data, ['mobile']);
            if (!isMobile(data.mobile!)) {
                throw new OakInputIllegalException('mobile', ['mobile'], '手机号非法');
            }
        },
    },
    {
        type: 'data',
        action: 'update',
        entity: 'mobile',
        checker: (data) => {
            assert(!(data instanceof Array));
            if (data.hasOwnProperty('mobile')) {
                checkAttributesNotNull('mobile', data, ['mobile']);
                if (!isMobile(data.mobile!)) {
                    throw new OakInputIllegalException(
                        'mobile',
                        ['mobile'],
                        '手机号非法'
                    );
                }
            }
        },
    }
];

export default checkers;
