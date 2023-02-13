import assert from 'assert';
import { OakInputIllegalException, Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { checkAttributesNotNull } from 'oak-domain/lib/utils/validator';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { combineFilters } from 'oak-domain/lib/store/filter';

const checkers: Checker<EntityDict, 'message', RuntimeCxt> [] = [
    {
        type: 'logical',
        action: 'select',
        entity: 'message',
        checker: (operation, context) => {
            const systemId = context.getSystemId();
            const filter: EntityDict['message']['Selection']['filter'] = {
                id: {
                    $in: {
                        entity: 'messageSystem',
                        data: {
                            messageId: 1,
                        },
                        filter: {
                            systemId,
                        },
                    },
                },
            };
            operation.filter = operation.filter ? combineFilters([operation.filter, filter]): filter;
        },
    }
];

export default checkers;
