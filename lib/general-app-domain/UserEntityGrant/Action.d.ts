import { GenericAction } from "oak-domain/lib/actions/action";
export declare type ParticularAction = 'confirm';
export declare type Action = GenericAction | ParticularAction;
export declare const actions: string[];
export declare type IState = 'init';
export declare const ActionDefDict: {};
