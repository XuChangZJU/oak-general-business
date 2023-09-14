import { GenericAction } from "oak-domain/lib/actions/action";
export type ParticularAction = 'confirm';
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {};
