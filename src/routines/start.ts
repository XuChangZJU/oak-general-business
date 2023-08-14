import { Routine } from 'oak-domain/lib/types/Timer';
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

import { rewriteOperation, rewriteSelection } from '../utils/selectionRewriter';

const startRoutines: Array<Routine<EntityDict & BaseEntityDict, BackendRuntimeContext<EntityDict & BaseEntityDict>>> = [
    {
        name: '注入对合并的user的selection的改写',
        fn: async (context) => {
            context.rowStore.registerSelectionRewriter(rewriteSelection);
            context.rowStore.registerOperationRewriter(rewriteOperation);
            return '注入成功';
        },
    }
];

export default startRoutines;