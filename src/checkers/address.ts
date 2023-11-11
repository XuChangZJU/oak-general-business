import { isMobile } from 'oak-domain/lib/utils/validator';
import { OakInputIllegalException, Checker } from "oak-domain/lib/types";
import { EntityDict } from '../oak-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';

const checkers: Checker<EntityDict, 'address', RuntimeCxt> [] = [
    {
        type: 'data',
        action: 'update',
        entity: 'address',
        checker: (data) => {
            if (data.hasOwnProperty('phone') && !isMobile((data as EntityDict['address']['Update']['data']).phone!)) {
                throw new OakInputIllegalException('address', ['phone'], '手机号非法');
            }
            return;
        },
    }
];

export default checkers;