const IActionDef = {
    stm: {
        apply: ['active', 'applied'],
        abandon: ['active', 'abandoned']
    },
    is: 'active'
};
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "apply", "abandon"];
export const ActionDefDict = {
    iState: IActionDef
};
