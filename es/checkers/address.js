import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException } from "oak-domain/lib/types";
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'address',
        checker: (data) => {
            if (data instanceof Array) {
                data.forEach(ele => {
                    checkAttributesNotNull('address', ele, ['name', 'detail', 'phone' /* , 'areaId' */]);
                    if (!isMobile(ele.phone)) {
                        throw new OakInputIllegalException('address', ['phone'], '手机号非法');
                    }
                });
            }
            else {
                checkAttributesNotNull('address', data, ['name', 'detail', 'phone' /* , 'areaId' */]);
                if (!isMobile(data.phone)) {
                    throw new OakInputIllegalException('address', ['phone'], '手机号非法');
                }
            }
        },
    },
    {
        type: 'data',
        action: 'update',
        entity: 'address',
        checker: (data) => {
            if (data.name === '') {
                throw new OakInputIllegalException('address', ['name'], '姓名不可为空');
            }
            if (data.detail === '') {
                throw new OakInputIllegalException('address', ['name'], '详细地址不可为空');
            }
            if (data.hasOwnProperty('phone') && !isMobile(data.phone)) {
                throw new OakInputIllegalException('address', ['phone'], '手机号非法');
            }
            return;
        },
    }
];
export default checkers;
