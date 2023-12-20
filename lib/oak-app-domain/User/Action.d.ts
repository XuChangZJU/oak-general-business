import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, RelationAction } from "oak-domain/lib/actions/action";
export type IdAction = 'verify' | 'accept' | 'reject' | string;
export type IdState = 'unverified' | 'verified' | 'verifying' | string;
export type UserAction = 'activate' | 'disable' | 'enable' | 'mergeTo' | 'mergeFrom' | string;
export type UserState = 'shadow' | 'normal' | 'disabled' | 'merged' | string;
export declare const UserActionDef: ActionDef<UserAction, UserState>;
export type ParticularAction = UserAction | IdAction;
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | RelationAction | string;
export declare const ActionDefDict: {
    idState: ActionDef<string, string>;
    userState: ActionDef<string, string>;
};
