const IActionDef = {
    stm: {
        send: ['unsent', 'sending'],
        success: ['sending', 'sent'],
        fail: ['sending', 'failure']
    },
    is: 'unsent'
};
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "send", "success", "fail"];
export const ActionDefDict = {
    iState: IActionDef
};
