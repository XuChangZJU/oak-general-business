export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "succeed", "fail"];
const IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
    is: 'sending',
};
export const ActionDefDict = {
    iState: IActionDef
};
