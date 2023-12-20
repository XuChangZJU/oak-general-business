const IdActionDef = {
    stm: {
        verify: ['unverified', 'verifying'],
        accept: [['unverified', 'verifying'], 'verified'],
        reject: [['verifying', 'verified'], 'unverified'],
    },
    is: 'unverified',
};
export const UserActionDef = {
    stm: {
        activate: ['shadow', 'normal'],
        disable: [['normal', 'shadow'], 'disabled'],
        enable: ['disabled', 'normal'],
        mergeTo: [['normal', 'shadow'], 'merged'],
        mergeFrom: ['normal', 'normal'],
    },
};
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "grant", "revoke", "activate", "disable", "enable", "mergeTo", "mergeFrom", "verify", "accept", "reject"];
export const ActionDefDict = {
    idState: IdActionDef,
    userState: UserActionDef
};
