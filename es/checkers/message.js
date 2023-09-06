import { combineFilters } from 'oak-domain/lib/store/filter';
const checkers = [
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
            const filter = {
                messageSystem$message: {
                    systemId,
                }
            };
            operation.filter = operation.filter ? combineFilters('message', context.getSchema(), [operation.filter, filter]) : filter;
        },
    }
];
export default checkers;
