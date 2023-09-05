import { assert } from 'oak-domain/lib/utils/assert';
import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException } from 'oak-domain/lib/types';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'mobile',
        checker: (data) => {
            assert(!(data instanceof Array));
            checkAttributesNotNull('mobile', data, ['mobile']);
            if (!isMobile(data.mobile)) {
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
                if (!isMobile(data.mobile)) {
                    throw new OakInputIllegalException('mobile', ['mobile'], '手机号非法');
                }
            }
        },
    },
];
export default checkers;
