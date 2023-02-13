import { Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { combineFilters } from 'oak-domain/lib/store/filter';

const checkers: Checker<EntityDict, 'messageTypeTemplateId', RuntimeCxt> [] = [
    {
        type: 'logical',
        action: 'select',
        entity: 'messageTypeTemplateId',
        checker: (operation, context) => {
            const applicationId = context.getApplicationId();
            const filter: EntityDict['messageTypeTemplateId']['Selection']['filter'] = {
                applicationId,
            };
            operation.filter = operation.filter ? combineFilters([operation.filter, filter]): filter;
        },
    }
];

export default checkers;
