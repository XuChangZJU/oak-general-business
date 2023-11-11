import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException } from "oak-domain/lib/types";
const checkers = [
    {
        type: 'data',
        action: 'update',
        entity: 'address',
        checker: (data) => {
            if (data.hasOwnProperty('phone') && !isMobile(data.phone)) {
                throw new OakInputIllegalException('address', ['phone'], '手机号非法');
            }
            return;
        },
    }
];
export default checkers;
