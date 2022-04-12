import { isMobile } from 'oak-domain/lib/utils/validator';
import { AttrIllegalError, Checker } from "../types/Auth";
import { EntityDict } from '../base-ed/EntityDict';
import { checkAttributesNotNull } from '../utils/check';

const checkers: Checker<EntityDict, 'address'> [] = [
    {
        action: 'create',
        entity: 'address',
        checker: async ({ operation }) => {
            const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        checkAttributesNotNull(ele, ['name', 'detail', 'phone', 'areaId']);
                        if (!isMobile(ele.phone)) {
                            throw new AttrIllegalError(['phone'], '手机号非法');
                        }
                    } 
                );
            }
            else {
                checkAttributesNotNull(data, ['name', 'detail', 'phone', 'areaId']);
                if (!isMobile(data.phone)) {
                    throw new AttrIllegalError(['phone'], '手机号非法');
                }
            }      
            return 0;
        },
    }
];

export default checkers;