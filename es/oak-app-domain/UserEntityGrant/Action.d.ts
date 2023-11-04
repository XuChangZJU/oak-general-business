import { GenericAction } from "oak-domain/lib/actions/action";
export type ParticularAction = 'claim';
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {};
