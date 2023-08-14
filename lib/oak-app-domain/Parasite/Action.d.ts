import { GenericAction } from "oak-domain/lib/actions/action";
export declare type IAction = 'wakeup' | 'cancel' | 'qrcode' | string;
export declare type ParticularAction = IAction;
export declare const actions: string[];
export declare type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {};
