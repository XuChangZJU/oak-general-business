import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IdAction = 'verify' | 'accept' | 'reject';
export declare type IdState = 'unverified' | 'verified' | 'verifying';
export declare type UserAction = 'activate' | 'disable' | 'enable' | 'mergeTo' | 'mergeFrom';
export declare type UserState = 'shadow' | 'normal' | 'disabled' | 'merged';
export declare type MoreAction = 'play' | 'grant';
export declare type ParticularAction = UserAction | IdAction | MoreAction;
export declare type Action = GenericAction | ParticularAction;
export declare const actions: string[];
export declare const ActionDefDict: {
    idState: ActionDef<IdAction, IdState>;
    userState: ActionDef<UserAction, UserState>;
};
