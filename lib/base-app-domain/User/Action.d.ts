import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IdAction = 'verify' | 'accept' | 'reject';
export declare type IdState = 'unverified' | 'verified' | 'verifying';
export declare type UserAction = 'activate' | 'disable' | 'enable' | 'mergeTo' | 'mergeFrom';
export declare type UserState = 'shadow' | 'normal' | 'disabled' | 'merged';
export declare type CascadeAction = 'play';
export declare type ParticularAction = UserAction | IdAction | CascadeAction;
export declare type Action = GenericAction | ParticularAction;
export declare const ActionDefDict: {
    idState: ActionDef<IdAction, IdState>;
    userState: ActionDef<UserAction, UserState>;
};
