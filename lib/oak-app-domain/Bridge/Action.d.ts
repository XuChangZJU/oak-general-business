import { GenericAction } from "oak-domain/lib/actions/action";
export type IAction = 'cancel' | 'qrcode' | string;
export type ParticularAction = IAction;
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {};
