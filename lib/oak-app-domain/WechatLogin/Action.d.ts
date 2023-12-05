import { GenericAction } from "oak-domain/lib/actions/action";
export type ParticularAction = 'success';
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {};
