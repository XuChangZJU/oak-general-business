export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "succeed", "fail", "visit"];
const IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
};
const VisitActionDef = {
    stm: {
        visit: ['unvisited', 'visited'],
    },
    is: 'unvisited',
};
export const ActionDefDict = {
    iState: IActionDef,
    visitState: VisitActionDef
};
