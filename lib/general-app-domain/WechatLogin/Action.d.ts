import { GenericAction } from "oak-domain/lib/actions/action";
export declare type ParticularAction = 'success';
export declare type Action = GenericAction | ParticularAction | string;
export declare const actions: string[];
export declare const ActionDefDict: {};
