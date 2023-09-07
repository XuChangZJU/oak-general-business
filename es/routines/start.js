import { rewriteOperation, rewriteSelection } from '../utils/selectionRewriter';
const startRoutines = [
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
