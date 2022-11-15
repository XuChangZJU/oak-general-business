import { GenericAction } from "oak-domain/lib/actions/action";
export declare type ParticularAction = 'confirm' | 'disable';
export declare type Action = GenericAction | ParticularAction;
export declare const actions: string[];
export declare type IState = 'effective' | 'invalid';
export declare const ActionDefDict: {};
