const IActionDef = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait',
};
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "sync", "success", "fail"];
export const ActionDefDict = {
    iState: IActionDef
};
