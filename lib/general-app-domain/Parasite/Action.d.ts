import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IAction = 'wakeup' | 'cancel' | string;
export declare type ParticularAction = IAction;
export declare type Action = GenericAction | ParticularAction | string;
export declare const actions: string[];
export declare const ActionDefDict: {};
