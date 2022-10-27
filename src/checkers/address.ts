import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException, Checker, CreateChecker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeContext } from '../context/RuntimeContext';

const checkers: Checker<EntityDict, 'address', RuntimeContext<EntityDict>> [] = [
    {
        type: 'data',
        action: 'create',
        entity: 'address',
        checker: async ({ operation }) => {
            const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        const a: Exclude<keyof EntityDict['address']['OpSchema'], 'aa'> = 'name';
                        checkAttributesNotNull('address', ele, ['name', 'detail', 'phone', 'areaId']);
                        if (!isMobile(ele.phone)) {
                            throw new OakInputIllegalException('address', ['phone'], '手机号非法');
                        }
                    } 
                );
            }
            else {
                checkAttributesNotNull('address', data, ['name', 'detail', 'phone', 'areaId']);
                if (!isMobile(data.phone)) {
                    throw new OakInputIllegalException('address', ['phone'], '手机号非法');
                }
            }      
            return 0;
        },
    } as CreateChecker<EntityDict, 'address', RuntimeContext<EntityDict>>
];

export default checkers;