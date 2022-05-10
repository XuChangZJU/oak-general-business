import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException, Checker } from "oak-domain/lib/types";
import { EntityDict } from 'oak-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { GeneralRuntimeContext } from '../RuntimeContext';

const checkers: Checker<EntityDict, 'address', GeneralRuntimeContext<EntityDict>> [] = [
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
                        checkAttributesNotNull(ele, ['name', 'detail', 'phone', 'areaId']);
                        if (!isMobile(ele.phone)) {
                            throw new OakInputIllegalException(['phone'], '手机号非法');
                        }
                    } 
                );
            }
            else {
                checkAttributesNotNull(data, ['name', 'detail', 'phone', 'areaId']);
                if (!isMobile(data.phone)) {
                    throw new OakInputIllegalException(['phone'], '手机号非法');
                }
            }      
            return 0;
        },
    }
];

export default checkers;