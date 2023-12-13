import { rewriteOperation, rewriteSelection } from '../utils/selectionRewriter';
const startRoutines = [
    {
        name: '注入对合并的user的selection的改写',
        routine: async (context) => {
            context.rowStore.registerSelectionRewriter(rewriteSelection);
            context.rowStore.registerOperationRewriter(rewriteOperation);
            return {};
        },
    }
];
export default startRoutines;
