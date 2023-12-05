import { ActionDef } from "oak-domain/lib/types/Action";
import { GenericAction } from "oak-domain/lib/actions/action";
export type IState = 'active' | 'applied' | 'abandoned' | string;
export type IAction = 'apply' | 'abandon' | string;
export type ParticularAction = IAction;
export declare const actions: string[];
export type Action = GenericAction | ParticularAction | string;
export declare const ActionDefDict: {
    iState: ActionDef<string, string>;
};
