import { assert } from 'oak-domain/lib/utils/assert';
import { checkAttributesNotNull, checkAttributesScope, } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatPublicTag',
        checker: (data) => {
            assert(!(data instanceof Array));
            checkAttributesNotNull('wechatPublicTag', data, [
                'applicationId',
                'text',
            ]);
            checkAttributesScope('wechatPublicTag', data, [
                'applicationId',
                'id',
                'text',
            ]);
        },
    },
];
export default checkers;
