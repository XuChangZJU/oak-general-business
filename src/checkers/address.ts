import { isMobile } from 'oak-domain/lib/utils/validator';
import { AttrIllegalError, Checker, CreateChecker, DeduceCreateOperation, InstinctiveAttributes } from "oak-domain/lib/types";
import { EntityDict } from 'oak-app-domain/EntityDict';
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
                        const a: Exclude<keyof EntityDict['address']['OpSchema'], 'aa'> = 'name';
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