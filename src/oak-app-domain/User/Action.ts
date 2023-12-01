import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, AppendOnlyAction, ReadOnlyAction, ExcludeUpdateAction, ExcludeRemoveAction, RelationAction } from "oak-domain/lib/actions/action";
export type IdAction = 'verify' | 'accept' | 'reject' | string;
export type IdState = 'unverified' | 'verified' | 'verifying' | string;
const IdActionDef: ActionDef<IdAction, IdState> = {
    stm: {
        verify: ['unverified', 'verifying'],
        accept: [['unverified', 'verifying'], 'verified'],
        reject: [['verifying', 'verified'], 'unverified'],
    },
    is: 'unverified',
};
export type UserAction = 'activate' | 'disable' | 'enable' | 'mergeTo' | 'mergeFrom' | string;
export type UserState = 'shadow' | 'normal' | 'disabled' | 'merged' | string;
const UserActionDef: ActionDef<UserAction, UserState> = {
    stm: {
        activate: ['shadow', 'normal'],
        disable: [['normal', 'shadow'], 'disabled'],
        enable: ['disabled', 'normal'],
        mergeTo: [['normal', 'shadow'], 'merged'],
        mergeFrom: ['normal', 'normal'],
    },
};
export type ParticularAction = UserAction | IdAction;
export const actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "grant", "revoke", "activate", "disable", "enable", "mergeTo", "mergeFrom", "verify", "accept", "reject"];
export type Action = GenericAction | ParticularAction | RelationAction | string;
export const ActionDefDict = {
    idState: IdActionDef,
    userState: UserActionDef
};