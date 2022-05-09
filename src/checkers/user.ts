import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException, Checker } from "oak-domain/lib/types";
import { EntityDict } from 'oak-app-domain';
import { checkAttributesNotNull } from '../utils/check';
import { GeneralRuntimeContext } from '../RuntimeContext';

const checkers: Checker<EntityDict, 'user', GeneralRuntimeContext<EntityDict>> [] = [
    {
        type: 'data',
        action: 'create',
        entity: 'user',
        checker: async ({ operation }) => {
            const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        checkAttributesNotNull(ele, ['nickname']);
                    } 
                );
            }
            else {
                checkAttributesNotNull(data, ['nickname']);
            }      
            return 0;
        },
    }
];

export default checkers;