import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction, RelationAction } from "oak-domain/lib/actions/action";
export declare type IdAction = 'verify' | 'accept' | 'reject' | string;
export declare type IdState = 'unverified' | 'verified' | 'verifying' | string;
export declare type UserAction = 'activate' | 'disable' | 'enable' | 'mergeTo' | 'mergeFrom' | string;
export declare type UserState = 'shadow' | 'normal' | 'disabled' | 'merged' | string;
export declare type ParticularAction = UserAction | IdAction;
export declare const actions: string[];
export declare type Action = GenericAction | ParticularAction | RelationAction | string;
export declare const ActionDefDict: {
    idState: ActionDef<string, string>;
    userState: ActionDef<string, string>;
};
