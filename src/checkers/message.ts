import assert from 'assert';
import { OakInputIllegalException, Checker } from "oak-domain/lib/types";
import { EntityDict } from '../oak-app-domain';
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
            if (!systemId) {
                return;
            }
            const isRoot = context.isRoot();
            if (isRoot) {
                return;
            }
            const filter: EntityDict['message']['Selection']['filter'] = {
                messageSystem$message: {
                    systemId,
                }
            };
            operation.filter = operation.filter ? combineFilters('message', context.getSchema(), [operation.filter, filter]): filter;
        },
    }
];

export default checkers;
