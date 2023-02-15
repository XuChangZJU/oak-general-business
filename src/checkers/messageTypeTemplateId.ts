import { Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { combineFilters } from 'oak-domain/lib/store/filter';
import assert from "assert";
import { checkAttributesNotNull } from "oak-domain/lib/utils/validator";

const checkers: Checker<EntityDict, 'messageTypeTemplateId', RuntimeCxt> [] = [
    {
        type: 'data',
        action: 'create',
        entity: 'messageTypeTemplateId',
        checker: (data, context) => {
            assert(!(data instanceof Array));
            checkAttributesNotNull('messageTypeTemplateId', data, ['type', 'templateId', 'applicationId']);
        }
    }
];

export default checkers;
